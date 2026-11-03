# FimIt for Claude and ChatGPT

Ready-made skills for the [FimIt](https://fim-it.com) connector. FimIt turns a
LiDAR scan from an iPhone or iPad (or an imported DXF/PDF drawing) into a floor
plan and 3D model. With this plugin you can ask Claude or ChatGPT about the
spaces you have scanned and get a finished answer in one prompt.

## What you can ask

| Skill | Try asking |
|---|---|
| Room areas | "Room-by-room areas for my latest scan" |
| Cleaning-quote brief | "Cleaning quote for Solgården at 2.50 kr/m², weekly" |
| Contractor brief | "Measurement brief for the floor fitter for Storgatan 4" |
| Flooring brief | "How much flooring do the bedrooms need?" |
| Interior design | "Will a 2.2 × 0.95 m sofa fit in the living room?" |
| Space inventory | "Room list by type for the Head office project" |
| Paint brief | "How much wall is there to paint in the bedrooms?" |
| Accessibility check | "Which doors are narrower than 0.80 m?" |
| Downloads | "What files can I download for this scan?" |

Every answer states the units, the scan date, whether the scan was calibrated
and whether the plan was edited, and never adds up areas from different scans,
because two scans can cover the same floor.

## Install

You need a FimIt account whose plan includes the AI Assistant Connector.

- **Claude (web and desktop):** Customize → Plugins → Add marketplace →
  `Fim-It/fimit-ai-plugin`, install **fimit**, then connect FimIt on the
  plugin's Connectors tab and sign in with your FimIt account.
- **Claude Code:** `/plugin marketplace add Fim-It/fimit-ai-plugin`, then
  `/plugin install fimit@fimit`.
- **Connector only:** the address is `https://mcp.fim-it.com/mcp` — see
  [app.fim-it.com/docs/mcp](https://app.fim-it.com/docs/mcp).

## Data

The skills are instructions only; they contain no code and store nothing. They
read your own FimIt data through the read-only FimIt connector, after you sign in
to FimIt and approve the connection. Nothing in FimIt is changed, deleted or
converted. What the AI provider does with the answer is governed by its own
terms. FimIt's privacy policy: [app.fim-it.com/privacy](https://app.fim-it.com/privacy).

## For developers

`node scripts/check.mjs` checks every skill's frontmatter, that the shared
measurement rules are identical in every skill, that only real connector tools
are named, and that no ids, keys or addresses are published.

License: MIT.
