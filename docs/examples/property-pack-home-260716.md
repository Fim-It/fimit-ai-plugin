# Example: property pack for "Home 260716"

What the `fimit-property-pack` skill produces for one real scan, written by
following the skill's steps by hand against the live FimIt connector on
8 November 2026 (`get_scan_summary`, `get_scan_rooms`, `get_scan_exports`,
`get_scan_openings`). The only change is the scan link, replaced by a
placeholder because the repo publishes no scan or project ids.

Prompt: "Property pack for Home 260716 for my listing"

---

> **Property pack — Home 260716** (draft)
>
> | Room | Type | Inside walls (m²) | Outline (m²) | Ceiling height (m) | Room id |
> |---|---|---|---|---|---|
> | Room 1 | not detected | 28.58 | 30.73 | 2.52 | r1s8 |
> | Room 2 | not detected | 8.12 | 8.99 | 2.52 | r1s2 |
> | bedroom (detected) | bedroom (detected) | 8.07 | 8.87 | 2.52 | r1s1 |
> | Room 3 | not detected | 5.31 | 5.78 | 2.52 | r1s3 |
> | laundry (detected) | laundry (detected) | 2.56 | 2.89 | 2.52 | r1s5 |
> | bathroom (detected) | bathroom (detected) | 2.50 | 2.83 | 2.52 | r1s6 |
> | **Total, this scan** | | **55.14** | **60.09** | | |
>
> "Inside walls" is the floor inside the walls; "Outline" is the room's
> outline. All 6 rooms are measured.
>
> **Listing paragraph** — *Draft — check against the property before you
> publish.*
>
> 6 rooms: 1 bedroom, 1 bathroom, 1 laundry room and 3 other rooms. Floor area
> 55.14 m² inside the walls, measured with FimIt (LiDAR scan). Ceiling height
> 2.52 m.
>
> **Files for the listing**
>
> - 2D floor plan: SVG ready (vector; convert to an image if your portal needs
>   one); floor-plan thumbnail (PNG) ready, preview size only. A PDF report and
>   DXF can be made in the FimIt console (included in your plan); DWG is not
>   included in your plan. Check which file types your portal accepts.
> - 3D model: GLB ready (web viewers, most 3D tools); USDZ ready for
>   iPhone/iPad AR — use the "USDZ with your plan edits applied", because this
>   plan was edited by hand and that version matches the room schedule. OBJ
>   (.zip) is also ready.
> - Scan preview image: none for this scan.
> - Download links on request; each works for 5 minutes and is personal to
>   your FimIt account, so download the file rather than pasting the link.
> - To send buyers a viewing link, create one from the scan's page in FimIt.
>   The connector cannot create share links, and the FimIt link below needs a
>   FimIt sign-in.
>
> **Doors and windows** — the plan records 9 doors and 7 windows. Door widths
> run from 0.64 m (bathroom (detected) to Room 1) to 1.86 m (in Room 1). One
> door was drawn in the editor. Door widths are the opening in the wall; the
> clear passage is smaller once the door leaf and frame are in the way.
> Thresholds, steps and lifts are not measured.
>
> - Scan: Home 260716, scanned 16 July 2026, LiDAR scan
> - Plan edited by hand: yes
> - Calibration: not calibrated — the scanner's own measurements
> - Areas are for this scan only. Don't add them to other scans.
> - Link: <the scan's fimit_url>
>
> > **About these areas.** The floor areas come from a FimIt LiDAR scan and are
> > not calibrated. They are not a certified measurement and do not follow a
> > measuring standard such as NEN 2580, BOA/BIA, LOA, RICS/IPMS or the Spanish
> > "superficie útil". You are responsible for the area you publish. Check the
> > rules for stating floor area where the property is, and have it measured to
> > that standard before quoting it as the official figure.

---

## Notes from the test

- Room 1 holds a stove, oven, refrigerator, sofa and dining table, but has no
  detected type or name, so the pack calls it "Room 1" and counts it under
  "other rooms" rather than "kitchen / living room". The agent names it in
  FimIt or in the listing; the skill does not guess.
- The room totals (55.14 m² inside walls, 60.09 m² outline) equal the scan's
  own recorded floor area (60.09 m², sum of rooms).
- Rooms here carry no `kind`, so there are no outdoor rows.
