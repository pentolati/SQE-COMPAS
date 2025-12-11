# COMPAS Flowcharts & High-Level Flows
## Berdasarkan EXECUTIVE_VISION.md dan AI_REVIEW_SESSION.md

**Color Palette Used:** p2.png (Purple to Cyan gradient)
- Primary: #5B21B6 (Deep Purple)
- Secondary: #A855F7 (Purple)
- Tertiary: #C4B5FD (Lavender)
- Accent 1: #BAD5F5 (Light Blue)
- Accent 2: #A7F3D0 (Cyan/Mint)

---

## 1. COMPAS HIGH-LEVEL ARCHITECTURE FLOW

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7', 'secondaryColor': '#C4B5FD', 'tertiaryColor': '#BAD5F5'}}}%%

flowchart TB
    subgraph INPUT["DATA INPUT LAYER"]
        style INPUT fill:#5B21B6,stroke:#A855F7,color:#fff
        A1[("Process Logs")]
        A2[("Documents")]
        A3[("SOPs")]
        A4[("Regulatory DB")]
    end

    subgraph AI["AI ENGINE"]
        style AI fill:#A855F7,stroke:#5B21B6,color:#fff
        B1["NLP/LLM Processing"]
        B2["Rules Engine"]
        B3["ML Models"]
        B4["Explainability Layer"]
    end

    subgraph APP["APPLICATION LAYER"]
        style APP fill:#C4B5FD,stroke:#A855F7,color:#333
        C1["Executive Dashboard"]
        C2["Alert System"]
        C3["Report Generator"]
        C4["AI Assistant"]
        C5["Learning Platform"]
    end

    subgraph GOV["GOVERNANCE LAYER"]
        style GOV fill:#BAD5F5,stroke:#5B21B6,color:#333
        D1["Human-in-the-Loop"]
        D2["Model Versioning"]
        D3["Confidence Scoring"]
        D4["Rollout Controls"]
        D5["Audit Trail"]
    end

    INPUT --> AI
    AI --> APP
    APP <--> GOV
    GOV --> AI
```

---

## 2. REGULATORY CHANGE AUTO-ADAPT FLOW (Original)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7', 'secondaryColor': '#C4B5FD', 'tertiaryColor': '#BAD5F5'}}}%%

flowchart TD
    A["Regulation Change Detected"] --> B["AI Analyzes Impact on Current SOPs"]
    B --> C["AI Drafts SOP Amendments"]
    C --> D["Human Review & Approval<br/>(Compliance Officer)"]
    D --> E{"Approved?"}
    E -->|Yes| F["Staged Rollout<br/>(Test Branch First)"]
    E -->|No| G["Revision Required"]
    G --> C
    F --> H["Training Auto-Triggered<br/>for Affected Employees"]
    H --> I["Grace Period<br/>(30-60 days)"]
    I --> J["Full Enforcement<br/>with Monitoring"]

    style A fill:#5B21B6,stroke:#A855F7,color:#fff
    style B fill:#A855F7,stroke:#5B21B6,color:#fff
    style C fill:#A855F7,stroke:#5B21B6,color:#fff
    style D fill:#C4B5FD,stroke:#A855F7,color:#333
    style E fill:#BAD5F5,stroke:#5B21B6,color:#333
    style F fill:#C4B5FD,stroke:#A855F7,color:#333
    style G fill:#A7F3D0,stroke:#5B21B6,color:#333
    style H fill:#C4B5FD,stroke:#A855F7,color:#333
    style I fill:#BAD5F5,stroke:#5B21B6,color:#333
    style J fill:#5B21B6,stroke:#A855F7,color:#fff
```

---

## 3. DEVIATION DETECTION FLOW

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7'}}}%%

