import { useState, useEffect } from "react";

const SEED_ASSETS = [
  { id:"a001", type:"PC/software", operator:"op-highlands", location:"loc-remote", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Steve Brooks", make:"HP", model:"HP Laptop", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2024-02-01" },
  { id:"a002", type:"PC/software", operator:"op-highlands", location:"loc-remote", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Keith", make:"HP", model:"HP Laptop", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2024-03-01" },
  { id:"a003", type:"PC/software", operator:"op-highlands", location:"loc-columbia", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Freddie Jenkins", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"NTWPX-6THFW-B8BFJ-QJJHP-9QFPQ", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-04-24" },
  { id:"a004", type:"PC/software", operator:"op-highlands", location:"loc-gaston", subLocation:"Executive Director Office", category:"Desktop", status:"Active", assignedUser:"Krissy Mika", make:"Dell", model:"Inspiron 570", serial:"8HK7DP1", hostname:"DESKTOP-EN5EJ6C", osVersion:"Windows 10 Pro 22H2 (Build 19045.6466)", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"NYGFY-VV92Q-QJVBP-VGPXW-332W3", processor:"AMD Athlon II X2 245 @ 2.90 GHz", ram:"8.00 GB DDR3 (7.75 usable)", storage:"466 GB ST350041 8AS", graphics:"ATI Radeon HD 4200 (253 MB)", deviceId:"FD60ED78-0271-4E4D-A3B7-52E22F4E265D", productId:"00330-80000-00000-AA859", systemType:"64-bit, x64-based processor", softwareSource:"OEM", macAddress:"", notes:"ED workstation - Krissy Mika. ⚠️ Hardware aged (2009-2010 era Dell Inspiron 570). Used for SC Medicaid Portal, banking (Ameris/Capital One), HSL operations. Win 10 installed 8/30/2023. Wired ethernet. Service Tag 8HK7DP1 from rear panel sticker. Specs/IDs from Settings>About May 2026 on-site visit. Consider replacement priority — running modern web apps on 16-year-old hardware with 8GB DDR3.", entryDate:"2025-03-25", lastSeenOnSite:"2026-05-27" },
  { id:"a005", type:"PC/software", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Krissy Mika", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"GRC7N-9CKHG-RFKPB-KW9MX-FRK6D", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"⚠️ Second Office 2024 license assigned to Krissy — verify if this is a laptop she also uses, or if this license should be reassigned. Her primary device is the Dell Inspiron 570 desktop (a004) per May 2026 on-site visit.", entryDate:"2025-03-25" },
  { id:"a006", type:"PC/software", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Savannah Jones", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"DBWQN-2DHPP-7XGRH-MKDFW-JFK6D", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-04-14" },
  { id:"a007", type:"PC/software", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Cassie Imes", make:"", model:"", serial:"5CD9271WZW", hostname:"", osVersion:"Windows 11 Pro Education 24H2", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"HRVNB-YC92B-44JPH-F987J-VH96J", processor:"Intel Core i5-8265U @ 1.60GHz", ram:"8 GB", deviceId:"739351CB-3CCE-4379-8D67-6341A2E9E1B5", productId:"00379-20000-00001-AAOEM", systemType:"64-bit", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-05-20" },
  { id:"a008", type:"PC/software", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Latoya Solomon", make:"HP", model:"HP Elite Book Pro", serial:"", hostname:"", osVersion:"Windows 10 Pro", osProductKey:"", officeVersion:"MS Office Professional Plus 2019", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-06-06" },
  { id:"a009", type:"PC/software", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Jenohn Carter", make:"Dell", model:"Dell Latitude 5420", serial:"", hostname:"", osVersion:"Windows 10 Pro", osProductKey:"", officeVersion:"MS Office Professional Plus 2021", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-06-06" },
  { id:"a010", type:"PC/software", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Joy Hope", make:"Dell", model:"Dell Latitude 3420", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"MS Office Professional Plus 2021", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"Security concerns", entryDate:"2025-06-06" },
  { id:"a011", type:"", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Laptop", status:"Inactive", assignedUser:"Medtech2", make:"", model:"ThinkPad", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"Gayco - Broken - bad keyboard", entryDate:"2025-06-06" },
  { id:"a012", type:"", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Laptop", status:"Inactive", assignedUser:"Medtech", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"Gayco", entryDate:"" },
  { id:"a013", type:"PC/software", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Desktop", status:"Active", assignedUser:"Shreya", make:"Dell", model:"Dell Optiplex 7490 AIO", serial:"", hostname:"", osVersion:"Windows 10 Pro", osProductKey:"", officeVersion:"MS Office Professional Plus 2021", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"Added HighlandsADM account", entryDate:"2025-06-06" },
  { id:"a014", type:"PC/software", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Desktop", status:"Active", assignedUser:"MC Medtech", make:"Dell", model:"Dell Optiplex 7490 AIO", serial:"", hostname:"BGPDLN-02", osVersion:"Windows 10 Pro", osProductKey:"", officeVersion:"Office 365", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"Still on BSL domain", entryDate:"2025-06-06" },
  { id:"a015", type:"PC/software", operator:"op-highlands", location:"loc-norcross", subLocation:"Copy Room", category:"Desktop", status:"Active", assignedUser:"Copy Room", make:"Dell", model:"Dell Optiplex 7490 AIO", serial:"", hostname:"BGPDLN-01", osVersion:"Windows 10 Pro", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"Added HighlandsADM account", entryDate:"2025-06-06" },
  { id:"a016", type:"PC/software", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Desktop", status:"Active", assignedUser:"Medtech", make:"Dell", model:"Dell Optiplex 7490 AIO", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-06-06" },
  { id:"a017", type:"PC/software", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Desktop", status:"Active", assignedUser:"Essie", make:"Dell", model:"Dell Optiplex 7490 AIO", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-06-06" },
  { id:"a018", type:"Software", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Software License", status:"Active", assignedUser:"Blaire Crawford", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"C4HTT-VNKKY-XP43D-GHV3J-TRB2W", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-09-19" },
  { id:"a019", type:"PC/software", operator:"op-highlands", location:"loc-cartersville", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Stacey Jenkins", make:"Dell", model:"Dell Latitude 7480", serial:"", hostname:"DESKTOP-UV3MJQQ", osVersion:"Windows 11 Pro", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"JB6RB-KNHB8-64GHV-8MVVJ-J8J88", processor:"Intel Core i5-7300U @ 2.60GHz", ram:"8 GB", deviceId:"8A22C8DC-F99E-47F3-A972-9E929EFFD679", productId:"00330-80000-00000-AA159", systemType:"64-bit", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-09-29" },
  { id:"a020", type:"Software", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Software License", status:"Active", assignedUser:"Katelyn Hobbs", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"CD7F2-NT3KK-HGKW2-M6WRC-RVY2W", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-10-24" },
  { id:"a021", type:"PC/Software", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Kayla Burns", make:"Dell", model:"Dell Latitude 7480", serial:"", hostname:"DESKTOP-CALOVQG", osVersion:"Windows 11 Pro", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"XXVQN-64MPX-B8FFC-3PHDH-94W88", processor:"Intel Core i5-7300U @ 2.60GHz", ram:"8 GB", deviceId:"0B27BB54-BE29-4886-8653-003F2A8495D5", productId:"00330-50891-18393-AAOEM", systemType:"64-bit", softwareSource:"", macAddress:"", notes:"", entryDate:"2025-12-16" },
  { id:"a022", type:"Software", operator:"op-highlands", location:"loc-corporate", subLocation:"", category:"Software License", status:"Active", assignedUser:"Walter Grimes", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"6F4RD-QNJMC-WFWQJ-RG3WQ-2WJ88", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2026-03-15" },
  { id:"a023", type:"Software", operator:"op-highlands", location:"loc-corporate", subLocation:"", category:"Software License", status:"Active", assignedUser:"Akash R", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"N2FF6-BT29X-J7CP2-64WFW-D9RPW", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2026-04-10" },
  { id:"a024", type:"Software", operator:"op-highlands", location:"loc-cartersville", subLocation:"", category:"Software License", status:"Active", assignedUser:"Haven Easterwood", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"PT4QP-M2NP6-2Y8QM-FF996-6F8CW", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"", entryDate:"2026-04-10" },
  { id:"a025", type:"Software", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Amanda Strickland", make:"Dell", model:"Dell Latitude 7420", serial:"5914DK2", hostname:"HighlandsJeffED", osVersion:"Windows 11 Pro", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"F7NV9-VCTKX-TMXPG-JBM89-3RW83", processor:"11th Gen Intel i5-1145g7 @ 2.60GHz", ram:"16 GB", deviceId:"97546207-447A-4DD9-8038-6CD1100A021B", productId:"00330-54089-56350-AAOEM", systemType:"64-bit", softwareSource:"", macAddress:"", notes:"Windows pre-installed", entryDate:"2026-04-14" },
  { id:"a026", type:"Software", operator:"op-highlands", location:"", subLocation:"", category:"Software License", status:"Inactive", assignedUser:"NOT WORKING", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"M98D9-Q4NYK-F4MH7-6J2MW-DGTJ8", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"Not working", entryDate:"" },
  { id:"a027", type:"Software", operator:"op-highlands", location:"", subLocation:"", category:"Software License", status:"Inactive", assignedUser:"NOT WORKING", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"8T4JN-BKW86-2QPT3-XFQYP-7CJCW", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"Not working", entryDate:"" },
  { id:"a028", type:"Software", operator:"op-highlands", location:"", subLocation:"", category:"Software License", status:"Inactive", assignedUser:"NOT WORKING", make:"", model:"", serial:"", hostname:"", osVersion:"", osProductKey:"", officeVersion:"Office 2024", officeProductKey:"TJ8VF-YMN3G-3W8FR-V69YJ-Q7DTJ", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"", notes:"Not working", entryDate:"" },
  { id:"a029", type:"ATA", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"ATA / Fax", status:"Active", assignedUser:"FAX", make:"Cisco", model:"ATA191", serial:"", hostname:"FAX ATA", osVersion:"", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"ec74d729d5a0", ipAddress:"10.36.43.37", notes:"GoTo ext 1008 - Unavailable in GoTo", entryDate:"2025-10-24" },
  { id:"a030", type:"ATA", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"ATA / Fax", status:"Active", assignedUser:"FAX ATA", make:"Grandstream", model:"HT801", serial:"", hostname:"FAX ATA", osVersion:"", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"ec74d729d6cb", ipAddress:"", notes:"GoTo ext 1008 - Manually Provisioned - Unavailable", entryDate:"2025-12-01" },
  { id:"a031", type:"ATA", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"ATA / Fax", status:"Needs Attention", assignedUser:"FAX Machine", make:"Poly", model:"ATA 400", serial:"", hostname:"FAX ATA", osVersion:"", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"", ram:"", deviceId:"", productId:"", systemType:"", softwareSource:"", macAddress:"ec74d7c87eba", ipAddress:"192.168.1.124", notes:"GoTo ext 1009 - Status: Needs attention", entryDate:"2026-05-08" },
  { id:"a032", type:"PC", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Laptop", status:"Active", assignedUser:"Mary Bynum", make:"HP", model:"HP Elite Book 840 G6", serial:"5CG0295ZWD", hostname:"DESKTOP-02H50J6", osVersion:"Windows 11 Pro", osProductKey:"", officeVersion:"", officeProductKey:"", processor:"Intel Core i5-8365U @ 1.60GHz", ram:"16 GB", deviceId:"6EA53E3C-A069-4764-8BC3-62F822286758", productId:"00330-53038-01028-AAOEM", systemType:"64-bit", softwareSource:"", macAddress:"", notes:"", entryDate:"2026-02-23" },
  // ── Ring Cameras ─────────────────────────────────────────────────────────────
  { id:"a033", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 1 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a034", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 2 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a035", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 3 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a036", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 4 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a037", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 5 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a038", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 6 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a039", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 7 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a040", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 8 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a041", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 9 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a042", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 10 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a043", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 11 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a044", type:"Camera", operator:"op-highlands", location:"loc-jefferson", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 12 of 12 — Jefferson", entryDate:"2026-05-20" },
  { id:"a045", type:"Camera", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 1 of 4 — Forest City", entryDate:"2026-05-20" },
  { id:"a046", type:"Camera", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 2 of 4 — Forest City", entryDate:"2026-05-20" },
  { id:"a047", type:"Camera", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 3 of 4 — Forest City", entryDate:"2026-05-20" },
  { id:"a048", type:"Camera", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 4 of 4 — Forest City", entryDate:"2026-05-20" },
  { id:"a049", type:"Camera", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 1 of 1 — Rome", entryDate:"2026-05-20" },
  { id:"a050", type:"Camera", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"Security Camera", status:"Inactive", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 1 of 8 — Gaston (currently off)", entryDate:"2026-05-20" },
  { id:"a051", type:"Camera", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"Security Camera", status:"Inactive", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 2 of 8 — Gaston (currently off)", entryDate:"2026-05-20" },
  { id:"a052", type:"Camera", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"Security Camera", status:"Inactive", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 3 of 8 — Gaston (currently off)", entryDate:"2026-05-20" },
  { id:"a053", type:"Camera", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"Security Camera", status:"Inactive", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 4 of 8 — Gaston (currently off)", entryDate:"2026-05-20" },
  { id:"a054", type:"Camera", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"Security Camera", status:"Inactive", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 5 of 8 — Gaston (currently off)", entryDate:"2026-05-20" },
  { id:"a055", type:"Camera", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"Security Camera", status:"Inactive", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 6 of 8 — Gaston (currently off)", entryDate:"2026-05-20" },
  { id:"a056", type:"Camera", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"Security Camera", status:"Inactive", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 7 of 8 — Gaston (currently off)", entryDate:"2026-05-20" },
  { id:"a057", type:"Camera", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"Security Camera", status:"Inactive", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 8 of 8 — Gaston (currently off)", entryDate:"2026-05-20" },
  { id:"a058", type:"Camera", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Ring", model:"", serial:"", hostname:"", macAddress:"", notes:"Ring camera 1 of 1 — Norcross", entryDate:"2026-05-20" },
  // ── Cartersville — LTS Analog System ─────────────────────────────────────────
  { id:"a059", type:"Camera", operator:"op-highlands", location:"loc-cartersville", subLocation:"", category:"Security Camera", status:"Active", assignedUser:"", make:"Comsec", model:"Analog", serial:"", hostname:"", macAddress:"", notes:"28x analog Comsec cameras — Cartersville. No individual MAC/serial tracking. Managed via LTS LTD8432K-ST DVR.", entryDate:"2026-05-20", cameraCount:28 },
  { id:"a060", type:"Camera", operator:"op-highlands", location:"loc-cartersville", subLocation:"", category:"DVR / NVR Controller", status:"Active", assignedUser:"", make:"LTS", model:"LTD8432K-ST", serial:"", hostname:"", macAddress:"", notes:"32-channel DVR for 28x analog cameras — Cartersville. LTS Security.", entryDate:"2026-05-20" },

  // ── PHONE DEVICES (migrated from SEED_PHONES) ────────────────────────────────
  { id:"ph-jeff-01", operator:"op-highlands", location:"loc-jefferson", subLocation:"Front Desk",             provider:"GoTo", extension:"1000", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2fe803b", publicIp:"50.146.108.10", privateIp:"10.36.43.191", lineType:"Desk phone",              status:"Ready",           lastProvisioned:"2026-05-13", routeTo:"1000: Front Desk",             carrier:"PSTN", dids:[{number:"+17063877000",assignedTo:"Front Desk",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"Main line: 706-387-7000" , avgMonthlyCost:"20.06", mrcNotes:"GoTo seat $18.00 + fees $2.06. Includes 1 DID. Invoice IN7105370066 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-jeff-02", operator:"op-highlands", location:"loc-jefferson", subLocation:"Executive Director",     provider:"GoTo", extension:"1001", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2fe77d7", publicIp:"50.146.108.10", privateIp:"10.36.43.80",  lineType:"Desk phone",              status:"Ready",           lastProvisioned:"2026-05-13", routeTo:"1001: Executive Director",     carrier:"PSTN", dids:[{number:"+17064068565",assignedTo:"Executive Director",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"" , avgMonthlyCost:"20.06", mrcNotes:"GoTo seat $18.00 + fees $2.06. Includes 1 DID. Invoice IN7105370066 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-jeff-03", operator:"op-highlands", location:"loc-jefferson", subLocation:"Business Office Manager", provider:"GoTo", extension:"1002", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2feb825", publicIp:"50.146.108.10", privateIp:"10.36.43.99",  lineType:"Desk phone",              status:"Ready",           lastProvisioned:"2026-05-15", routeTo:"1002: Business Office Manager",carrier:"PSTN", dids:[{number:"+17064068574",assignedTo:"Business Office Manager",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"" , avgMonthlyCost:"20.06", mrcNotes:"GoTo seat $18.00 + fees $2.06. Includes 1 DID. Invoice IN7105370066 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-jeff-04", operator:"op-highlands", location:"loc-jefferson", subLocation:"Sales Office",           provider:"GoTo", extension:"1003", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2feb637", publicIp:"50.146.108.10", privateIp:"10.36.43.87",  lineType:"Desk phone",              status:"Ready",           lastProvisioned:"2026-05-13", routeTo:"1003: Sales Office",           carrier:"PSTN", dids:[{number:"+17064068584",assignedTo:"Sales Office",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"" , avgMonthlyCost:"20.06", mrcNotes:"GoTo seat $18.00 + fees $2.06. Includes 1 DID. Invoice IN7105370066 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-jeff-05", operator:"op-highlands", location:"loc-jefferson", subLocation:"Nurse Office",           provider:"GoTo", extension:"1004", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2feb32c", publicIp:"50.146.108.10", privateIp:"10.209.113.209",lineType:"Desk phone",              status:"Ready",           lastProvisioned:"2026-05-17", routeTo:"1004: Nurse Office",           carrier:"PSTN", dids:[{number:"+17064068593",assignedTo:"Nurse Office",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"" , avgMonthlyCost:"20.06", mrcNotes:"GoTo seat $18.00 + fees $2.06. Includes 1 DID. Invoice IN7105370066 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-jeff-06", operator:"op-highlands", location:"loc-jefferson", subLocation:"AL Medtech",             provider:"GoTo", extension:"1005", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2fea391", publicIp:"50.146.108.10", privateIp:"10.36.43.108", lineType:"Desk phone",              status:"Ready",           lastProvisioned:"2026-05-13", routeTo:"1005: AL Medtech",             carrier:"PSTN", dids:[{number:"+17064068601",assignedTo:"AL Medtech",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"" , avgMonthlyCost:"20.06", mrcNotes:"GoTo seat $18.00 + fees $2.06. Includes 1 DID. Invoice IN7105370066 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-jeff-07", operator:"op-highlands", location:"loc-jefferson", subLocation:"MC Medtech",             provider:"GoTo", extension:"1006", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2fe8e7a", publicIp:"50.146.108.10", privateIp:"10.100.242.37",lineType:"Desk phone",              status:"Ready",           lastProvisioned:"2026-05-17", routeTo:"1006: MC Medtech",             carrier:"PSTN", dids:[{number:"+17064068605",assignedTo:"MC Medtech",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"" , avgMonthlyCost:"20.06", mrcNotes:"GoTo seat $18.00 + fees $2.06. Includes 1 DID. Invoice IN7105370066 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-jeff-08", operator:"op-highlands", location:"loc-jefferson", subLocation:"Activities",             provider:"GoTo", extension:"1007", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2fe8644", publicIp:"50.146.108.10", privateIp:"10.95.58.28",  lineType:"Desk phone",              status:"Ready",           lastProvisioned:"2026-05-15", routeTo:"1007: Activities",             carrier:"PSTN", dids:[{number:"+17064068607",assignedTo:"Activities",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"" , avgMonthlyCost:"20.06", mrcNotes:"GoTo seat $18.00 + fees $2.06. Includes 1 DID. Invoice IN7105370066 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-jeff-09", operator:"op-highlands", location:"loc-jefferson", subLocation:"Fax",                    provider:"GoTo", extension:"1008", make:"Cisco",   model:"ATA191",   macAddress:"ec74d729d5a0", publicIp:"",              privateIp:"10.36.43.37",  lineType:"Analog telephone adapter", status:"Unavailable",     lastProvisioned:"",           routeTo:"1008: FAX Grandstream ATA",    carrier:"PSTN", dids:[{number:"+17063871149",assignedTo:"FAX line",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"FAX line" , avgMonthlyCost:"20.56", mrcNotes:"GoTo ATA seat $18.00 + fees $2.06 + DID $0.50. Invoice IN7105370066 May 2026. FAX line.", type:"Phone", costType:"actual" },
  { id:"ph-gas-att-01", operator:"op-highlands", location:"loc-gaston", subLocation:"Main Office", provider:"AT&T", extension:"", make:"", model:"", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+18039550453",assignedTo:"Main line",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands Senior Living"}], notes:"AT&T Phone Unlimited N. America. Acct 151834264. Promotional offer rate.", avgMonthlyCost:"41.03", mrcNotes:"AT&T phone line $30 + half of shared fees $11.03 = $41.03/mo est.", type:"Phone", costType:"actual" },
  { id:"ph-gas-att-02", operator:"op-highlands", location:"loc-gaston", subLocation:"", provider:"AT&T", extension:"", make:"", model:"", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+18037558333",assignedTo:"",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands Senior Living"}], notes:"AT&T Phone flat rate. Acct 151834264.", avgMonthlyCost:"41.03", mrcNotes:"AT&T phone line $30 + half of shared fees $11.03 = $41.03/mo est.", type:"Phone", costType:"actual" },
  { id:"ph-gas-mob-01", operator:"op-highlands", location:"loc-gaston", subLocation:"", provider:"AT&T", extension:"", make:"", model:"Smartphone 4G LTE", macAddress:"", publicIp:"", privateIp:"", lineType:"Mobile", status:"Active", lastProvisioned:"", routeTo:"", carrier:"AT&T Mobility", dids:[{number:"+18039087087",assignedTo:"Rapha Residential Care",numberSource:"PSTN",numberType:"Mobile",externalCallerId:"Rapha Residential Care"}], notes:"AT&T Mobile Select 1GB Pool. Acct 287319845202 (Rapha Residential Care). 516 daytime + 128 N&W min Sep 2025.", avgMonthlyCost:"44.00", mrcNotes:"AT&T Mobile Select 1GB $35 + company fees $6.68 + taxes $2.32 = $44/mo. Invoice Sep 2025.", type:"Phone", costType:"actual" },
  { id:"ph-gas-01", operator:"op-highlands", location:"loc-gaston", subLocation:"Front Desk",        provider:"GoTo", extension:"1001", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2fe7582", publicIp:"99.38.185.138", privateIp:"192.168.1.113",lineType:"Desk phone",              status:"Ready",       lastProvisioned:"2026-05-17", routeTo:"3333: Call Flow", carrier:"PSTN", dids:[{number:"+18032658412",assignedTo:"Front Desk",numberSource:"PSTN",numberType:"Regular",externalCallerId:"HSL Gaston"}], notes:"Main line: 803-265-8412" , avgMonthlyCost:"21.72", mrcNotes:"GoTo seat $18.00 + fees $3.41 + DID $0.50 + min DID fee share $0.19. Invoice IN7105361191 May 2026. Main line.", type:"Phone", costType:"actual" },
  { id:"ph-gas-02", operator:"op-highlands", location:"loc-gaston", subLocation:"Executive Director (Krissy)", provider:"GoTo", extension:"1002", make:"Yealink", model:"SIP-T34W", serial:"401037H0600017688", macAddress:"44dbd2fe7652", publicIp:"99.38.185.138", privateIp:"192.168.1.109",lineType:"Desk phone",              status:"Ready",       lastProvisioned:"2026-05-17", routeTo:"1002: Executive Director", carrier:"PSTN", dids:[], notes:"Krissy ED office phone. Serial 401037H0600017688 from rear sticker (May 2026 on-site photo).", avgMonthlyCost:"21.41", mrcNotes:"GoTo seat $18.00 + fees $3.41. Invoice IN7105361191 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-gas-03", operator:"op-highlands", location:"loc-gaston", subLocation:"Business Office",    provider:"GoTo", extension:"1003", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2fe87f4", publicIp:"99.38.185.138", privateIp:"192.168.1.75", lineType:"Desk phone",              status:"Ready",       lastProvisioned:"2026-05-14", routeTo:"1003: Business Office",    carrier:"PSTN", dids:[], notes:"", avgMonthlyCost:"21.41", mrcNotes:"GoTo seat $18.00 + fees $3.41. Invoice IN7105361191 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-gas-04", operator:"op-highlands", location:"loc-gaston", subLocation:"AL Med Room",        provider:"GoTo", extension:"1004", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2fe8af1", publicIp:"99.38.185.138", privateIp:"192.168.1.110",lineType:"Desk phone",              status:"Ready",       lastProvisioned:"2026-05-15", routeTo:"1004: AL Med Room",        carrier:"PSTN", dids:[], notes:"", avgMonthlyCost:"21.41", mrcNotes:"GoTo seat $18.00 + fees $3.41. Invoice IN7105361191 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-gas-05", operator:"op-highlands", location:"loc-gaston", subLocation:"MC Med Room",        provider:"GoTo", extension:"1005", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2fe9cd1", publicIp:"99.38.185.138", privateIp:"192.168.1.116",lineType:"Desk phone",              status:"Ready",       lastProvisioned:"2026-05-17", routeTo:"1005: MC Med Room",        carrier:"PSTN", dids:[], notes:"", avgMonthlyCost:"21.41", mrcNotes:"GoTo seat $18.00 + fees $3.41. Invoice IN7105361191 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-gas-06", operator:"op-highlands", location:"loc-gaston", subLocation:"Kitchen",            provider:"GoTo", extension:"1006", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2fe9e65", publicIp:"99.38.185.138", privateIp:"192.168.1.173",lineType:"Desk phone",              status:"Ready",       lastProvisioned:"2026-05-17", routeTo:"1006: Kitchen",            carrier:"PSTN", dids:[], notes:"", avgMonthlyCost:"21.41", mrcNotes:"GoTo seat $18.00 + fees $3.41. Invoice IN7105361191 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-gas-07", operator:"op-highlands", location:"loc-gaston", subLocation:"RCC Office",         provider:"GoTo", extension:"1007", make:"Yealink", model:"SIP-T34W", macAddress:"44dbd2feb9c8", publicIp:"99.38.185.138", privateIp:"192.168.1.114",lineType:"Desk phone",              status:"Ready",       lastProvisioned:"2026-05-16", routeTo:"1007: RCC Office",         carrier:"PSTN", dids:[], notes:"", avgMonthlyCost:"21.41", mrcNotes:"GoTo seat $18.00 + fees $3.41. Invoice IN7105361191 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-gas-08", operator:"op-highlands", location:"loc-gaston", subLocation:"Fax",                provider:"GoTo", extension:"1008", make:"Grandstream", model:"HT801",   macAddress:"ec74d729d6cb", publicIp:"",              privateIp:"",             lineType:"Analog telephone adapter", status:"Unavailable", lastProvisioned:"",           routeTo:"1008: FAX ATA",            carrier:"PSTN", dids:[{number:"+18033050322",assignedTo:"FAX ATA",numberSource:"PSTN",numberType:"Regular",externalCallerId:"HSL Gaston"}], notes:"Manually Provisioned" , avgMonthlyCost:"21.72", mrcNotes:"GoTo ATA seat $18.00 + fees $3.41 + DID $0.50 + min DID fee share. Invoice IN7105361191 May 2026. FAX line.", type:"Phone", costType:"actual" },
  { id:"ph-rome-com-01", operator:"op-highlands", location:"loc-rome", subLocation:"", provider:"Comcast", extension:"", make:"Samsung", model:"Digital (Comcast legacy)", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+17068020541",assignedTo:"Main",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands Senior Living"}], notes:"Comcast Mobility Line. Bundle cbc-rome. Caller ID display name: Highlands.", avgMonthlyCost:"24.25", mrcNotes:"Comcast voice line (8220160110667101). Voice portion $97.00/4 lines = $24.25/line. See cbc-rome-voice contract.", type:"Phone", costType:"actual" },
  { id:"ph-rome-com-02", operator:"op-highlands", location:"loc-rome", subLocation:"", provider:"Comcast", extension:"", make:"Samsung", model:"Digital (Comcast legacy)", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+17062328661",assignedTo:"",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands Senior Living"}], notes:"Comcast Mobility Line. Bundle cbc-rome.", avgMonthlyCost:"24.25", mrcNotes:"Comcast voice line (8220160110667101). Voice portion $97.00/4 lines = $24.25/line. See cbc-rome-voice contract.", type:"Phone", costType:"actual" },
  { id:"ph-rome-com-03", operator:"op-highlands", location:"loc-rome", subLocation:"", provider:"Comcast", extension:"", make:"Samsung", model:"Digital (Comcast legacy)", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+17062047093",assignedTo:"",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands Senior Living"}], notes:"Comcast Mobility Line. Bundle cbc-rome.", avgMonthlyCost:"24.25", mrcNotes:"Comcast voice line (8220160110667101). Voice portion $97.00/4 lines = $24.25/line. See cbc-rome-voice contract.", type:"Phone", costType:"actual" },
  { id:"ph-rome-com-04", operator:"op-highlands", location:"loc-rome", subLocation:"", provider:"Comcast", extension:"", make:"Samsung", model:"Digital (Comcast legacy)", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+17062328662",assignedTo:"",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands Senior Living"}], notes:"Comcast Mobility Line. Bundle cbc-rome.", avgMonthlyCost:"24.25", mrcNotes:"Comcast voice line (8220160110667101). Voice portion $97.00/4 lines = $24.25/line. See cbc-rome-voice contract.", type:"Phone", costType:"actual" },
  { id:"ph-rome-01", operator:"op-highlands", location:"loc-rome", subLocation:"Admin",              provider:"GoTo", extension:"1001", make:"Poly", model:"VVX 450", macAddress:"64167fe95e18", publicIp:"50.246.10.234", privateIp:"10.70.1.246", lineType:"Desk phone", status:"Ready",       lastProvisioned:"2026-05-17", routeTo:"1006: Main",                  carrier:"PSTN", dids:[{number:"+17068020990",assignedTo:"Main Line",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands Rome"}], notes:"Main line: 706-802-0990" , avgMonthlyCost:"21.36", mrcNotes:"GoTo seat $18.00 + fees $2.86 + DID $0.50. Invoice IN7105333077 May 2026. Main line.", type:"Phone", costType:"actual" },
  { id:"ph-rome-02", operator:"op-highlands", location:"loc-rome", subLocation:"Business Office Mgr", provider:"GoTo", extension:"1002", make:"Poly", model:"VVX 450", macAddress:"64167fe95e2c", publicIp:"50.246.10.234", privateIp:"10.70.1.17",  lineType:"Desk phone", status:"Ready",       lastProvisioned:"2026-05-13", routeTo:"1002: BOM BOM",               carrier:"PSTN", dids:[], notes:"", avgMonthlyCost:"20.86", mrcNotes:"GoTo seat $18.00 + fees $2.86. Invoice IN7105333077 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-rome-03", operator:"op-highlands", location:"loc-rome", subLocation:"RCC Office",          provider:"GoTo", extension:"1003", make:"Poly", model:"VVX 450", macAddress:"64167fecdb87", publicIp:"50.246.10.234", privateIp:"10.70.1.227", lineType:"Desk phone", status:"Ready",       lastProvisioned:"2026-05-17", routeTo:"1003: RCC RCC",               carrier:"PSTN", dids:[], notes:"", avgMonthlyCost:"20.86", mrcNotes:"GoTo seat $18.00 + fees $2.86. Invoice IN7105333077 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-rome-04", operator:"op-highlands", location:"loc-rome", subLocation:"Nurse Station B",     provider:"GoTo", extension:"1004", make:"Poly", model:"VVX 450", macAddress:"64167fecd389", publicIp:"50.246.10.234", privateIp:"10.70.1.75",  lineType:"Desk phone", status:"Ready",       lastProvisioned:"2026-05-17", routeTo:"1004: Nurse Station B Side",  carrier:"PSTN", dids:[{number:"+17062914135",assignedTo:"Nurse Station B",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands Rome"}], notes:"" , avgMonthlyCost:"21.36", mrcNotes:"GoTo seat $18.00 + fees $2.86 + DID $0.50. Invoice IN7105333077 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-rome-05", operator:"op-highlands", location:"loc-rome", subLocation:"Nurse Station A",     provider:"GoTo", extension:"1005", make:"Poly", model:"VVX 450", macAddress:"64167fecd2e4", publicIp:"50.246.10.234", privateIp:"10.70.1.47",  lineType:"Desk phone", status:"Ready",       lastProvisioned:"2026-05-12", routeTo:"1005: Nurse Station A Side",  carrier:"PSTN", dids:[{number:"+17062914136",assignedTo:"Nurse Station A",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands Rome"}], notes:"" , avgMonthlyCost:"21.36", mrcNotes:"GoTo seat $18.00 + fees $2.86 + DID $0.50. Invoice IN7105333077 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-rome-06", operator:"op-highlands", location:"loc-rome", subLocation:"Unassigned",          provider:"GoTo", extension:"",     make:"Yealink", model:"SIP-T34W", macAddress:"c4fc22072c15", publicIp:"50.246.10.234", privateIp:"",           lineType:"Desk phone", status:"Unavailable", lastProvisioned:"2026-02-10", routeTo:"2007: MADN",                  carrier:"PSTN", dids:[{number:"+17062344341",assignedTo:"MADN",numberSource:"PSTN",numberType:"Regular",externalCallerId:"", avgMonthlyCost:"47.11", mrcNotes:"GoTo seat $18.00 + fees $2.86 + equipment rental $26.25. Invoice IN7105333077 May 2026. Needs activation." },{number:"+17062344342",assignedTo:"MADN",numberSource:"PSTN",numberType:"Regular",externalCallerId:""}], notes:"Needs activation", type:"Phone", costType:"actual" },
  { id:"ph-fc-01", operator:"op-highlands", location:"loc-forestcity", subLocation:"",    provider:"GoTo", extension:"1001", make:"Yealink", model:"SIP-T34W", macAddress:"c4fc221762f6", publicIp:"153.66.97.237", privateIp:"192.168.1.101",lineType:"Desk phone",              status:"Ready",           lastProvisioned:"2026-05-16", routeTo:"1001: c4fc221762f6", carrier:"PSTN", dids:[{number:"+18282226241",assignedTo:"Ext 1001",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"Needs proper name in GoTo" , avgMonthlyCost:"21.72", mrcNotes:"GoTo seat $18.00 + fees est. $3.41 + DID $0.50 (Gaston rate basis). Est. from IN7105361191 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-fc-02", operator:"op-highlands", location:"loc-forestcity", subLocation:"",    provider:"GoTo", extension:"1002", make:"Yealink", model:"SIP-T34W", macAddress:"c4fc22355b12", publicIp:"153.66.97.237", privateIp:"192.168.1.191",lineType:"Desk phone",              status:"Ready",           lastProvisioned:"2026-05-16", routeTo:"1002: c4fc22355b12", carrier:"PSTN", dids:[{number:"+18282226240",assignedTo:"Ext 1002",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"Needs proper name in GoTo" , avgMonthlyCost:"21.72", mrcNotes:"GoTo seat $18.00 + fees est. $3.41 + DID $0.50 (Gaston rate basis). Est. from IN7105361191 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-fc-03", operator:"op-highlands", location:"loc-forestcity", subLocation:"Fax", provider:"GoTo", extension:"1009", make:"Poly",    model:"ATA 400",  macAddress:"ec74d7c87eba", publicIp:"",              privateIp:"192.168.1.124",lineType:"Analog telephone adapter", status:"Needs Attention", lastProvisioned:"",           routeTo:"1009: FAX Machine",  carrier:"PSTN", dids:[{number:"+18282226271",assignedTo:"FAX Machine",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Highlands SL"}], notes:"FAX line: 828-222-6271" , avgMonthlyCost:"21.72", mrcNotes:"GoTo ATA seat $18.00 + fees est. $3.41 + DID $0.50 (Gaston rate basis). Est. FAX line.", type:"Phone", costType:"actual" },
  { id:"ph-cart-01", operator:"op-highlands", location:"loc-cartersville", subLocation:"Main Office", provider:"Comcast", extension:"", make:"Samsung", model:"Digital (Comcast Samsung switch)", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+17703828989",assignedTo:"Main line",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Felton Manor"}], notes:"Comcast Mobility Line 1. Caller ID: Felton Manor. Part of Comcast bundle (cbc-cart $444.90/mo).", avgMonthlyCost:"26.99", mrcNotes:"Comcast voice line (OID-0012407729). Voice portion $134.95/5 lines = $26.99/line. Part of cbc-cart-voice contract.", type:"Phone", costType:"actual" },
  { id:"ph-cart-02", operator:"op-highlands", location:"loc-cartersville", subLocation:"Main Office", provider:"Comcast", extension:"", make:"Samsung", model:"Digital (Comcast Samsung switch)", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+17703867847",assignedTo:"",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Felton Manor"}], notes:"Comcast Mobility Line 2. Part of Comcast bundle (cbc-cart $444.90/mo).", avgMonthlyCost:"26.99", mrcNotes:"Comcast voice line (OID-0012407729). Voice portion $134.95/5 lines = $26.99/line. Part of cbc-cart-voice contract.", type:"Phone", costType:"actual" },
  { id:"ph-cart-03", operator:"op-highlands", location:"loc-cartersville", subLocation:"Main Office", provider:"Comcast", extension:"", make:"Samsung", model:"Digital (Comcast Samsung switch)", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+17706061141",assignedTo:"",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Felton Manor"}], notes:"Comcast Mobility Line 3. Part of Comcast bundle (cbc-cart $444.90/mo).", avgMonthlyCost:"26.99", mrcNotes:"Comcast voice line (OID-0012407729). Voice portion $134.95/5 lines = $26.99/line. Part of cbc-cart-voice contract.", type:"Phone", costType:"actual" },
  { id:"ph-cart-04", operator:"op-highlands", location:"loc-cartersville", subLocation:"Main Office", provider:"Comcast", extension:"", make:"Samsung", model:"Digital (Comcast Samsung switch)", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+14702277954",assignedTo:"",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Felton Manor"}], notes:"Comcast Mobility Line 4. Part of Comcast bundle (cbc-cart $444.90/mo).", avgMonthlyCost:"26.99", mrcNotes:"Comcast voice line (OID-0012407729). Voice portion $134.95/5 lines = $26.99/line. Part of cbc-cart-voice contract.", type:"Phone", costType:"actual" },
  { id:"ph-cart-05", operator:"op-highlands", location:"loc-cartersville", subLocation:"Main Office", provider:"Comcast", extension:"", make:"Samsung", model:"Digital (Comcast Samsung switch)", macAddress:"", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Active", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+14703154320",assignedTo:"Directory listing",numberSource:"PSTN",numberType:"Regular",externalCallerId:"Felton Manor"}], notes:"Comcast Mobility Line 5 (directory listing number). Part of Comcast bundle (cbc-cart $444.90/mo).", avgMonthlyCost:"26.99", mrcNotes:"Comcast voice line (OID-0012407729). Voice portion $134.95/5 lines = $26.99/line. Part of cbc-cart-voice contract.", type:"Phone", costType:"actual" },
  { id:"ph-cart-m01", operator:"op-highlands", location:"loc-cartersville", subLocation:"", provider:"T-Mobile", extension:"", make:"", model:"Samsung Galaxy S25 - Icy Blue 128GB", macAddress:"", publicIp:"", privateIp:"", lineType:"Mobile", status:"Active", lastProvisioned:"", routeTo:"", carrier:"T-Mobile", dids:[{number:"+16782804394",assignedTo:"",numberSource:"PSTN",numberType:"Mobile",externalCallerId:"Highlands Senior Living"}], notes:"T-Mobile Bus Unl Select Promo AAL. Galaxy S25 Icy Blue. EIP 7/24, $566.61 balance. Invoice 987665350-39 Mar 2026.", avgMonthlyCost:"36.47", mrcNotes:"T-Mobile AAL $30 + tax $6.47. Invoice 987665350-39 Mar 2026. Galaxy S25 on EIP separate.", type:"Phone", costType:"actual" },
  { id:"ph-cart-m02", operator:"op-highlands", location:"loc-cartersville", subLocation:"", provider:"T-Mobile", extension:"", make:"", model:"Samsung Galaxy S25 - Navy 128GB", macAddress:"", publicIp:"", privateIp:"", lineType:"Mobile", status:"Active", lastProvisioned:"", routeTo:"", carrier:"T-Mobile", dids:[{number:"+16782804670",assignedTo:"",numberSource:"PSTN",numberType:"Mobile",externalCallerId:"Highlands Senior Living"}], notes:"T-Mobile Bus Unl Select Promo AAL. Galaxy S25 Navy. EIP 7/24, $566.61 balance. Invoice 987665350-39 Mar 2026.", avgMonthlyCost:"36.47", mrcNotes:"T-Mobile AAL $30 + tax $6.47. Invoice 987665350-39 Mar 2026. Galaxy S25 on EIP separate.", type:"Phone", costType:"actual" },
  { id:"ph-cart-m03", operator:"op-highlands", location:"loc-cartersville", subLocation:"", provider:"T-Mobile", extension:"", make:"", model:"", macAddress:"", publicIp:"", privateIp:"", lineType:"Mobile", status:"Active", lastProvisioned:"", routeTo:"", carrier:"T-Mobile", dids:[{number:"+16789388669",assignedTo:"",numberSource:"PSTN",numberType:"Mobile",externalCallerId:"Highlands Senior Living"}], notes:"T-Mobile Bus Unl Select Promo (pool). 321 min Mar 2026. Invoice 987665350-39.", avgMonthlyCost:"36.33", mrcNotes:"T-Mobile pool line $30 + tax $6.33. 4-line pool $120 shared. Invoice 987665350-39 Mar 2026.", type:"Phone", costType:"actual" },
  { id:"ph-cart-m04", operator:"op-highlands", location:"loc-cartersville", subLocation:"", provider:"T-Mobile", extension:"", make:"", model:"", macAddress:"", publicIp:"", privateIp:"", lineType:"Mobile", status:"Active", lastProvisioned:"", routeTo:"", carrier:"T-Mobile", dids:[{number:"+17702315912",assignedTo:"",numberSource:"PSTN",numberType:"Mobile",externalCallerId:"Highlands Senior Living"}], notes:"T-Mobile Bus Unl Select Promo (pool). 4,044 min Mar 2026 — heavy usage. Invoice 987665350-39.", avgMonthlyCost:"36.33", mrcNotes:"T-Mobile pool line $30 + tax $6.33. Invoice 987665350-39 Mar 2026.", type:"Phone", costType:"actual" },
  { id:"ph-cart-m05", operator:"op-highlands", location:"loc-cartersville", subLocation:"", provider:"T-Mobile", extension:"", make:"", model:"", macAddress:"", publicIp:"", privateIp:"", lineType:"Mobile", status:"Active", lastProvisioned:"", routeTo:"", carrier:"T-Mobile", dids:[{number:"+17703183124",assignedTo:"",numberSource:"PSTN",numberType:"Mobile",externalCallerId:"Highlands Senior Living"}], notes:"T-Mobile Bus Unl Select Promo (pool). 305 min, 1,735 texts Mar 2026. Invoice 987665350-39.", avgMonthlyCost:"36.33", mrcNotes:"T-Mobile pool line $30 + tax $6.33. Invoice 987665350-39 Mar 2026.", type:"Phone", costType:"actual" },
  { id:"ph-cart-m06", operator:"op-highlands", location:"loc-cartersville", subLocation:"", provider:"T-Mobile", extension:"", make:"", model:"", macAddress:"", publicIp:"", privateIp:"", lineType:"Mobile", status:"Active", lastProvisioned:"", routeTo:"", carrier:"T-Mobile", dids:[{number:"+17705486638",assignedTo:"Annmarie Pasmore",numberSource:"PSTN",numberType:"Mobile",externalCallerId:"Highlands Senior Living"}], notes:"T-Mobile Bus Unl Select Promo (pool). 2,097 min Mar 2026 — Annmarie Pasmore (billing contact). Invoice 987665350-39.", avgMonthlyCost:"36.33", mrcNotes:"T-Mobile pool line $30 + tax $6.33. Invoice 987665350-39 Mar 2026.", type:"Phone", costType:"actual" },
  { id:"ph-nor-01", operator:"op-highlands", location:"loc-norcross", subLocation:"Front Desk",        provider:"8x8", extension:"630", make:"Polycom", model:"VVX 411", macAddress:"64-16-7f-xx-xx-xx", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+14702733336",assignedTo:"Front Desk",numberSource:"Claim",numberType:"Regular",externalCallerId:"Disabled", avgMonthlyCost:"34.51", mrcNotes:"8x8 X1 seat $15 + tax $4.51 + 3 extra DIDs $15. Invoice 9866592 May 2026. 5 DIDs on this phone (1 incl, 4 extra: 3×$5+1×$0)." },{number:"+14702736881",assignedTo:"Front Desk",numberSource:"Claim",numberType:"Regular",externalCallerId:"Disabled"},{number:"+16785140629",assignedTo:"Front Desk",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled"},{number:"+16785140639",assignedTo:"Front Desk",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled"},{number:"+17703680292",assignedTo:"Front Desk",numberSource:"Port",numberType:"Regular",externalCallerId:"Enabled - Highlands"}], notes:"Multiple DIDs routed to ext 630", activationCode:"002763360...", type:"Phone", costType:"actual" },
  { id:"ph-nor-02", operator:"op-highlands", location:"loc-norcross", subLocation:"Steve Brooks",       provider:"8x8", extension:"631", make:"Polycom", model:"VVX 411", macAddress:"64-16-7f-xx-xx-xx", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+16785140631",assignedTo:"Steve Brooks",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled"}], notes:"", activationCode:"" , avgMonthlyCost:"19.51", mrcNotes:"8x8 X1 seat $15 + tax $4.51. Invoice 9866592 May 2026. 1 DID included in plan.", type:"Phone", costType:"actual" },
  { id:"ph-nor-03", operator:"op-highlands", location:"loc-norcross", subLocation:"Jenohn Carter",      provider:"8x8", extension:"632", make:"Polycom", model:"VVX 411", macAddress:"64-16-7f-xx-xx-xx", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+16785140632",assignedTo:"Jenohn Carter",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled - Display: Joy...", avgMonthlyCost:"20.51", mrcNotes:"8x8 X1 seat $15 + tax $4.51 + 1 extra DID $1. Invoice 9866592 May 2026. Fax DID extra." },{number:"+16788468343",assignedTo:"Jenohn Carter",numberSource:"Claim",numberType:"Regular",externalCallerId:"Disabled"}], notes:"Fax DID: 678-846-8343", activationCode:"012381800...", type:"Phone", costType:"actual" },
  { id:"ph-nor-04", operator:"op-highlands", location:"loc-norcross", subLocation:"Joy Hope",           provider:"8x8", extension:"633", make:"Polycom", model:"VVX 411", macAddress:"64-16-7f-xx-xx-xx", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+16785140633",assignedTo:"Joy Hope",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled - Display: Com..."}], notes:"", activationCode:"320017430..." , avgMonthlyCost:"19.51", mrcNotes:"8x8 X1 seat $15 + tax $4.51. Invoice 9866592 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-nor-05", operator:"op-highlands", location:"loc-norcross", subLocation:"Wellness Director",  provider:"8x8", extension:"634", make:"Polycom", model:"VVX 411", macAddress:"64-16-7f-xx-xx-xx", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+16785140634",assignedTo:"Wellness Director",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled - Display: Marl..."}], notes:"", activationCode:"223528730..." , avgMonthlyCost:"19.51", mrcNotes:"8x8 X1 seat $15 + tax $4.51. Invoice 9866592 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-nor-06", operator:"op-highlands", location:"loc-norcross", subLocation:"Manny Tero",         provider:"8x8", extension:"635", make:"Polycom", model:"VVX 411", macAddress:"64-16-7f-xx-xx-xx", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+16785140635",assignedTo:"Manny Tero",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled - Display: Ed K..."}], notes:"", activationCode:"522528070..." , avgMonthlyCost:"19.51", mrcNotes:"8x8 X1 seat $15 + tax $4.51. Invoice 9866592 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-nor-07", operator:"op-highlands", location:"loc-norcross", subLocation:"Wellness Center",    provider:"8x8", extension:"636", make:"Polycom", model:"VVX 411", macAddress:"64-16-7f-xx-xx-xx", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+16785140636",assignedTo:"Wellness Center",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled - Display: Well..."}], notes:"", activationCode:"042956200..." , avgMonthlyCost:"19.51", mrcNotes:"8x8 X1 seat $15 + tax $4.51. Invoice 9866592 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-nor-08", operator:"op-highlands", location:"loc-norcross", subLocation:"AL Medroom",         provider:"8x8", extension:"637", make:"Polycom", model:"VVX 411", macAddress:"64-16-7f-xx-xx-xx", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+16785140637",assignedTo:"AL Medroom",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled - Display: Acti..."}], notes:"", activationCode:"290723830..." , avgMonthlyCost:"19.51", mrcNotes:"8x8 X1 seat $15 + tax $4.51. Invoice 9866592 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-nor-09", operator:"op-highlands", location:"loc-norcross", subLocation:"Copy Room",          provider:"8x8", extension:"638", make:"Polycom", model:"VVX 411", macAddress:"64-16-7f-xx-xx-xx", publicIp:"", privateIp:"", lineType:"Desk phone", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+16785140638",assignedTo:"Copy Room",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled"}], notes:"", activationCode:"838283200..." , avgMonthlyCost:"19.51", mrcNotes:"8x8 X1 seat $15 + tax $4.51. Invoice 9866592 May 2026.", type:"Phone", costType:"actual" },
  { id:"ph-nor-10", operator:"op-highlands", location:"loc-norcross", subLocation:"Conference Bridge",  provider:"8x8", extension:"699", make:"",        model:"Ring Group", macAddress:"", publicIp:"", privateIp:"", lineType:"Ring group", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+16785140640",assignedTo:"Conference Bridge",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled - Display: Una..."}], notes:"Ring group - not a physical device", activationCode:"" , avgMonthlyCost:"29.51", mrcNotes:"8x8 X2 seat $25 + tax $4.51. Invoice 9866592 May 2026. Ring group/Conference Bridge.", type:"Phone", costType:"actual" },
  { id:"ph-nor-11", operator:"op-highlands", location:"loc-norcross", subLocation:"Fax Machine",        provider:"8x8", extension:"100", make:"Obihai",  model:"OBi 300 1 port SIP ATA", macAddress:"9c-ad-ef-xx-xx-xx", publicIp:"", privateIp:"", lineType:"Analog telephone adapter", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[{number:"+17704494222",assignedTo:"Fax Machine",numberSource:"Port",numberType:"Regular",externalCallerId:"Disabled"}], notes:"Site: Norcross-HolcombBridge", activationCode:"140163390..." , avgMonthlyCost:"19.51", mrcNotes:"8x8 X1 seat $15 + tax $4.51. Invoice 9866592 May 2026. ATA fax device.", type:"Phone", costType:"actual" },
  { id:"ph-col-01", operator:"op-highlands", location:"loc-columbia", subLocation:"", provider:"AT&T", extension:"", make:"", model:"", macAddress:"", publicIp:"", privateIp:"", lineType:"Analog", status:"Active", lastProvisioned:"", routeTo:"", carrier:"AT&T", dids:[{number:"+18037867411",assignedTo:"",numberSource:"AT&T",numberType:"Regular",externalCallerId:""}], notes:"AT&T acct 337883844. $41.62/mo." , avgMonthlyCost:"41.62", mrcNotes:"AT&T analog line. $124.87 total / 3 lines = $41.62/line. Part of att-col contract $274.67/mo (incl. internet).", type:"Phone", costType:"actual" },
  { id:"ph-col-02", operator:"op-highlands", location:"loc-columbia", subLocation:"", provider:"AT&T", extension:"", make:"", model:"", macAddress:"", publicIp:"", privateIp:"", lineType:"Analog", status:"Active", lastProvisioned:"", routeTo:"", carrier:"AT&T", dids:[{number:"+18037867021",assignedTo:"",numberSource:"AT&T",numberType:"Regular",externalCallerId:""}], notes:"AT&T acct 337883844. $41.62/mo." , avgMonthlyCost:"41.62", mrcNotes:"AT&T analog line. $124.87 total / 3 lines = $41.62/line. Part of att-col contract $274.67/mo (incl. internet).", type:"Phone", costType:"actual" },
  { id:"ph-col-03", operator:"op-highlands", location:"loc-columbia", subLocation:"", provider:"AT&T", extension:"", make:"", model:"", macAddress:"", publicIp:"", privateIp:"", lineType:"Analog", status:"Active", lastProvisioned:"", routeTo:"", carrier:"AT&T", dids:[{number:"+18037867276",assignedTo:"",numberSource:"AT&T",numberType:"Regular",externalCallerId:""}], notes:"AT&T acct 337883844. $41.62/mo." , avgMonthlyCost:"41.62", mrcNotes:"AT&T analog line. $124.87 total / 3 lines = $41.62/line. Part of att-col contract $274.67/mo (incl. internet).", type:"Phone", costType:"actual" },
  { id:"ph-nor-12", operator:"op-highlands", location:"loc-norcross", subLocation:"Fax Machine (handset)", provider:"8x8", extension:"100", make:"Obihai", model:"OBi Handset", macAddress:"", publicIp:"", privateIp:"", lineType:"Analog telephone adapter", status:"Activated", lastProvisioned:"", routeTo:"", carrier:"PSTN", dids:[], notes:"Site: Norcross-HolcombBridge - paired with OBi 300 ATA", activationCode:"", avgMonthlyCost:"0.00", mrcNotes:"8x8 paired OBi handset — no separate seat charge. Shares ext 100 with OBi 300 ATA.", type:"Phone", costType:"actual" },
];



const SEED_VENDORS = [
  // ── ISPs ──────────────────────────────────────────────────────────────────────
  { id:"v001",  operator:"op-highlands", name:"Comcast Business",                category:"ISP",               billingCadence:"Monthly",      contactName:"", phone:"1-800-391-3000", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://business.comcast.com", urlSupport:"https://business.comcast.com/support", urlPortal:"https://login.comcast.net", bills:[], contracts:[
    {id:"cbc-cart-isp",   locationId:"loc-cartersville", description:"Internet — Cartersville (Comcast Gigabit Extra bundle)", accountNumber:"8220210501095543", startDate:"", endDate:"", monthlyAmount:"309.95", notes:"OID-0012407729. ISP portion of bundle: Internet Gigabit Extra $240 + Connection Pro $20 + Equip $10 + Battery $10 + Static IP $29.95 = $309.95/mo pre-tax. 24-month term. Annmarie Pasmore (770)548-6638 anne@highlands.care."},
    {id:"cbc-cart-voice", locationId:"loc-cartersville", description:"Voice — Cartersville (5 Comcast Mobility Lines)",          accountNumber:"8220210501095543", startDate:"", endDate:"", monthlyAmount:"134.95", notes:"OID-0012407729. Voice portion: 4 additional Mobility Lines $100 + Equipment Fee $34.95 = $134.95/mo pre-tax. 5 total lines: (770)606-1141, (470)227-7954, (770)382-8989, (770)386-7847, (470)315-4320. $26.99/line avg. Caller ID: Felton Manor. Samsung digital phones on legacy Comcast switch."},
    {id:"cbc-rome-isp",   locationId:"loc-rome", description:"Internet — Rome (Comcast Advanced + Static IP-5)", accountNumber:"8220160110667101", startDate:"", endDate:"", monthlyAmount:"207.90", notes:"Rome ISP portion. Invoice 8220160110667101 Apr 2026. Bundled Internet Advanced+SecurityEdge: $294 - $154 discount + equip $27.95 = $167.95. Static IP-5: $39.95. Total ISP: $207.90/mo pre-tax. Attn: Joy Hope. ⚠️ PAST DUE $332.64 — late fee $15."},
    {id:"cbc-rome-voice", locationId:"loc-rome", description:"Voice — Rome (4 Comcast Mobility Lines)",         accountNumber:"8220160110667101", startDate:"", endDate:"", monthlyAmount:"97.00",  notes:"Rome voice portion. 3 Mobility Lines $75.00 (3×$25 after bundle discount) + Service fees $22.00 (Directory Listing Mgmt $11 + Voice Network Investment $11) = $97.00/mo. 4 lines: (706)802-0541, (706)232-8661, (706)204-7093, (706)232-8662. $24.25/line avg. Samsung digital phones on legacy Comcast switch."},
    {id:"cbc-nor-isp", locationId:"loc-norcross", description:"Internet — Norcross (Comcast Business Advanced + Static IP)", accountNumber:"8220133050478318", startDate:"", endDate:"", monthlyAmount:"207.90", notes:"Norcross ISP portion. Invoice 8220133050478318 May 2026. Data+SecurityEdge: $279 - $134 discount = $145 net + Static IP $34.95 + equip $27.95 = $207.90/mo pre-tax. Billing: Highlands Norcross SL LLC, Attn Ramesh Ramchandran. Support 470-489-2100."},
    {id:"cbc-nor-tv",  locationId:"loc-norcross", description:"TV — Norcross (Comcast Business TV)",                    accountNumber:"8220133050478318", startDate:"", endDate:"", monthlyAmount:"276.45", notes:"Norcross TV portion. Invoice 8220133050478318 May 2026. TV Standard $124.95 + Sports+Entertainment $34.95 + TV Box+Remote $11.95 + 4×additional boxes $47.80 + 1×TV Adapter $11.95 + Broadcast TV Fee $40.15 + Regional Sports Fee $4.70 = $276.45/mo. Note: FanDuel Sports Network no longer available as of May 7 2026."},
    {id:"cbc-jeff", locationId:"loc-jefferson",    description:"Internet Dedicated — Jefferson (Ethernet 1Gbps/100Mbps)", accountNumber:"708900956", startDate:"", endDate:"", monthlyAmount:"417.25", notes:"Comcast Business Ethernet Dedicated Internet. Acct 708900956, Invoice 001004142546 May 2026. Port 1Gbps, Basic Bandwidth 100Mbps. Circuit ID: 30.VLXP.114407..CBCL.. Port ID: 30.KRGS.092864..CBCL.. Monthly $399.95 + taxes $17.30 = $417.25. ⚠️ PAST DUE as of May 2026 invoice — previous balance $429.11 unpaid."},
  ], notes:"Cartersville acct 8220210501095543: ISP $309.95 (cbc-cart-isp) + Voice $134.95 (cbc-cart-voice) = $444.90/mo. Norcross (8220133050478318, $505.85/mo ISP+TV). Jefferson (708900956, $417.25/mo Ethernet Dedicated). Rome (8220160110667101, $347.51/mo ISP+Voice, ⚠️ past due). Total est. MRC: $1,715.51/mo." },
  { id:"v002",  operator:"op-highlands", name:"AT&T",                            category:"ISP",               billingCadence:"Monthly",      contactName:"", phone:"1-800-288-2020", email:"", accountNumber:"337883844", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.att.com/smallbusiness/", urlSupport:"https://www.att.com/support/", urlPortal:"https://www.att.com/my/#/", bills:[], contracts:[
    {id:"att-col", locationId:"loc-columbia", description:"Internet + Phone — Columbia", accountNumber:"337883844", startDate:"", endDate:"", monthlyAmount:"274.67", notes:"Internet 25 $110/mo + Static IP $30/mo + fees = $149.80/mo. 3 phone lines $30/ea + fees = $124.87/mo. Total $274.67/mo. Late payment Apr 2026 — AutoPay enabled."},
    {id:"att-gas-isp", locationId:"loc-gaston", description:"Internet 50 + Phone — Gaston",   accountNumber:"151834264",  startDate:"", endDate:"", monthlyAmount:"146.26", notes:"AT&T Gaston — Highlands Senior Living. Acct 151834264, Sep 2025. Internet 50 $60 + $4.20 fee = $64.20. Phone: (803)955-0453 unlimited $30 + (803)755-8333 $30 + fees $22.06 = $82.06. Total $146.26/mo. AutoPay bank acct, Oct 19."},
    {id:"att-gas-mob", locationId:"loc-gaston", description:"AT&T Wireless — Gaston (Rapha)", accountNumber:"287319845202", startDate:"", endDate:"", monthlyAmount:"44.00",  notes:"AT&T Mobility. Acct 287319845202, Foundation Acct 61488640, Sep 2025. Billing: Rapha Residential Care, 3959 Fish Hatchery Rd, Gaston SC 29053. 1 line: (803)908-7087, Mobile Select 1GB Pool Smartphone $35 + fees/taxes $9 = $44/mo. AutoPay bank, Oct 20."},
  ], notes:"Columbia acct 337883844. Also ISP for Gaston (separate acct). AutoPay set up Apr 2026." },
  { id:"v003",  operator:"op-highlands", name:"Starlink",                        category:"ISP",               billingCadence:"Monthly",      contactName:"Ramesh Ram", phone:"", email:"support@starlink.com", accountNumber:"ACC-6553933-40065-14", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.starlink.com", urlSupport:"https://support.starlink.com", urlPortal:"https://www.starlink.com/account", bills:[], contracts:[
    {id:"sl-fc", locationId:"loc-forestcity", description:"Starlink Residential Max — Forest City", accountNumber:"ACC-6553933-40065-14", startDate:"", endDate:"", monthlyAmount:"120.00", notes:"Residential Max plan $120/mo. Invoice INV-DF-US-VV7HN437JMCAD9YYM8 May 2026. Kit serial KIT402564062XSF. Contact: Ramesh Ram, 2270 Oakland Rd, Forest City NC 28043."},
  ], notes:"ISP: Forest City (primary, Residential Max $120/mo, acct ACC-6553933-40065-14). Jefferson (backup WAN, no separate invoice)." },
  // ── VoIP ──────────────────────────────────────────────────────────────────────
  { id:"v004",  operator:"op-highlands", name:"GoTo",                            category:"VoIP",              billingCadence:"Monthly",      contactName:"", phone:"1-888-646-0014", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.goto.com", urlSupport:"https://support.goto.com", urlPortal:"https://admin.goto.com", bills:[], contracts:[
    {id:"goto-jeff", locationId:"loc-jefferson", description:"GoTo Voice — Jefferson",   accountNumber:"CN-6434073-2508", startDate:"", endDate:"", monthlyAmount:"184.58", notes:"9 seats × $18.00 + fees. Invoice IN7105370066 May 2026."},
    {id:"goto-gas",  locationId:"loc-gaston",    description:"GoTo Voice — Gaston",      accountNumber:"CN-6646742-2511", startDate:"", endDate:"", monthlyAmount:"173.74", notes:"8 seats × $18.00 + fees. Invoice IN7105361191 May 2026."},
    {id:"goto-rome", locationId:"loc-rome",       description:"GoTo Voice — Rome",        accountNumber:"CN-928065-2101",  startDate:"", endDate:"", monthlyAmount:"153.43", notes:"6 seats × $18.00 + fees + $26.25 equipment rental. Invoice IN7105333077 May 2026."},
    {id:"goto-fc",   locationId:"loc-forestcity", description:"GoTo Voice — Forest City", accountNumber:"",                startDate:"", endDate:"", monthlyAmount:"65.16",  notes:"3 seats est. × $21.72 (Gaston rate basis). Account number TBD."},
  ], notes:"SIP phones: Jefferson (CN-6434073-2508, $184.58/mo, 9 seats), Gaston (CN-6646742-2511, $173.74/mo, 8 seats), Rome (CN-928065-2101, $153.43/mo, 6 seats), Forest City (est. ~$65/mo, 3 seats). $18/seat + fees." },
  { id:"v005",  operator:"op-highlands", name:"8x8",                             category:"VoIP",              billingCadence:"Monthly",      contactName:"", phone:"1-888-898-8733", email:"", accountNumber:"QB0507013010319", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.8x8.com", urlSupport:"https://support.8x8.com", urlPortal:"https://sso.8x8.com/v2/login", bills:[], contracts:[
    {id:"8x8-nor", locationId:"loc-norcross", description:"8x8 VoIP — Norcross", accountNumber:"QB0507013010319", startDate:"", endDate:"", monthlyAmount:"245.04", notes:"Invoice 9866592, May 2026. 9× X Series X1 $15/ea + 1× X2 $25 + DIDs + taxes $45.08. 9× Polycom VVX 411 (no device charge). Account: The Landings at Norcross. AutoPay Mastercard ****2529."},
  ], notes:"SIP phones: Norcross (The Landings). Acct QB0507013010319, $245.04/mo. Invoice 9866592 May 2026. 9× X1 + 1× X2 + Polycom VVX 411 devices. AutoPay." },
  // ── Network vendors ────────────────────────────────────────────────────────────
  { id:"v006",  operator:"op-highlands", name:"Cisco Meraki",                    category:"Network Vendor",    billingCadence:"3-Year Subscription", contactName:"", phone:"1-800-553-6387", email:"", accountNumber:"", contractStart:"2024-05-21", contractExpiry:"2027-06-20", renewalDate:"2027-06-20", renewalAmount:"", licenseCount:"30", renewalNotes:"⚠️ RENEWAL DUE JUNE 2027 — $8,941.98 LUMP SUM. ALL MERAKI DEVICES (Jefferson + Norcross) GO OFFLINE WITHOUT RENEWAL. Tazergy Invoice 121831.", urlWebsite:"https://meraki.cisco.com", urlSupport:"https://documentation.meraki.com", urlPortal:"https://n219.dashboard.meraki.com/login/", bills:[], contracts:[
    {id:"meraki-jeff-3yr", locationId:"loc-jefferson", description:"Meraki 3yr License — Jefferson (MX67 + 2×MS120-24P + 3×MS120-8FP + 24×MR33)", accountNumber:"Z28R-JRJP-WJ43", startDate:"2024-05-21", endDate:"2027-06-20", monthlyAmount:"234.97", notes:"⚠️ LUMP SUM $8,356.98 + $585 tax = $8,941.98 due June 2027. MX67 $24.82/mo + 2×MS120-24P $12.42/mo + 3×MS120-8FP $8.37/mo + 24×MR33 $189.36/mo = $234.97/mo amortized. Tazergy Invoice 121831 May 2024."},
    {id:"meraki-nor-3yr", locationId:"loc-norcross",  description:"Meraki 3yr License — Norcross (MX67 + 1×MS120-8FP) — est. (1 Meraki switch only; other switches are Brocade and Araknis)", accountNumber:"Z28R-JRJP-WJ43", startDate:"2024-05-21", endDate:"2027-06-20", monthlyAmount:"27.61", notes:"Estimated same rate as Jefferson for current term. MX67 $24.82/mo + MS120-8FP $2.79/mo = $27.61/mo amortized. WARNING: renewal rate unknown — Meraki pricing increases each cycle. Previous term est. ~$994 but expect significantly higher. Budget accordingly."},
  ], notes:"⚠️ RANSOM-WARE SUBSCRIPTION MODEL — ALL MANAGED HARDWARE GOES OFFLINE IF LICENSE LAPSES. Jefferson: 30 devices (MX67+5 switches+24 APs) $234.97/mo amortized, $8,942 lump due Jun 2027. Norcross: 2 devices $27.61/mo est. Procured via Tazergy Invoice 121831." },
  { id:"v007",  operator:"op-highlands", name:"Ubiquiti",                        category:"Network Vendor",    billingCadence:"Per Purchase", contactName:"", phone:"", email:"support@ui.com", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.ui.com", urlSupport:"https://help.ui.com", urlPortal:"https://unifi.ui.com", bills:[], notes:"APs: Cartersville (AP AC PRO x6), Rome (U6+ x8). Router: Rome (UDM Pro). Controller: Cartersville (UCK G2+). Hardware purchases only, no subscription." },
  { id:"v008",  operator:"op-highlands", name:"Ruckus / CommScope",              category:"Network Vendor",    billingCadence:"Monthly",      contactName:"", phone:"1-855-782-5871", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.ruckusnetworks.com", urlSupport:"https://support.ruckuswireless.com", urlPortal:"", bills:[], notes:"APs: Norcross (R510x10, R610x1, R650x1). Controller hosted by Tazergy." },
  { id:"v009",  operator:"op-highlands", name:"TP-Link",                         category:"Network Vendor",    billingCadence:"Per Purchase", contactName:"", phone:"1-866-225-8139", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.tp-link.com", urlSupport:"https://www.tp-link.com/us/support/", urlPortal:"https://omada.tplinkcloud.com", bills:[], notes:"Deco APs: Gaston (AXE5400 x7), Forest City (M8 x6). Hardware purchases only." },
  { id:"v010",  operator:"op-highlands", name:"Netgear",                         category:"Network Vendor",    billingCadence:"Per Purchase", contactName:"", phone:"1-888-638-4327", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.netgear.com", urlSupport:"https://www.netgear.com/support/", urlPortal:"", bills:[], notes:"Switches at Gaston, Jefferson, Forest City, Rome, Cartersville. Hardware purchases only." },
  { id:"v011",  operator:"op-highlands", name:"Tazergy",                         category:"Network MSP",       billingCadence:"Monthly + Per Service Call", contactName:"", phone:"", email:"", accountNumber:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.tazergy.com", urlSupport:"https://www.tazergy.com/support", urlPortal:"", bills:[], contracts:[
    {id:"taz-nor", locationId:"Norcross",  description:"Managed WiFi + Ruckus controller hosting", accountNumber:"", startDate:"", endDate:"", monthlyAmount:"300", notes:"$300/mo flat. Ruckus controller hosted by Tazergy. Per-site MSP contract."},
    {id:"taz-jef", locationId:"Jefferson", description:"Managed network services",                  accountNumber:"", startDate:"", endDate:"", monthlyAmount:"300", notes:"$300/mo flat. Per-site MSP contract."},
    {id:"taz-svc", locationId:"All sites", description:"On-site service calls",                     accountNumber:"", startDate:"", endDate:"", monthlyAmount:"",    notes:"Billed per service call when Tazergy staff visit on-site. Rate TBD — add to contract when known."}
  ], notes:"Managed MSP: Norcross + Jefferson. $300/mo each = $600/mo MRC. Plus per-service-call charges for on-site visits." },  // ── Hardware vendors ───────────────────────────────────────────────────────────
  { id:"v012",  operator:"op-highlands", name:"Dell Technologies",               category:"Hardware",          billingCadence:"Per Purchase", contactName:"", phone:"1-877-275-3355", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.dell.com/en-us/shop/scc/sc/business", urlSupport:"https://www.dell.com/support/home/en-us", urlPortal:"https://www.dell.com/support/my-account/en-us", bills:[], notes:"PCs: Latitude 5420/7420/7480, Optiplex 7490 AIO across multiple locations." },
  { id:"v013",  operator:"op-highlands", name:"HP",                              category:"Hardware",          billingCadence:"Per Purchase", contactName:"", phone:"1-800-474-6836", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.hp.com/us-en/shop/vwa/hp-products", urlSupport:"https://support.hp.com/us-en", urlPortal:"https://support.hp.com/us-en/myproducts", bills:[], notes:"PCs: EliteBook 840 G6, Elite Book Pro. Norcross, Forest City, Remote." },
  { id:"v014",  operator:"op-highlands", name:"Yealink",                         category:"Hardware",          billingCadence:"Per Purchase", contactName:"", phone:"", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.yealink.com", urlSupport:"https://support.yealink.com", urlPortal:"", bills:[], notes:"SIP phones: Jefferson (SIP-T34W x8), Gaston (x7), Forest City (x2), Rome (x1 unactivated)." },
  { id:"v015",  operator:"op-highlands", name:"Poly / Plantronics",              category:"Hardware",          billingCadence:"Per Purchase", contactName:"", phone:"1-800-765-9750", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.poly.com", urlSupport:"https://www.poly.com/us/en/support", urlPortal:"", bills:[], notes:"Phones: Norcross (VVX 411 x8), Rome (VVX 450 x5). ATA: Forest City (ATA 400 fax)." },
  { id:"v016",  operator:"op-highlands", name:"Grandstream",                     category:"Hardware",          billingCadence:"Per Purchase", contactName:"", phone:"1-626-666-6242", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.grandstream.com", urlSupport:"https://www.grandstream.com/support", urlPortal:"", bills:[], notes:"ATA/Fax: Gaston (HT801 GoTo fax)." },
  { id:"v017",  operator:"op-highlands", name:"Obihai / Polycom",                category:"Hardware",          billingCadence:"Per Purchase", contactName:"", phone:"", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.obihai.com", urlSupport:"https://www.obihai.com/support", urlPortal:"", bills:[], notes:"ATA: Norcross 8x8 fax (OBi 300 SIP ATA + OBi Handset, ext 100)." },
  { id:"v018",  operator:"op-highlands", name:"Cisco",                           category:"Hardware",          billingCadence:"Per Purchase", contactName:"", phone:"1-800-553-6387", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.cisco.com", urlSupport:"https://www.cisco.com/c/en/us/support/index.html", urlPortal:"", bills:[], notes:"ATA: Jefferson GoTo fax line (ATA191, ext 1008)." },
  // ── TV / Entertainment ────────────────────────────────────────────────────────
  { id:"v019",  operator:"op-highlands", name:"Retirement Home TV",              category:"TV / Entertainment", billingCadence:"Monthly",     contactName:"", phone:"(877) 477-3474", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.retirementhometv.com", urlSupport:"https://www.retirementhometv.com/support", urlPortal:"https://www.retirementhometv.com", bills:[], contracts:[
    {id:"rhtv-rome",  locationId:"loc-rome",         description:"RetirementHomeTV — Rome",        accountNumber:"1-111112001", startDate:"", endDate:"", monthlyAmount:"998.56", notes:"Invoice 272855, May 1 2026. Monthly $964.31 + GA Sales Tax Floyd Co $34.25. Billed to: Highlands Rome, P.O. Box 2568, Hickory NC 28603. Due upon receipt."},
    {id:"rhtv-cart", locationId:"loc-cartersville", description:"RetirementHomeTV — Cartersville", accountNumber:"2346805",    startDate:"", endDate:"", monthlyAmount:"494.50", notes:"Invoice 272925, May 1 2026. Monthly $487.45 + GA Sales Tax Bartow Co $7.05. Billed to: Highlands Senior Care, 16 Roving Rd, Cartersville GA 30121. Net 15."},
  ], notes:"TV service: Rome (acct 1-111112001, $998.56/mo) and Cartersville (acct 2346805, $494.50/mo). Total: $1,493.06/mo. Phone: (877) 477-3474. RetirementHomeTV Corporation, 4604 Arden Dr, Fort Wayne IN 46804." },
  { id:"v020",  operator:"op-highlands", name:"Allbridge",                       category:"TV / Entertainment", billingCadence:"Monthly",     contactName:"", phone:"(866) 734-4976", email:"accountsreceivable@allbridge.com", accountNumber:"C127140", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://allbridge.com", urlSupport:"https://allbridge.com/support/", urlPortal:"https://skyadmin.io/pay", bills:[], contracts:[
    {id:"allb-jeff", locationId:"loc-jefferson", description:"Allbridge Video Services — Jefferson", accountNumber:"C127140", startDate:"", endDate:"", monthlyAmount:"1068.53", notes:"Allbridge Video Services $1,064.85 + tax $3.68 = $1,068.53/mo recurring. Invoice 20442462 Jan 2024. Note: account had past-due balance $2,451.40 as of Jan 2024 — confirm current status."},
  ], notes:"TV service: Jefferson (Jackson Oaks Senior Living). Customer ID C127140. Pay online: skyadmin.io/pay. Accts receivable: accountsreceivable@allbridge.com. NOTE: Past due balance flagged Jan 2024 — verify current payment status." },
  { id:"v021",  operator:"op-highlands", name:"Comcast TV — Norcross",           category:"TV / Entertainment", billingCadence:"Monthly",     contactName:"", phone:"1-800-391-3000", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://business.comcast.com", urlSupport:"https://business.comcast.com/support", urlPortal:"https://login.comcast.net", bills:[], notes:"TV: Norcross. Possibly Jefferson also (unconfirmed)." },
  // ── Camera / Security ─────────────────────────────────────────────────────────
  { id:"v022",  operator:"op-highlands", name:"Comsec",                          category:"Camera / Security",  billingCadence:"Monthly",     contactName:"", phone:"", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"", urlSupport:"", urlPortal:"", bills:[], notes:"28 analog cameras: Cartersville. DVR controller: LTS LTD8432K-ST (supplied by LTS Security)." },
  { id:"v023",  operator:"op-highlands", name:"Ring / Amazon",                   category:"Camera / Security",  billingCadence:"Monthly",     contactName:"", phone:"1-800-656-1918", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://ring.com", urlSupport:"https://support.ring.com", urlPortal:"https://account.ring.com", bills:[], notes:"Ring cameras: Rome (4), Jefferson, Norcross." },
  { id:"v024",  operator:"op-highlands", name:"Streaming cameras",               category:"Camera / Security",  billingCadence:"Monthly",     contactName:"", phone:"", email:"", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"", urlSupport:"", urlPortal:"", bills:[], notes:"Streaming cameras: Gaston, Forest City (vendor TBD)." },
  { id:"v026",  operator:"op-highlands", name:"T-Mobile Business",               category:"Mobile / Wireless",  billingCadence:"Monthly",      contactName:"", phone:"1-800-375-1126", email:"", accountNumber:"987665350", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.t-mobile.com/business", urlSupport:"https://www.t-mobile.com/support", urlPortal:"https://account.t-mobile.com", bills:[], contracts:[
    {id:"tmob-cart", locationId:"loc-cartersville", description:"T-Mobile Business Mobile — Cartersville/Corporate", accountNumber:"987665350", startDate:"", endDate:"", monthlyAmount:"218.78", notes:"6 lines: 4× Bus Unl Select Promo $120 + 2× AAL $30 each. Billing addr: 575 Laurel Oaks Ln, Alpharetta GA 30004. Invoice 987665350-39 Mar 2026 $229.72 (incl $10.94 late fee). Recurring: ~$218.78/mo. 2× Galaxy S25 on EIP ($566.61 balance each, installment 7/24)."},
  ], notes:"Mobile: Cartersville/corporate lines. Acct 987665350. 6 lines — 4 Bus Unl Select Promo + 2 AAL (Galaxy S25 Icy Blue + Navy). AutoPay. Late fee Jan 2026 — verify." },
  { id:"v025",  operator:"op-highlands", name:"LTS Security",                    category:"Camera / Security",  billingCadence:"Per Purchase", contactName:"", phone:"1-888-813-8388", email:"support@ltssecurity.com", accountNumber:"", contractStart:"", contractExpiry:"", renewalDate:"", renewalAmount:"", licenseCount:"", renewalNotes:"", urlWebsite:"https://www.ltssecurity.com", urlSupport:"https://www.ltssecurity.com/support", urlPortal:"", bills:[], notes:"Analog DVR system: Cartersville. LTD8432K-ST DVR + 28 analog cameras." },
];
const SEED_OPS = [{ id:"op-highlands", name:"Highlands Senior Living", shortName:"Highlands",
  logo:"",
  webLink:"https://www.highlands.care",
  street:"680 Holcomb Bridge Rd", city:"Norcross", state:"GA", zip:"30071", country:"USA",
  contacts:[
    {name:"Steve Brooks", title:"IT Director", phone:"", email:""},
  ],
}];

const SEED_LOCS = [
  { id:"loc-columbia",     operatorId:"op-highlands", name:"Columbia",     shortName:"Columbia",     address:"4112 Hartford St, Columbia SC 29204",        mainPhone:"+18037867411", edName:"Freddie Jenkins",    maintenanceTech:"", notes:"AT&T acct 337883844. Billed to KAY RAM ATLANTICA LLC. ⚠️ SITE ISSUES (May 2026): Ethernet cabling exposed on cinder block walls (no conduit). Network devices and power strips sitting on floor. Compliance/safety risk — needs cable management and proper rack/shelf mount." },
  { id:"loc-gaston",       operatorId:"op-highlands", name:"Gaston",       shortName:"Gaston",       address:"3959 Fish Hatchery Rd, Gaston SC 29053",      mainPhone:"+18037556541", edName:"Krissy Mika",        maintenanceTech:"", notes:"AT&T DSL ISP. Deco WiFi. GoTo phones." },
  { id:"loc-norcross",     operatorId:"op-highlands", name:"Norcross",     shortName:"Norcross",     address:"680 Holcomb Bridge Rd, Norcross GA 30071",    mainPhone:"+17703680292", edName:"",                   maintenanceTech:"", notes:"Comcast ISP. Meraki MX67. Ruckus WiFi (Tazergy). 8x8 phones." },
  { id:"loc-forestcity",   operatorId:"op-highlands", name:"Forest City",  shortName:"Forest City",  address:"2270 Oakland Rd, Forest City NC 28043",       mainPhone:"+18282226240", edName:"Cassie Imes",        maintenanceTech:"", notes:"Starlink ISP. Deco WiFi. GoTo phones." },
  { id:"loc-rome",         operatorId:"op-highlands", name:"Rome",         shortName:"Rome",         address:"1168 Chulio Rd SE, Rome GA 30161",             mainPhone:"+17068020990", edName:"Savannah Jones",     maintenanceTech:"", notes:"Comcast ISP. Ubiquiti UDM Pro. GoTo phones." },
  { id:"loc-jefferson",    operatorId:"op-highlands", name:"Jefferson",    shortName:"Jefferson",    address:"50 Sumner Way, Jefferson GA 30549",            mainPhone:"+17063877000", edName:"Amanda Strickland",  maintenanceTech:"", notes:"Comcast primary WAN. Starlink backup. Meraki MX67. GoTo phones." },
  { id:"loc-cartersville", operatorId:"op-highlands", name:"Cartersville", shortName:"Cartersville", address:"16 Roving Road, Cartersville GA 30121",        mainPhone:"+17703828989", edName:"Stacey Jenkins",     maintenanceTech:"", notes:"Comcast ISP. Ubiquiti UniFi. GoTo phones." },
  { id:"loc-corporate",    operatorId:"op-highlands", name:"Corporate",    shortName:"Corporate",    address:"680 Holcomb Bridge Rd, Norcross GA 30071",    mainPhone:"+18773444452", edName:"",                   maintenanceTech:"", notes:"Corporate HQ. Toll-free: 877-344-4452 (877-3 HIGHLAND)" },
  { id:"loc-remote",       operatorId:"op-highlands", name:"Remote",       shortName:"Remote",       address:"",                                            mainPhone:"",             edName:"",                   maintenanceTech:"", notes:"" },
];




// ── NETWORK SUMMARY — from Highlands Senior Living Network and Phone Inventory ──
const NETWORK_SUMMARY = [
  { location:"loc-cartersville", isp:"Comcast",          router:"Comcast Gateway",    appliance:"Ubiquiti Cloud Key UCK G2+",    switches:2, switchModels:"Gigabit PoE, Netgear 8-port",                          aps:6,  apMake:"Ubiquiti",      apModel:"AP AC PRO",                   wifiStandard:"WiFi 5",   adminSsid:"HIGHLANDS ADMIN",       residentSsid:"HIGHLANDS TENANT",           phoneSystem:"Comcast", cameras:"Comsec (28)",  tv:"Retirement Home TV", tvAccount:"2346805", tvMonthlyCost:"494.50", notes:"Fax, Phone, elevator, cell" , ispMonthlyCost:"", ispPlan:"", ispAccountNumber:""},
  { location:"loc-rome",         isp:"Comcast",          router:"Ubiquiti UDM Pro",   appliance:"Ubiquiti Dream Machine UDM Pro", switches:2, switchModels:"USW-24-PoE, Netgear ProSafe 777 PoE, Netgear 24T rack",aps:8,  apMake:"Ubiquiti",      apModel:"U6+",                   wifiStandard:"WiFi 6",   adminSsid:"Highlands_Staff",       residentSsid:"Highlands_Resident",         phoneSystem:"GoTo",    cameras:"4 Ring",       tv:"Retirement Home TV", tvAccount:"1-111112001", tvMonthlyCost:"998.56", notes:"RetirementHomeTV billed to Highlands Rome, PO Box 2568, Hickory NC 28603 (Floyd Co)" , ispMonthlyCost:"", ispPlan:"", ispAccountNumber:""},
  { location:"loc-norcross",     isp:"Comcast",          router:"Cisco Meraki MX67",  appliance:"Cisco Meraki MX67",             switches:3, switchModels:"MS120-8FP x1 (Meraki), ICX7150-24P x1 (Brocade/Ruckus), Araknis 420-24P x1",          aps:12, apMake:"Ruckus",        apModel:"R510(10) R610(1) R650(1)",    wifiStandard:"WiFi 5/6", adminSsid:"Landing Staff",         residentSsid:"Landing Guest",              phoneSystem:"8x8",     cameras:"Ring",         tv:"Comcast",            notes:"Ruckus controller hosted by Tazergy" , ispMonthlyCost:"", ispPlan:"", ispAccountNumber:""},
  { location:"loc-jefferson",    isp:"Comcast (primary)",router:"Cisco Meraki MX67",  appliance:"Cisco Meraki MX67",             switches:5, switchModels:"MS120-8FP x2, MS120-24P x2, Netgear GS116",            aps:24, apMake:"Cisco Meraki",  apModel:"MR33",                        wifiStandard:"WiFi 5",   adminSsid:"BridgeSL-Internal",     residentSsid:"Jackson-Oaks-Guest",         phoneSystem:"GoTo",    cameras:"Ring",         tv:"Allbridge",          notes:"Comcast primary WAN. Starlink backup. Allbridge TV." , ispMonthlyCost:"", ispPlan:"", ispAccountNumber:""},
  { location:"loc-gaston",       isp:"AT&T",             router:"AT&T DSL Gateway",   appliance:"none",                          switches:2, switchModels:"Netgear GS116, Netgear GS108",                         aps:7,  apMake:"TP-Link Deco",  apModel:"AXE5400",                     wifiStandard:"WiFi 6",   adminSsid:"Highlands_Staff",       residentSsid:"Highlands_Resident",         phoneSystem:"GoTo",    cameras:"streaming",    tv:"",                   notes:"Deco pass-through. SSIDs + routing + DHCP in AT&T gateway" , ispMonthlyCost:"", ispPlan:"", ispAccountNumber:""},
  { location:"loc-columbia",     isp:"AT&T",             router:"AT&T BGW210-700",    appliance:"AT&T 250IADv2 (VoIP IAD)",      switches:0, switchModels:"",                                                     aps:3,  apMake:"TP-Link Deco",  apModel:"M4/M5 (confirm)",             wifiStandard:"WiFi 5",   adminSsid:"ATT3zuv6R8",            residentSsid:"TBD",                        phoneSystem:"AT&T",    cameras:"",             tv:"",                   notes:"AT&T BGW210-700 gateway + 250IADv2 VoIP IAD. SLOW 25Mbps DSL - upgrade candidate. Cabling exposed on walls, devices+power strips on floor - compliance issue.", ispMonthlyCost:"", ispPlan:"Internet 25 + Static IP 8", ispAccountNumber:"337883844", ispNote:"Cost included in AT&T contract att-col ($274.67/mo)"},
  { location:"loc-forestcity",   isp:"Starlink",         router:"Starlink Router",    appliance:"none",                          switches:2, switchModels:"TP-Link 8-port, Netgear GS108",                        aps:6,  apMake:"TP-Link Deco",  apModel:"M8",                          wifiStandard:"WiFi 5",   adminSsid:"Highlands Forest City", residentSsid:"Highlands Forest City Guest", phoneSystem:"GoTo",    cameras:"streaming",    tv:"",                   notes:"Deco pass-through. SSIDs + routing + DHCP in Starlink router" , ispMonthlyCost:"", ispPlan:"Residential Max", ispAccountNumber:"ACC-6553933-40065-14", ispNote:"Cost in Starlink contract sl-fc — do not populate ispMonthlyCost"},
];

// ── NETWORK ASSET RECORDS ─────────────────────────────────────────────────────
const SEED_NET_ASSETS = [
  // ── CARTERSVILLE ──────────────────────────────────────────────────────────
  { id:"n001", type:"Network", operator:"op-highlands", location:"loc-cartersville", subLocation:"IDF", category:"Router / Firewall", status:"Active", make:"Comcast", model:"ISP Gateway", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"Comcast", portCount:"", managed:"", poe:"", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Comcast", notes:"ISP-provided gateway router", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n002", type:"Network", operator:"op-highlands", location:"loc-cartersville", subLocation:"IDF", category:"Network Controller", status:"Active", make:"Ubiquiti", model:"Cloud Key UCK G2 Plus", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"", vlan:"", wifiStandard:"WiFi 5", adminSsid:"HIGHLANDS ADMIN", residentSsid:"HIGHLANDS TENANT", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"UniFi controller (HIGHLANDS CLOUDKEY) — SSIDs defined here: HIGHLANDS ADMIN / HIGHLANDS TENANT. Broadcast by 6x AP AC PRO.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n003", type:"Network", operator:"op-highlands", location:"loc-cartersville", subLocation:"IDF", category:"Switch", status:"Active", make:"Ubiquiti", model:"Gigabit PoE Switch", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"Switch 1 of 2", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n004", type:"Network", operator:"op-highlands", location:"loc-cartersville", subLocation:"IDF", category:"Switch", status:"Active", make:"Netgear", model:"8-port switch", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"8", managed:"Unmanaged", poe:"", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Netgear", notes:"Switch 2 of 2", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n005", type:"Network", operator:"op-highlands", location:"loc-cartersville", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"AP AC PRO", serial:"", hostname:"2ND FLOOR LEFT", macAddress:"", ipAddress:"10.1.10.218", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"HIGHLANDS ADMIN", residentSsid:"HIGHLANDS TENANT", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"Cartersville AP 1 of 6. Parent: Main Floor switch Port 1.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n006", type:"Network", operator:"op-highlands", location:"loc-cartersville", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"AP AC PRO", serial:"", hostname:"MAIN FLOOR CENTER", macAddress:"", ipAddress:"10.1.10.48", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"HIGHLANDS ADMIN", residentSsid:"HIGHLANDS TENANT", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"Cartersville AP 2 of 6. Parent: Main Floor switch Port 1. 8 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n007", type:"Network", operator:"op-highlands", location:"loc-cartersville", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"AP AC PRO", serial:"", hostname:"MAIN FLOOR RIGHT", macAddress:"", ipAddress:"10.1.10.184", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"HIGHLANDS ADMIN", residentSsid:"HIGHLANDS TENANT", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"Cartersville AP 3 of 6. Parent: Main Floor switch Port 1. 2 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n008", type:"Network", operator:"op-highlands", location:"loc-cartersville", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"AP AC PRO", serial:"", hostname:"2ND FLOOR CENTER", macAddress:"", ipAddress:"10.1.10.138", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"HIGHLANDS ADMIN", residentSsid:"HIGHLANDS TENANT", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"Cartersville AP 4 of 6. Parent: Main Floor switch Port 1. 11 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n009", type:"Network", operator:"op-highlands", location:"loc-cartersville", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"AP AC PRO", serial:"", hostname:"2ND FLOOR RIGHT", macAddress:"", ipAddress:"10.1.10.236", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"HIGHLANDS ADMIN", residentSsid:"HIGHLANDS TENANT", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"Cartersville AP 5 of 6. Parent: Main Floor switch Port 1. 1 client.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n010", type:"Network", operator:"op-highlands", location:"loc-cartersville", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"AP AC PRO", serial:"", hostname:"MAIN FLOOR LEFT", macAddress:"", ipAddress:"10.1.10.233", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"HIGHLANDS ADMIN", residentSsid:"HIGHLANDS TENANT", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"Cartersville AP 6 of 6. Parent: 2nd Floor switch Port 1. 4 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
      // ── ROME ────────────────────────────────────────────────────────────────
  { id:"n013", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"IDF", category:"Router / Firewall", status:"Active", make:"Ubiquiti", model:"Dream Machine UDM Pro", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"Comcast", portCount:"", managed:"Managed", poe:"", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"UDM Pro is router + firewall + controller. SSIDs defined here: Highlands_Staff / Highlands_Resident. A-wing APs uplink direct. B-wing APs via USW-24-PoE.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n014", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"IDF", category:"Switch", status:"Active", make:"Ubiquiti", model:"USW-24-PoE", serial:"", hostname:"USW-24-PoE", macAddress:"", ipAddress:"10.70.1.252", isp:"", portCount:"24", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"Up to date", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"Switch 1 of 2. IP 10.70.1.252. Uplink FE to Comcast Cable. B-wing APs on ports 13-16.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n015", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"IDF", category:"Switch", status:"Active", make:"Netgear", model:"ProSafe 777 PoE", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"24", managed:"Unmanaged", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Netgear", notes:"Switch 2 of 2. Rack mount.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n016", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"U6+", serial:"", hostname:"U6+ A-29", macAddress:"", ipAddress:"10.70.1.254", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"AP 1 of 8 — A-wing. Parent: Comcast Cable direct. Ch2.4: 11/20MHz Ch5: 153/40MHz. 7 clients. broadcasts SSIDs from UDM Pro controller.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n017", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"U6+", serial:"", hostname:"U6+ A-7", macAddress:"", ipAddress:"10.70.1.52", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"AP 2 of 8 — A-wing. Parent: Comcast Cable direct. Ch2.4: 6/20MHz Ch5: 157/40MHz. 8 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n019", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"U6+", serial:"", hostname:"U6+ A-13", macAddress:"", ipAddress:"10.70.1.96", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"AP 4 of 8 — A-wing. Parent: Comcast Cable direct. Ch2.4: 1/20MHz Ch5: 161/40MHz. 8 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n021", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"U6+", serial:"", hostname:"U6+ B-7", macAddress:"", ipAddress:"10.70.1.125", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"AP 6 of 8 — B-wing. Parent: USW-24-PoE Port 14. Ch2.4: 1/20MHz Ch5: 161/40MHz. 5 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n023", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"U6+", serial:"", hostname:"U6+ B-29", macAddress:"", ipAddress:"10.70.1.139", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"AP 8 of 8 — B-wing. Parent: USW-24-PoE Port 13. Ch2.4: 40/40MHz Ch5: 40/40MHz. 4 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n018", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"U6+", serial:"", hostname:"U6+ A-23", macAddress:"", ipAddress:"10.70.1.44", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"AP 3 of 8 — A-wing. Parent: Comcast Cable direct. Ch2.4: 11/20MHz Ch5: 48/40MHz. 16 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n020", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"U6+", serial:"", hostname:"U6+ B-23", macAddress:"", ipAddress:"10.70.1.53", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"AP 5 of 8 — B-wing. Parent: USW-24-PoE Port 16. Ch2.4: 1/20MHz Ch5: 161/40MHz. 7 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n022", type:"Network", operator:"op-highlands", location:"loc-rome", subLocation:"", category:"Access Point", status:"Active", make:"Ubiquiti", model:"U6+", serial:"", hostname:"U6+ B-13", macAddress:"", ipAddress:"10.70.1.28", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ubiquiti", notes:"AP 7 of 8 — B-wing. Parent: USW-24-PoE Port 15. Ch2.4: 1/20MHz Ch5: 153/40MHz. 4 clients.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  // ── NORCROSS ─────────────────────────────────────────────────────────────
  { id:"n024", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"IDF", category:"Router / Firewall", status:"Active", make:"Cisco Meraki", model:"MX67", serial:"Q2FY-W5PY-YYGN", hostname:"Norcross - FW", macAddress:"ac:17:c8:c1:77:83", ipAddress:"96.91.139.101", isp:"Comcast", portCount:"", managed:"Managed", poe:"", vlan:"", wifiStandard:"WiFi 5/6", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"WAN: 96.91.139.101 (Active). DDNS: highland-senior-living-norcross-vcpgngmwhvjc.dynamic-m.com. Comcast acct 8220133050478318, ph 470-489-2100, CM MAC F8:D2:AC:C4:30:F8. Onsite: Jenohn Carter 804-908-2844. SSIDs via Ruckus/Tazergy. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"24.82", licenseNote:"MX67 Advanced Security 3yr — est. same rate as Jefferson (Tazergy Invoice 121831)", costType:"amortized"},
  { id:"n025", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"Security Desk", category:"Switch", status:"Active", make:"Cisco Meraki", model:"MS120-8FP", serial:"Q2CX-TRYN-A5L6", hostname:"Security Desk switch", macAddress:"98:18:88:d5:7a:21", ipAddress:"10.36.60.2", isp:"", portCount:"8", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"Security Desk switch. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"2.79", licenseNote:"MS120-8FP Enterprise 3yr — est. same rate as Jefferson (Tazergy Invoice 121831)", costType:"amortized"},
  { id:"n026", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"IDF", category:"Switch", status:"Active", make:"Cisco Meraki", model:"MS-120-8FP", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"8", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Cisco Meraki", notes:"Switch 2 of 3 Meraki MS-120-8FP. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n027", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"IDF", category:"Switch", status:"Active", make:"Cisco Meraki", model:"MS-120-8FP", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"8", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Cisco Meraki", notes:"Switch 3 of 3 Meraki MS-120-8FP. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n028", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"IDF", category:"Switch", status:"Active", make:"Brocade / Ruckus", model:"ICX7150-24P", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"24", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"24-port PoE managed switch", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n029", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"IDF", category:"Switch", status:"Active", make:"Araknis", model:"AN-420-SW-24-POE", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"24", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Araknis", notes:"24-port PoE managed switch", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n030", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R510", serial:"", hostname:"AP-NOR-01", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 1 of 12. Controller: Tazergy", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n031", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R510", serial:"", hostname:"AP-NOR-02", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 2 of 12", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n032", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R510", serial:"", hostname:"AP-NOR-03", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 3 of 12", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n033", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R510", serial:"", hostname:"AP-NOR-04", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 4 of 12", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n034", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R510", serial:"", hostname:"AP-NOR-05", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 5 of 12", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n035", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R510", serial:"", hostname:"AP-NOR-06", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 6 of 12", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n036", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R510", serial:"", hostname:"AP-NOR-07", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 7 of 12", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n037", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R510", serial:"", hostname:"AP-NOR-08", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 8 of 12", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n038", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R510", serial:"", hostname:"AP-NOR-09", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 9 of 12", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n039", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R510", serial:"", hostname:"AP-NOR-10", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 10 of 12", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n040", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R610", serial:"", hostname:"AP-NOR-11", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 11 of 12 - R610 model", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n041", type:"Network", operator:"op-highlands", location:"loc-norcross", subLocation:"", category:"Access Point", status:"Active", make:"Ruckus", model:"R650", serial:"", hostname:"AP-NOR-12", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Landing Staff", residentSsid:"Landing Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Ruckus / CommScope", notes:"AP 12 of 12 - R650 WiFi 6", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  // ── JEFFERSON ────────────────────────────────────────────────────────────
  { id:"n042", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"IDF", category:"Router / Firewall", status:"Active", make:"Cisco Meraki", model:"MX67", serial:"Q2FY-WE29-G7UU", hostname:"1FL_MDF_FW", macAddress:"ac:17:c8:c1:79:6f", ipAddress:"50.146.108.10", isp:"Comcast (primary) + Starlink (backup)", portCount:"", managed:"Managed", poe:"", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"WAN1: 50.146.108.10 (Comcast, Active). WAN2: 98.97.175.44 (Starlink, Failed/standby). DDNS: highland-senior-living-jefferson-ddhvwrkbhvjc.dynamic-m.com. SSIDs broadcast by 24x MR33 APs. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"24.82", licenseNote:"MX67 Advanced Security 3yr $893.52/36mo", costType:"amortized"},
  { id:"n043", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"IDF", category:"Switch", status:"Active", make:"Cisco Meraki", model:"MS120-24P", serial:"Q2EX-QQCN-VBHY", hostname:"1FL_MDF_SW", macAddress:"34:56:fe:e4:40:7c", ipAddress:"10.36.43.165", isp:"", portCount:"24", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"1st floor MDF switch. Switch 1 of 5. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"6.21", licenseNote:"MS120-24P Enterprise 3yr $223.53/36mo", costType:"amortized"},
  { id:"n044", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"IDF", category:"Switch", status:"Active", make:"Cisco Meraki", model:"MS120-8FP", serial:"Q2CX-RNTW-B8UJ", hostname:"1FL_Office_SW", macAddress:"ac:17:c8:a7:8b:ef", ipAddress:"10.36.43.249", isp:"", portCount:"8", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"1st floor office switch. Switch 2 of 5. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"2.79", licenseNote:"MS120-8FP Enterprise 3yr $100.44/36mo", costType:"amortized"},
  { id:"n045", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"IDF", category:"Switch", status:"Active", make:"Cisco Meraki", model:"MS120-24P", serial:"Q2EX-MYQT-GJRV", hostname:"1Fl_IDF1_SW", macAddress:"98:18:88:9e:e0:8b", ipAddress:"10.36.43.252", isp:"", portCount:"24", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"1st floor IDF1 switch. Switch 3 of 5. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"6.21", licenseNote:"MS120-24P Enterprise 3yr $223.53/36mo", costType:"amortized"},
  { id:"n046", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"IDF", category:"Switch", status:"Active", make:"Cisco Meraki", model:"MS120-8FP", serial:"Q2CX-RDT5-ED8J", hostname:"2FL_IDF2_SW", macAddress:"ac:17:c8:a7:86:59", ipAddress:"10.36.43.170", isp:"", portCount:"8", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"2nd floor IDF2 switch. Switch 4 of 5. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"2.79", licenseNote:"MS120-8FP Enterprise 3yr $100.44/36mo", costType:"amortized"},
  { id:"n047", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"IDF", category:"Switch", status:"Active", make:"Cisco Meraki", model:"MS120-8FP", serial:"Q2CX-NCRV-UNGM", hostname:"2FL_IDF3_SW", macAddress:"ac:17:c8:a7:49:b8", ipAddress:"10.36.43.229", isp:"", portCount:"8", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"2nd floor IDF3 switch. Switch 5 of 5. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"2.79", licenseNote:"MS120-8FP Enterprise 3yr $100.44/36mo", costType:"amortized"},
  { id:"n048", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-ARBQ-RJG2", hostname:"2FL_AP_83:4b:6d", macAddress:"68:3a:1e:83:4b:6d", ipAddress:"10.36.43.169", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 1 of 24. Meraki license required.", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n049", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-ATXU-SBHE", hostname:"2FL_AP_c7:9b:98", macAddress:"34:56:fe:c7:9b:98", ipAddress:"10.36.43.211", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 2 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n050", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-AUFL-636X", hostname:"2FL_AP_c7:9b:a0", macAddress:"34:56:fe:c7:9b:a0", ipAddress:"10.36.43.69", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 3 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n051", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-BVQB-KL6Q", hostname:"2FL_AP_83:4f:90", macAddress:"68:3a:1e:83:4f:90", ipAddress:"10.36.43.253", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 4 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n052", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-CB96-L7T4", hostname:"2FL_AP_83:51:1d", macAddress:"68:3a:1e:83:51:1d", ipAddress:"10.36.43.176", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 5 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n053", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-FHY3-2DZ9", hostname:"2FL_AP_c7:a7:3a", macAddress:"34:56:fe:c7:a7:3a", ipAddress:"10.36.43.167", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 6 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n054", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-MHNJ-9MKB", hostname:"2FL_AP_83:72:a4", macAddress:"68:3a:1e:83:72:a4", ipAddress:"10.36.43.182", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 7 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n055", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-RE75-AVRS", hostname:"2FL_AP_83:81:1d", macAddress:"68:3a:1e:83:81:1d", ipAddress:"10.36.43.163", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 8 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n056", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-TY6T-J2PN", hostname:"2FL_AP_83:8a:b2", macAddress:"68:3a:1e:83:8a:b2", ipAddress:"10.36.43.183", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 9 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n057", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-V272-FSMJ", hostname:"2FL_AP_83:8e:aa", macAddress:"68:3a:1e:83:8e:aa", ipAddress:"10.36.43.133", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 10 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n058", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-V27Y-7V9A", hostname:"1FL_AP_83:8e:ac", macAddress:"68:3a:1e:83:8e:ac", ipAddress:"10.36.43.162", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 11 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n059", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-W85T-KD5A", hostname:"1FL_AP_83:93:51", macAddress:"68:3a:1e:83:93:51", ipAddress:"10.36.43.164", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 12 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n060", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-W9EL-YLS2", hostname:"1FL_AP_83:93:72", macAddress:"68:3a:1e:83:93:72", ipAddress:"10.36.43.180", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 13 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n061", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-WEDV-KWKG", hostname:"1FL_AP_83:94:06", macAddress:"68:3a:1e:83:94:06", ipAddress:"10.36.43.179", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 14 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n062", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-WEG2-E5A4", hostname:"1FL_AP_83:94:09", macAddress:"68:3a:1e:83:94:09", ipAddress:"10.36.43.177", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 15 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n063", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-WNXV-SU5C", hostname:"1FL_AP_83:94:ff", macAddress:"68:3a:1e:83:94:ff", ipAddress:"10.36.43.168", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 16 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n064", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-X592-FCWZ", hostname:"1FL_AP_83:96:98", macAddress:"68:3a:1e:83:96:98", ipAddress:"10.36.43.174", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 17 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n065", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-X8PV-676L", hostname:"1FL_AP_83:96:f2", macAddress:"68:3a:1e:83:96:f2", ipAddress:"10.36.43.181", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 18 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n066", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-X97A-TG7P", hostname:"1FL_AP_83:97:02", macAddress:"68:3a:1e:83:97:02", ipAddress:"10.36.43.166", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 19 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n067", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-XABH-6GKM", hostname:"2FL_AP_83:97:22", macAddress:"68:3a:1e:83:97:22", ipAddress:"10.36.43.171", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 20 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n068", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-ZDTJ-NSMD", hostname:"2FL_AP_83:ad:68", macAddress:"68:3a:1e:83:ad:68", ipAddress:"10.36.43.175", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 21 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n069", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"2FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-ZM2U-JTGS", hostname:"2FL_AP_83:ae:29", macAddress:"68:3a:1e:83:ae:29", ipAddress:"10.36.43.178", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 22 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n070", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-ZPHN-4JS3", hostname:"1FL_AP_83:ae:75", macAddress:"68:3a:1e:83:ae:75", ipAddress:"10.36.43.160", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 23 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  { id:"n071", type:"Network", operator:"op-highlands", location:"loc-jefferson", subLocation:"1FL", category:"Access Point", status:"Active", make:"Cisco Meraki", model:"MR33", serial:"Q2PD-ZPNX-KZNV", hostname:"1FL_AP_83:ae:7d", macAddress:"68:3a:1e:83:ae:7d", ipAddress:"10.36.43.159", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"BridgeSL-Internal", residentSsid:"Jackson-Oaks-Guest", firmwareVersion:"", renewalDate:"2027-06-20", licenseKey:"Z28R-JRJP-WJ43", vendor:"Cisco Meraki", notes:"AP 24 of 24", entryDate:"", warrantyExpiry:"", purchaseDate:"", licenseMonthly:"7.89", licenseNote:"MR33 Enterprise 3yr $283.98/36mo", costType:"amortized"},
  // ── GASTON ───────────────────────────────────────────────────────────────
  { id:"n072", type:"Network", operator:"op-highlands", location:"loc-gaston", subLocation:"IDF", category:"Router / Firewall", status:"Active", make:"AT&T", model:"AT&T DSL Gateway", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"AT&T", portCount:"", managed:"", poe:"", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"AT&T", notes:"SSIDs defined in Deco app (pass-through mode). Routing + DHCP in AT&T gateway. Broadcasts via 7x Deco AXE5400.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n073", type:"Network", operator:"op-highlands", location:"loc-gaston", subLocation:"IDF", category:"Switch", status:"Active", make:"Netgear", model:"GS116", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"16", managed:"Unmanaged", poe:"", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Netgear", notes:"Switch 1 of 2", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n074", type:"Network", operator:"op-highlands", location:"loc-gaston", subLocation:"IDF", category:"Switch", status:"Active", make:"Netgear", model:"GS108", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"8", managed:"Unmanaged", poe:"", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Netgear", notes:"Switch 2 of 2", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n075", type:"Network", operator:"op-highlands", location:"loc-gaston", subLocation:"Main Office", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"AXE5400", serial:"", hostname:"AP-GAS-01", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 1 of 7 — Main Office (Deco mesh main/root node, 3 connected devices). Down 9.7 Mbps / Up 673 kbps observed May 2026.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n076", type:"Network", operator:"op-highlands", location:"loc-gaston", subLocation:"B Hall", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"AXE5400", serial:"", hostname:"AP-GAS-02", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 2 of 7 — B Hall (Ethernet backhaul, 23 connected devices — busiest node).", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n077", type:"Network", operator:"op-highlands", location:"loc-gaston", subLocation:"D Hall", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"AXE5400", serial:"", hostname:"AP-GAS-03", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 3 of 7 — D Hall (Ethernet backhaul, 6 connected devices).", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n078", type:"Network", operator:"op-highlands", location:"loc-gaston", subLocation:"Kitchen", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"AXE5400", serial:"", hostname:"AP-GAS-04", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 4 of 7 — Kitchen (WiFi backhaul — only non-Ethernet node, 6 connected devices). Consider running Ethernet for reliability.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n079", type:"Network", operator:"op-highlands", location:"loc-gaston", subLocation:"Med Room", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"AXE5400", serial:"", hostname:"AP-GAS-05", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 5 of 7 — Med Room (Ethernet backhaul, 5 connected devices).", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n080", type:"Network", operator:"op-highlands", location:"loc-gaston", subLocation:"Men's Hall", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"AXE5400", serial:"", hostname:"AP-GAS-06", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 6 of 7 — Men's Hall (Ethernet backhaul, 7 connected devices).", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n081", type:"Network", operator:"op-highlands", location:"loc-gaston", subLocation:"", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"AXE5400", serial:"", hostname:"AP-GAS-07", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 6", adminSsid:"Highlands_Staff", residentSsid:"Highlands_Resident", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 7 of 7 — Location unknown (likely below fold in Deco app screenshot; ask junior to confirm on next visit).", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  // ── COLUMBIA ─────────────────────────────────────────────────────────────
  { id:"n082", type:"Network", operator:"op-highlands", location:"loc-columbia", subLocation:"IDF", category:"Router / Firewall", status:"Active", ownershipType:"ISP Provided", make:"AT&T", model:"BGW210-700", serial:"R91VH9GX104359", hostname:"", macAddress:"C8:52:61:5D:9F:D1", ipAddress:"192.168.1.254", isp:"AT&T", portCount:"4", managed:"Unmanaged", poe:"", vlan:"", wifiStandard:"WiFi 5 (802.11ac)", adminSsid:"ATT3zuv6R8", residentSsid:"ATT3zuv6R8", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"AT&T", defaultWifiPassword:"3pxq9zf4phs", deviceAccessCode:"38#193988", adminUrl:"http://192.168.1.254", notes:"AT&T DSL gateway. S/N R91VH9GX104359, MAC C852615D9FD1. WiFi: ATT3zuv6R8 / 3pxq9zf4phs. Admin: 192.168.1.254, access code 38#193988. Internet 25Mbps + Static IP. SLOW - upgrade candidate. P/N 599185-002-00.", entryDate:"2026-05-20", warrantyExpiry:"", purchaseDate:"" },
  { id:"n083", type:"Network", operator:"op-highlands", location:"loc-columbia", subLocation:"IDF", category:"ATA / VoIP Appliance", status:"Active", ownershipType:"ISP Provided", make:"AT&T", model:"250IADv2", serial:"HS23061900402941", hostname:"", macAddress:"54:39:68:A0:44:4D", ipAddress:"", isp:"AT&T", portCount:"4", managed:"Unmanaged", poe:"", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"AT&T", notes:"AT&T 250IADv2 Integrated Access Device (VoIP IAD). S/N HS23061900402941, MAC 543968A4044D. Provides 3 analog phone lines (Phone ports 1-4 on rear). Status lights: Power/Internet/VoIP all green. Labeled 'UBV IAD configuration'. Sitting on top of ARRIS modem.", entryDate:"2026-05-20", warrantyExpiry:"", purchaseDate:"" },
  { id:"n083b", type:"Network", operator:"op-highlands", location:"loc-columbia", subLocation:"", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"M4 or M5 (confirm)", serial:"", hostname:"AP-COL-01", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed via Deco app", poe:"", vlan:"", wifiStandard:"WiFi 5", adminSsid:"ATT3zuv6R8", residentSsid:"ATT3zuv6R8", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"Deco mesh unit 1 of 3 (primary/main unit). Identified from site photos May 2026 — confirm exact model. White cylindrical form factor. Connected to AT&T BGW210-700.", entryDate:"2026-05-20", warrantyExpiry:"", purchaseDate:"" },
  { id:"n084", type:"Network", operator:"op-highlands", location:"loc-columbia", subLocation:"", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"M4 or M5 (confirm)", serial:"", hostname:"AP-COL-02", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed via Deco app", poe:"", vlan:"", wifiStandard:"WiFi 5", adminSsid:"ATT3zuv6R8", residentSsid:"ATT3zuv6R8", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"Deco mesh unit 2 of 3. Identified from site photos May 2026 — confirm exact model. White cylindrical form factor.", entryDate:"2026-05-20", warrantyExpiry:"", purchaseDate:"" },
  { id:"n085", type:"Network", operator:"op-highlands", location:"loc-columbia", subLocation:"", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"M4 or M5 (confirm)", serial:"", hostname:"AP-COL-03", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed via Deco app", poe:"", vlan:"", wifiStandard:"WiFi 5", adminSsid:"ATT3zuv6R8", residentSsid:"ATT3zuv6R8", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"Deco mesh unit 3 of 3. Identified from site photos May 2026 — confirm exact model.", entryDate:"2026-05-20", warrantyExpiry:"", purchaseDate:"" },
  // ── FOREST CITY ──────────────────────────────────────────────────────────
  { id:"n086", type:"Network", operator:"op-highlands", location:"loc-forestcity", subLocation:"IDF", category:"Router / Firewall", status:"Active", make:"Starlink", model:"Starlink Router", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"Starlink", portCount:"", managed:"", poe:"", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Highlands Forest City", residentSsid:"Highlands Forest City Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Starlink", notes:"SSIDs defined in Deco app (pass-through mode). Routing + DHCP in Starlink router. Broadcasts via 6x Deco M8.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n087", type:"Network", operator:"op-highlands", location:"loc-forestcity", subLocation:"IDF", category:"Switch", status:"Active", make:"TP-Link", model:"8-port (model TBD)", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"8", managed:"Unmanaged", poe:"", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"Switch 1 of 2 - confirm exact model", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n088", type:"Network", operator:"op-highlands", location:"loc-forestcity", subLocation:"IDF", category:"Switch", status:"Active", make:"Netgear", model:"GS108", serial:"", hostname:"", macAddress:"", ipAddress:"", isp:"", portCount:"8", managed:"Unmanaged", poe:"", vlan:"", wifiStandard:"", adminSsid:"", residentSsid:"", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"Netgear", notes:"Switch 2 of 2", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n089", type:"Network", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"M8", serial:"", hostname:"AP-FC-01", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Highlands Forest City", residentSsid:"Highlands Forest City Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 1 of 6. Deco mesh node.", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n090", type:"Network", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"M8", serial:"", hostname:"AP-FC-02", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Highlands Forest City", residentSsid:"Highlands Forest City Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 2 of 6", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n091", type:"Network", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"M8", serial:"", hostname:"AP-FC-03", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Highlands Forest City", residentSsid:"Highlands Forest City Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 3 of 6", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n092", type:"Network", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"M8", serial:"", hostname:"AP-FC-04", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Highlands Forest City", residentSsid:"Highlands Forest City Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 4 of 6", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n093", type:"Network", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"M8", serial:"", hostname:"AP-FC-05", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Highlands Forest City", residentSsid:"Highlands Forest City Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 5 of 6", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
  { id:"n094", type:"Network", operator:"op-highlands", location:"loc-forestcity", subLocation:"", category:"Access Point", status:"Active", make:"TP-Link Deco", model:"M8", serial:"", hostname:"AP-FC-06", macAddress:"", ipAddress:"", isp:"", portCount:"", managed:"Managed", poe:"Yes", vlan:"", wifiStandard:"WiFi 5", adminSsid:"Highlands Forest City", residentSsid:"Highlands Forest City Guest", firmwareVersion:"", renewalDate:"", licenseKey:"", vendor:"TP-Link", notes:"AP 6 of 6", entryDate:"", warrantyExpiry:"", purchaseDate:"" },
];

const CATS       = ["Laptop","Desktop","Software License","ATA / Fax","Security Camera","DVR / NVR Controller","Router / Firewall","Switch","Access Point","Network Controller","Server","Printer","Monitor","UPS","Other"];
const PHONE_CATS  = ["Desk Phone","Mobile","ATA/Fax Device","Analog Line","Conference Phone","Desk phone"];  // "Desk phone" lowercase for legacy compat
const STATS      = ["Active","Inactive","In Repair","Disposed","Spare","Needs Attention"];
const VCATS      = ["ISP","VoIP","Network Vendor","Network MSP","Hardware","Software","TV / Entertainment","Camera / Security","Cloud","Other"];
const BILL_TYPES  = ["Monthly Service","Annual License","One-Time Purchase","Support Contract","Equipment Lease"];
const LINE_TYPES = ["Desk phone","Analog telephone adapter","Softphone","Ring group","Conference room","Overhead paging","Virtual fax"];
const DID_TYPES  = ["Voice","Fax","Analog","Data","SMS","Toll Free","Virtual"];
const PH_STATS   = ["Ready","Activated","Unavailable","Needs Attention","Offline","Unregistered"];

function ld(k,s){ try{var r=localStorage.getItem(k);if(r)return JSON.parse(r);}catch(e){}return s; }
function sv(k,d){ try{localStorage.setItem(k,JSON.stringify(d));}catch(e){} }
function uid(){ return Math.random().toString(36).slice(2,10); }
function daysUntil(d){ if(!d)return null; return Math.ceil((new Date(d)-new Date())/86400000); }

var BP  = {background:"#1B4F8A",color:"#fff",border:"none",borderRadius:7,padding:"7px 14px",cursor:"pointer",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:6};
var BS  = {background:"transparent",border:"1px solid #D1D5DB",borderRadius:7,padding:"7px 14px",cursor:"pointer",fontSize:13,color:"#6B7280"};
var BI  = {background:"transparent",border:"1px solid #E5E7EB",borderRadius:6,padding:"3px 8px",cursor:"pointer",fontSize:12,color:"#6B7280"};
var INP = {padding:"7px 10px",borderRadius:7,border:"1px solid #D1D5DB",background:"#fff",color:"#111827",fontSize:13,width:"100%",boxSizing:"border-box"};
var SEL = {padding:"7px 10px",borderRadius:7,border:"1px solid #D1D5DB",background:"#fff",color:"#111827",fontSize:13};


// ── Shared form primitives — defined at module level to prevent focus loss ───
function FormField(p) {
  var label=p.label, value=p.value, onChange=p.onChange, type=p.type||"text", opts=p.opts, rows=p.rows;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:3}}>
      <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>{label}</label>
      {opts
        ? <select value={value||""} onChange={onChange} style={INP}>
            <option value="">--</option>
            {opts.map(function(o){
              return typeof o==="string"
                ? <option key={o} value={o}>{o}</option>
                : <option key={o.id} value={o.id}>{o.name}</option>;
            })}
          </select>
        : rows
          ? <textarea value={value||""} onChange={onChange} rows={rows} style={Object.assign({},INP,{resize:"vertical"})}/>
          : <input type={type} value={value||""} onChange={onChange} style={INP}/>
      }
    </div>
  );
}
function FormSection(p) {
  return (
    <div style={{marginBottom:"1.25rem"}}>
      <div style={{fontSize:11,fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:".6px",marginBottom:8,paddingBottom:5,borderBottom:"1px solid #F3F4F6"}}>{p.label}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:10}}>{p.children}</div>
    </div>
  );
}


// Render text with red highlighting for flagged terms
function RedFlag(p) {
  var text = p.text || "";
  if(!text) return <span/>;
  // Split on "meraki" case-insensitive — every occurrence, preserve original casing
  var parts = text.split(/(meraki)/gi);
  return <span>{parts.map(function(part, i){
    if(/^meraki$/i.test(part)){
      return <span key={i} style={{color:"#DC2626",fontWeight:800,background:"#FEE2E2",borderRadius:3,padding:"0 3px",letterSpacing:.3,textDecoration:"underline wavy #DC2626"}}>{part}</span>;
    }
    // Also highlight other known issues
    if(/(SLOW -|SLOW —|upgrade candidate|compliance issue|past.due|⚠)/i.test(part)){
      return <span key={i} style={{color:"#D97706",fontWeight:600}}>{part}</span>;
    }
    return part;
  })}</span>;
}


// Calculate estimated monthly spend for a location
function calcLocationSpend(locId, vendors, dids, locs, assets) {
  var total = 0;
  var amortized = 0;
  var items = [];
  var locObj = locs && locs.find(function(l){return l.id===locId;});
  var locName = locObj ? (locObj.name||"").toLowerCase() : "";
  var locShort = locObj ? (locObj.shortName||"").toLowerCase() : "";

  // From vendor contracts — match by exact loc ID, or name/shortName substring
  if(vendors) vendors.forEach(function(v){
    if(!v.contracts) return;
    v.contracts.forEach(function(c){
      if(!c.monthlyAmount) return;
      var amt = parseFloat(c.monthlyAmount)||0;
      if(!amt) return;
      var cLoc = (c.locationId||"").toLowerCase().trim();
      var matched = cLoc === locId ||
        (cLoc && locName && (cLoc === locName || locName.indexOf(cLoc)>=0 || cLoc.indexOf(locName)>=0)) ||
        (cLoc && locShort && (cLoc === locShort || locShort.indexOf(cLoc)>=0 || cLoc.indexOf(locShort)>=0));
      if(matched){
        total += amt;
        items.push({label:v.name+" — "+c.description, amount:amt});
      }
    });
  });

  // DID monthly rates excluded — covered by vendor contract totals.

  // Amortized license costs (already paid, not actual monthly cash out)
  if(assets) assets.forEach(function(a){
    if((a.location||"")!==locId) return;
    if(a.costType==="amortized" && a.licenseMonthly){
      var amt=parseFloat(a.licenseMonthly)||0;
      if(amt){ amortized+=amt; items.push({label:a.make+" "+a.model+" license (amortized)",amount:amt,amortized:true}); }
    }
  });

  // From NETWORK_SUMMARY ISP cost
  var netSum = NETWORK_SUMMARY.find(function(n){return n.location===locId;});
  if(netSum&&netSum.ispMonthlyCost) {
    var amt = parseFloat(netSum.ispMonthlyCost)||0;
    if(amt) { total += amt; items.push({label:"ISP: "+netSum.isp, amount:amt}); }
  }

  return {total:total, amortized:amortized, items:items};
}

export default function App() {
  var [tab,setTab]   = useState("dashboard");
  var [showLookup,setShowLookup]   = useState(false);
  var [lookupImg,setLookupImg]     = useState(null);
  var [lookupPhase,setLookupPhase] = useState("idle");
  var [lookupData,setLookupData]   = useState(null);

  function runPhotoLookup(file){
    if(!file) return;
    var reader=new FileReader();
    reader.onload=async function(){
      var b64=reader.result.split(",")[1];
      setLookupImg(reader.result); setLookupPhase("loading"); setLookupData(null);
      try{
        var key=apiKey||ld("iatv11_apikey","");
        if(!key){ setLookupPhase("error"); setLookupData("Add your Anthropic API key in Settings to use photo lookup."); return; }
        var list=assets.map(function(a){return "ID:"+a.id+" "+[a.make,a.model,a.serial,a.hostname,a.assignedUser].filter(Boolean).join(" ");}).join("\n");
        var resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:file.type||"image/jpeg",data:b64}},{type:"text",text:"IT asset lookup. Identify make, model, serial, hostname, or asset tag visible in this photo. Compare to:\n"+list+"\n\nReply ONLY:\nMATCH: <id>\nCONFIDENCE: High|Medium|Low\nNOTES: <what matched>\n\nOR:\nNO_MATCH\nNOTES: <what you see>"}]}]})});
        var d=await resp.json();
        var txt=(d.content&&d.content[0]&&d.content[0].text)||"";
        if(txt.startsWith("MATCH:")){
          var id=(txt.match(/MATCH:\s*(\S+)/)||[])[1];
          var conf=(txt.match(/CONFIDENCE:\s*(.+)/)||[])[1]||"";
          var notes=(txt.match(/NOTES:\s*(.+)/)||[])[1]||"";
          setLookupPhase("found"); setLookupData({asset:assets.find(function(a){return a.id===id;})||null,id,conf,notes});
        } else {
          setLookupPhase("notfound"); setLookupData({notes:(txt.match(/NOTES:\s*(.+)/)||[])[1]||txt});
        }
      } catch(e){ setLookupPhase("error"); setLookupData(e.message); }
    };
    reader.readAsDataURL(file);
  }
  var [assets,setA]  = useState(function(){ return ld("iatv11_assets",  SEED_ASSETS.concat(SEED_NET_ASSETS)); });
  // Phones and DIDs are derived views of assets — no separate state
  var phones = assets.filter(function(a){ return a.type==="Phone"; });
  function setPhones(updater){
    setA(function(prev){
      var ph = prev.filter(function(a){return a.type==="Phone";});
      var rest = prev.filter(function(a){return a.type!=="Phone";});
      var updated = typeof updater==="function" ? updater(ph) : updater;
      return rest.concat(updated);
    });
  }
  var dids = phones.flatMap(function(a){
    return (a.dids||[]).map(function(d){
      return Object.assign({},d,{location:a.location,operator:a.operator,provider:a.provider,deviceId:a.id,avgMonthlyCost:a.avgMonthlyCost});
    });
  });
  function setDids(){ console.warn("setDids: edit asset dids[] directly"); }
  var [vendors,setV] = useState(function(){ return ld("iatv11_vendors", SEED_VENDORS); });
  var [ops,setOps]   = useState(function(){ return ld("iatv11_ops",     SEED_OPS); });
  var [locs,setLocs] = useState(function(){ return ld("iatv11_locs",    SEED_LOCS); });
  var [apiKey,setKey]= useState(function(){ return localStorage.getItem("iatv11_key")||""; });

  useEffect(function(){ sv("iatv11_assets",  assets);  }, [assets]);
  // phones and dids derived from assets — persistence handled by iatv11_assets
  useEffect(function(){ sv("iatv11_vendors", vendors); }, [vendors]);
  useEffect(function(){ sv("iatv11_ops",     ops);     }, [ops]);
  useEffect(function(){ sv("iatv11_locs",    locs);    }, [locs]);
  useEffect(function(){ if(apiKey) localStorage.setItem("iatv11_key",apiKey); }, [apiKey]);

  var locMap = {};
  locs.forEach(function(l){ locMap[l.id]=l; });

  return (
    <div style={{minHeight:"100vh",background:"#F3F4F6",fontFamily:"system-ui,sans-serif"}}>
      <div style={{background:"linear-gradient(135deg,#1B4F8A 0%,#0D3366 100%)",color:"#fff",padding:"0 1.25rem",display:"flex",alignItems:"center",gap:"1rem",height:54,boxShadow:"0 2px 8px rgba(0,0,0,.25)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{width:32,height:32,background:"rgba(255,255,255,.15)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,.25)"}}>
            <i className="ti ti-server" style={{fontSize:18,color:"#7EC8F4"}} aria-hidden={true}/>
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:15,lineHeight:1}}>Community Infrastructure Manager</div>
            <div style={{fontSize:10,color:"#7EC8F4",lineHeight:1.4}}>by Highlands IT Solutions</div>
          </div>
        </div>
        {ops[0]&&ops[0].logo
          ? (ops[0].webLink
            ? <a href={ops[0].webLink} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",flexShrink:0}}><img src={ops[0].logo} alt={ops[0].name} style={{height:34,maxWidth:160,objectFit:"contain",filter:"brightness(0) invert(1)",marginLeft:4}}/></a>
            : <img src={ops[0].logo} alt={ops[0].name} style={{height:34,maxWidth:160,objectFit:"contain",filter:"brightness(0) invert(1)",marginLeft:4,flexShrink:0}}/>)
          : <div style={{background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:99,padding:"3px 10px",fontSize:11,color:"#C8E4FF"}}>{ops[0]&&ops[0].name||"IT Asset Track"}</div>
        }
        <div style={{flex:1}}/>
        {[
          {key:"dashboard",icon:"ti-layout-dashboard",label:"Dashboard"},
          {key:"network",  icon:"ti-building-community",label:"Community"},
          {key:"phones",   icon:"ti-phone",            label:"Phones"},
          {key:"vendors",  icon:"ti-building",         label:"Vendors"},
          {key:"assets",   icon:"ti-device-desktop",  label:"Inventory"},
          {key:"settings", icon:"ti-settings",         label:"Settings"},
        ].map(function(t){
          return <button key={t.key} onClick={function(){setTab(t.key);}} style={{background:tab===t.key?"rgba(255,255,255,.18)":"transparent",border:"none",color:tab===t.key?"#fff":"rgba(255,255,255,.65)",padding:"0 11px",height:54,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:5,borderBottom:tab===t.key?"2px solid #7EC8F4":"2px solid transparent"}}>
            <i className={"ti "+t.icon} style={{fontSize:14}} aria-hidden={true}/>{t.label}
          </button>;
        })}
        <div style={{marginLeft:"auto",paddingRight:12,display:"flex",alignItems:"center"}}>
          <button onClick={function(){setShowLookup(true);setLookupPhase("idle");setLookupImg(null);setLookupData(null);}} style={{background:"#7C3AED",color:"#fff",border:"none",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
            <i className="ti ti-camera" style={{fontSize:14}} aria-hidden={true}/>Photo Lookup
          </button>
        </div>
      </div>
      <div style={{padding:"1.5rem",maxWidth:1400,margin:"0 auto"}}>
        {tab==="dashboard"&&<Dashboard assets={assets} phones={phones} locs={locs} locMap={locMap} vendors={vendors}/>}
        {tab==="assets"   &&<Assets    assets={assets} setAssets={setA} locs={locs} ops={ops} locMap={locMap} apiKey={apiKey} phones={phones}/>}
        {tab==="network"  &&<Network   assets={assets} locs={locs} locMap={locMap} vendors={vendors} dids={dids}/>}
        {tab==="phones"   &&<Phones    phones={phones} setPhones={setPhones} dids={dids} setDids={setDids} locs={locs} ops={ops} locMap={locMap} assets={assets} setAssets={setA}/>}
        {tab==="vendors"  &&<Vendors   vendors={vendors} setVendors={setV} ops={ops} apiKey={apiKey} locs={locs}/>}
        {tab==="settings" &&<Settings  ops={ops} setOps={setOps} locs={locs} setLocs={setLocs} apiKey={apiKey} setApiKey={setKey} vendors={vendors} dids={dids} assets={assets}/>}
      </div>
      <div style={{textAlign:"center",padding:"1rem",fontSize:11,color:"#9CA3AF",borderTop:"1px solid #E5E7EB",marginTop:"2rem"}}>
        Community Infrastructure Manager v0.8 · 2026 Highlands IT Solutions · Pilot: Highlands Senior Living
      </div>

      {showLookup&&(
        <div onClick={function(e){if(e.target===e.currentTarget)setShowLookup(false);}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:460,boxShadow:"0 24px 64px rgba(0,0,0,.3)",overflow:"hidden"}}>
            <div style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{color:"#fff",fontWeight:700,fontSize:15,display:"flex",alignItems:"center",gap:8}}>
                <i className="ti ti-camera" style={{fontSize:18}} aria-hidden={true}/>Photo Asset Lookup
              </div>
              <button onClick={function(){setShowLookup(false);}} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:6,color:"#fff",cursor:"pointer",width:28,height:28,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            </div>
            <div style={{padding:20}}>
              {lookupPhase==="idle"&&(
                <>
                  <p style={{fontSize:13,color:"#6B7280",margin:"0 0 14px"}}>Take or upload a photo of any device. AI matches it against your {assets.length} tracked assets.</p>
                  <label style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"2px dashed #C4B5FD",borderRadius:12,padding:"28px 16px",cursor:"pointer",background:"#F5F3FF",gap:8}}>
                    <i className="ti ti-upload" style={{fontSize:32,color:"#7C3AED"}} aria-hidden={true}/>
                    <span style={{fontWeight:600,color:"#7C3AED",fontSize:13}}>Tap to take photo or choose file</span>
                    <span style={{fontSize:11,color:"#9CA3AF"}}>Serial number, hostname, or asset tag visible = best results</span>
                    <input type="file" accept="image/*" capture="environment" onChange={function(e){if(e.target.files[0])runPhotoLookup(e.target.files[0]);}} style={{display:"none"}}/>
                  </label>
                </>
              )}
              {lookupPhase==="loading"&&(
                <div style={{textAlign:"center",padding:"24px 0"}}>
                  {lookupImg&&<img src={lookupImg} alt="" style={{width:120,height:90,objectFit:"cover",borderRadius:8,marginBottom:14,opacity:.7}}/>}
                  <div style={{fontSize:13,color:"#7C3AED",fontWeight:600,marginBottom:4}}>Analyzing photo…</div>
                  <div style={{fontSize:12,color:"#9CA3AF"}}>Comparing against {assets.length} assets</div>
                </div>
              )}
              {lookupPhase==="found"&&lookupData&&(
                <div>
                  {lookupImg&&<img src={lookupImg} alt="" style={{width:"100%",height:140,objectFit:"cover",borderRadius:10,marginBottom:14}}/>}
                  <div style={{background:"#DCFCE7",border:"1px solid #86EFAC",borderRadius:10,padding:14,marginBottom:12}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#166534",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
                      <i className="ti ti-circle-check" style={{fontSize:16}} aria-hidden={true}/>Match found — {lookupData.conf} confidence
                    </div>
                    {lookupData.asset&&<div style={{fontSize:13,color:"#166534",display:"flex",flexDirection:"column",gap:3}}>
                      <div style={{fontWeight:600,fontSize:14}}>{[lookupData.asset.make,lookupData.asset.model].filter(Boolean).join(" ")||"(unnamed)"}</div>
                      {lookupData.asset.assignedUser&&<div>Assigned: {lookupData.asset.assignedUser}</div>}
                      {lookupData.asset.serial&&<div>Serial: {lookupData.asset.serial}</div>}
                      {lookupData.asset.hostname&&<div>Hostname: {lookupData.asset.hostname}</div>}
                      {lookupData.asset.location&&<div>Location: {lookupData.asset.location}</div>}
                      <div style={{fontSize:11,marginTop:4,opacity:.75}}>AI noted: {lookupData.notes}</div>
                    </div>}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={function(){setShowLookup(false);setTab("assets");}} style={Object.assign({},BP,{flex:1,fontSize:12})}>Open Asset Record</button>
                    <button onClick={function(){setLookupPhase("idle");setLookupImg(null);}} style={Object.assign({},BS,{fontSize:12})}>Try again</button>
                  </div>
                </div>
              )}
              {lookupPhase==="notfound"&&lookupData&&(
                <div>
                  {lookupImg&&<img src={lookupImg} alt="" style={{width:"100%",height:140,objectFit:"cover",borderRadius:10,marginBottom:14}}/>}
                  <div style={{background:"#FEF9C3",border:"1px solid #FDE047",borderRadius:10,padding:14,marginBottom:12}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#854D0E",marginBottom:6}}>No match in inventory</div>
                    <div style={{fontSize:12,color:"#92400E"}}>AI observed: {lookupData.notes}</div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={function(){setShowLookup(false);setTab("assets");}} style={Object.assign({},BP,{flex:1,fontSize:12,background:"#D97706"})}>+ Add as New Asset</button>
                    <button onClick={function(){setLookupPhase("idle");setLookupImg(null);}} style={Object.assign({},BS,{fontSize:12})}>Try again</button>
                  </div>
                </div>
              )}
              {lookupPhase==="error"&&(
                <div>
                  <div style={{background:"#FEE2E2",border:"1px solid #FECACA",borderRadius:10,padding:14,marginBottom:12,fontSize:13,color:"#991B1B"}}>{lookupData}</div>
                  <button onClick={function(){setLookupPhase("idle");setLookupImg(null);}} style={Object.assign({},BS,{width:"100%",fontSize:12})}>Try again</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RenewalWarning({vendors, locs}){
  var now = new Date();
  var warnings = [];
  (vendors||[]).forEach(function(v){
    var checkDates = [];
    if(v.contractExpiry) checkDates.push({date:v.contractExpiry, label:v.name+" contract expiry", amount:v.renewalAmount, loc:""});
    if(v.renewalDate)    checkDates.push({date:v.renewalDate,    label:v.name+" renewal",          amount:v.renewalAmount, loc:""});
    (v.contracts||[]).forEach(function(c){
      if(c.endDate) checkDates.push({date:c.endDate, label:v.name+" — "+c.description, amount:v.renewalAmount||"", loc:c.locationId});
    });
    checkDates.forEach(function(item){
      if(!item.date) return;
      var d = new Date(item.date);
      if(isNaN(d)) return;
      var daysOut = Math.round((d-now)/(1000*60*60*24));
      if(daysOut < 730) {
        var locObj = item.loc ? (locs||[]).find(function(l){return l.id===item.loc||l.name===item.loc;}) : null;
        warnings.push({label:item.label, date:item.date, daysOut:daysOut, amount:item.amount||"", locName:locObj?locObj.name:item.loc, isMeraki:/meraki/i.test(v.name||"")});
      }
    });
  });
  var seen = {}; warnings = warnings.filter(function(w){if(seen[w.label])return false;seen[w.label]=true;return true;});
  if(warnings.length===0) return null;
  warnings.sort(function(a,b){return a.daysOut-b.daysOut;});
  return(<div style={{marginBottom:"1rem"}}>{warnings.map(function(w,i){
    var isMeraki=w.isMeraki,isUrgent=w.daysOut<365||isMeraki;
    var bg=isMeraki?"#FEE2E2":isUrgent?"#FEF3C7":"#FFF7ED";
    var bdr=isMeraki?"#DC2626":isUrgent?"#F59E0B":"#FB923C";
    var clr=isMeraki?"#991B1B":isUrgent?"#92400E":"#9A3412";
    var dateStr=new Date(w.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
    return(<div key={i} style={{background:bg,border:"2px solid "+bdr,borderRadius:8,padding:"8px 14px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:4}}>
      <i className={"ti "+(isMeraki?"ti-alert-octagon":"ti-alert-triangle")} style={{fontSize:isMeraki?22:18,color:bdr,flexShrink:0}} aria-hidden={true}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:700,fontSize:isMeraki?14:13,color:clr}}>{isMeraki?"🔴 ":""}{w.label}{w.locName?" — "+w.locName:""}</div>
        <div style={{fontSize:12,color:clr,opacity:.85}}>Renews {dateStr} ({w.daysOut>0?w.daysOut+" days":"OVERDUE"}){w.amount&&<span style={{fontWeight:700}}> — ${parseFloat(w.amount).toLocaleString()} DUE AT RENEWAL</span>}</div>
      </div>
      {isMeraki&&<div style={{fontSize:11,fontWeight:700,color:"#DC2626",background:"#fff",border:"1px solid #DC2626",borderRadius:6,padding:"2px 8px",flexShrink:0,whiteSpace:"nowrap"}}>⚠️ DEVICES GO OFFLINE</div>}
    </div>);
  })}</div>);
}

function Dashboard(p) {
  var assets=p.assets,locs=p.locs,phones=p.phones,locMap=p.locMap,vendors=p.vendors||[];
  var byCat=CATS.map(function(c){return{cat:c,n:assets.filter(function(a){return a.category===c;}).length};}).filter(function(x){return x.n>0;});
  var byLoc=locs.map(function(l){return{loc:l.shortName,n:assets.filter(function(a){return a.location===l.id;}).length};}).filter(function(x){return x.n>0;}).sort(function(a,b){return b.n-a.n;});
  var phonesByLoc=locs.map(function(l){return{loc:l.shortName,n:phones.filter(function(ph){return ph.location===l.id;}).length};}).filter(function(x){return x.n>0;}).sort(function(a,b){return b.n-a.n;});
  var byProvider={};
  phones.forEach(function(ph){ var pv=ph.provider||"Unknown"; byProvider[pv]=(byProvider[pv]||0)+1; });
  var offV={},winV={};
  assets.forEach(function(a){if(a.officeVersion)offV[a.officeVersion]=(offV[a.officeVersion]||0)+1;if(a.osVersion)winV[a.osVersion]=(winV[a.osVersion]||0)+1;});
  var maxC=Math.max.apply(null,byCat.map(function(x){return x.n;}).concat([1]));
  var maxL=Math.max.apply(null,byLoc.map(function(x){return x.n;}).concat([1]));
  var maxPL=Math.max.apply(null,phonesByLoc.map(function(x){return x.n;}).concat([1]));
  var maxO=Math.max.apply(null,Object.values(offV).concat([1]));
  var maxW=Math.max.apply(null,Object.values(winV).concat([1]));
  var totalDids=phones.reduce(function(sum,p){return sum+(p.dids?p.dids.length:0);},0);
  var stats=[
    {label:"Total Assets",    value:assets.length,                                                          color:"#1B4F8A",bg:"#EBF2FB"},
    {label:"Active",          value:assets.filter(function(a){return a.status==="Active";}).length,          color:"#166534",bg:"#DCFCE7"},
    {label:"Inactive",        value:assets.filter(function(a){return a.status==="Inactive";}).length,        color:"#92400E",bg:"#FEF3C7"},
    {label:"Phone Devices",   value:phones.length,                                                           color:"#6D28D9",bg:"#EDE9FE"},
    {label:"DIDs Tracked",    value:totalDids,                                                               color:"#0891B2",bg:"#E0F2FE"},
    {label:"Locations",       value:locs.length,                                                             color:"#166534",bg:"#DCFCE7"},
  ];
  return (
    <div>
      <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:"1.25rem"}}>
        <h2 style={{fontSize:20,fontWeight:600,margin:0,color:"#111827"}}>Dashboard</h2>
        <span style={{fontSize:12,color:"#6B7280"}}>Highlands Senior Living · {assets.length} assets · {phones.length} phone devices · {totalDids} DIDs · {locs.length} locations</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:"1.5rem"}}>
        {stats.map(function(s){return<div key={s.label} style={{background:s.bg,borderRadius:10,padding:"14px 16px"}}><div style={{fontSize:11,color:s.color,fontWeight:600,marginBottom:4,textTransform:"uppercase",letterSpacing:".4px"}}>{s.label}</div><div style={{fontSize:26,fontWeight:700,color:s.color,lineHeight:1}}>{s.value}</div></div>;})}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}}>
        <DCard title="Assets by category">{byCat.map(function(x){return<Bar key={x.cat} label={x.cat} value={x.n} max={maxC} color="#1B4F8A"/>;})}</DCard>
        <DCard title="Phones by location">{phonesByLoc.map(function(x){return<Bar key={x.loc} label={x.loc} value={x.n} max={maxPL} color="#6D28D9"/>;})}</DCard>
        <DCard title="Office versions">{Object.keys(offV).map(function(v){return<Bar key={v} label={v} value={offV[v]} max={maxO} color="#0891B2"/>;})}</DCard>
        <DCard title="Phone providers">
          {Object.keys(byProvider).filter(function(k){return byProvider[k]>0;}).map(function(k){var provColors={"GoTo":"#1B4F8A","8x8":"#6D28D9","AT&T":"#166534"};var col=provColors[k]||"#0891B2";return<Bar key={k} label={k} value={byProvider[k]} max={Math.max.apply(null,Object.values(byProvider).concat([1]))} color={col}/>;})}</DCard>
      </div>
      <div style={{height:"1.25rem"}}/>
      <DCard title="Network overview — all 7 locations">
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{background:"#F9FAFB",borderBottom:"1px solid #E5E7EB"}}>{["Location","ISP","Router","Switches","APs","WiFi","Admin SSID","Guest SSID","Phone","Cameras"].map(function(h){return<th key={h} style={{padding:"6px 10px",textAlign:"left",fontWeight:600,color:"#6B7280",fontSize:11,whiteSpace:"nowrap"}}>{h}</th>;})}</tr></thead>
            <tbody>{NETWORK_SUMMARY.map(function(n,i){var locObj=SEED_LOCS.find(function(l){return l.id===n.location;});var ispC={Comcast:{c:"#1D4ED8",bg:"#DBEAFE"},"AT&T":{c:"#166534",bg:"#DCFCE7"},Starlink:{c:"#92400E",bg:"#FEF3C7"},"Starlink+Meraki":{c:"#92400E",bg:"#FEF3C7"}};var ic=ispC[n.isp]||{c:"#6B7280",bg:"#F3F4F6"};var wc=n.wifiStandard.indexOf("6")>=0?{c:"#166534",bg:"#DCFCE7"}:{c:"#6B7280",bg:"#F3F4F6"};
              var activeCams=p.assets.filter(function(a){return a.location===n.location&&a.category==="Security Camera"&&a.status!=="Inactive";}).reduce(function(sum,a){return sum+(a.cameraCount||1);},0);
              var inactiveCams=p.assets.filter(function(a){return a.location===n.location&&a.category==="Security Camera"&&a.status==="Inactive";}).reduce(function(sum,a){return sum+(a.cameraCount||1);},0);
              var locCamAssets=p.assets.filter(function(a){return a.location===n.location&&a.category==="Security Camera";});
              var camVendors=[...new Set(locCamAssets.map(function(a){return a.make;}).filter(Boolean))].join("/");
              var camLabel=activeCams>0?(activeCams+(inactiveCams>0?" ("+inactiveCams+" off)":"")+(camVendors?" · "+camVendors:"")):(inactiveCams>0?"0 ("+inactiveCams+" off)"+(camVendors?" · "+camVendors:""):"—");
              return<tr key={n.location} style={{borderBottom:i<NETWORK_SUMMARY.length-1?"1px solid #F3F4F6":"none"}}><td style={{padding:"7px 10px",fontWeight:600,color:"#111827",whiteSpace:"nowrap"}}>{locObj?locObj.shortName:n.location}</td><td style={{padding:"7px 10px"}}><span style={{fontSize:11,fontWeight:600,color:ic.c,background:ic.bg,padding:"1px 6px",borderRadius:99}}>{n.isp}</span></td><td style={{padding:"7px 10px",fontSize:12,color:"#374151"}}>{n.router}</td><td style={{padding:"7px 10px",textAlign:"center",fontWeight:600,color:"#374151"}}>{n.switches||"—"}</td><td style={{padding:"7px 10px",textAlign:"center",fontWeight:600,color:"#374151"}}>{n.aps}</td><td style={{padding:"7px 10px"}}>{n.wifiStandard?<span style={{fontSize:11,fontWeight:600,color:wc.c,background:wc.bg,padding:"1px 6px",borderRadius:99}}>{n.wifiStandard}</span>:"—"}</td><td style={{padding:"7px 10px",fontSize:11,color:"#6B7280"}}>{n.adminSsid||"—"}</td><td style={{padding:"7px 10px",fontSize:11,color:"#6B7280"}}>{n.residentSsid||"—"}</td><td style={{padding:"7px 10px"}}><span style={{fontSize:11,fontWeight:600,color:"#6D28D9",background:"#EDE9FE",padding:"1px 6px",borderRadius:99}}>{n.phoneSystem}</span></td><td style={{padding:"7px 10px",fontSize:11,color:activeCams>0?"#374151":"#9CA3AF",fontWeight:activeCams>0?600:400}}>{camLabel}</td></tr>;})}
            </tbody>
          </table>
        </div>
      </DCard>
      <div style={{marginTop:"1.5rem",padding:"14px 20px",background:"linear-gradient(135deg,#0F172A,#1E3A5F)",borderRadius:12,textAlign:"center"}}>
        <div style={{fontSize:13,fontWeight:600,color:"#7EC8F4",letterSpacing:".2px"}}>Community Infrastructure Manager</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.55)",marginTop:3,fontStyle:"italic"}}>Bringing industrial-grade infrastructure management to senior living operations.</div>
      </div>
    </div>
  );
}
function DCard(p){return<div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"1.25rem",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}><div style={{fontWeight:600,fontSize:12,marginBottom:"1rem",color:"#6B7280",textTransform:"uppercase",letterSpacing:".5px"}}>{p.title}</div>{p.children}</div>;}
function Bar(p){var pct=Math.round((p.value/p.max)*100);return<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}><div style={{width:128,fontSize:12,color:"#6B7280",flexShrink:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={p.label}>{p.label}</div><div style={{flex:1,background:"#F3F4F6",borderRadius:4,height:16,overflow:"hidden"}}><div style={{width:pct+"%",background:p.color,height:"100%",borderRadius:4,minWidth:4}}/></div><div style={{width:20,textAlign:"right",fontSize:12,fontWeight:600,color:"#374151"}}>{p.value}</div></div>;}

function Assets(p) {
  var assets=p.assets.filter(function(a){return a.type!=="Phone";}),setAssets=p.setAssets,locs=p.locs,ops=p.ops,locMap=p.locMap,apiKey=p.apiKey;
  var [search,setSrch]=useState("");var [fLoc,setFLoc]=useState("");var [fCat,setFCat]=useState("");var [fStat,setFStat]=useState("");var [edit,setEdit]=useState(null);var [expId,setExp]=useState(null);
  var [importMsg,setImportMsg]=useState(null);

  var CSV_FIELDS=["id","type","operator","location","subLocation","category","status","assignedUser","make","model","serial","hostname","osVersion","osProductKey","officeVersion","officeProductKey","processor","ram","deviceId","productId","systemType","softwareSource","macAddress","notes","entryDate","warrantyExpiry","vendor","purchaseDate"];

  function exportCSV(){
    var rows=[CSV_FIELDS.join(",")];
    assets.forEach(function(a){
      rows.push(CSV_FIELDS.map(function(f){
        var v=(a[f]===undefined||a[f]===null)?"":String(a[f]);
        return '"'+v.replace(/"/g,'""')+'"';
      }).join(","));
    });
    var blob=new Blob([rows.join("\n")],{type:"text/csv"});
    var url=URL.createObjectURL(blob);
    var a=document.createElement("a");
    a.href=url; a.download="assets-"+new Date().toISOString().slice(0,10)+".csv"; a.click();
    URL.revokeObjectURL(url);
  }

  function importCSV(e){
    var file=e.target.files[0]; if(!file) return;
    var reader=new FileReader();
    reader.onload=function(){
      try{
        var lines=reader.result.split(/\r?\n/).filter(function(l){return l.trim();});
        if(lines.length<2){setImportMsg({err:"CSV has no data rows."});return;}
        var headers=lines[0].split(",").map(function(h){return h.replace(/^"|"$/g,"").trim();});
        var imported=0,skipped=0,updated=0;
        var newAssets=assets.slice();
        lines.slice(1).forEach(function(line){
          var vals=[]; var cur=""; var inQ=false;
          for(var i=0;i<line.length;i++){
            var ch=line[i];
            if(ch==='"'&&!inQ){inQ=true;}
            else if(ch==='"'&&inQ&&line[i+1]==='"'){cur+='"';i++;}
            else if(ch==='"'&&inQ){inQ=false;}
            else if(ch===','&&!inQ){vals.push(cur);cur="";}
            else{cur+=ch;}
          }
          vals.push(cur);
          var row={};
          headers.forEach(function(h,i){row[h]=vals[i]||"";});
          if(!row.id&&!row.make&&!row.model&&!row.serial){skipped++;return;}
          var id=row.id||uid();
          var existing=newAssets.findIndex(function(a){return a.id===id;});
          var record=Object.assign({},existing>=0?newAssets[existing]:{},row,{id:id});
          if(existing>=0){newAssets[existing]=record;updated++;}
          else{newAssets.push(record);imported++;}
        });
        setAssets(newAssets);
        setImportMsg({ok:true,imported,updated,skipped});
      }catch(err){setImportMsg({err:"Parse error: "+err.message});}
    };
    reader.readAsText(file);
    e.target.value="";
  }

  var filtered=assets.filter(function(a){var q=search.toLowerCase();var ok=!q||[a.assignedUser,a.make,a.model,a.serial,a.hostname,a.macAddress,a.deviceId,a.notes,a.officeVersion,a.officeProductKey,a.osVersion].some(function(f){return f&&f.toLowerCase().indexOf(q)>=0;});return ok&&(!fLoc||a.location===fLoc)&&(!fCat||a.category===fCat)&&(!fStat||a.status===fStat);});
  var blank={type:"PC/software",operator:(ops[0]&&ops[0].id)||"",location:"",subLocation:"",category:"Laptop",status:"Active",ownershipType:"Owned",assignedUser:"",make:"",model:"",serial:"",hostname:"",osVersion:"",osProductKey:"",officeVersion:"",officeProductKey:"",processor:"",ram:"",deviceId:"",productId:"",systemType:"",softwareSource:"",macAddress:"",notes:"",entryDate:"",warrantyExpiry:"",vendor:"",purchaseDate:""};
  if(edit!==null) return <AssetForm asset={edit} locs={locs} ops={ops} apiKey={apiKey} onSave={function(a){if(a.id&&assets.find(function(x){return x.id===a.id;}))setAssets(function(prev){return prev.map(function(x){return x.id===a.id?a:x;});});else setAssets(function(prev){return prev.concat([Object.assign({},a,{id:uid()})]);});setEdit(null);}} onCancel={function(){setEdit(null);}}/>;
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1rem"}}>
        <h2 style={{fontSize:20,fontWeight:600,margin:0,color:"#111827",flex:1}}>Asset Inventory <span style={{fontSize:13,color:"#6B7280",fontWeight:400}}>({assets.length} records)</span></h2>
        <button onClick={exportCSV} style={Object.assign({},BS,{fontSize:12,display:"flex",alignItems:"center",gap:4})}><i className="ti ti-download" aria-hidden={true}/> Export CSV</button>
        <label style={Object.assign({},BS,{fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4,margin:0})}>
          <i className="ti ti-upload" aria-hidden={true}/> Import CSV
          <input type="file" accept=".csv,text/csv" onChange={importCSV} style={{display:"none"}}/>
        </label>
        <button onClick={function(){setEdit(blank);}} style={BP}><i className="ti ti-plus" aria-hidden={true}/> Add Asset</button>
      </div>
      {importMsg&&(
        <div style={{marginBottom:"1rem",padding:"10px 14px",borderRadius:8,background:importMsg.err?"#FEE2E2":"#DCFCE7",border:"1px solid "+(importMsg.err?"#FECACA":"#86EFAC"),fontSize:13,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{color:importMsg.err?"#991B1B":"#166534"}}>
            {importMsg.err||("Import complete — "+importMsg.imported+" added, "+importMsg.updated+" updated, "+importMsg.skipped+" skipped.")}
          </span>
          <button onClick={function(){setImportMsg(null);}} style={{background:"transparent",border:"none",cursor:"pointer",color:"#6B7280",fontSize:16}}>✕</button>
        </div>
      )}
      <div style={{display:"flex",gap:8,marginBottom:"1rem",flexWrap:"wrap"}}>
        <input value={search} onChange={function(e){setSrch(e.target.value);}} placeholder="Search name, model, serial, key..." style={Object.assign({},INP,{flex:"1 1 180px",minWidth:140})}/>
        <select value={fLoc} onChange={function(e){setFLoc(e.target.value);}} style={SEL}><option value="">All locations</option>{locs.map(function(l){return<option key={l.id} value={l.id}>{l.name}</option>;})}</select>
        <select value={fCat} onChange={function(e){setFCat(e.target.value);}} style={SEL}><option value="">All categories</option>{CATS.map(function(c){return<option key={c} value={c}>{c}</option>;})}</select>
        <select value={fStat} onChange={function(e){setFStat(e.target.value);}} style={SEL}><option value="">All statuses</option>{STATS.map(function(s){return<option key={s} value={s}>{s}</option>;})}</select>
        <span style={{fontSize:13,color:"#6B7280",display:"flex",alignItems:"center"}}>{filtered.length} shown</span>
      </div>
      <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        {filtered.length===0&&<div style={{padding:"2rem",textAlign:"center",color:"#9CA3AF"}}>No records match.</div>}
        {filtered.map(function(a,i){
          var expanded=expId===a.id;
          var locLabel=a.location&&locMap[a.location]?locMap[a.location].shortName:a.location;
          return(<div key={a.id} style={{borderBottom:i<filtered.length-1?"1px solid #F3F4F6":"none"}}>
            <div onClick={function(){setExp(expanded?null:a.id);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",background:expanded?"#F9FAFB":"#fff"}}>
              <i className={"ti "+catIcon(a.category)} style={{fontSize:16,color:"#1B4F8A",flexShrink:0}} aria-hidden={true}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                  <span style={{fontWeight:600,fontSize:14,color:"#111827"}}>{a.assignedUser||"--"}</span>
                  {(a.make||a.model)&&<span style={{fontSize:13,color:"#6B7280"}}>{[a.make,a.model].filter(Boolean).join(" ")}</span>}
                  <span style={{fontSize:11,color:"#1B4F8A",background:"#EBF2FB",padding:"1px 7px",borderRadius:99,fontWeight:500}}>{a.category}</span>
                  {a.status==="Inactive"&&<span style={{fontSize:11,fontWeight:500,color:"#92400E",background:"#FEF3C7",padding:"1px 7px",borderRadius:99}}>Inactive</span>}
                  {(a.ownershipType&&a.ownershipType!=="Owned")&&<span style={{fontSize:10,fontWeight:700,background:"#FFF7ED",color:"#C2410C",borderRadius:99,padding:"1px 6px",border:"1px solid #FED7AA"}}>{a.ownershipType}</span>}
                </div>
                <div style={{fontSize:12,color:"#9CA3AF",marginTop:2,display:"flex",gap:10,flexWrap:"wrap"}}>
                  {a.serial&&<span>SN: {a.serial}</span>}
                  {a.hostname&&<span>{a.hostname}</span>}
                  {locLabel&&<span>{locLabel}{a.subLocation?" / "+a.subLocation:""}</span>}
                  {a.officeVersion&&<span>{a.officeVersion}</span>}
                  {a.osVersion&&<span>{a.osVersion}</span>}
                  {a.notes&&<span><RedFlag text={a.notes}/></span>}
                </div>
              </div>
              <div style={{display:"flex",gap:4}} onClick={function(e){e.stopPropagation();}}>
                <button onClick={function(){setEdit(a);}} style={BI}><i className="ti ti-edit" aria-hidden={true}/></button>
                <button onClick={function(){if(confirm("Delete?"))setAssets(function(prev){return prev.filter(function(x){return x.id!==a.id;});});}} style={Object.assign({},BI,{color:"#DC2626"})}><i className="ti ti-trash" aria-hidden={true}/></button>
              </div>
            </div>
            {expanded&&<AssetDetail a={a} locMap={locMap}/>}
          </div>);
        })}
      </div>
    </div>
  );
}
function AssetDetail(p){var a=p.a,locMap=p.locMap;var locLabel=a.location&&locMap[a.location]?locMap[a.location].name:a.location;var rows=[["Type",a.type],["Location",locLabel],["Sub-location",a.subLocation],["Entry date",a.entryDate],["Serial",a.serial],["Hostname",a.hostname],["MAC address",a.macAddress],["OS version",a.osVersion],["Product ID",a.productId],["Office version",a.officeVersion],["Office product key",a.officeProductKey],["Processor",a.processor],["RAM",a.ram],["System type",a.systemType],["Device ID",a.deviceId],["Notes",a.notes]].filter(function(r){return r[1];});return<div style={{padding:"4px 14px 14px 40px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"3px 20px",background:"#FAFAFA"}}>{rows.map(function(r){return<div key={r[0]} style={{display:"flex",gap:6,fontSize:12,padding:"3px 0"}}><span style={{color:"#9CA3AF",minWidth:110,flexShrink:0}}>{r[0]}</span><span style={{color:"#374151",wordBreak:"break-all"}}>{r[1]}</span></div>;})}</div>;}
function catIcon(c){var m={"Laptop":"ti-device-laptop","Desktop":"ti-device-desktop","Software License":"ti-license","ATA / Fax":"ti-fax","Router / Firewall":"ti-shield","Switch":"ti-switch","Access Point":"ti-wifi","Network Controller":"ti-server-2","Server":"ti-server","Printer":"ti-printer","Monitor":"ti-device-tv","UPS":"ti-battery"};return m[c]||"ti-box";}

function AssetForm(p) {
  var asset=p.asset,locs=p.locs,ops=p.ops,apiKey=p.apiKey,onSave=p.onSave,onCancel=p.onCancel;
  var [form,setForm] = useState(asset);
  var [photos,setPhotos] = useState([]);
  var [aiMsg,setAiMsg]   = useState("");
  var [aiLoad,setAiLoad] = useState(false);

  function set(k,v){ setForm(function(f){ var n=Object.assign({},f); n[k]=v; return n; }); }

  function handlePhotos(e){
    Promise.all(Array.from(e.target.files).map(function(f){
      return new Promise(function(res){
        var r=new FileReader();
        r.onload=function(){ res({base64:r.result.split(",")[1],mimeType:f.type}); };
        r.readAsDataURL(f);
      });
    })).then(setPhotos);
  }

  async function handleAI(){
    if(!apiKey){ setAiMsg("Add API key in Settings."); return; }
    if(!photos.length){ setAiMsg("Upload a photo first."); return; }
    setAiLoad(true); setAiMsg("Extracting...");
    try{
      var res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,messages:[{role:"user",content:
          photos.map(function(ph){return{type:"image",source:{type:"base64",media_type:ph.mimeType,data:ph.base64}};})
          .concat([{type:"text",text:"Analyze this IT equipment. Return ONLY JSON: {\"make\":\"\",\"model\":\"\",\"serial\":\"\",\"macAddress\":\"\",\"category\":\"\",\"processor\":\"\",\"ram\":\"\",\"osVersion\":\"\",\"hostname\":\"\",\"deviceId\":\"\"}"}])
        }]})
      });
      var data=await res.json();
      var text=(data.content&&data.content.map(function(c){return c.text||"";}).join(""))||"";
      var parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
      setForm(function(f){ var n=Object.assign({},f); Object.keys(parsed).forEach(function(k){ if(parsed[k]) n[k]=parsed[k]; }); return n; });
      setAiMsg("Extracted successfully");
    }catch(e){ setAiMsg("Failed: "+e.message); }
    setAiLoad(false);
  }

  var isNet = form.type==="Network";

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem"}}>
        <button onClick={onCancel} style={{background:"transparent",border:"none",cursor:"pointer",color:"#6B7280",fontSize:13,display:"flex",alignItems:"center",gap:4}}>
          <i className="ti ti-arrow-left" aria-hidden={true}/> Back
        </button>
        <h2 style={{fontSize:19,fontWeight:600,margin:0,color:"#111827"}}>{form.id?"Edit Record":"New Record"}</h2>
      </div>

      <div style={{background:"#EBF5FF",border:"1px solid #BFDBFE",borderRadius:10,padding:"1rem 1.25rem",marginBottom:"1.25rem"}}>
        <div style={{fontWeight:600,fontSize:13,color:"#1D4ED8",marginBottom:8}}>AI Photo Extraction</div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <input type="file" accept="image/*" multiple onChange={handlePhotos} style={{fontSize:13}}/>
          <button onClick={handleAI} disabled={aiLoad||!photos.length} style={Object.assign({},BP,{opacity:(!photos.length||aiLoad)?0.5:1,background:"#1D4ED8"})}>
            {aiLoad?"Extracting...":"Extract from photos"}
          </button>
          {!apiKey&&<span style={{fontSize:12,color:"#1D4ED8"}}>Add API key in Settings to enable</span>}
        </div>
        {aiMsg&&<div style={{fontSize:12,color:"#1D4ED8",marginTop:8}}>{aiMsg}</div>}
      </div>

      <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"1.5rem",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        <FormSection label="Classification">
          <FormField label="Record type"   value={form.type}        onChange={function(e){set("type",e.target.value);}}        opts={["PC/software","Network","ATA","Software","PC"]}/>
          <FormField label="Operator"       value={form.operator}    onChange={function(e){set("operator",e.target.value);}}    opts={ops}/>
          <FormField label="Location"       value={form.location}    onChange={function(e){set("location",e.target.value);}}    opts={locs}/>
          <FormField label="Sub-location"   value={form.subLocation} onChange={function(e){set("subLocation",e.target.value);}}/>
          <FormField label="Category"       value={form.category}    onChange={function(e){set("category",e.target.value);}}    opts={CATS}/>
          <FormField label="Status"         value={form.status}      onChange={function(e){set("status",e.target.value);}}      opts={STATS}/>
          <FormField label="Entry date"     value={form.entryDate}   onChange={function(e){set("entryDate",e.target.value);}}   type="date"/>
        </FormSection>

        {!isNet&&(
          <FormSection label="User and Device">
            <FormField label="Assigned user"  value={form.assignedUser} onChange={function(e){set("assignedUser",e.target.value);}}/>
            <FormField label="Make"           value={form.make}         onChange={function(e){set("make",e.target.value);}}/>
            <FormField label="Model"          value={form.model}        onChange={function(e){set("model",e.target.value);}}/>
            <FormField label="Serial number"  value={form.serial}       onChange={function(e){set("serial",e.target.value);}}/>
            <FormField label="Hostname"       value={form.hostname}     onChange={function(e){set("hostname",e.target.value);}}/>
            <FormField label="MAC address"    value={form.macAddress}   onChange={function(e){set("macAddress",e.target.value);}}/>
          </FormSection>
        )}

        {!isNet&&(
          <FormSection label="Operating System">
            <FormField label="Windows version"    value={form.osVersion}    onChange={function(e){set("osVersion",e.target.value);}}/>
            <FormField label="Windows product key" value={form.osProductKey} onChange={function(e){set("osProductKey",e.target.value);}}/>
            <FormField label="Product ID"          value={form.productId}    onChange={function(e){set("productId",e.target.value);}}/>
          </FormSection>
        )}

        {!isNet&&(
          <FormSection label="Office and Software">
            <FormField label="Office version"     value={form.officeVersion}     onChange={function(e){set("officeVersion",e.target.value);}}/>
            <FormField label="Office product key"  value={form.officeProductKey}  onChange={function(e){set("officeProductKey",e.target.value);}}/>
            <FormField label="Software source URL" value={form.softwareSource}    onChange={function(e){set("softwareSource",e.target.value);}}/>
          </FormSection>
        )}

        {!isNet&&(
          <FormSection label="Hardware">
            <FormField label="Processor"    value={form.processor}  onChange={function(e){set("processor",e.target.value);}}/>
            <FormField label="RAM"          value={form.ram}        onChange={function(e){set("ram",e.target.value);}}/>
            <FormField label="System type"  value={form.systemType} onChange={function(e){set("systemType",e.target.value);}}/>
            <FormField label="Device ID"    value={form.deviceId}   onChange={function(e){set("deviceId",e.target.value);}}/>
          </FormSection>
        )}

        {isNet&&(
          <FormSection label="Network Details">
            <FormField label="Make"           value={form.make}        onChange={function(e){set("make",e.target.value);}}/>
            <FormField label="Model"          value={form.model}       onChange={function(e){set("model",e.target.value);}}/>
            <FormField label="Serial number"  value={form.serial}      onChange={function(e){set("serial",e.target.value);}}/>
            <FormField label="Hostname"       value={form.hostname}    onChange={function(e){set("hostname",e.target.value);}}/>
            <FormField label="MAC address"    value={form.macAddress}  onChange={function(e){set("macAddress",e.target.value);}}/>
            <FormField label="IP address"     value={form.ipAddress}   onChange={function(e){set("ipAddress",e.target.value);}}/>
            <FormField label="ISP"            value={form.isp}         onChange={function(e){set("isp",e.target.value);}}/>
            <FormField label="Port count"     value={form.portCount}   onChange={function(e){set("portCount",e.target.value);}}/>
            <FormField label="Managed"        value={form.managed}     onChange={function(e){set("managed",e.target.value);}}     opts={["Managed","Unmanaged",""]}/>
            <FormField label="PoE"            value={form.poe}         onChange={function(e){set("poe",e.target.value);}}         opts={["Yes","",""]}/>
            <FormField label="VLAN"           value={form.vlan}        onChange={function(e){set("vlan",e.target.value);}}/>
            <FormField label="WiFi standard"  value={form.wifiStandard} onChange={function(e){set("wifiStandard",e.target.value);}} opts={["WiFi 5","WiFi 6","WiFi 6E",""]}/>
            <FormField label="Admin SSID"     value={form.adminSsid}   onChange={function(e){set("adminSsid",e.target.value);}}/>
            <FormField label="Resident SSID"  value={form.residentSsid} onChange={function(e){set("residentSsid",e.target.value);}}/>
            <FormField label="Firmware"       value={form.firmwareVersion} onChange={function(e){set("firmwareVersion",e.target.value);}}/>
            <FormField label="License key"    value={form.licenseKey}  onChange={function(e){set("licenseKey",e.target.value);}}/>
            <FormField label="Renewal date"   value={form.renewalDate} onChange={function(e){set("renewalDate",e.target.value);}} type="date"/>
          </FormSection>
        )}

        <FormSection label="Procurement">
          <FormField label="Ownership"       value={form.ownershipType||"Owned"} onChange={function(e){set("ownershipType",e.target.value);}} opts={["Owned","Vendor Owned / Leased","ISP Provided","Vendor Loaner","Rented"]}/>
          <FormField label="Vendor"          value={form.vendor}        onChange={function(e){set("vendor",e.target.value);}}/>
          <FormField label="Purchase date"   value={form.purchaseDate}  onChange={function(e){set("purchaseDate",e.target.value);}}  type="date"/>
          <FormField label="Warranty expiry" value={form.warrantyExpiry} onChange={function(e){set("warrantyExpiry",e.target.value);}} type="date"/>
        </FormSection>

        <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:"1.25rem"}}>
          <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Notes</label>
          <textarea value={form.notes||""} onChange={function(e){set("notes",e.target.value);}} rows={3} style={Object.assign({},INP,{resize:"vertical"})}/>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={function(){onSave(form);}} style={BP}>Save Record</button>
          <button onClick={onCancel} style={BS}>Cancel</button>
        </div>
      </div>
    </div>
  );
}


// ── NETWORK TAB ───────────────────────────────────────────────────────────────
function Network(p) {
  var assets=p.assets,locs=p.locs,locMap=p.locMap,vendors=p.vendors||[],dids=p.dids||[];
  var netAssets=assets.filter(function(a){return a.type==="Network";});
  var [fLoc,setFLoc]=useState("");
  var [fCat,setFCat]=useState("");
  var [sortNet,setSortNet]=useState("loc"); // loc | cat | make | status
  var filtered=netAssets.filter(function(a){return(!fLoc||a.location===fLoc)&&(!fCat||a.category===fCat);}).sort(function(a,b){
    if(sortNet==="cat")    return (a.category||"").localeCompare(b.category||"");
    if(sortNet==="make")   return (a.make||"").localeCompare(b.make||"");
    if(sortNet==="status") return (a.status||"").localeCompare(b.status||"");
    var lc=(a.location||"").localeCompare(b.location||"");
    return lc!==0?lc:(a.category||"").localeCompare(b.category||"");
  });
  var catColors={"Router / Firewall":{c:"#92400E",bg:"#FEF3C7"},"Switch":{c:"#1D4ED8",bg:"#DBEAFE"},"Access Point":{c:"#166534",bg:"#DCFCE7"},"Network Controller":{c:"#6D28D9",bg:"#EDE9FE"}};
  var ispColors={Comcast:"#1D4ED8","AT&T":"#166534",Starlink:"#92400E","Starlink+Meraki":"#92400E"};
  return (
    <div>
      <h2 style={{fontSize:20,fontWeight:600,margin:"0 0 1.25rem",color:"#111827"}}>Community Infrastructure Overview</h2>
      {/* Location filter for summary cards */}
      <div style={{display:"flex",gap:8,marginBottom:"1rem",flexWrap:"wrap",alignItems:"center"}}>
        <select value={fLoc} onChange={function(e){setFLoc(e.target.value);}} style={SEL}><option value="">All locations — summary cards</option>{locs.map(function(l){return<option key={l.id} value={l.id}>{l.name}</option>;})}</select>
        {fLoc&&<button onClick={function(){setFLoc("");}} style={Object.assign({},BS,{fontSize:12})}>✕ All locations</button>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))",gap:"1rem",marginBottom:"1.5rem"}}>
        {NETWORK_SUMMARY.filter(function(n){return !fLoc||n.location===fLoc;}).map(function(n){
          var locObj=SEED_LOCS.find(function(l){return l.id===n.location;});
          var ic=ispColors[n.isp]||"#6B7280";
          return(
            <div key={n.location} style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"1.25rem",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontWeight:700,fontSize:15,color:"#111827"}}>{locObj?locObj.name:n.location}</div>
                <span style={{fontSize:11,fontWeight:600,color:ic,background:ic+"22",padding:"2px 8px",borderRadius:99}}>{n.isp}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px 10px",fontSize:12}}>
                {[["Router/FW",n.router],["Appliance",n.appliance||"—"],["Switches",n.switches?(n.switches+" — "+n.switchModels):"—"],["APs",n.aps+" × "+n.apMake+" "+n.apModel+" ("+n.wifiStandard+")"],["Admin SSID",n.adminSsid||"—"],["Guest SSID",n.residentSsid||"—"],["Phone",n.phoneSystem],["Cameras",n.cameras||"—"],["TV",n.tv||"—"]].map(function(r){return<div key={r[0]} style={{display:"flex",gap:4}}><span style={{color:"#9CA3AF",minWidth:68,flexShrink:0,fontWeight:500}}>{r[0]}</span><span style={{color:"#374151"}}>{r[1]}</span></div>;})}
              </div>
              {n.notes&&<div style={{marginTop:8,fontSize:11,color:"#6B7280",borderTop:"1px solid #F3F4F6",paddingTop:6}}><RedFlag text={n.notes}/></div>}
              {/* Equipment diagram */}
              <div style={{marginTop:10,borderTop:"1px solid #F3F4F6",paddingTop:8}}>
                <div style={{fontSize:10,fontWeight:600,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:".5px",marginBottom:6}}>Equipment</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {/* Router/FW */}
                  <div style={{display:"flex",alignItems:"center",gap:3,background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:5,padding:"2px 7px",fontSize:11}}>
                    <i className="ti ti-shield" style={{fontSize:12,color:"#92400E"}} aria-hidden={true}/>
                    <span style={{color:"#92400E",fontWeight:500}}>{n.router}</span>
                  </div>
                  {/* ISP */}
                  <div style={{display:"flex",alignItems:"center",gap:3,background:"#DBEAFE",border:"1px solid #BFDBFE",borderRadius:5,padding:"2px 7px",fontSize:11}}>
                    <i className="ti ti-world" style={{fontSize:12,color:"#1D4ED8"}} aria-hidden={true}/>
                    <span style={{color:"#1D4ED8",fontWeight:500}}>{n.isp}</span>
                  </div>
                  {/* Switches */}
                  {n.switches>0&&<div style={{display:"flex",alignItems:"center",gap:3,background:"#EDE9FE",border:"1px solid #DDD6FE",borderRadius:5,padding:"2px 7px",fontSize:11}}>
                    <i className="ti ti-switch" style={{fontSize:12,color:"#6D28D9"}} aria-hidden={true}/>
                    <span style={{color:"#6D28D9",fontWeight:500}}>{n.switches}× switch</span>
                  </div>}
                  {/* APs */}
                  {n.aps>0&&<div style={{display:"flex",alignItems:"center",gap:3,background:"#DCFCE7",border:"1px solid #BBF7D0",borderRadius:5,padding:"2px 7px",fontSize:11}}>
                    <i className="ti ti-wifi" style={{fontSize:12,color:"#166534"}} aria-hidden={true}/>
                    <span style={{color:"#166534",fontWeight:500}}>{n.aps}× {n.apMake} {n.apModel} ({n.wifiStandard||"WiFi"})</span>
                  </div>}
                  {/* Cameras — live count from assets */}
                  {(function(){
                    var locCams=assets.filter(function(a){return a.location===n.location&&a.category==="Security Camera";});
                    var active=locCams.filter(function(a){return a.status!=="Inactive";}).reduce(function(s,a){return s+(a.cameraCount||1);},0);
                    var inactive=locCams.filter(function(a){return a.status==="Inactive";}).reduce(function(s,a){return s+(a.cameraCount||1);},0);
                    var camVendors=[...new Set(locCams.map(function(a){return a.make;}).filter(Boolean))].join("/");
                    if(active+inactive===0) return null;
                    return <div style={{display:"flex",alignItems:"center",gap:3,background:"#F3F4F6",border:"1px solid #E5E7EB",borderRadius:5,padding:"2px 7px",fontSize:11}}>
                      <i className="ti ti-camera" style={{fontSize:12,color:"#6B7280"}} aria-hidden={true}/>
                      <span style={{color:"#374151",fontWeight:600}}>{active}{inactive>0?" ("+inactive+" off)":""} cam{(active+inactive)!==1?"s":""}</span>
                      {camVendors&&<span style={{color:"#9CA3AF",marginLeft:2}}>· {camVendors}</span>}
                    </div>;
                  })()}
                  {/* Phone system */}
                  <div style={{display:"flex",alignItems:"center",gap:3,background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:5,padding:"2px 7px",fontSize:11}}>
                    <i className="ti ti-phone" style={{fontSize:12,color:"#166534"}} aria-hidden={true}/>
                    <span style={{color:"#166534"}}>{n.phoneSystem}</span>
                  </div>
                  {/* TV */}
                  {n.tv&&<div style={{display:"flex",alignItems:"center",gap:3,background:"#F3F4F6",border:"1px solid #E5E7EB",borderRadius:5,padding:"2px 7px",fontSize:11}}>
                    <i className="ti ti-device-tv" style={{fontSize:12,color:"#6B7280"}} aria-hidden={true}/>
                    <span style={{color:"#6B7280"}}>{n.tv}</span>
                  </div>}
                  {/* SSIDs */}
                  {n.adminSsid&&n.adminSsid!=="TBD"&&<div style={{display:"flex",alignItems:"center",gap:3,background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:5,padding:"2px 7px",fontSize:10}}>
                    <i className="ti ti-lock" style={{fontSize:11,color:"#0369A1"}} aria-hidden={true}/>
                    <span style={{color:"#0369A1"}}>{n.adminSsid}</span>
                  </div>}
                  {n.residentSsid&&n.residentSsid!=="TBD"&&<div style={{display:"flex",alignItems:"center",gap:3,background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:5,padding:"2px 7px",fontSize:10}}>
                    <i className="ti ti-wifi" style={{fontSize:11,color:"#166534"}} aria-hidden={true}/>
                    <span style={{color:"#166534"}}>{n.residentSsid}</span>
                  </div>}
                </div>
              </div>
              {/* MRC badge + itemized breakdown */}
              {(function(){
                var spend=calcLocationSpend(n.location, vendors, dids, SEED_LOCS, assets);
                if(!spend||(spend.total===0&&spend.amortized===0)) return null;
                return <div style={{marginTop:10,borderTop:"1px solid #F3F4F6",paddingTop:8}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:11,color:"#6B7280"}}>Est. monthly cost</span>
                    <span style={{fontSize:13,fontWeight:700,color:"#166534",background:"#DCFCE7",padding:"2px 10px",borderRadius:99}}>${spend.total.toFixed(0)}/mo MRC</span>
                  </div>
                  {spend.items&&spend.items.filter(function(x){return !x.amortized;}).length>0&&(
                    <div style={{display:"flex",flexDirection:"column",gap:2}}>
                      {spend.items.filter(function(x){return !x.amortized;}).map(function(item,i){return(
                        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                          <span style={{fontSize:11,color:"#9CA3AF",flex:1,marginRight:8,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={item.label}>{item.label}</span>
                          <span style={{fontSize:11,fontWeight:600,color:"#374151",flexShrink:0}}>${item.amount.toFixed(0)}/mo</span>
                        </div>
                      );})}
                    </div>
                  )}
                  {spend.amortized>0&&(
                    <div style={{marginTop:6,borderTop:"1px dashed #E5E7EB",paddingTop:4}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
                        <span style={{fontSize:10,color:"#9CA3AF",fontWeight:600,letterSpacing:.3}}>AMORTIZED LICENSE COSTS</span>
                        <span style={{fontSize:11,fontWeight:600,color:"#9CA3AF"}}>${spend.amortized.toFixed(0)}/mo*</span>
                      </div>
                      {spend.items.filter(function(x){return x.amortized;}).map(function(item,i){return(
                        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                          <span style={{fontSize:10,color:"#D1D5DB",flex:1,marginRight:8,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontStyle:"italic"}} title={item.label}>{item.label}</span>
                          <span style={{fontSize:10,color:"#D1D5DB",flexShrink:0,fontStyle:"italic"}}>${item.amount.toFixed(0)}</span>
                        </div>
                      );})}
                      <div style={{fontSize:9,color:"#D1D5DB",marginTop:2,fontStyle:"italic"}}>*Pre-paid — not recurring cash; included for cost pattern awareness</div>
                    </div>
                  )}
                </div>;
              })()}
              {/* Per-location contract renewal warnings */}
              {(function(){
                var locContracts=[];
                (vendors||[]).forEach(function(v){
                  (v.contracts||[]).forEach(function(c){
                    if(!c.endDate) return;
                    var cLoc=(c.locationId||"").toLowerCase();
                    var nLoc=n.location.toLowerCase();
                    var locObj=SEED_LOCS.find(function(l){return l.id===n.location;});
                    var lName=locObj?(locObj.name||"").toLowerCase():"";
                    var lShort=locObj?(locObj.shortName||"").toLowerCase():"";
                    var matched=cLoc===nLoc||(cLoc&&lName&&(cLoc===lName||lName.indexOf(cLoc)>=0||cLoc.indexOf(lName)>=0))||(cLoc&&lShort&&(cLoc===lShort||lShort.indexOf(cLoc)>=0||cLoc.indexOf(lShort)>=0));
                    if(!matched) return;
                    var d=new Date(c.endDate);
                    if(isNaN(d)) return;
                    var days=Math.round((d-new Date())/86400000);
                    if(days<730) locContracts.push({v:v,c:c,days:days});
                  });
                });
                if(locContracts.length===0) return null;
                return locContracts.map(function(item,i){
                  var isMeraki=/meraki/i.test(item.v.name);
                  var bg=isMeraki?"#FEE2E2":"#FEF3C7";
                  var bdr=isMeraki?"#DC2626":"#F59E0B";
                  var clr=isMeraki?"#991B1B":"#92400E";
                  var dateStr=new Date(item.c.endDate).toLocaleDateString("en-US",{month:"short",year:"numeric"});
                  return(<div key={i} style={{marginTop:8,background:bg,border:"1px solid "+bdr,borderRadius:6,padding:"6px 10px",fontSize:11}}>
                    <span style={{fontWeight:700,color:clr}}>{isMeraki?"🔴 ":""}{item.v.name}</span>
                    <span style={{color:clr}}> — license expires {dateStr} ({item.days} days)</span>
                    {isMeraki&&<span style={{fontWeight:700,color:"#DC2626"}}> — DEVICES GO OFFLINE</span>}
                    {item.v.renewalAmount&&<span style={{color:clr,fontWeight:600}}> · est. ${parseFloat(item.v.renewalAmount).toLocaleString()} due</span>}
                    {isMeraki&&!item.v.renewalAmount&&<span style={{color:"#DC2626",fontWeight:600}}> · renewal cost unknown</span>}
                  </div>);
                });
              })()}
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1rem"}}>
        <h3 style={{fontSize:16,fontWeight:600,margin:0,color:"#111827",flex:1}}>Network device records <span style={{fontSize:13,color:"#6B7280",fontWeight:400}}>({netAssets.length} records)</span></h3>
        <select value={fLoc} onChange={function(e){setFLoc(e.target.value);}} style={SEL}><option value="">All locations</option>{locs.map(function(l){return<option key={l.id} value={l.id}>{l.name}</option>;})}</select>
        <select value={fCat} onChange={function(e){setFCat(e.target.value);}} style={SEL}><option value="">All types</option>{["Router / Firewall","Switch","Access Point","Network Controller"].map(function(c){return<option key={c} value={c}>{c}</option>;})}</select>
      </div>
      <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{background:"#F9FAFB",borderBottom:"1px solid #E5E7EB"}}>{["Location","Type","Hostname","Make / Model","ISP","WiFi","APs","Admin SSID","Resident SSID","Notes"].map(function(h){return<th key={h} style={{padding:"8px 12px",textAlign:"left",fontWeight:600,color:"#6B7280",fontSize:11,whiteSpace:"nowrap"}}>{h}</th>;})}</tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={9} style={{padding:"2rem",textAlign:"center",color:"#9CA3AF"}}>No network records match.</td></tr>}
            {filtered.map(function(a,i){
              var locLabel=a.location&&locMap[a.location]?locMap[a.location].shortName:"";
              var cc=catColors[a.category]||{c:"#6B7280",bg:"#F3F4F6"};
              return<tr key={a.id} style={{borderBottom:i<filtered.length-1?"1px solid #F3F4F6":"none"}}>
                <td style={{padding:"9px 12px",fontWeight:600,color:"#111827"}}>{locLabel}</td>
                <td style={{padding:"9px 12px"}}><span style={{fontSize:11,fontWeight:600,color:cc.c,background:cc.bg,padding:"1px 7px",borderRadius:99}}>{a.category}</span></td>
                <td style={{padding:"9px 12px",fontSize:12,color:"#374151",fontFamily:"monospace"}}>{a.hostname||"—"}</td>
                <td style={{padding:"9px 12px",color:"#374151"}}>{[a.make,a.model].filter(Boolean).join(" ")||"—"}</td>
                <td style={{padding:"9px 12px",fontSize:12,color:"#6B7280"}}>{a.isp||"—"}</td>
                <td style={{padding:"9px 12px",fontSize:12,color:"#6B7280"}}>{a.wifiStandard||"—"}</td>
                <td style={{padding:"9px 12px",textAlign:"center",fontWeight:600}}>{a.apCount||"—"}</td>
                {(a.category==="Access Point")
                  ? <td colSpan={2} style={{padding:"9px 12px",fontSize:11,color:"#9CA3AF",fontStyle:"italic"}}>broadcasts SSIDs from controller</td>
                  : <><td style={{padding:"9px 12px",fontSize:12,color:"#166534",fontWeight:a.adminSsid?500:400}}>{a.adminSsid||"—"}</td>
                    <td style={{padding:"9px 12px",fontSize:12,color:"#6B7280"}}>{a.residentSsid||"—"}</td></>}
                <td style={{padding:"9px 12px",fontSize:12,color:"#9CA3AF"}}><RedFlag text={a.notes}/></td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function Phones(p){
  var phones=p.phones,setPhones=p.setPhones,dids=p.dids||[],setDids=p.setDids,locs=p.locs,ops=p.ops,locMap=p.locMap,assets=p.assets,setAssets=p.setAssets;
  var [subTab,setSubTab]  = useState("unified");
  var [editDev,setEditDev]= useState(null);
  var [editDid,setEditDid]= useState(null);
  var [fLoc,setFLoc]      = useState("");
  var [fProv,setFProv]    = useState("");
  var [search,setSrch]    = useState("");
  var [sortBy,setSortBy]  = useState("loc");

  var blankDev = {operator:(ops[0]&&ops[0].id)||"",location:"",subLocation:"",provider:"GoTo",extension:"",make:"",model:"",macAddress:"",publicIp:"",privateIp:"",lineType:"Desk phone",status:"Ready",lastProvisioned:"",routeTo:"",carrier:"PSTN",notes:"",activationCode:""};
  var blankDid = {operator:(ops[0]&&ops[0].id)||"",location:"",provider:"GoTo",number:"",extension:"",assignedTo:"",deviceId:"",lineType:"Voice",numberSource:"",numberType:"Regular",callerIdName:"",monthlyRate:"",billingRef:"",notes:""};

  if(editDev!==null) return <PhoneForm phone={editDev} locs={locs} ops={ops}
    onSave={function(ph){
      if(ph.id&&phones.find(function(x){return x.id===ph.id;})) setPhones(function(prev){return prev.map(function(x){return x.id===ph.id?ph:x;});});
      else setPhones(function(prev){return prev.concat([Object.assign({},ph,{id:uid()})]);});
      setEditDev(null);
    }} onCancel={function(){setEditDev(null);}}/>;

  if(editDid!==null) return <DidForm did={editDid} phones={phones} locs={locs} ops={ops} locMap={locMap}
    onSave={function(d){
      // DIDs are stored in asset.dids[] — update the parent asset
      if(d.deviceId && setAssets){
        setAssets(function(prev){return prev.map(function(a){
          if(a.id!==d.deviceId) return a;
          var existingIdx=(a.dids||[]).findIndex(function(x){return x.number===d.number||x.id===d.id;});
          var newDids=existingIdx>=0?(a.dids||[]).map(function(x,i){return i===existingIdx?d:x;}):(a.dids||[]).concat([d]);
          return Object.assign({},a,{dids:newDids});
        });});
      }
      setEditDid(null);
    }} onCancel={function(){setEditDid(null);}}/>;

  var filtDevices = phones.filter(function(ph){
    var q=search.toLowerCase();
    var ok=!q||[ph.extension,ph.subLocation,ph.make,ph.model,ph.macAddress,ph.privateIp,ph.notes].some(function(f){return f&&f.toLowerCase().indexOf(q)>=0;});
    return ok&&(!fLoc||ph.location===fLoc)&&(!fProv||ph.provider===fProv);
  }).sort(function(a,b){
    if(sortBy==="ext")    return (a.extension||"").localeCompare(b.extension||"");
    if(sortBy==="prov")   return (a.provider||"").localeCompare(b.provider||"");
    if(sortBy==="cost")   return (parseFloat(b.avgMonthlyCost)||0)-(parseFloat(a.avgMonthlyCost)||0);
    if(sortBy==="status") return (a.status||"").localeCompare(b.status||"");
    // default: loc then ext
    var lc=(a.location||"").localeCompare(b.location||"");
    return lc!==0?lc:(a.extension||"").localeCompare(b.extension||"");
  });
  var filtDids = dids.filter(function(d){
    var q=search.toLowerCase();
    var ok=!q||[d.number,d.extension,d.assignedTo,d.notes,d.callerIdName].some(function(f){return f&&f.toLowerCase().indexOf(q)>=0;});
    return ok&&(!fLoc||d.location===fLoc)&&(!fProv||d.provider===fProv);
  }).sort(function(a,b){
    if(sortBy==="ext")  return (a.extension||"").localeCompare(b.extension||"");
    if(sortBy==="prov") return (a.provider||"").localeCompare(b.provider||"");
    var lc=(a.location||"").localeCompare(b.location||"");
    return lc!==0?lc:(a.number||"").localeCompare(b.number||"");
  });

  var sc=function(s){if(s==="Ready"||s==="Activated")return{c:"#166534",bg:"#DCFCE7"};if(s==="Unavailable"||s==="Needs Attention")return{c:"#92400E",bg:"#FEF3C7"};return{c:"#6B7280",bg:"#F3F4F6"};};

  // Per-location phone summary
  var locPhoneSummary = locs.map(function(l){
    var devs = phones.filter(function(ph){return ph.location===l.id;});
    var nums = dids.filter(function(d){return d.location===l.id;});
    var mrc  = devs.reduce(function(s,ph){return s+(parseFloat(ph.avgMonthlyCost)||0);},0)
             + nums.reduce(function(s,d){return s+(parseFloat(d.monthlyRate)||0);},0);
    var providers = [...new Set(devs.map(function(ph){return ph.provider;}).filter(Boolean))];
    return {loc:l, devs:devs.length, nums:nums.length, mrc:mrc, providers:providers};
  }).filter(function(x){return x.devs>0||x.nums>0;});

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1rem"}}>
        <h2 style={{fontSize:20,fontWeight:600,margin:0,color:"#111827",flex:1}}>
          Phone Devices and Telephone Numbers
          <span style={{fontSize:13,color:"#6B7280",fontWeight:400,marginLeft:8}}>
            {phones.length} devices · {dids.length} numbers
          </span>
        </h2>
        <button onClick={function(){subTab==="devices"?setEditDev(blankDev):setEditDid(blankDid);}} style={BP}>
          <i className="ti ti-plus" aria-hidden={true}/> {subTab==="devices"?"Add Device":"Add Number"}
        </button>
      </div>

      {/* Per-location summary */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"0.75rem",marginBottom:"1.25rem"}}>
        {locPhoneSummary.map(function(s){
          var provColors={"GoTo":"#1D4ED8","8x8":"#6D28D9","AT&T":"#166534"};
          return(
            <div key={s.loc.id} onClick={function(){setFLoc(fLoc===s.loc.id?"":s.loc.id);}} style={{background:fLoc===s.loc.id?"#EFF6FF":"#fff",border:"1px solid "+(fLoc===s.loc.id?"#3B82F6":"#E5E7EB"),borderRadius:10,padding:"10px 14px",cursor:"pointer",transition:"all .15s"}}>
              <div style={{fontWeight:600,fontSize:13,color:"#111827",marginBottom:5}}>{s.loc.shortName}</div>
              <div style={{display:"flex",gap:12,fontSize:12,color:"#6B7280",marginBottom:4}}>
                <span><strong style={{color:"#374151"}}>{s.devs}</strong> device{s.devs!==1?"s":""}</span>
                <span><strong style={{color:"#374151"}}>{s.nums}</strong> number{s.nums!==1?"s":""}</span>
              </div>
              {s.mrc>0&&<div style={{fontSize:11,fontWeight:700,color:"#166534",background:"#DCFCE7",padding:"1px 7px",borderRadius:99,display:"inline-block",marginBottom:4}}>${s.mrc.toFixed(0)}/mo est.</div>}
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                {s.providers.map(function(pv){return<span key={pv} style={{fontSize:10,fontWeight:600,color:provColors[pv]||"#6B7280",background:(provColors[pv]||"#6B7280")+"18",padding:"1px 5px",borderRadius:99}}>{pv}</span>;})}
              </div>
            </div>
          );
        })}
        {fLoc&&<div style={{display:"flex",alignItems:"center"}}><button onClick={function(){setFLoc("");}} style={Object.assign({},BS,{fontSize:12})}>✕ Clear filter</button></div>}
      </div>

      {/* View toggle */}
      <div style={{display:"flex",gap:2,marginBottom:"1rem",background:"#F3F4F6",borderRadius:8,padding:3,width:"fit-content"}}>
        {[{k:"unified",l:"All Devices & Numbers"},{k:"numbers",l:"Numbers only"}].map(function(t){
          return <button key={t.k} onClick={function(){setSubTab(t.k);setSrch("");}} style={{padding:"6px 16px",borderRadius:6,border:"none",background:subTab===t.k?"#fff":"transparent",color:subTab===t.k?"#111827":"#6B7280",cursor:"pointer",fontSize:13,fontWeight:subTab===t.k?600:400,boxShadow:subTab===t.k?"0 1px 3px rgba(0,0,0,.1)":"none"}}>
            {t.l}
          </button>;
        })}
      </div>

      {/* Filters + sort */}
      <div style={{display:"flex",gap:8,marginBottom:"1rem",flexWrap:"wrap"}}>
        <input value={search} onChange={function(e){setSrch(e.target.value);}} placeholder={"Search "+(subTab==="devices"?"extension, MAC, model...":"number, extension, name...")} style={Object.assign({},INP,{flex:"1 1 180px",minWidth:140})}/>
        <select value={fLoc} onChange={function(e){setFLoc(e.target.value);}} style={SEL}><option value="">All locations</option>{locs.map(function(l){return<option key={l.id} value={l.id}>{l.name}</option>;})}</select>
        <select value={fProv} onChange={function(e){setFProv(e.target.value);}} style={SEL}><option value="">All providers</option>{[...new Set(phones.map(function(p){return p.provider;}).filter(Boolean))].sort().map(function(pr){return<option key={pr} value={pr}>{pr}</option>;})}</select>
        <select value={sortBy||"loc"} onChange={function(e){setSortBy(e.target.value);}} style={SEL}>
          <option value="loc">Sort: Location</option>
          <option value="ext">Sort: Extension</option>
          <option value="prov">Sort: Provider</option>
          <option value="cost">Sort: Cost ↓</option>
          <option value="status">Sort: Status</option>
        </select>
        <span style={{fontSize:13,color:"#6B7280",display:"flex",alignItems:"center"}}>{subTab==="devices"?filtDevices.length:filtDids.length} shown</span>
      </div>

      {/* UNIFIED DEVICE + NUMBERS view */}
      {subTab==="unified"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtDevices.length===0&&<div style={{textAlign:"center",color:"#9CA3AF",padding:"2rem",background:"#fff",borderRadius:12,border:"1px solid #E5E7EB"}}>No devices match.</div>}
          {filtDevices.map(function(ph){
            var isMobile=ph.lineType==="Mobile"||(ph.category||"").toLowerCase().indexOf("mobile")>=0;
            var isDesk=!isMobile;
            var devDids=(ph.dids||[]);
            var s=sc(ph.status);
            var locLabel=ph.location&&locMap[ph.location]?locMap[ph.location].shortName:"";
            var provColors={"GoTo":{c:"#1D4ED8",bg:"#DBEAFE"},"8x8":{c:"#6D28D9",bg:"#EDE9FE"},"Comcast":{c:"#374151",bg:"#F3F4F6"},"AT&T":{c:"#166534",bg:"#DCFCE7"},"T-Mobile":{c:"#BE185D",bg:"#FCE7F3"}};
            var pc=provColors[ph.provider]||{c:"#374151",bg:"#F3F4F6"};
            var costColor=ph.avgMonthlyCost&&ph.avgMonthlyCost!=="0.00"?"#166534":"#9CA3AF";
            var costBg=ph.avgMonthlyCost&&ph.avgMonthlyCost!=="0.00"?"#DCFCE7":"transparent";
            return(
              <div key={ph.id} style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"12px 14px",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
                {/* Device header row */}
                <div style={{display:"flex",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
                  {/* Provider + type badge */}
                  <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0}}>
                    <span style={{fontSize:11,fontWeight:700,color:pc.c,background:pc.bg,padding:"2px 8px",borderRadius:99,textAlign:"center"}}>{ph.provider||"—"}</span>
                    <span style={{fontSize:10,color:"#9CA3AF",textAlign:"center"}}>{ph.lineType||ph.category||""}</span>
                  </div>
                  {/* Extension / main identity */}
                  {ph.extension&&<div style={{fontWeight:700,fontSize:16,color:"#111827",flexShrink:0}}>Ext. {ph.extension}</div>}
                  {/* Device info */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:13,color:"#374151"}}>{[ph.make,ph.model].filter(Boolean).join(" ")||"—"}</div>
                    <div style={{fontSize:11,color:"#9CA3AF"}}>{[locLabel,ph.subLocation].filter(Boolean).join(" › ")}</div>
                    {ph.macAddress&&<div style={{fontSize:10,color:"#D1D5DB",fontFamily:"monospace",marginTop:1}}>{ph.macAddress}</div>}
                    {ph.privateIp&&<div style={{fontSize:10,color:"#D1D5DB",fontFamily:"monospace"}}>{ph.privateIp}</div>}
                  </div>
                  {/* Status + cost */}
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                    <span style={{fontSize:11,fontWeight:600,color:s.c,background:s.bg,padding:"2px 8px",borderRadius:99}}>{ph.status}</span>
                    {ph.avgMonthlyCost&&ph.avgMonthlyCost!=="0.00"
                      ?<span style={{fontSize:12,fontWeight:700,color:costColor,background:costBg,padding:"2px 8px",borderRadius:99}}>${ph.avgMonthlyCost}/mo</span>
                      :<span style={{fontSize:11,color:"#D1D5DB"}}>incl. in contract</span>}
                    {ph.costType==="amortized"&&<span style={{fontSize:9,color:"#9CA3AF",fontStyle:"italic"}}>amortized</span>}
                  </div>
                  {/* Actions */}
                  <div style={{display:"flex",gap:4,flexShrink:0}}>
                    <button onClick={function(){setEditDev(ph);}} style={BI}><i className="ti ti-edit" aria-hidden={true}/></button>
                    <button onClick={function(){if(confirm("Delete?"))setPhones(function(prev){return prev.filter(function(x){return x.id!==ph.id;});});}} style={Object.assign({},BI,{color:"#DC2626"})}><i className="ti ti-trash" aria-hidden={true}/></button>
                  </div>
                </div>
                {/* DID / number lines — embedded below device */}
                {devDids.length>0&&(
                  <div style={{marginTop:10,paddingTop:8,borderTop:"1px solid #F3F4F6",display:"flex",flexDirection:"column",gap:4}}>
                    {devDids.map(function(d,di){
                      var fmt=function(n){if(!n)return"—";n=n.replace(/\D/g,"");if(n.length===11&&n[0]==="1")n=n.slice(1);if(n.length===10)return"("+n.slice(0,3)+") "+n.slice(3,6)+"-"+n.slice(6);return n;};
                      var isMain=di===0;
                      return(
                        <div key={di} style={{display:"flex",alignItems:"center",gap:10,padding:"4px 8px",background:isMain?"#F8FAFF":"#FAFAFA",borderRadius:6,flexWrap:"wrap"}}>
                          <i className={"ti "+(isMobile?"ti-device-mobile":"ti-phone")} style={{fontSize:13,color:"#6B7280",flexShrink:0}} aria-hidden={true}/>
                          <span style={{fontWeight:700,fontSize:13,color:"#111827",fontFamily:"monospace",letterSpacing:.5,flexShrink:0}}>{fmt(d.number)}</span>
                          {d.assignedTo&&<span style={{fontSize:12,color:"#374151",flexShrink:0}}>{d.assignedTo}</span>}
                          {d.callerIdName&&<span style={{fontSize:11,color:"#9CA3AF",flexShrink:0}}>ID: {d.callerIdName}</span>}
                          <span style={{fontSize:10,color:"#D1D5DB",marginLeft:"auto"}}>{[d.numberType,d.lineType].filter(Boolean).filter(function(x,i,a){return a.indexOf(x)===i;}).join(" · ")}</span>
                          {d.monthlyRate&&d.monthlyRate!=="0.00"&&<span style={{fontSize:11,fontWeight:600,color:"#92400E",background:"#FEF3C7",padding:"1px 6px",borderRadius:99}}>${d.monthlyRate}/mo</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
                {ph.notes&&<div style={{marginTop:6,fontSize:11,color:"#9CA3AF",borderTop:"1px solid #F9FAFB",paddingTop:4}}><RedFlag text={ph.notes}/></div>}
              </div>
            );
          })}
        </div>
      )}

      {/* NUMBERS sub-tab */}
      {subTab==="numbers"&&(
        <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{background:"#F9FAFB",borderBottom:"1px solid #E5E7EB"}}>
              {["Provider","Phone Number","Ext.","Assigned To","Location","Type","Source","Caller ID","$/mo (all-in)","Billing Ref",""].map(function(h){return<th key={h} style={{padding:"8px 12px",textAlign:"left",fontWeight:600,color:"#6B7280",fontSize:11,whiteSpace:"nowrap",textTransform:"uppercase",letterSpacing:".4px"}}>{h}</th>;})}
            </tr></thead>
            <tbody>
              {filtDids.length===0&&<tr><td colSpan={11} style={{padding:"2rem",textAlign:"center",color:"#9CA3AF"}}>No phone numbers match.</td></tr>}
              {filtDids.map(function(d,i){
                var provColor=d.provider==="GoTo"?{c:"#1D4ED8",bg:"#DBEAFE"}:{c:"#6D28D9",bg:"#EDE9FE"};
                var locLabel=d.location&&locMap[d.location]?locMap[d.location].shortName:"";
                var ltColor=d.lineType==="Fax"?{c:"#92400E",bg:"#FEF3C7"}:{c:"#166534",bg:"#DCFCE7"};
                var linkedDevice=d.deviceId?phones.find(function(ph){return ph.id===d.deviceId;}):null;
                return(<tr key={d.id} style={{borderBottom:i<filtDids.length-1?"1px solid #F3F4F6":"none"}}>
                  <td style={{padding:"9px 12px"}}><span style={{fontSize:11,fontWeight:600,color:provColor.c,background:provColor.bg,padding:"2px 8px",borderRadius:99}}>{d.provider}</span></td>
                  <td style={{padding:"9px 12px",fontFamily:"monospace",fontWeight:600,color:"#111827"}}>{d.number||"—"}</td>
                  <td style={{padding:"9px 12px",color:"#374151"}}>{d.extension||"—"}</td>
                  <td style={{padding:"9px 12px",color:"#374151"}}>{d.assignedTo||"—"}</td>
                  <td style={{padding:"9px 12px",fontSize:12,color:"#6B7280"}}>{locLabel||"—"}</td>
                  <td style={{padding:"9px 12px"}}><span style={{fontSize:11,fontWeight:500,color:ltColor.c,background:ltColor.bg,padding:"1px 6px",borderRadius:99}}>{d.lineType}</span></td>
                  <td style={{padding:"9px 12px",fontSize:12,color:"#6B7280"}}>{d.numberSource||"—"}</td>
                  <td style={{padding:"9px 12px",fontSize:12,color:"#6B7280"}}>{d.callerIdName||"—"}</td>
                  <td style={{padding:"9px 12px",fontSize:12,color:"#374151"}}>{d.monthlyRate?("$"+d.monthlyRate):"—"}</td>
                  <td style={{padding:"9px 12px",fontSize:12,color:"#6B7280"}}>{d.billingRef||"—"}</td>
                  <td style={{padding:"9px 12px"}}>
                    <div style={{display:"flex",gap:4,alignItems:"center"}}>
                      {linkedDevice&&<span style={{fontSize:11,color:"#6B7280"}} title={[linkedDevice.make,linkedDevice.model].filter(Boolean).join(" ")}><i className="ti ti-device-desktop-analytics" aria-hidden={true}/></span>}
                      <button onClick={function(){setEditDid(d);}} style={BI}><i className="ti ti-edit" aria-hidden={true}/></button>
                      <button onClick={function(){if(confirm("Delete?"))setDids(function(prev){return prev.filter(function(x){return x.id!==d.id;});});}} style={Object.assign({},BI,{color:"#DC2626"})}><i className="ti ti-trash" aria-hidden={true}/></button>
                    </div>
                  </td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


function DidForm(p){
  var did=p.did,phones=p.phones,locs=p.locs,ops=p.ops,locMap=p.locMap,onSave=p.onSave,onCancel=p.onCancel;
  var [form,setForm] = useState(did);
  function set(k,v){setForm(function(f){var n=Object.assign({},f);n[k]=v;return n;});}
  var deviceOpts = phones.map(function(ph){return{id:ph.id,name:(ph.extension?("Ext "+ph.extension+" — "):"")+(ph.subLocation||"")+" "+[ph.make,ph.model].filter(Boolean).join(" ")};});
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem"}}>
        <button onClick={onCancel} style={{background:"transparent",border:"none",cursor:"pointer",color:"#6B7280",fontSize:13,display:"flex",alignItems:"center",gap:4}}><i className="ti ti-arrow-left" aria-hidden={true}/> Back</button>
        <h2 style={{fontSize:19,fontWeight:600,margin:0,color:"#111827"}}>{form.id?"Edit Phone Number":"New Phone Number"}</h2>
      </div>
      <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"1.5rem",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        <FormSection label="Number identity">
          <FormField label="Phone number (+1XXXXXXXXXX)" value={form.number} onChange={function(e){set("number",e.target.value);}}/>
          <FormField label="Extension" value={form.extension} onChange={function(e){set("extension",e.target.value);}}/>
          <FormField label="Assigned to" value={form.assignedTo} onChange={function(e){set("assignedTo",e.target.value);}}/>
          <FormField label="Provider" value={form.provider} onChange={function(e){set("provider",e.target.value);}} opts={["GoTo","8x8","AT&T","Other"]}/>
          <FormField label="Line type" value={form.lineType} onChange={function(e){set("lineType",e.target.value);}} opts={["Voice","Fax","Analog","Data","SMS","Toll Free","Virtual"]}/>
          <FormField label="Number source" value={form.numberSource} onChange={function(e){set("numberSource",e.target.value);}} opts={["Port","Claim","New","PSTN"]}/>
          <FormField label="Number type" value={form.numberType} onChange={function(e){set("numberType",e.target.value);}} opts={["Regular","Toll Free","Virtual"]}/>
          <FormField label="Caller ID name" value={form.callerIdName} onChange={function(e){set("callerIdName",e.target.value);}}/>
        </FormSection>
        <FormSection label="Location">
          <FormField label="Operator" value={form.operator} onChange={function(e){set("operator",e.target.value);}} opts={ops}/>
          <FormField label="Location" value={form.location} onChange={function(e){set("location",e.target.value);}} opts={locs}/>
          <FormField label="Linked device" value={form.deviceId} onChange={function(e){set("deviceId",e.target.value);}} opts={[{id:"",name:"-- not linked --"}].concat(deviceOpts)}/>
        </FormSection>
        <FormSection label="Billing">
          <FormField label="Monthly rate ($)" value={form.monthlyRate} onChange={function(e){set("monthlyRate",e.target.value);}}/>
          <FormField label="Billing reference" value={form.billingRef} onChange={function(e){set("billingRef",e.target.value);}}/>
        </FormSection>
        <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:"1.25rem"}}>
          <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Notes</label>
          <textarea value={form.notes||""} onChange={function(e){set("notes",e.target.value);}} rows={2} style={Object.assign({},INP,{resize:"vertical"})}/>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={function(){onSave(form);}} style={BP}>Save</button>
          <button onClick={onCancel} style={BS}>Cancel</button>
        </div>
      </div>
    </div>
  );
}


function PhoneForm(p){
  var phone=p.phone,locs=p.locs,ops=p.ops,onSave=p.onSave,onCancel=p.onCancel;
  var [form,setForm] = useState(phone);
  var [newDid,setNewDid] = useState("");
  function set(k,v){ setForm(function(f){ var n=Object.assign({},f); n[k]=v; return n; }); }
  function addDid(){
    if(newDid.trim()){
      setForm(function(f){ var n=Object.assign({},f); n.dids=(n.dids||[]).concat([{number:newDid.trim(),assignedTo:"",numberSource:"",numberType:"Regular",externalCallerId:""}]); return n; });
      setNewDid("");
    }
  }
  function removeDid(i){
    setForm(function(f){ var n=Object.assign({},f); n.dids=n.dids.filter(function(_,j){return j!==i;}); return n; });
  }
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem"}}>
        <button onClick={onCancel} style={{background:"transparent",border:"none",cursor:"pointer",color:"#6B7280",fontSize:13,display:"flex",alignItems:"center",gap:4}}>
          <i className="ti ti-arrow-left" aria-hidden={true}/> Back
        </button>
        <h2 style={{fontSize:19,fontWeight:600,margin:0,color:"#111827"}}>{form.id?"Edit Phone Device":"New Phone Device"}</h2>
      </div>
      <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"1.5rem",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        <FormSection label="Device info">
          <FormField label="Operator"       value={form.operator}    onChange={function(e){set("operator",e.target.value);}}    opts={ops}/>
          <FormField label="Location"       value={form.location}    onChange={function(e){set("location",e.target.value);}}    opts={locs}/>
          <FormField label="Sub-location"   value={form.subLocation} onChange={function(e){set("subLocation",e.target.value);}}/>
          <FormField label="Provider"       value={form.provider}    onChange={function(e){set("provider",e.target.value);}}    opts={["GoTo","8x8","Other"]}/>
          <FormField label="Extension"      value={form.extension}   onChange={function(e){set("extension",e.target.value);}}/>
          <FormField label="Make"           value={form.make}        onChange={function(e){set("make",e.target.value);}}/>
          <FormField label="Model"          value={form.model}       onChange={function(e){set("model",e.target.value);}}/>
          <FormField label="MAC address"    value={form.macAddress}  onChange={function(e){set("macAddress",e.target.value);}}/>
          <FormField label="Public IP"      value={form.publicIp}    onChange={function(e){set("publicIp",e.target.value);}}/>
          <FormField label="Private IP"     value={form.privateIp}   onChange={function(e){set("privateIp",e.target.value);}}/>
          <FormField label="Line type"      value={form.lineType}    onChange={function(e){set("lineType",e.target.value);}}    opts={["Desk phone","Analog telephone adapter","Softphone","Ring group","Conference room","Overhead paging"]}/>
          <FormField label="Status"         value={form.status}      onChange={function(e){set("status",e.target.value);}}      opts={["Ready","Activated","Unavailable","Needs Attention","Offline"]}/>
          <FormField label="Last provisioned" value={form.lastProvisioned} onChange={function(e){set("lastProvisioned",e.target.value);}}/>
          <FormField label="Route to"       value={form.routeTo}     onChange={function(e){set("routeTo",e.target.value);}}/>
          <FormField label="Carrier"        value={form.carrier}     onChange={function(e){set("carrier",e.target.value);}}/>
          <FormField label="Activation code" value={form.activationCode} onChange={function(e){set("activationCode",e.target.value);}}/>
          <FormField label="Avg monthly cost / seat ($)" value={form.avgMonthlyCost} onChange={function(e){set("avgMonthlyCost",e.target.value);}}/>
          <FormField label="MRC notes (e.g. GoTo seat cost)" value={form.mrcNotes} onChange={function(e){set("mrcNotes",e.target.value);}}/>
        </FormSection>
        <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:"1.25rem"}}>
          <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Notes</label>
          <textarea value={form.notes||""} onChange={function(e){set("notes",e.target.value);}} rows={2} style={Object.assign({},INP,{resize:"vertical"})}/>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={function(){onSave(form);}} style={BP}>Save</button>
          <button onClick={onCancel} style={BS}>Cancel</button>
        </div>
      </div>
    </div>
  );
}


function Vendors(p){
  var vendors=p.vendors,setVendors=p.setVendors,ops=p.ops,apiKey=p.apiKey,locs=p.locs||[],allVendors=vendors;
  var [edit,setEdit]     = useState(null);
  var [search,setSearch] = useState("");
  var [fCat,setFCat]     = useState("");
  var [fCadence,setFCadence] = useState("");
  var [fLoc,setFLoc]     = useState(""); // filter by location (vendors with a contract for that loc)
  var [sortBy,setSortBy] = useState("name");  // name | spend | cadence | category

  // Calculate total monthly spend per vendor from contracts
  function vendorMonthlySpend(v){
    var total = 0;
    if(v.contracts) v.contracts.forEach(function(c){
      if(c.monthlyAmount) total += parseFloat(c.monthlyAmount)||0;
    });
    // Fallback: renewalAmount is annual
    if(total===0 && v.renewalAmount) total = (parseFloat(v.renewalAmount)||0)/12;
    return total;
  }

  var allCadences = ["Monthly","Quarterly","Annual","Monthly + Per Service Call","Per Service Call","Per Purchase","Never / One-time"];
  var allCats = Array.from(new Set(vendors.map(function(v){return v.category;}))).filter(Boolean).sort();

  var filtered = vendors.filter(function(v){
    var q = search.toLowerCase();
    var matchQ = !q || [v.name,v.category,v.notes,v.accountNumber].some(function(f){return f&&f.toLowerCase().indexOf(q)>=0;});
    var matchCat = !fCat || v.category===fCat;
    var matchCad = !fCadence || (v.billingCadence&&v.billingCadence.indexOf(fCadence)>=0);
    var matchLoc = !fLoc || (v.contracts&&v.contracts.some(function(c){
      var cLoc=(c.locationId||"").toLowerCase().trim();
      var locObj=locs.find(function(l){return l.id===fLoc;});
      var locName=locObj?(locObj.name||"").toLowerCase():"";
      var locShort=locObj?(locObj.shortName||"").toLowerCase():"";
      return cLoc===fLoc||(cLoc&&locName&&(cLoc===locName||locName.indexOf(cLoc)>=0||cLoc.indexOf(locName)>=0))||(cLoc&&locShort&&(cLoc===locShort||locShort.indexOf(cLoc)>=0||cLoc.indexOf(locShort)>=0));
    }));
    return matchQ && matchCat && matchCad && matchLoc;
  }).sort(function(a,b){
    if(sortBy==="spend")    return vendorMonthlySpend(b) - vendorMonthlySpend(a);
    if(sortBy==="cadence")  return (a.billingCadence||"").localeCompare(b.billingCadence||"");
    if(sortBy==="category") return (a.category||"").localeCompare(b.category||"");
    return (a.name||"").localeCompare(b.name||"");
  });

  var totalMonthlySpend = filtered.reduce(function(s,v){return s+vendorMonthlySpend(v);},0);
  var blank={operator:(ops[0]&&ops[0].id)||"",name:"",category:"ISP",billingCadence:"Monthly",contactName:"",phone:"",email:"",accountNumber:"",contracts:[],renewalDate:"",renewalAmount:"",licenseCount:"",renewalNotes:"",bills:[],notes:""};
  if(edit!==null) return <VendorForm vendor={edit} ops={ops} apiKey={apiKey} onSave={function(v){if(v.id&&vendors.find(function(x){return x.id===v.id;}))setVendors(function(prev){return prev.map(function(x){return x.id===v.id?v:x;});});else setVendors(function(prev){return prev.concat([Object.assign({},v,{id:uid()})]);});setEdit(null);}} onCancel={function(){setEdit(null);}}/>;
  return(<div><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1rem"}}><h2 style={{fontSize:20,fontWeight:600,margin:0,color:"#111827",flex:1}}>Vendor Management</h2><button onClick={function(){setEdit(blank);}} style={BP}><i className="ti ti-plus" aria-hidden={true}/> Add Vendor</button></div>
      {/* Filter + sort bar */}
      <div style={{display:"flex",gap:8,marginBottom:"1rem",flexWrap:"wrap",alignItems:"center"}}>
        <input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Search vendors..." style={Object.assign({},INP,{flex:"1 1 160px",minWidth:120})}/>
        <select value={fCat} onChange={function(e){setFCat(e.target.value);}} style={SEL}><option value="">All categories</option>{allCats.map(function(c){return<option key={c} value={c}>{c}</option>;})}</select>
        <select value={fCadence} onChange={function(e){setFCadence(e.target.value);}} style={SEL}><option value="">All billing</option>{allCadences.map(function(c){return<option key={c} value={c}>{c}</option>;})}</select>
        <select value={fLoc} onChange={function(e){setFLoc(e.target.value);}} style={SEL}><option value="">All locations</option>{locs.map(function(l){return<option key={l.id} value={l.id}>{l.name}</option>;})}</select>
        <select value={sortBy} onChange={function(e){setSortBy(e.target.value);}} style={SEL}>
          <option value="name">Sort: Name</option>
          <option value="category">Sort: Category</option>
          <option value="cadence">Sort: Billing freq</option>
          <option value="spend">Sort: Monthly spend ↓</option>
        </select>
        <div style={{fontSize:13,color:"#6B7280",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
          <span>{filtered.length} vendors</span>
          {totalMonthlySpend>0&&<span style={{fontWeight:700,color:"#166534",background:"#DCFCE7",padding:"2px 10px",borderRadius:99}}>
            ${totalMonthlySpend.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0})}/mo known MRC
          </span>}
        </div>
      </div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:"1rem"}}>{filtered.map(function(v){var d=daysUntil(v.contractExpiry);var alert=d!==null&&d<90;return(<div key={v.id} style={{background:"#fff",border:alert?"1px solid #FCA5A5":"1px solid #E5E7EB",borderRadius:12,padding:"1.25rem",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}><div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}><div><div style={{fontWeight:600,fontSize:15,color:"#111827"}}>{v.name}</div><span style={{fontSize:11,color:"#1D4ED8",background:"#DBEAFE",padding:"1px 7px",borderRadius:99,fontWeight:500}}>{v.category}</span>
                    {v.billingCadence&&<span style={{fontSize:11,fontWeight:700,padding:"1px 7px",borderRadius:99,
                      color:v.billingCadence==="Monthly"?"#166534":v.billingCadence==="Annual"?"#6D28D9":v.billingCadence==="Per Purchase"?"#6B7280":"#92400E",
                      background:v.billingCadence==="Monthly"?"#DCFCE7":v.billingCadence==="Annual"?"#EDE9FE":v.billingCadence==="Per Purchase"?"#F3F4F6":"#FEF3C7"
                    }}>{(v.billingCadence==="Monthly"?"● ":v.billingCadence==="Annual"?"◆ ":"○ ")+v.billingCadence.toUpperCase()}</span>}
                  </div><div style={{display:"flex",gap:4}}><button onClick={function(){setEdit(v);}} style={BI}><i className="ti ti-edit" aria-hidden={true}/></button><button onClick={function(){if(confirm("Delete?"))setVendors(function(prev){return prev.filter(function(x){return x.id!==v.id;});});}} style={Object.assign({},BI,{color:"#DC2626"})}><i className="ti ti-trash" aria-hidden={true}/></button></div></div><div style={{fontSize:13,display:"flex",flexDirection:"column",gap:5}}>{v.contactName&&<div style={{display:"flex",gap:6,color:"#6B7280"}}><i className="ti ti-user" style={{fontSize:13}} aria-hidden={true}/>{v.contactName}</div>}{v.phone&&<div style={{display:"flex",gap:6,color:"#6B7280"}}><i className="ti ti-phone" style={{fontSize:13}} aria-hidden={true}/>{v.phone}</div>}{v.email&&<div style={{display:"flex",gap:6,color:"#6B7280"}}><i className="ti ti-mail" style={{fontSize:13}} aria-hidden={true}/>{v.email}</div>}{(function(){
                  if(!v.renewalDate&&!(v.contracts||[]).some(function(c){return c.endDate;})) return null;
                  var isMeraki=/meraki/i.test(v.name);
                  var dates=[];
                  var hasContractDates=(v.contracts||[]).some(function(c){return c.endDate;});
                  // Only show vendor-level renewalDate if no contracts have endDates (avoid triple-counting)
                  if(v.renewalDate && !hasContractDates) dates.push({date:v.renewalDate,amount:v.renewalAmount,label:""});
                  (v.contracts||[]).forEach(function(c){
                    if(!c.endDate) return;
                    // Estimate lump sum from monthlyAmount * 36 (3yr cycle) if no vendor-level renewalAmount
                    var estLump=c.monthlyAmount?(parseFloat(c.monthlyAmount)*36).toFixed(0):"";
                    dates.push({date:c.endDate,amount:v.renewalAmount||estLump,isEst:!v.renewalAmount&&!!estLump,label:c.description});
                  });
                  return dates.map(function(item,i){
                    var d=new Date(item.date);
                    var days=Math.round((d-new Date())/86400000);
                    var dateStr=d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
                    var urgent=days<730;
                    if(!urgent) return <div key={i} style={{display:"flex",alignItems:"center",gap:6,color:"#6B7280"}}><i className="ti ti-refresh" style={{fontSize:13}} aria-hidden={true}/><span style={{fontSize:12}}>Renewal: {dateStr}{item.amount?" — $"+item.amount:""}</span></div>;
                    var bg=isMeraki?"#FEE2E2":"#FEF3C7";
                    var bdr=isMeraki?"#DC2626":"#F59E0B";
                    var clr=isMeraki?"#991B1B":"#92400E";
                    return(<div key={i} style={{background:bg,border:"1px solid "+bdr,borderRadius:6,padding:"5px 8px",fontSize:11,marginTop:2}}>
                      <div style={{fontWeight:700,color:clr}}>{isMeraki?"🔴 ":"⚠️ "}Renews {dateStr} ({days} days)</div>
                      {isMeraki&&<div style={{color:"#DC2626",fontWeight:700}}>ALL MANAGED DEVICES GO OFFLINE WITHOUT RENEWAL</div>}
                      {item.amount?<div style={{color:clr}}>Renewal cost: <strong>{item.isEst?"est. ":""}</strong><strong>${parseFloat(item.amount).toLocaleString()}</strong>{item.isEst&&<span style={{fontSize:10,opacity:.8}}> (amortized rate ×36 — actual will differ)</span>}</div>:<div style={{color:clr}}>Renewal cost: <strong>unknown — budget carefully</strong></div>}
                    </div>);
                  });
                })()}
                  {(v.urlWebsite||v.urlSupport||v.urlPortal)&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:2}}>{v.urlWebsite&&<a href={v.urlWebsite} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"#1D4ED8",textDecoration:"none",background:"#EEF2FF",borderRadius:5,padding:"2px 8px",display:"flex",alignItems:"center",gap:3}}><i className="ti ti-world" style={{fontSize:11}} aria-hidden={true}/>Website</a>}{v.urlSupport&&<a href={v.urlSupport} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"#166534",textDecoration:"none",background:"#DCFCE7",borderRadius:5,padding:"2px 8px",display:"flex",alignItems:"center",gap:3}}><i className="ti ti-headset" style={{fontSize:11}} aria-hidden={true}/>Support</a>}{v.urlPortal&&<a href={v.urlPortal} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"#6D28D9",textDecoration:"none",background:"#EDE9FE",borderRadius:5,padding:"2px 8px",display:"flex",alignItems:"center",gap:3}}><i className="ti ti-layout-dashboard" style={{fontSize:11}} aria-hidden={true}/>Portal</a>}</div>}
                {vendorMonthlySpend(v)>0?(
                  <div style={{marginTop:6}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#166534",background:"#DCFCE7",padding:"2px 10px",borderRadius:99,display:"inline-block",marginBottom:4}}>
                      ${vendorMonthlySpend(v).toFixed(0)}/mo MRC
                      {v.contracts&&v.contracts.filter(function(c){return c.monthlyAmount;}).length>0
                        ? " · "+v.contracts.filter(function(c){return c.monthlyAmount;}).length+" contract"+(v.contracts.filter(function(c){return c.monthlyAmount;}).length!==1?"s":"")
                        : " · from renewal"}
                    </div>
                    {v.contracts&&v.contracts.filter(function(c){return c.monthlyAmount;}).length>0&&(
                      <div style={{display:"flex",flexDirection:"column",gap:2}}>
                        {v.contracts.filter(function(c){return c.monthlyAmount;}).map(function(c,i){return(
                          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"1px 0"}}>
                            <span style={{fontSize:11,color:"#9CA3AF",flex:1,marginRight:8,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={c.description+(c.accountNumber?" ("+c.accountNumber+")":"")}>
                              {c.description}{c.accountNumber&&<span style={{color:"#D1D5DB",marginLeft:4}}>#{c.accountNumber}</span>}
                            </span>
                            <span style={{fontSize:11,fontWeight:600,color:"#374151",flexShrink:0}}>${parseFloat(c.monthlyAmount).toFixed(0)}/mo</span>
                          </div>
                        );})}
                      </div>
                    )}
                  </div>
                ):null}
                {v.bills&&v.bills.length>0&&<div style={{fontSize:11,color:"#6D28D9",background:"#EDE9FE",padding:"2px 8px",borderRadius:99,display:"inline-block",marginTop:4}}>{v.bills.length} bill{v.bills.length>1?"s":""} imported</div>}
                {v.notes&&<div style={{color:"#9CA3AF",fontSize:12,marginTop:4}}><RedFlag text={v.notes}/></div>}</div></div>);})}</div></div>);}
function VendorForm(p){
  var vendor=p.vendor,ops=p.ops,onSave=p.onSave,onCancel=p.onCancel,apiKey=p.apiKey;
  var [form,setForm]       = useState(vendor||{});
  var [bills,setBills]     = useState((vendor&&vendor.bills)||[]);
  var [contracts,setContracts] = useState((vendor&&vendor.contracts)||[]);
  var [aiLoading,setAiLoading] = useState(false);
  var [aiMsg,setAiMsg]     = useState("");
  var [newContract,setNewContract] = useState({locationId:"",description:"",accountNumber:"",startDate:"",endDate:"",monthlyAmount:"",notes:""});
  var [editContractId,setEditContractId] = useState(null);
  var [editContractData,setEditContractData] = useState(null);

  function set(k,v){ setForm(function(f){ var n=Object.assign({},f); n[k]=v; return n; }); }
  function setNC(k,v){ setNewContract(function(c){ var n=Object.assign({},c); n[k]=v; return n; }); }

  function addContract(){
    if(newContract.description||newContract.accountNumber){
      setContracts(function(prev){ return prev.concat([Object.assign({id:Math.random().toString(36).slice(2)},newContract)]); });
      setNewContract({locationId:"",description:"",accountNumber:"",startDate:"",endDate:"",monthlyAmount:"",notes:""});
    }
  }
  function removeContract(id){ setContracts(function(prev){ return prev.filter(function(c){ return c.id!==id; }); }); }

  async function handleBillImage(e){
    var file=e.target.files[0];
    if(!file) return;
    if(!apiKey){ setAiMsg("Add API key in Settings."); return; }
    setAiLoading(true); setAiMsg("Analyzing bill...");
    try{
      var reader=new FileReader();
      reader.onload=async function(){
        var base64=reader.result.split(",")[1];
        var res=await fetch("https://api.anthropic.com/v1/messages",{
          method:"POST",
          headers:{"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
          body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:2000,messages:[{role:"user",content:[
            {type:"image",source:{type:"base64",media_type:file.type,data:base64}},
            {type:"text",text:"Analyze this bill/invoice image. Extract all line items, charges, and account details. Return ONLY valid JSON: {\"vendor\":\"\",\"accountNumber\":\"\",\"billDate\":\"\",\"dueDate\":\"\",\"totalAmount\":\"\",\"serviceMonth\":\"\",\"lineItems\":[{\"description\":\"\",\"amount\":\"\",\"phoneNumber\":\"\",\"extension\":\"\",\"type\":\"\"}],\"notes\":\"\"}"}
          ]}]})
        });
        var data=await res.json();
        var text=(data.content&&data.content.map(function(c){return c.text||"";}).join(""))||"";
        var parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
        var newBill=Object.assign({id:Math.random().toString(36).slice(2),importedAt:new Date().toISOString().slice(0,10)},parsed);
        setBills(function(prev){return prev.concat([newBill]);});
        if(parsed.accountNumber&&!form.accountNumber) set("accountNumber",parsed.accountNumber);
        setAiMsg(parsed.totalAmount?"Parsed! Total: $"+parsed.totalAmount+". "+parsed.lineItems.length+" line items.":"Parsed successfully.");
        setAiLoading(false);
      };
      reader.readAsDataURL(file);
    }catch(err){ setAiLoading(false); setAiMsg("Failed: "+err.message); }
  }

  function removeBill(id){ setBills(function(prev){return prev.filter(function(b){return b.id!==id;});}); }

  var CADENCES = ["Monthly","Quarterly","Annual","Monthly + Per Service Call","Per Service Call","Per Purchase","Never / One-time"];
  var cadenceColor = {
    "Monthly":        {c:"#166534",bg:"#DCFCE7"},
    "Quarterly":      {c:"#0891B2",bg:"#E0F2FE"},
    "Annual":         {c:"#6D28D9",bg:"#EDE9FE"},
    "Per Service Call":{c:"#92400E",bg:"#FEF3C7"},
    "Per Purchase":   {c:"#6B7280",bg:"#F3F4F6"},
    "Never / One-time":{c:"#374151",bg:"#F3F4F6"},
    "Monthly + Per Service Call":{c:"#0891B2",bg:"#E0F2FE"},
  };
  var cc = cadenceColor[form.billingCadence]||{c:"#6B7280",bg:"#F3F4F6"};

  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem"}}>
        <button onClick={onCancel} style={{background:"transparent",border:"none",cursor:"pointer",color:"#6B7280",fontSize:13,display:"flex",alignItems:"center",gap:4}}>
          <i className="ti ti-arrow-left" aria-hidden={true}/> Back
        </button>
        <h2 style={{fontSize:19,fontWeight:600,margin:0,color:"#111827"}}>{form.id?"Edit Vendor":"New Vendor"}</h2>
      </div>
      <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"1.5rem",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>

        <FormSection label="Vendor info">
          <FormField label="Vendor name"    value={form.name}        onChange={function(e){set("name",e.target.value);}}/>
          <FormField label="Category"       value={form.category}    onChange={function(e){set("category",e.target.value);}}    opts={VCATS}/>
          <FormField label="Operator"       value={form.operator}    onChange={function(e){set("operator",e.target.value);}}    opts={ops}/>
          <FormField label="Contact name"   value={form.contactName} onChange={function(e){set("contactName",e.target.value);}}/>
          <FormField label="Phone"          value={form.phone}       onChange={function(e){set("phone",e.target.value);}}/>
          <FormField label="Email"          value={form.email}       onChange={function(e){set("email",e.target.value);}}/>
          <FormField label="Company website"  value={form.urlWebsite} onChange={function(e){set("urlWebsite",e.target.value);}}  placeholder="https://..."/>
          <FormField label="Support website"  value={form.urlSupport} onChange={function(e){set("urlSupport",e.target.value);}}  placeholder="https://support..."/>
          <FormField label="Live portal / dashboard" value={form.urlPortal} onChange={function(e){set("urlPortal",e.target.value);}} placeholder="https://portal..."/>
        </FormSection>

        {/* Billing cadence — prominent */}
        <div style={{marginBottom:"1.25rem"}}>
          <div style={{fontSize:11,fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:".6px",marginBottom:8,paddingBottom:5,borderBottom:"1px solid #F3F4F6"}}>Billing frequency</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            {CADENCES.map(function(c){
              var sel = form.billingCadence===c;
              var col = cadenceColor[c]||{c:"#6B7280",bg:"#F3F4F6"};
              return <button key={c} onClick={function(){set("billingCadence",c);}}
                style={{padding:"6px 14px",borderRadius:99,border:"2px solid "+(sel?col.c:"#E5E7EB"),
                  background:sel?col.bg:"#fff",color:sel?col.c:"#6B7280",
                  cursor:"pointer",fontSize:12,fontWeight:sel?700:400}}>
                {c==="Monthly"?"● ":c==="Annual"?"◆ ":c==="Quarterly"?"▲ ":"○ "}{c}
              </button>;
            })}
          </div>
          {form.billingCadence&&<div style={{marginTop:8,fontSize:12}}>
            <span style={{fontWeight:700,color:cc.c,background:cc.bg,padding:"2px 10px",borderRadius:99}}>
              {form.billingCadence==="Monthly"?"● ":form.billingCadence==="Annual"?"◆ ":form.billingCadence==="Quarterly"?"▲ ":"○ "}
              {form.billingCadence.toUpperCase()}
            </span>
          </div>}
        </div>

        {/* Contracts — supports multiple */}
        <div style={{marginBottom:"1.25rem"}}>
          <div style={{fontSize:11,fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:".6px",marginBottom:8,paddingBottom:5,borderBottom:"1px solid #F3F4F6"}}>
            Contracts ({contracts.length})
            <span style={{fontSize:10,fontWeight:400,marginLeft:8,textTransform:"none"}}>Each location/service can have its own contract (e.g. 4 Comcast contracts)</span>
          </div>

          {/* Existing contracts */}
          {contracts.map(function(c,ci){
            var isEditing=editContractId===c.id;
            return(
            <div key={c.id} style={{background:"#F9FAFB",border:"1px solid "+(isEditing?"#3B82F6":"#E5E7EB"),borderRadius:8,padding:"10px 12px",marginBottom:8,position:"relative"}}>
              <div style={{position:"absolute",top:6,right:6,display:"flex",gap:4}}>
                <button onClick={function(){setEditContractId(isEditing?null:c.id);setEditContractData(isEditing?null:Object.assign({},c));}} style={{background:isEditing?"#DBEAFE":"transparent",border:"none",cursor:"pointer",color:isEditing?"#1D4ED8":"#6B7280",fontSize:12,padding:"2px 6px",borderRadius:4}}>{isEditing?"✓ Done":"✎"}</button>
                <button onClick={function(){removeContract(c.id);}} style={{background:"transparent",border:"none",cursor:"pointer",color:"#DC2626",fontSize:12}}>✕</button>
              </div>
              {isEditing&&editContractData?(
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:8,paddingRight:60}}>
                  {[["Location/Service","locationId",""],["Description","description",""],["Account #","accountNumber",""],["Start","startDate","date"],["End/Expiry","endDate","date"],["$/mo","monthlyAmount",""],["Notes","notes",""]].map(function(f){return(
                    <div key={f[1]} style={{display:"flex",flexDirection:"column",gap:2}}>
                      <label style={{fontSize:10,color:"#9CA3AF",fontWeight:600}}>{f[0]}</label>
                      <input value={editContractData[f[1]]||""} type={f[2]||"text"} onChange={function(e){var v=e.target.value;setEditContractData(function(prev){return Object.assign({},prev,{[f[1]]:v});});setContracts(function(prev){return prev.map(function(x){return x.id===c.id?Object.assign({},x,{[f[1]]:v}):x;});});}} style={Object.assign({},INP,{fontSize:12,padding:"3px 6px"})}/>
                    </div>
                  );})}
                </div>
              ):(
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8,paddingRight:60}}>
                  {[["Location",c.locationId],["Description",c.description],["Account #",c.accountNumber],["Start",c.startDate],["End/Expiry",c.endDate],["$/mo",c.monthlyAmount],["Notes",c.notes]].filter(function(r){return r[1];}).map(function(r){return(
                    <div key={r[0]}><div style={{fontSize:10,color:"#9CA3AF",fontWeight:600}}>{r[0]}</div><div style={{fontSize:13,color:"#374151"}}>{r[1]}</div></div>
                  );})}
                </div>
              )}
            </div>
            );
          })}

          {/* Add new contract */}
          <div style={{background:"#EBF5FF",border:"1px dashed #BFDBFE",borderRadius:8,padding:"12px"}}>
            <div style={{fontSize:11,fontWeight:600,color:"#1D4ED8",marginBottom:8}}>+ Add contract</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8,marginBottom:8}}>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Location / Service</label>
                <input value={newContract.locationId} onChange={function(e){setNC("locationId",e.target.value);}} placeholder="e.g. Cartersville" style={INP}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Description</label>
                <input value={newContract.description} onChange={function(e){setNC("description",e.target.value);}} placeholder="e.g. Internet 500" style={INP}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Account number</label>
                <input value={newContract.accountNumber} onChange={function(e){setNC("accountNumber",e.target.value);}} style={INP}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Start date</label>
                <input type="date" value={newContract.startDate} onChange={function(e){setNC("startDate",e.target.value);}} style={INP}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>End / expiry</label>
                <input type="date" value={newContract.endDate} onChange={function(e){setNC("endDate",e.target.value);}} style={INP}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>$/mo</label>
                <input value={newContract.monthlyAmount} onChange={function(e){setNC("monthlyAmount",e.target.value);}} placeholder="0.00" style={INP}/>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:8}}>
              <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Notes</label>
              <input value={newContract.notes} onChange={function(e){setNC("notes",e.target.value);}} style={INP}/>
            </div>
            <button onClick={addContract} style={Object.assign({},BP,{background:"#1D4ED8",fontSize:12})}>Add Contract</button>
          </div>
        </div>

        <FormSection label="Software / license renewal">
          <FormField label="Renewal date"    value={form.renewalDate}   onChange={function(e){set("renewalDate",e.target.value);}}   type="date"/>
          <FormField label="Annual cost ($)" value={form.renewalAmount} onChange={function(e){set("renewalAmount",e.target.value);}}/>
          <FormField label="License / seats" value={form.licenseCount}  onChange={function(e){set("licenseCount",e.target.value);}}/>
          <FormField label="Renewal notes"   value={form.renewalNotes}  onChange={function(e){set("renewalNotes",e.target.value);}}/>
        </FormSection>

        <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:"1.25rem"}}>
          <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>General notes</label>
          <textarea value={form.notes||""} onChange={function(e){set("notes",e.target.value);}} rows={2} style={Object.assign({},INP,{resize:"vertical"})}/>
        </div>

        {/* Bill importer */}
        <div style={{background:"#EBF5FF",border:"1px solid #BFDBFE",borderRadius:10,padding:"1rem 1.25rem",marginBottom:"1.25rem"}}>
          <div style={{fontWeight:600,fontSize:13,color:"#1D4ED8",marginBottom:6}}>AI Bill Parser</div>
          <div style={{fontSize:12,color:"#1D4ED8",marginBottom:10}}>Upload a bill image — AI extracts every line item, charge, phone number, and account detail.</div>
          <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
            <input type="file" accept="image/*,application/pdf" onChange={handleBillImage} style={{fontSize:13}}/>
            {aiLoading&&<span style={{fontSize:12,color:"#1D4ED8"}}>Analyzing...</span>}
            {!apiKey&&<span style={{fontSize:12,color:"#DC2626"}}>Add API key in Settings to enable</span>}
          </div>
          {aiMsg&&<div style={{fontSize:12,color:"#1D4ED8",marginTop:8,fontWeight:500}}>{aiMsg}</div>}
          {bills.length>0&&(
            <div style={{marginTop:12}}>
              <div style={{fontSize:11,fontWeight:600,color:"#6B7280",textTransform:"uppercase",letterSpacing:".5px",marginBottom:6}}>Parsed bills ({bills.length})</div>
              {bills.map(function(b){return(
                <div key={b.id} style={{background:"#fff",border:"1px solid #BFDBFE",borderRadius:8,padding:"10px 12px",marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                    <div style={{display:"flex",gap:12,fontSize:13,flexWrap:"wrap"}}>
                      <span style={{fontWeight:600,color:"#111827"}}>{b.serviceMonth||b.billDate||"Bill"}</span>
                      {b.totalAmount&&<span style={{fontWeight:700,color:"#166534"}}>${b.totalAmount}</span>}
                      {b.accountNumber&&<span style={{color:"#6B7280"}}>Acct: {b.accountNumber}</span>}
                      <span style={{fontSize:11,color:"#9CA3AF"}}>Imported {b.importedAt}</span>
                    </div>
                    <button onClick={function(){removeBill(b.id);}} style={Object.assign({},BI,{color:"#DC2626"})}><i className="ti ti-trash" aria-hidden={true}/></button>
                  </div>
                  {b.lineItems&&b.lineItems.length>0&&(
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                      <thead><tr style={{background:"#F0F9FF"}}>{["Description","Amount","Phone / Ext","Type"].map(function(h){return<th key={h} style={{padding:"3px 8px",textAlign:"left",color:"#6B7280",fontWeight:600,fontSize:11}}>{h}</th>;})}</tr></thead>
                      <tbody>{b.lineItems.map(function(li,idx){return<tr key={idx} style={{borderTop:"1px solid #E0F2FE"}}><td style={{padding:"3px 8px",color:"#374151"}}>{li.description}</td><td style={{padding:"3px 8px",color:"#166534",fontWeight:600}}>{li.amount?("$"+li.amount):""}</td><td style={{padding:"3px 8px",color:"#6B7280"}}>{[li.phoneNumber,li.extension].filter(Boolean).join(" / ")||"—"}</td><td style={{padding:"3px 8px",color:"#6B7280"}}>{li.type||"—"}</td></tr>;})}</tbody>
                    </table>
                  )}
                </div>
              );})}
            </div>
          )}
        </div>

        <div style={{display:"flex",gap:10}}>
          <button onClick={function(){onSave(Object.assign({},form,{bills:bills,contracts:contracts}));}} style={BP}>Save</button>
          <button onClick={onCancel} style={BS}>Cancel</button>
        </div>
      </div>
    </div>
  );
}



function OperatorEditor({op, onSave, onCancel, cs}){
  var [form,setForm] = useState(Object.assign({contacts:[{name:"",title:"",phone:"",email:""}]},op));
  function upd(k,v){ setForm(function(f){return Object.assign({},f,{[k]:v});}); }
  function updContact(i,k,v){
    setForm(function(f){
      var c=f.contacts.slice();
      c[i]=Object.assign({},c[i],{[k]:v});
      return Object.assign({},f,{contacts:c});
    });
  }
  function addContact(){ setForm(function(f){return Object.assign({},f,{contacts:f.contacts.concat([{name:"",title:"",phone:"",email:""}])});}); }
  function removeContact(i){ setForm(function(f){return Object.assign({},f,{contacts:f.contacts.filter(function(_,j){return j!==i;})});}); }

  function handleLogo(e){
    var file=e.target.files[0];
    if(!file) return;
    var reader=new FileReader();
    reader.onload=function(){ upd("logo",reader.result); };
    reader.readAsDataURL(file);
  }

  return(
    <div style={{maxWidth:700}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem"}}>
        <button onClick={onCancel} style={{background:"transparent",border:"none",cursor:"pointer",color:"#6B7280",fontSize:13,display:"flex",alignItems:"center",gap:4}}>
          <i className="ti ti-arrow-left" aria-hidden={true}/> Back
        </button>
        <h2 style={{fontSize:19,fontWeight:600,margin:0,color:"#111827"}}>Edit Operator: {op.name}</h2>
      </div>

      <div style={cs}>
        <div style={{fontWeight:600,fontSize:13,color:"#374151",marginBottom:12}}>Identity</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Operator name</label>
            <input value={form.name||""} onChange={function(e){upd("name",e.target.value);}} style={INP}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Short name</label>
            <input value={form.shortName||""} onChange={function(e){upd("shortName",e.target.value);}} style={INP}/>
          </div>
        </div>

        <div style={{fontWeight:600,fontSize:13,color:"#374151",marginBottom:10,marginTop:4}}>Logo</div>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:4}}>
          {form.logo
            ? <img src={form.logo} alt="logo" style={{height:44,maxWidth:160,objectFit:"contain",borderRadius:6,background:"#F3F4F6",padding:"4px 8px"}}/>
            : <div style={{width:60,height:44,background:"#F3F4F6",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"#D1D5DB",fontSize:11}}>No logo</div>
          }
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={{cursor:"pointer",background:"#EEF2FF",color:"#4F46E5",border:"1px solid #C7D2FE",borderRadius:7,padding:"5px 12px",fontSize:12,fontWeight:600,display:"inline-flex",alignItems:"center",gap:5}}>
              <i className="ti ti-upload" style={{fontSize:13}} aria-hidden={true}/>{form.logo?"Change logo":"Upload logo"}
              <input type="file" accept="image/*" onChange={handleLogo} style={{display:"none"}}/>
            </label>
            {form.logo&&<button onClick={function(){upd("logo","");}} style={{background:"transparent",border:"none",cursor:"pointer",color:"#DC2626",fontSize:12,textAlign:"left",padding:0}}>Remove logo</button>}
          </div>
          <div style={{fontSize:11,color:"#9CA3AF"}}>PNG or SVG recommended. Displayed in nav bar (inverted white on dark background).</div>
        </div>
      </div>

      <div style={cs}>
        <div style={{fontWeight:600,fontSize:13,color:"#374151",marginBottom:12}}>Address</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10}}>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Street address</label>
            <input value={form.street||""} onChange={function(e){upd("street",e.target.value);}} style={INP}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 80px 100px 120px",gap:8}}>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>City</label>
              <input value={form.city||""} onChange={function(e){upd("city",e.target.value);}} style={INP}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>State</label>
              <input value={form.state||""} onChange={function(e){upd("state",e.target.value);}} maxLength={2} style={INP}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>ZIP</label>
              <input value={form.zip||""} onChange={function(e){upd("zip",e.target.value);}} style={INP}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Country</label>
              <input value={form.country||"USA"} onChange={function(e){upd("country",e.target.value);}} style={INP}/>
            </div>
          </div>
        </div>
      </div>

      <div style={cs}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontWeight:600,fontSize:13,color:"#374151"}}>Contacts</div>
          <button onClick={addContact} style={{fontSize:11,fontWeight:600,color:"#1D4ED8",background:"#DBEAFE",border:"none",borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>+ Add contact</button>
        </div>
        {form.contacts.map(function(c,i){return(
          <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr auto",gap:8,marginBottom:8,alignItems:"end"}}>
            {[["Name","name"],["Title","title"],["Phone","phone"],["Email","email"]].map(function(f){return(
              <div key={f[1]} style={{display:"flex",flexDirection:"column",gap:3}}>
                {i===0&&<label style={{fontSize:10,color:"#9CA3AF",fontWeight:600}}>{f[0]}</label>}
                <input value={c[f[1]]||""} onChange={function(e){updContact(i,f[1],e.target.value);}} style={Object.assign({},INP,{fontSize:12,padding:"4px 7px"})}/>
              </div>
            );})}
            <button onClick={function(){removeContact(i);}} style={{background:"transparent",border:"none",cursor:"pointer",color:"#DC2626",fontSize:16,paddingBottom:form.contacts.length>1?2:0}}>✕</button>
          </div>
        );})}
      </div>

      <div style={{display:"flex",gap:10,marginBottom:"2rem"}}>
        <button onClick={function(){onSave(form);}} style={BP}>Save Operator</button>
        <button onClick={onCancel} style={BS}>Cancel</button>
      </div>
    </div>
  );
}

