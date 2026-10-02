#!/usr/bin/env bash
# Moves the IT Asset Tracker from its own Supabase project (ojkgwfacdbtlnavkqyjn)
# into schema it_asset_tracker on the shared Highlands project (jppfamslzlthnircmete).
#
# Already run 2026-10-02. Step 6 needs rw mode: read-only queries cannot SET ROLE.
# Only creates things: the it_asset_tracker schema, its data, and one more entry in
# the API's exposed-schema list. The source project is only read. Stops on the
# first problem. Undo: drop schema it_asset_tracker cascade; remove it from the list.
set -euo pipefail

PROD=jppfamslzlthnircmete
SRC=ojkgwfacdbtlnavkqyjn
REPO="$HOME/Desktop/it-asset-tracker"
WORK="$(mktemp -d)"; trap 'rm -rf "$WORK"' EXIT   # holds copied IT data; removed on exit
TOK=$(security find-generic-password -s "Supabase CLI" -w | sed 's/^go-keyring-base64://' | { read -r v; echo "$v" | base64 -d 2>/dev/null || echo "$v"; })
API=https://api.supabase.com/v1/projects

# q <project> <sql-file> [read_only]
q() {
  python3 -c 'import json,sys; print(json.dumps({"query":open(sys.argv[1]).read(),"read_only":sys.argv[2]=="ro"}))' "$2" "${3:-rw}" > "$WORK/body.json"
  local out; out=$(curl -sS -H "Authorization: Bearer $TOK" -H "Content-Type: application/json" "$API/$1/database/query" --data-binary @"$WORK/body.json")
  if echo "$out" | grep -q '"message"'; then echo "FAILED: $out" >&2; exit 1; fi
  echo "$out"
}
qs() { echo "$2" > "$WORK/s.sql"; q "$1" "$WORK/s.sql" "${3:-ro}"; }

TABLES="operators operator_contacts properties vendors assets asset_computers asset_software asset_networks asset_phones dids vendor_contracts network_summaries"

echo "1/6  Checking the target is clean"
[ "$(qs $PROD "select count(*) n from pg_namespace where nspname='it_asset_tracker'")" = '[{"n":0}]' ] || { echo "it_asset_tracker already exists; stopping." >&2; exit 1; }

echo "2/6  Creating schema it_asset_tracker (one transaction)"
{ echo "begin;"; for f in "$REPO"/supabase/migrations/*.sql; do cat "$f"; echo; done; echo "commit;"; } > "$WORK/schema.sql"
q $PROD "$WORK/schema.sql" > /dev/null

echo "3/6  Comparing columns with the source project"
cols="select table_name||'.'||column_name||':'||data_type||':'||is_nullable c from information_schema.columns where table_schema='%s' order by 1"
qs $SRC "$(printf "$cols" public)" > "$WORK/a.json"
qs $PROD "$(printf "$cols" it_asset_tracker)" > "$WORK/b.json"
python3 - "$WORK/a.json" "$WORK/b.json" <<'EOF'
import json,sys
a={r['c'] for r in json.load(open(sys.argv[1]))}; b={r['c'] for r in json.load(open(sys.argv[2]))}
if a!=b:
    print("Column mismatch. Only in source:", sorted(a-b), "Only in target:", sorted(b-a)); sys.exit(1)
print(f"     {len(a)} columns match")
EOF

echo "4/6  Copying data (one transaction)"
{ echo "begin;"
  for t in $TABLES; do
    qs $SRC "select coalesce(json_agg(t), '[]') d from public.$t t" > "$WORK/$t.json"
    python3 - "$WORK/$t.json" "$t" <<'EOF'
import json,sys
d=json.dumps(json.load(open(sys.argv[1]))[0]['d']).replace("'", "''")
t=sys.argv[2]
print(f"insert into it_asset_tracker.{t} select * from json_populate_recordset(null::it_asset_tracker.{t}, '{d}');")
EOF
  done
  echo "commit;"; } > "$WORK/data.sql"
q $PROD "$WORK/data.sql" > /dev/null
for t in $TABLES; do
  a=$(qs $SRC "select count(*) n from public.$t"); b=$(qs $PROD "select count(*) n from it_asset_tracker.$t")
  [ "$a" = "$b" ] || { echo "Row count differs for $t: source $a, target $b" >&2; exit 1; }
  printf "     %-18s %s\n" "$t" "$(echo "$b" | tr -dc 0-9)"
done

echo "5/6  Exposing the schema to the API (adds one entry, keeps the rest)"
cur=$(curl -sS -H "Authorization: Bearer $TOK" "$API/$PROD/postgrest" | python3 -c 'import json,sys; print(json.load(sys.stdin)["db_schema"])')
case ",$cur," in *,it_asset_tracker,*) new="$cur";; *) new="$cur,it_asset_tracker";; esac
curl -sS -X PATCH -H "Authorization: Bearer $TOK" -H "Content-Type: application/json" "$API/$PROD/postgrest" \
  -d "{\"db_schema\":\"$new\"}" | python3 -c 'import json,sys; print("     db_schema =", json.load(sys.stdin)["db_schema"])'

echo "6/6  Checking access rules (read-only, nothing saved)"
admin=$(qs $PROD "select user_id from public.user_roles where role='administrator' limit 1" | python3 -c 'import json,sys; print(json.load(sys.stdin)[0]["user_id"])')
other=$(qs $PROD "select user_id from public.user_roles where role<>'administrator' limit 1" | python3 -c 'import json,sys; print(json.load(sys.stdin)[0]["user_id"])')
as() { qs $PROD "begin; set local role authenticated; set local request.jwt.claims = '{\"sub\":\"$1\",\"role\":\"authenticated\"}'; select count(*) n from it_asset_tracker.assets; rollback;" rw; }
echo "     administrator sees: $(as "$admin" | tr -dc 0-9) assets (expect $(qs $SRC 'select count(*) n from public.assets' | tr -dc 0-9))"
echo "     non-admin sees:     $(as "$other" | tr -dc 0-9) assets (expect 0)"
anon=$(qs $PROD "begin; set local role anon; select count(*) from it_asset_tracker.assets; rollback;" rw 2>&1 || true)
echo "$anon" | grep -q "permission denied" && echo "     logged-out:         permission denied (expected)" || echo "     logged-out:         UNEXPECTED: $anon"

echo "Done. The source project was not changed."