flowchart TD
    A["Process/Transaction Occurs"] --> B["AI Continuous Monitoring"]
    B --> C["Compare Against SOP<br/>& Regulations"]
    C --> D{"Deviation<br/>Detected?"}
    D -->|No| E["Log Normal Activity"]
    D -->|Yes| F["Generate Alert<br/>with Severity & Confidence"]
    F --> G{"Confidence<br/>Level?"}
    G -->|High| H["Auto-Flag & Notify<br/>Compliance Officer"]
    G -->|Low| I["Escalate to<br/>Human Review"]
    H --> J["AI Explains Reasoning<br/>(SHAP/LIME)"]
    I --> J
    J --> K["Log in Audit Trail"]

    style A fill:#5B21B6,stroke:#A855F7,color:#fff
    style B fill:#A855F7,stroke:#5B21B6,color:#fff
    style C fill:#A855F7,stroke:#5B21B6,color:#fff
    style D fill:#BAD5F5,stroke:#5B21B6,color:#333
    style E fill:#A7F3D0,stroke:#5B21B6,color:#333
    style F fill:#C4B5FD,stroke:#A855F7,color:#333
    style G fill:#BAD5F5,stroke:#5B21B6,color:#333
    style H fill:#C4B5FD,stroke:#A855F7,color:#333
    style I fill:#C4B5FD,stroke:#A855F7,color:#333
    style J fill:#A855F7,stroke:#5B21B6,color:#fff
    style K fill:#5B21B6,stroke:#A855F7,color:#fff
```

---

## 4. GO-TO-MARKET PHASE FLOW (Legacy - See Section 7 for Revised)

> **Note:** This was the original 15-month timeline. See **Section 7** for the revised 18-24 month timeline based on AI Review recommendations.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7'}}}%%

flowchart LR
    subgraph P1["PHASE 1: Internal Pilot"]
        direction TB
        A1["Month 1-3"]
        A2["Target: SQE Internal"]
        A3["Goal: 80% SOPs Digitized"]
    end

    subgraph P2["PHASE 2: FS Pilot"]
        direction TB
        B1["Month 4-9"]
        B2["Target: Sinarmas Multifinance"]
        B3["Goal: 50% Audit Prep Reduction"]
    end

    subgraph P3["PHASE 3: FS Rollout"]
        direction TB
        C1["Month 10-15"]
        C2["Target: Bank Sinarmas, ASM"]
        C3["Goal: Full SMMA Coverage"]
    end

    subgraph P4["PHASE 4: Mining"]
        direction TB
        D1["Month 16+"]
        D2["Target: GEMS/DSSA"]
        D3["Goal: Cross-Pillar Platform"]
    end

    P1 --> P2 --> P3 --> P4

    style P1 fill:#5B21B6,stroke:#A855F7,color:#fff
    style P2 fill:#A855F7,stroke:#5B21B6,color:#fff
    style P3 fill:#C4B5FD,stroke:#A855F7,color:#333
    style P4 fill:#BAD5F5,stroke:#5B21B6,color:#333
```

---

## 5. LEARNING ENGAGEMENT FLOW (Legacy - See Section 8 for Revised)

> **Note:** This was the original "Gamified Learning" approach. See **Section 8** for the revised "Contextual Compliance Engagement" framework based on AI Review recommendations.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7'}}}%%

flowchart TD
    A["Employee Onboarding<br/>/ SOP Update"] --> B["Learning Path Assigned"]
    B --> C["Daily/Weekly Quizzes"]
    C --> D["Earn Points & Badges"]
    D --> E{"Completed<br/>All Modules?"}
    E -->|No| F["Reminder Notification<br/>'Ada update SOP baru!'"]
    F --> C
    E -->|Yes| G["Certification Earned"]
    G --> H["Update Personal<br/>Compliance Score"]
    H --> I["Department Leaderboard<br/>Updated"]
    I --> J["Achievement Timeline<br/>Logged"]

    style A fill:#5B21B6,stroke:#A855F7,color:#fff
    style B fill:#A855F7,stroke:#5B21B6,color:#fff
    style C fill:#C4B5FD,stroke:#A855F7,color:#333
    style D fill:#C4B5FD,stroke:#A855F7,color:#333
    style E fill:#BAD5F5,stroke:#5B21B6,color:#333
    style F fill:#A7F3D0,stroke:#5B21B6,color:#333
    style G fill:#A855F7,stroke:#5B21B6,color:#fff
    style H fill:#C4B5FD,stroke:#A855F7,color:#333
    style I fill:#BAD5F5,stroke:#5B21B6,color:#333
    style J fill:#5B21B6,stroke:#A855F7,color:#fff