function Settings(p){
  var ops=p.ops,setOps=p.setOps,locs=p.locs,setLocs=p.setLocs,apiKey=p.apiKey,setApiKey=p.setApiKey,vendors=p.vendors||[],dids=p.dids||[],assets=p.assets||[];
  var [newOp,setNewOp]     = useState("");
  var [editOp,setEditOp]   = useState(null);
  var [newLocName,setNewLocName] = useState("");
  var [newLocOp,setNewLocOp]    = useState((ops[0]&&ops[0].id)||"");
  var [keyIn,setKeyIn]     = useState(apiKey);
  var [editLoc,setEditLoc] = useState(null); // location being edited
  var cs = {background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"1.25rem",marginBottom:"1rem",boxShadow:"0 1px 3px rgba(0,0,0,.06)"};

  if(editLoc!==null){
    return (
      <div style={{maxWidth:660}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem"}}>
          <button onClick={function(){setEditLoc(null);}} style={{background:"transparent",border:"none",cursor:"pointer",color:"#6B7280",fontSize:13,display:"flex",alignItems:"center",gap:4}}>
            <i className="ti ti-arrow-left" aria-hidden={true}/> Back
          </button>
          <h2 style={{fontSize:19,fontWeight:600,margin:0,color:"#111827"}}>Edit Location: {editLoc.name}</h2>
        </div>
        <div style={cs}>
          <FormSection label="Location identity">
            <FormField label="Location name" value={editLoc.name} onChange={function(e){setEditLoc(function(l){return Object.assign({},l,{name:e.target.value});});}}/>
            <FormField label="Short name" value={editLoc.shortName} onChange={function(e){setEditLoc(function(l){return Object.assign({},l,{shortName:e.target.value});});}}/>
          </FormSection>
          <FormSection label="Contact info">
            <FormField label="Street address" value={editLoc.address||""} onChange={function(e){setEditLoc(function(l){return Object.assign({},l,{address:e.target.value});});}}/>
            <FormField label="Main phone number" value={editLoc.mainPhone||""} onChange={function(e){setEditLoc(function(l){return Object.assign({},l,{mainPhone:e.target.value});});}}/>
            <FormField label="Executive Director name" value={editLoc.edName||""} onChange={function(e){setEditLoc(function(l){return Object.assign({},l,{edName:e.target.value});});}}/>
            <FormField label="Maintenance tech name" value={editLoc.maintenanceTech||""} onChange={function(e){setEditLoc(function(l){return Object.assign({},l,{maintenanceTech:e.target.value});});}}/>
          </FormSection>
          <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:"1.25rem"}}>
            <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Notes</label>
            <textarea value={editLoc.notes||""} onChange={function(e){setEditLoc(function(l){return Object.assign({},l,{notes:e.target.value});});}} rows={3} style={Object.assign({},INP,{resize:"vertical"})}/>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={function(){setLocs(function(prev){return prev.map(function(l){return l.id===editLoc.id?editLoc:l;});});setEditLoc(null);}} style={BP}>Save Location</button>
            <button onClick={function(){setEditLoc(null);}} style={BS}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{maxWidth:700}}>
      <h2 style={{fontSize:20,fontWeight:600,margin:"0 0 1.5rem",color:"#111827"}}>Settings</h2>

      <div style={cs}>
        <div style={{fontWeight:600,marginBottom:10,color:"#111827"}}>Anthropic API Key — enables AI photo extraction and bill parsing</div>
        <div style={{display:"flex",gap:8}}>
          <input type="password" value={keyIn} onChange={function(e){setKeyIn(e.target.value);}} placeholder="sk-ant-..." style={Object.assign({},INP,{flex:1})}/>
          <button onClick={function(){setApiKey(keyIn);}} style={BP}>Save</button>
        </div>
        {apiKey&&<div style={{fontSize:12,color:"#166534",marginTop:6,fontWeight:500}}>✓ Key saved</div>}
        <div style={{fontSize:12,color:"#9CA3AF",marginTop:6}}>Stored in this browser only.</div>
      </div>

      {editOp!==null
        ? <OperatorEditor op={editOp} onSave={function(updated){setOps(function(prev){return prev.map(function(o){return o.id===updated.id?updated:o;});});setEditOp(null);}} onCancel={function(){setEditOp(null);}} cs={cs}/>
        : (
      <div style={cs}>
        <div style={{fontWeight:600,marginBottom:12,color:"#111827"}}>Operators (Customers)</div>
        {ops.map(function(o){return(
          <div key={o.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #F3F4F6",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:12,flex:1,minWidth:0}}>
              {o.logo
                ? <img src={o.logo} alt={o.name} style={{height:28,maxWidth:90,objectFit:"contain",flexShrink:0,borderRadius:4,background:"#F9FAFB",padding:2}}/>
                : <div style={{width:36,height:36,background:"#EEF2FF",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><i className="ti ti-building" style={{fontSize:18,color:"#6366F1"}} aria-hidden={true}/></div>
              }
              <div style={{minWidth:0}}>
                <div style={{fontWeight:600,fontSize:14,color:"#111827"}}>{o.name}</div>
                {(o.city||o.state)&&<div style={{fontSize:12,color:"#6B7280"}}>{[o.city,o.state,o.country].filter(Boolean).join(", ")}</div>}
                {o.contacts&&o.contacts.length>0&&<div style={{fontSize:11,color:"#9CA3AF"}}>{o.contacts[0].name}{o.contacts[0].title?" · "+o.contacts[0].title:""}</div>}
              </div>
            </div>
            <div style={{display:"flex",gap:4,flexShrink:0}}>
              <button onClick={function(){setEditOp(o);}} style={BI}><i className="ti ti-edit" aria-hidden={true}/></button>
              <button onClick={function(){if(confirm("Delete operator?"))setOps(function(prev){return prev.filter(function(x){return x.id!==o.id;});});}} style={Object.assign({},BI,{color:"#DC2626"})}><i className="ti ti-trash" aria-hidden={true}/></button>
            </div>
          </div>
        );})}
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <input value={newOp} onChange={function(e){setNewOp(e.target.value);}} placeholder="New operator name" style={Object.assign({},INP,{flex:1})}/>
          <button onClick={function(){if(newOp.trim()){setOps(function(prev){return prev.concat([{id:"op-"+uid(),name:newOp.trim(),shortName:newOp.trim().split(" ")[0],logo:"",webLink:"",street:"",city:"",state:"",zip:"",country:"USA",contacts:[]}]);});setNewOp("");}}} style={BP}>Add</button>
        </div>
      </div>
        )}

      <div style={Object.assign({},cs,{marginBottom:0})}>
        <div style={{fontWeight:600,marginBottom:10,color:"#111827"}}>Locations</div>
        {locs.map(function(l){
          var opName=(ops.find(function(o){return o.id===l.operatorId;})||{}).shortName;
          return(
            <div key={l.id} style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #F3F4F6"}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:14,fontWeight:500,color:"#374151"}}>{l.name}</span>
                  {opName&&<span style={{fontSize:11,color:"#9CA3AF"}}>({opName})</span>}
                  {l.edName&&<span style={{fontSize:11,color:"#6B7280"}}>ED: {l.edName}</span>}
                  {calcLocationSpend(l.id, vendors, dids, locs, assets).total>0
                    ?<span style={{fontSize:12,fontWeight:700,color:"#166534",background:"#DCFCE7",padding:"1px 8px",borderRadius:99}}>
                        ${calcLocationSpend(l.id, vendors, dids, locs, assets).total.toFixed(0)}/mo est.
                      </span>
                    :<span style={{fontSize:11,color:"#9CA3AF"}}>$ unknown</span>}
                  {l.edName&&<span style={{fontSize:11,color:"#6B7280"}}>ED: {l.edName}</span>}
                </div>
                <div style={{display:"flex",gap:12,marginTop:2,fontSize:12,color:"#9CA3AF",flexWrap:"wrap"}}>
                  {l.address&&<span><i className="ti ti-map-pin" style={{fontSize:11}} aria-hidden={true}/> {l.address}</span>}
                  {l.mainPhone&&<span><i className="ti ti-phone" style={{fontSize:11}} aria-hidden={true}/> {l.mainPhone}</span>}
                  {l.maintenanceTech&&<span><i className="ti ti-tool" style={{fontSize:11}} aria-hidden={true}/> {l.maintenanceTech}</span>}
                </div>
              </div>
              <div style={{display:"flex",gap:4,flexShrink:0,marginLeft:8}}>
                <button onClick={function(){setEditLoc(l);}} style={BI}><i className="ti ti-edit" aria-hidden={true}/></button>
                <button onClick={function(){if(confirm("Delete location?"))setLocs(function(prev){return prev.filter(function(x){return x.id!==l.id;});});}} style={Object.assign({},BI,{color:"#DC2626"})}><i className="ti ti-trash" aria-hidden={true}/></button>
              </div>
            </div>
          );
        })}
        <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
          <select value={newLocOp} onChange={function(e){setNewLocOp(e.target.value);}} style={SEL}>{ops.map(function(o){return<option key={o.id} value={o.id}>{o.name}</option>;})}</select>
          <input value={newLocName} onChange={function(e){setNewLocName(e.target.value);}} placeholder="Location name" style={Object.assign({},INP,{flex:1,minWidth:150})}/>
          <button onClick={function(){if(newLocName.trim()){setLocs(function(prev){return prev.concat([{id:"loc-"+uid(),operatorId:newLocOp,name:newLocName.trim(),shortName:newLocName.trim().split(",")[0].trim(),address:"",mainPhone:"",edName:"",maintenanceTech:"",notes:""}]);});setNewLocName("");}}} style={BP}>Add</button>
        </div>
      </div>
    </div>
  );
}
