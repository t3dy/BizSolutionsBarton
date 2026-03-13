# MovePro — Software Solutions for Moving Companies

> **Live Demo:** [https://t3dy.github.io/BizSolutionsBarton/](https://t3dy.github.io/BizSolutionsBarton/)

An interactive sales prototype demonstrating custom software solutions for moving companies like Barton Springs Moving. This is a visual demo — not production software — designed to show what's possible when a moving company upgrades from a brochure site to a full business operations platform.

## What's Inside

| Demo Page | What It Shows |
|-----------|---------------|
| **Landing Page** | Marketing homepage with problem/solution framing and feature cards |
| **Solutions & Pricing** | Three-tier pricing (Starter / Growth / Enterprise) with ROI breakdown |
| **Instant Quote Calculator** | Interactive form that generates a mock estimate (crew size, hours, price) |
| **AI Moving Assistant** | Chat interface that qualifies leads and extracts structured data |
| **Lead Dashboard** | SaaS-style CRM with filters, status badges, and search |
| **Crew Scheduling** | Calendar view with jobs assigned to crews and trucks |
| **Customer Portal** | Customer-facing view: timeline, inventory, documents, payment |
| **Review Automation** | Workflow visualization + review request pipeline tracking |
| **Analytics Dashboard** | Charts for revenue, leads, conversion funnel, crew utilization |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Presenting the Demo

1. **Start on the Landing Page** — walk through the problems moving companies face
2. **Show Solutions & Pricing** — present the three tiers and ROI math
3. **Demo the Quote Calculator** — fill out a form, show the instant estimate
4. **Demo the AI Assistant** — type a conversation, show extracted data
5. **Switch to the Lead Dashboard** — show how leads flow into a CRM
6. **Show Scheduling** — demonstrate crew/truck assignment on a calendar
7. **Show the Customer Portal** — what the customer sees (timeline, inventory, payment)
8. **Show Review Automation** — automated SMS/email workflow + stats
9. **End on Analytics** — revenue trends, conversion rates, crew utilization

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Recharts (charts)
- Lucide React (icons)
- React Router (navigation)
- All data is mocked locally — no backend required

## Project Structure

```
src/
  components/    # Reusable UI components (Card, Badge, ChatBubble, etc.)
  pages/         # One page per demo section
  data/          # Mock datasets (leads, crews, reviews, analytics)
  App.tsx        # Router setup
  main.tsx       # Entry point
```

## Related Resources

| Resource | Link |
|----------|------|
| **Solutions Catalog** (explains each tool in plain English) | [t3dy.github.io/BartonCatalog](https://t3dy.github.io/BartonCatalog/) |
| **Solutions Catalog Repo** (includes quiz, pitch script, build docs) | [github.com/t3dy/BartonCatalog](https://github.com/t3dy/BartonCatalog) |

---

Built as a sales demo for Barton Springs Moving with [Claude Code](https://claude.ai/claude-code).