```

---

# REVISED FLOWS (Berdasarkan AI_REVIEW_SESSION.md)

---

## 6. REVISED: REGULATORY CHANGE AUTO-ADAPT FLOW (Enhanced)
**Perubahan:** Ditambahkan Dynamic Regulatory Adaptation Framework, Human-in-the-Loop mandatory, dan RAG safeguards

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7'}}}%%

flowchart TD
    A["Regulatory Intelligence Engine<br/>(API to OJK/BI/MOE)"] --> B["OCR-to-Structured Rule<br/>Processing"]
    B --> C["Knowledge Graph<br/>Rule Mapping"]
    C --> D["AI Impact Analysis<br/>on Current SOPs"]
    D --> E["RAG-Enhanced<br/>SOP Draft Generation"]
    E --> F{"AI Confidence<br/>Score > 85%?"}
    F -->|No| G["Mandatory Human<br/>Review & Edit"]
    F -->|Yes| H["Human Approval Required<br/>(Compliance Officer)"]
    G --> H
    H --> I{"Approved?"}
    I -->|No| J["Revision with<br/>Human Feedback"]
    J --> E
    I -->|Yes| K["Staged Rollout<br/>(Test Entity First)"]
    K --> L["UAT + Pilot Testing<br/>(3-month buffer)"]
    L --> M["Training Auto-Triggered"]
    M --> N["Grace Period<br/>(30-60 days)"]
    N --> O["Full Enforcement<br/>+ Continuous Monitoring"]
    O --> P["Bias Audit &<br/>Model Validation"]

    style A fill:#5B21B6,stroke:#A855F7,color:#fff
    style B fill:#5B21B6,stroke:#A855F7,color:#fff
    style C fill:#A855F7,stroke:#5B21B6,color:#fff
    style D fill:#A855F7,stroke:#5B21B6,color:#fff
    style E fill:#C4B5FD,stroke:#A855F7,color:#333
    style F fill:#BAD5F5,stroke:#5B21B6,color:#333
    style G fill:#A7F3D0,stroke:#5B21B6,color:#333,stroke-width:3px
    style H fill:#A7F3D0,stroke:#5B21B6,color:#333,stroke-width:3px
    style I fill:#BAD5F5,stroke:#5B21B6,color:#333
    style J fill:#A7F3D0,stroke:#5B21B6,color:#333
    style K fill:#C4B5FD,stroke:#A855F7,color:#333
    style L fill:#C4B5FD,stroke:#A855F7,color:#333
    style M fill:#A855F7,stroke:#5B21B6,color:#fff
    style N fill:#BAD5F5,stroke:#5B21B6,color:#333
    style O fill:#5B21B6,stroke:#A855F7,color:#fff
    style P fill:#5B21B6,stroke:#A855F7,color:#fff
```

---

## 7. REVISED: GO-TO-MARKET PHASE FLOW (18-24 Months)
**Perubahan:** Timeline diperpanjang sesuai rekomendasi AI Review

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7'}}}%%

flowchart LR
    subgraph P1["PHASE 1"]
        direction TB
        A1["Month 1-6"]
        A2["Core SaaS Platform"]
        A3["Synthetic Data Pipeline"]
        A4["MVP: Dashboard + Assistant"]
    end

    subgraph P2["PHASE 2"]
        direction TB
        B1["Month 7-10"]
        B2["Human-in-Loop Modules"]
        B3["High-Risk Alert Workflows"]
        B4["PDP Law Compliance"]
    end

    subgraph P3["PHASE 3"]
        direction TB
        C1["Month 11-16"]
        C2["Regional Pilots"]
        C3["Jurisdiction-Specific Testing"]
        C4["ROI Validation"]
    end

    subgraph P4["PHASE 4"]
        direction TB
        D1["Month 17-21"]
        D2["SMMA Full Rollout"]
        D3["Cross-Entity Benchmarking"]
        D4["3-Month UAT Buffer"]
    end

    subgraph P5["PHASE 5"]
        direction TB
        E1["Month 22-24+"]
        E2["Mining Expansion"]
        E3["GEMS/DSSA Integration"]
        E4["External Monetization"]
    end

    P1 --> P2 --> P3 --> P4 --> P5

    style P1 fill:#5B21B6,stroke:#A855F7,color:#fff
    style P2 fill:#A855F7,stroke:#5B21B6,color:#fff
    style P3 fill:#C4B5FD,stroke:#A855F7,color:#333
    style P4 fill:#BAD5F5,stroke:#5B21B6,color:#333
    style P5 fill:#A7F3D0,stroke:#5B21B6,color:#333
