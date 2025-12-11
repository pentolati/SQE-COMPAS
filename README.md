# COMPAS - Compliance Process Automation Service

**SQE Case Study Project** - A modern compliance management platform for Indonesian enterprises.

## Overview

COMPAS is an AI-powered compliance management platform designed to transform regulatory compliance from a burden into a competitive advantage. Built for C-level executives and compliance teams in Indonesian financial institutions.

## Features

### 1. Executive Dashboard
- Real-time compliance score (85%)
- Risk exposure monitoring (Rp 2.4B)
- Active alerts tracking
- Audit readiness percentage
- Risk heatmap visualization
- Regulatory health indicators (OJK, BI, PPATK, LPS)
- Upcoming deadlines calendar

### 2. Alerts Management
- AI-powered alert prioritization
- Risk categorization (Critical, High, Medium, Low)
- Document expiration tracking
- Environmental monitoring gaps
- Transaction pattern anomaly detection
- One-click compliance actions

### 3. Gamification (My Compliance)
- User profiles with ranks and points
- Daily challenges for compliance tasks
- Interactive quizzes with rewards
- Achievement badges system
- Rewards shop for point redemption
- Leaderboard competition

### 4. AI Assistant
- Natural language compliance queries
- SOP and regulation lookup
- Document drafting assistance
- Compliance recommendations
- Multi-format export (PDF, Word, Excel)

## Tech Stack

- **Frontend**: React 19 + Vite
- **UI Library**: Chakra UI v2
- **Icons**: Lucide React
- **Theme**: Dark/Light mode support
- **PWA**: Progressive Web App enabled

## Getting Started

```bash
# Navigate to the app directory
cd compas-app

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Screenshots

Screenshots are available in the `compas-app/screenshots/` folder:

| Page | Light Mode | Dark Mode |
|------|------------|-----------|
| Dashboard | `01-dashboard-light.png` | `01-dashboard-dark.png` |
| Alerts | `02-alerts-light.png` | `02-alerts-dark.png` |
| Gamification | `03-gamification-light.png` | `03-gamification-dark.png` |
| AI Assistant | `04-ai-assistant-light.png` | `04-ai-assistant-dark.png` |

## Project Structure

```
SQE/
├── README.md
├── EXECUTIVE_VISION.md
└── compas-app/
    ├── src/
    │   ├── components/
    │   │   └── Layout.jsx
    │   ├── context/
    │   │   └── ThemeContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Alerts.jsx
    │   │   ├── Gamification.jsx
    │   │   └── AIAssistant.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── screenshots/
    │   ├── 01-dashboard-light.png
    │   ├── 02-alerts-light.png
    │   ├── 03-gamification-light.png
    │   └── 04-ai-assistant-light.png
    └── package.json
```

## Author

**Tata** - Product Manager Case Study at SQE (Sinarmas)

## License

This project is for educational and case study purposes.
