-- Phase 2 adds phones. The new enum value lives in its own migration so it is
-- committed before any later migration or seed uses it (a newly added enum value
-- cannot be used in the same transaction that adds it).
alter type it_asset_tracker.asset_type add value if not exists 'phone';