```

---

## 8. REVISED: CONTEXTUAL COMPLIANCE ENGAGEMENT FLOW
**Perubahan:** Gamification di-reframe menjadi "Contextual Compliance Engagement" sesuai rekomendasi AI Review

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7'}}}%%

flowchart TD
    A["Compliance Task/Alert<br/>Generated"] --> B{"Risk Level<br/>Assessment"}

    B -->|Low Risk| C["Light Engagement Track"]
    B -->|High Risk| D["Mandatory Workflow Track"]

    subgraph LOW["LOW-RISK PATH"]
        C --> C1["Gamified Training Module"]
        C1 --> C2["Points & Badges"]
        C2 --> C3["Team Leaderboard"]
    end

    subgraph HIGH["HIGH-RISK PATH"]
        D --> D1["Compulsory Rule-Based<br/>Workflow"]
        D1 --> D2["Senior Management<br/>Escalation"]
        D2 --> D3["Sign-off Required"]
        D3 --> D4["Audit Trail Logged"]
    end

    C3 --> E["Update Personal<br/>Compliance Score"]
    D4 --> E
    E --> F["Link to Real-World KPIs:<br/>'Risk Exposure Down X%'"]
    F --> G["Local-Centric Incentives<br/>(Indonesian Corporate Culture)"]

    style A fill:#5B21B6,stroke:#A855F7,color:#fff
    style B fill:#BAD5F5,stroke:#5B21B6,color:#333
    style LOW fill:#C4B5FD,stroke:#A855F7,color:#333
    style HIGH fill:#A7F3D0,stroke:#5B21B6,color:#333,stroke-width:3px
    style C fill:#C4B5FD,stroke:#A855F7,color:#333
    style C1 fill:#C4B5FD,stroke:#A855F7,color:#333
    style C2 fill:#C4B5FD,stroke:#A855F7,color:#333
    style C3 fill:#C4B5FD,stroke:#A855F7,color:#333
    style D fill:#A855F7,stroke:#5B21B6,color:#fff
    style D1 fill:#A855F7,stroke:#5B21B6,color:#fff
    style D2 fill:#A855F7,stroke:#5B21B6,color:#fff
    style D3 fill:#A855F7,stroke:#5B21B6,color:#fff
    style D4 fill:#A855F7,stroke:#5B21B6,color:#fff
    style E fill:#5B21B6,stroke:#A855F7,color:#fff
    style F fill:#5B21B6,stroke:#A855F7,color:#fff
    style G fill:#5B21B6,stroke:#A855F7,color:#fff
```

---

## 9. NEW: DATA STRATEGY & ETL FLOW
**Ditambahkan:** Sesuai rekomendasi AI Review untuk mengatasi Data/ETL strategy yang missing

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7'}}}%%

flowchart TD
    subgraph SOURCE["DATA SOURCES"]
        A1["Legacy ERP Systems<br/>(40+ Subsidiaries)"]
        A2["Regulatory PDFs<br/>(OJK/BI/MOE)"]
        A3["Process Logs"]
        A4["Documents & SOPs"]
    end

    subgraph ETL["ETL PIPELINE"]
        B1["Data Extraction<br/>Connectors"]
        B2["OCR Processing<br/>(Indonesian Regulations)"]
        B3["Data Cleaning<br/>& Normalization"]
        B4["Synthetic Data<br/>Generation (Testing)"]
    end

    subgraph STORAGE["DATA LAKE"]
        C1["Structured Rules DB"]
        C2["Knowledge Graph"]
        C3["Audit Logs"]
        C4["Training Data"]
    end

    subgraph GOVERNANCE["DATA GOVERNANCE"]
        D1["PDP Law 2023<br/>Compliance"]
        D2["Role-Based Access"]
        D3["Data Encryption"]
        D4["7-Year Retention"]
    end

    SOURCE --> ETL
    ETL --> STORAGE
    STORAGE <--> GOVERNANCE

    style SOURCE fill:#5B21B6,stroke:#A855F7,color:#fff
    style ETL fill:#A855F7,stroke:#5B21B6,color:#fff
    style STORAGE fill:#C4B5FD,stroke:#A855F7,color:#333
    style GOVERNANCE fill:#A7F3D0,stroke:#5B21B6,color:#333,stroke-width:3px
```

---

## 10. NEW: HUMAN-IN-THE-LOOP WORKFLOW
**Ditambahkan:** Sesuai rekomendasi AI Review untuk mandatory human review

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7'}}}%%

flowchart TD
    A["AI Decision/Recommendation<br/>Generated"] --> B{"Decision Type?"}

    B -->|"Low-Risk<br/>(Training, Info)"| C["Auto-Execute<br/>with Logging"]
    B -->|"Medium-Risk<br/>(Alerts, Reports)"| D["Queue for<br/>Human Review"]
    B -->|"High-Risk<br/>(SOP Changes, Escalations)"| E["Mandatory Human<br/>Approval Required"]

    C --> F["Log to Audit Trail"]

    D --> G["Compliance Officer<br/>Reviews Queue"]
    G --> H{"Approve?"}
    H -->|Yes| I["Execute with<br/>Human Sign-off"]
    H -->|No| J["Reject with<br/>Feedback to AI"]
    I --> F
    J --> K["AI Model<br/>Feedback Loop"]

    E --> L["Senior Management<br/>Escalation"]
    L --> M["Multi-Level<br/>Approval Workflow"]
    M --> N{"All Approvals<br/>Received?"}
    N -->|Yes| O["Execute with<br/>Full Audit Trail"]
    N -->|No| P["Pending/Revision<br/>Required"]
    O --> F
    P --> E

    style A fill:#5B21B6,stroke:#A855F7,color:#fff
    style B fill:#BAD5F5,stroke:#5B21B6,color:#333
    style C fill:#C4B5FD,stroke:#A855F7,color:#333
    style D fill:#A855F7,stroke:#5B21B6,color:#fff
    style E fill:#A7F3D0,stroke:#5B21B6,color:#333,stroke-width:3px
    style F fill:#5B21B6,stroke:#A855F7,color:#fff
    style G fill:#A855F7,stroke:#5B21B6,color:#fff
    style H fill:#BAD5F5,stroke:#5B21B6,color:#333
    style I fill:#C4B5FD,stroke:#A855F7,color:#333
    style J fill:#A7F3D0,stroke:#5B21B6,color:#333
    style K fill:#A855F7,stroke:#5B21B6,color:#fff
    style L fill:#A7F3D0,stroke:#5B21B6,color:#333,stroke-width:3px
    style M fill:#A7F3D0,stroke:#5B21B6,color:#333,stroke-width:3px
    style N fill:#BAD5F5,stroke:#5B21B6,color:#333
    style O fill:#5B21B6,stroke:#A855F7,color:#fff
    style P fill:#C4B5FD,stroke:#A855F7,color:#333
```

---

## 11. EXECUTIVE SUMMARY: ORIGINAL vs REVISED COMPARISON

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5B21B6', 'primaryTextColor': '#fff', 'primaryBorderColor': '#A855F7', 'lineColor': '#A855F7'}}}%%

flowchart LR
    subgraph ORIGINAL["ORIGINAL VISION"]
        direction TB
        O1["15-Month Timeline"]
        O2["Gamification Focus"]
        O3["Auto-Adapt (AI-First)"]
        O4["Basic Data Integration"]
        O5["Implicit Human Review"]
    end

    subgraph ARROW[" "]
        direction TB
        AR["AI REVIEW<br/>RECOMMENDATIONS"]
    end

    subgraph REVISED["REVISED VISION"]
        direction TB
        R1["18-24 Month Timeline<br/>+ UAT Buffer"]
        R2["Contextual Engagement<br/>(Risk-Based)"]
        R3["RAG + Human-in-Loop<br/>Mandatory"]
        R4["Full ETL + Data Lake<br/>+ PDP Compliance"]
        R5["Explicit Approval<br/>Workflows"]
    end

    ORIGINAL --> ARROW --> REVISED

    style ORIGINAL fill:#C4B5FD,stroke:#A855F7,color:#333
    style ARROW fill:#A855F7,stroke:#5B21B6,color:#fff
    style REVISED fill:#A7F3D0,stroke:#5B21B6,color:#333,stroke-width:3px
```

---

## Color Legend

| Color | Hex Code | Usage |
|-------|----------|-------|
| Deep Purple | #5B21B6 | Primary elements, critical actions |
| Purple | #A855F7 | Secondary elements, AI processes |
| Lavender | #C4B5FD | Tertiary elements, user interactions |
| Light Blue | #BAD5F5 | Decision points, conditional flows |
| Cyan/Mint | #A7F3D0 | Human-in-the-loop elements, NEW additions |

---

**Document Info:**
- Generated for: COMPAS (Compliance Process Automation Service)
- Based on: EXECUTIVE_VISION.md + AI_REVIEW_SESSION.md
- Palette: p2.png (Purple to Cyan gradient)
- Format: Mermaid.js compatible

---

*"Be the golden bridge that people want to pass and could pass to make their lives and activities easier."*

**— Tata**
