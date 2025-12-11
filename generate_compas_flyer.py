"""
Generate COMPAS Executive Vision - Beautiful Flyer Style HTML & PDF
With colorful diagrams replacing ASCII art

Requirements:
    pip install markdown playwright
    python -m playwright install chromium
"""

import markdown
import re
from pathlib import Path
from playwright.sync_api import sync_playwright


# --------- CONFIG ---------

BASE_DIR = Path(__file__).resolve().parent
MD_INPUT = BASE_DIR / "COMPAS_EXECUTIVE_VISION_v2.md"
HTML_OUT = BASE_DIR / "COMPAS_EXECUTIVE_VISION_v2.html"
PDF_OUT = BASE_DIR / "COMPAS_EXECUTIVE_VISION_v2.pdf"


# --------- COLORFUL DIAGRAMS ---------

ALERT_WORKFLOW_DIAGRAM = """
<div class="diagram-container">
    <div class="diagram-title">Human-in-the-Loop Workflow</div>
    <div class="flow-diagram">
        <div class="flow-step flow-start">
            <div class="flow-icon">🔔</div>
            <div class="flow-label">Alert Generated</div>
        </div>
        <div class="flow-arrow">▼</div>
        <div class="flow-step flow-process">
            <div class="flow-icon">📊</div>
            <div class="flow-label">Confidence Score Evaluation</div>
        </div>
        <div class="flow-arrow">▼</div>
        <div class="confidence-box">
            <div class="confidence-row high">
                <div class="confidence-badge">HIGH</div>
                <div class="confidence-threshold">&gt;90%</div>
                <div class="confidence-actions">
                    <span>✓ Auto-flag with notification</span>
                    <span>✓ Human review optional</span>
                </div>
            </div>
            <div class="confidence-row medium">
                <div class="confidence-badge">MEDIUM</div>
                <div class="confidence-threshold">70-90%</div>
                <div class="confidence-actions">
                    <span>⚠ Mandatory human review</span>
                    <span>⚠ Compliance Officer approval</span>
                </div>
            </div>
            <div class="confidence-row low">
                <div class="confidence-badge">LOW</div>
                <div class="confidence-threshold">&lt;70%</div>
                <div class="confidence-actions">
                    <span>🔺 Escalate to Senior Management</span>
                    <span>🔺 Multi-level approval required</span>
                </div>
            </div>
        </div>
        <div class="flow-arrow">▼</div>
        <div class="flow-step flow-end">
            <div class="flow-icon">📝</div>
            <div class="flow-label">Action Taken & Logged in Audit Trail</div>
        </div>
    </div>
</div>
"""

REGULATORY_FLOW_DIAGRAM = """
<div class="diagram-container">
    <div class="diagram-title">Dynamic Regulatory Adaptation Flow</div>
    <div class="regulatory-flow">
        <div class="reg-step" style="--step-color: #3b82f6;">
            <div class="reg-number">1</div>
            <div class="reg-content">
                <div class="reg-title">Regulatory Intelligence Engine</div>
                <div class="reg-desc">API integration with OJK, BI, MOE repositories</div>
            </div>
        </div>
        <div class="reg-connector"></div>
        <div class="reg-step" style="--step-color: #8b5cf6;">
            <div class="reg-number">2</div>
            <div class="reg-content">
                <div class="reg-title">Impact Analysis</div>
                <div class="reg-desc">System analyzes impact on current SOPs</div>
            </div>
        </div>
        <div class="reg-connector"></div>
        <div class="reg-step" style="--step-color: #ec4899;">
            <div class="reg-number">3</div>
            <div class="reg-content">
                <div class="reg-title">SOP Amendment Drafting</div>
                <div class="reg-desc">Automated draft generation for review</div>
            </div>
        </div>
        <div class="reg-connector"></div>
        <div class="reg-step" style="--step-color: #f59e0b;">
            <div class="reg-number">4</div>
            <div class="reg-content">
                <div class="reg-title">Human Review & Approval</div>
                <div class="reg-desc">Compliance Officer validation</div>
            </div>
        </div>
        <div class="reg-connector"></div>
        <div class="reg-step" style="--step-color: #10b981;">
            <div class="reg-number">5</div>
            <div class="reg-content">
                <div class="reg-title">Staged Rollout</div>
                <div class="reg-desc">Test branch first, then full deployment</div>
            </div>
        </div>
        <div class="reg-connector"></div>
        <div class="reg-step" style="--step-color: #06b6d4;">
            <div class="reg-number">6</div>
            <div class="reg-content">
                <div class="reg-title">Training Auto-Triggered</div>
                <div class="reg-desc">Affected employees notified & enrolled</div>
            </div>
        </div>
        <div class="reg-connector"></div>
        <div class="reg-step" style="--step-color: #6366f1;">
            <div class="reg-number">7</div>
            <div class="reg-content">
                <div class="reg-title">Grace Period</div>
                <div class="reg-desc">30-60 days before full enforcement</div>
            </div>
        </div>
        <div class="reg-connector"></div>
        <div class="reg-step" style="--step-color: #22c55e;">
            <div class="reg-number">8</div>
            <div class="reg-content">
                <div class="reg-title">Full Enforcement</div>
                <div class="reg-desc">Active monitoring & compliance tracking</div>
            </div>
        </div>
    </div>
</div>
"""

DATA_ARCHITECTURE_DIAGRAM = """
<div class="diagram-container">
    <div class="diagram-title">Data Architecture Overview</div>
    <div class="arch-diagram">
        <div class="arch-layer" style="--layer-color: #3b82f6;">
            <div class="arch-layer-title">DATA INGESTION LAYER</div>
            <div class="arch-boxes">
                <div class="arch-box">
                    <div class="arch-box-icon">🔗</div>
                    <div class="arch-box-title">Legacy ERP Connectors</div>
                    <div class="arch-box-desc">SAP, Oracle, Custom</div>
                </div>
                <div class="arch-box">
                    <div class="arch-box-icon">🏦</div>
                    <div class="arch-box-title">Core Banking APIs</div>
                    <div class="arch-box-desc">Real-time feeds</div>
                </div>
                <div class="arch-box">
                    <div class="arch-box-icon">📤</div>
                    <div class="arch-box-title">Manual Upload</div>
                    <div class="arch-box-desc">Excel, PDF</div>
                </div>
            </div>
        </div>
        <div class="arch-arrow">⬇</div>
        <div class="arch-layer" style="--layer-color: #8b5cf6;">
            <div class="arch-layer-title">ETL & PROCESSING LAYER</div>
            <div class="arch-boxes">
                <div class="arch-box">
                    <div class="arch-box-icon">🧹</div>
                    <div class="arch-box-title">Data Cleaning Pipeline</div>
                    <div class="arch-box-desc">Quality scoring</div>
                </div>
                <div class="arch-box">
                    <div class="arch-box-icon">📄</div>
                    <div class="arch-box-title">OCR Engine</div>
                    <div class="arch-box-desc">PDF → Text</div>
                </div>
                <div class="arch-box">
                    <div class="arch-box-icon">🔄</div>
                    <div class="arch-box-title">Format Normalizer</div>
                    <div class="arch-box-desc">Multi-format</div>
                </div>
            </div>
        </div>
        <div class="arch-arrow">⬇</div>
        <div class="arch-layer" style="--layer-color: #10b981;">
            <div class="arch-layer-title">STORAGE & ANALYTICS LAYER</div>
            <div class="arch-boxes">
                <div class="arch-box">
                    <div class="arch-box-icon">🗄️</div>
                    <div class="arch-box-title">Compliance Data Lake</div>
                    <div class="arch-box-desc">Structured + Raw</div>
                </div>
                <div class="arch-box">
                    <div class="arch-box-icon">🤖</div>
                    <div class="arch-box-title">ML Model Registry</div>
                    <div class="arch-box-desc">Version control</div>
                </div>
                <div class="arch-box">
                    <div class="arch-box-icon">📋</div>
                    <div class="arch-box-title">Audit Logs</div>
                    <div class="arch-box-desc">Immutable</div>
                </div>
            </div>
        </div>
    </div>
</div>
"""

PLATFORM_ARCHITECTURE_DIAGRAM = """
<div class="diagram-container">
    <div class="diagram-title">COMPAS Platform Architecture</div>
    <div class="platform-diagram">
        <div class="platform-header">COMPAS PLATFORM</div>
        <div class="platform-layers">
            <div class="platform-col">
                <div class="platform-box data-layer">
                    <div class="platform-box-title">Data Layer</div>
                    <ul>
                        <li>Process Logs</li>
                        <li>Documents</li>
                        <li>SOPs</li>
                        <li>Regulatory DB</li>
                        <li>OCR Data</li>
                    </ul>
                </div>
            </div>
            <div class="platform-arrow">→</div>
            <div class="platform-col">
                <div class="platform-box engine-layer">
                    <div class="platform-box-title">Engine Layer</div>
                    <ul>
                        <li>NLP / LLM</li>
                        <li>RAG System</li>
                        <li>Rules Engine</li>
                        <li>ML Models</li>
                        <li>Explainability</li>
                    </ul>
                </div>
            </div>
            <div class="platform-arrow">→</div>
            <div class="platform-col">
                <div class="platform-box app-layer">
                    <div class="platform-box-title">Application Layer</div>
                    <ul>
                        <li>Dashboard</li>
                        <li>Alerts</li>
                        <li>Reports</li>
                        <li>Chat Assistant</li>
                        <li>Learning</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="governance-bar">
            <div class="governance-title">GOVERNANCE LAYER</div>
            <div class="governance-items">
                <span>Human-in-the-Loop</span>
                <span>Model Versioning</span>
                <span>Confidence Scoring</span>
                <span>Rollout Controls</span>
                <span>Audit Trail</span>
                <span>PDP Compliance</span>
            </div>
        </div>
    </div>
</div>
"""


# --------- HTML TEMPLATE ---------

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>COMPAS Executive Vision v2.0</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        :root {{
            --primary: #1e3a8a;
            --primary-light: #3b82f6;
            --secondary: #8b5cf6;
            --accent: #ec4899;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --dark: #0f172a;
            --gray: #64748b;
            --light: #f1f5f9;
        }}

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 10.5pt;
            line-height: 1.6;
            color: var(--dark);
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }}

        .container {{
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 25px 80px rgba(15, 23, 42, 0.15);
        }}

        /* Cover Section */
        .cover {{
            background: var(--primary);
            color: white;
            padding: 80px 50px;
            text-align: center;
        }}

        .cover-content {{
            position: relative;
            z-index: 1;
        }}

        .cover h1 {{
            font-size: 56pt;
            font-weight: 800;
            letter-spacing: 0.15em;
            margin-bottom: 10px;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }}

        .cover h2 {{
            font-size: 14pt;
            font-weight: 500;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            opacity: 0.9;
            margin-bottom: 8px;
        }}

        .cover h3 {{
            font-size: 11pt;
            font-weight: 400;
            opacity: 0.8;
            margin-bottom: 40px;
        }}

        .cover-meta {{
            display: flex;
            justify-content: center;
            gap: 40px;
            font-size: 10pt;
            opacity: 0.85;
        }}

        .cover-meta-item {{
            display: flex;
            flex-direction: column;
            align-items: center;
        }}

        .cover-meta-label {{
            font-size: 8pt;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            opacity: 0.7;
        }}

        /* Page content */
        .page-content {{
            padding: 40px 50px;
        }}

        /* Section styling */
        .section {{
            margin-bottom: 35px;
        }}

        /* Headings */
        h1 {{
            font-size: 20pt;
            font-weight: 800;
            color: var(--primary);
            margin: 45px 0 20px 0;
            padding-bottom: 12px;
            border-bottom: 3px solid var(--primary-light);
            position: relative;
        }}

        h1::after {{
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 60px;
            height: 3px;
            background: var(--accent);
        }}

        h2 {{
            font-size: 14pt;
            font-weight: 700;
            color: var(--primary);
            margin: 30px 0 15px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        h2::before {{
            content: '';
            width: 4px;
            height: 24px;
            background: linear-gradient(180deg, var(--primary-light), var(--secondary));
            border-radius: 2px;
        }}

        h3 {{
            font-size: 12pt;
            font-weight: 600;
            color: var(--secondary);
            margin: 22px 0 12px 0;
        }}

        h4 {{
            font-size: 11pt;
            font-weight: 600;
            color: var(--gray);
            margin: 18px 0 10px 0;
        }}

        /* Paragraphs */
        p {{
            margin: 12px 0;
            text-align: justify;
        }}

        /* Lists */
        ul, ol {{
            margin: 12px 0 12px 20px;
        }}

        li {{
            margin: 8px 0;
            position: relative;
        }}

        ul li::marker {{
            color: var(--primary-light);
        }}

        /* Tables */
        table {{
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin: 20px 0;
            font-size: 9.5pt;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
        }}

        th {{
            background: var(--primary);
            color: white;
            font-weight: 600;
            text-align: left;
            padding: 12px 14px;
        }}

        td {{
            padding: 12px 16px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: top;
        }}

        tr:last-child td {{
            border-bottom: none;
        }}

        tr:nth-child(even) {{
            background: #f8fafc;
        }}

        tr:hover {{
            background: #f1f5f9;
        }}

        /* Strong text */
        strong {{
            font-weight: 700;
            color: var(--primary);
        }}

        /* Blockquotes */
        blockquote {{
            border-left: 4px solid var(--secondary);
            background: #f5f3ff;
            padding: 18px 24px;
            margin: 20px 0;
            border-radius: 0 12px 12px 0;
        }}

        blockquote p {{
            margin: 0;
            color: var(--primary);
            font-style: italic;
        }}

        /* Horizontal rules */
        hr {{
            border: none;
            height: 2px;
            background: var(--primary-light);
            margin: 40px 0;
            border-radius: 1px;
        }}

        /* Code blocks - we won't have dark ones now */
        pre {{
            display: none;
        }}

        code {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 9pt;
            background: #f1f5f9;
            padding: 2px 8px;
            border-radius: 6px;
            color: var(--secondary);
        }}

        /* ========== DIAGRAM STYLES ========== */

        .diagram-container {{
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 16px;
            padding: 24px;
            margin: 24px 0;
            border: 1px solid #e2e8f0;
        }}

        .diagram-title {{
            font-size: 13pt;
            font-weight: 700;
            color: var(--primary);
            text-align: center;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }}

        /* Alert Workflow Diagram */
        .flow-diagram {{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }}

        .flow-step {{
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 24px;
            border-radius: 12px;
            min-width: 280px;
            justify-content: center;
        }}

        .flow-start {{
            background: var(--primary-light);
            color: white;
        }}

        .flow-process {{
            background: var(--secondary);
            color: white;
        }}

        .flow-end {{
            background: var(--success);
            color: white;
        }}

        .flow-icon {{
            font-size: 20pt;
        }}

        .flow-label {{
            font-weight: 600;
            font-size: 11pt;
        }}

        .flow-arrow {{
            color: var(--gray);
            font-size: 18pt;
        }}

        .confidence-box {{
            width: 100%;
            max-width: 500px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.1);
        }}

        .confidence-row {{
            display: grid;
            grid-template-columns: 80px 70px 1fr;
            align-items: center;
            padding: 14px 16px;
            gap: 12px;
        }}

        .confidence-row.high {{
            background: #dcfce7;
        }}

        .confidence-row.medium {{
            background: #fef3c7;
        }}

        .confidence-row.low {{
            background: #fee2e2;
        }}

        .confidence-badge {{
            font-weight: 800;
            font-size: 10pt;
            padding: 4px 10px;
            border-radius: 6px;
            text-align: center;
        }}

        .high .confidence-badge {{
            background: var(--success);
            color: white;
        }}

        .medium .confidence-badge {{
            background: var(--warning);
            color: white;
        }}

        .low .confidence-badge {{
            background: var(--danger);
            color: white;
        }}

        .confidence-threshold {{
            font-weight: 600;
            font-size: 10pt;
            color: var(--dark);
        }}

        .confidence-actions {{
            display: flex;
            flex-direction: column;
            gap: 2px;
            font-size: 9pt;
            color: var(--dark);
        }}

        /* Regulatory Flow Diagram */
        .regulatory-flow {{
            display: flex;
            flex-direction: column;
            gap: 0;
        }}

        .reg-step {{
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 12px 20px;
            background: white;
            border-left: 4px solid var(--step-color);
            margin-left: 20px;
            position: relative;
        }}

        .reg-number {{
            width: 32px;
            height: 32px;
            background: var(--step-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 12pt;
            flex-shrink: 0;
        }}

        .reg-content {{
            flex: 1;
        }}

        .reg-title {{
            font-weight: 700;
            font-size: 10pt;
            color: var(--dark);
        }}

        .reg-desc {{
            font-size: 9pt;
            color: var(--gray);
        }}

        .reg-connector {{
            width: 4px;
            height: 12px;
            background: #e2e8f0;
            margin-left: 34px;
        }}

        /* Architecture Diagram */
        .arch-diagram {{
            display: flex;
            flex-direction: column;
            gap: 12px;
        }}

        .arch-layer {{
            background: white;
            border-radius: 12px;
            padding: 16px;
            border: 2px solid var(--layer-color);
        }}

        .arch-layer-title {{
            font-weight: 700;
            font-size: 10pt;
            color: var(--layer-color);
            text-align: center;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }}

        .arch-boxes {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }}

        .arch-box {{
            background: #f8fafc;
            border-radius: 10px;
            padding: 14px;
            text-align: center;
            border: 1px solid #e2e8f0;
        }}

        .arch-box-icon {{
            font-size: 24pt;
            margin-bottom: 6px;
        }}

        .arch-box-title {{
            font-weight: 600;
            font-size: 9pt;
            color: var(--dark);
            margin-bottom: 2px;
        }}

        .arch-box-desc {{
            font-size: 8pt;
            color: var(--gray);
        }}

        .arch-arrow {{
            text-align: center;
            font-size: 20pt;
            color: var(--gray);
        }}

        /* Platform Diagram */
        .platform-diagram {{
            background: white;
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid var(--primary);
        }}

        .platform-header {{
            background: var(--primary);
            color: white;
            text-align: center;
            padding: 12px;
            font-weight: 700;
            font-size: 12pt;
            letter-spacing: 0.15em;
        }}

        .platform-layers {{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            gap: 12px;
        }}

        .platform-col {{
            flex: 1;
        }}

        .platform-box {{
            border-radius: 10px;
            padding: 14px;
        }}

        .platform-box.data-layer {{
            background: #dbeafe;
            border: 2px solid var(--primary-light);
        }}

        .platform-box.engine-layer {{
            background: #ede9fe;
            border: 2px solid var(--secondary);
        }}

        .platform-box.app-layer {{
            background: #d1fae5;
            border: 2px solid var(--success);
        }}

        .platform-box-title {{
            font-weight: 700;
            font-size: 10pt;
            text-align: center;
            margin-bottom: 10px;
            color: var(--dark);
        }}

        .platform-box ul {{
            list-style: none;
            margin: 0;
            padding: 0;
        }}

        .platform-box li {{
            font-size: 9pt;
            padding: 4px 0;
            color: var(--dark);
            text-align: center;
        }}

        .platform-arrow {{
            font-size: 24pt;
            color: var(--gray);
            font-weight: 300;
        }}

        .governance-bar {{
            background: #fef3c7;
            padding: 14px 20px;
            border-top: 2px solid var(--warning);
        }}

        .governance-title {{
            font-weight: 700;
            font-size: 9pt;
            color: var(--dark);
            text-align: center;
            margin-bottom: 8px;
            letter-spacing: 0.1em;
        }}

        .governance-items {{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
        }}

        .governance-items span {{
            background: white;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 8pt;
            color: var(--dark);
            border: 1px solid #fbbf24;
        }}

        /* Vision Box */
        .vision-box {{
            background: var(--primary);
            color: white;
            padding: 24px 30px;
            border-radius: 16px;
            margin: 24px 0;
            text-align: center;
        }}

        .vision-box p {{
            font-size: 12pt;
            font-weight: 500;
            font-style: italic;
            text-align: center;
            margin: 0;
        }}

        /* Footer */
        .footer {{
            background: var(--dark);
            color: white;
            padding: 40px 50px;
            text-align: center;
        }}

        .footer-quote {{
            font-size: 13pt;
            font-style: italic;
            opacity: 0.9;
            margin-bottom: 12px;
        }}

        .footer-author {{
            font-weight: 700;
            font-size: 11pt;
            color: var(--primary-light);
        }}

        /* Print styles */
        @media print {{
            body {{
                background: white !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }}

            .container {{
                box-shadow: none !important;
                max-width: 100% !important;
            }}

            .cover {{
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                page-break-after: always;
            }}

            h1 {{
                page-break-before: auto;
                page-break-after: avoid;
                page-break-inside: avoid;
            }}

            h2, h3, h4 {{
                page-break-after: avoid;
                page-break-inside: avoid;
            }}

            table {{
                page-break-inside: avoid;
                font-size: 9pt !important;
            }}

            .diagram-container {{
                page-break-inside: avoid;
                page-break-before: auto;
            }}

            tr {{
                page-break-inside: avoid;
            }}

            p {{
                orphans: 3;
                widows: 3;
            }}

            .section {{
                page-break-inside: avoid;
            }}
        }}

        /* Page break helper */
        .page-break {{
            page-break-after: always;
        }}

        /* Prevent table overflow */
        table {{
            table-layout: fixed;
            word-wrap: break-word;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="cover">
            <div class="cover-content">
                <h1>COMPAS</h1>
                <h2>Compliance Process Automation Service</h2>
                <h3>Executive Vision Document</h3>
                <div class="cover-meta">
                    <div class="cover-meta-item">
                        <span class="cover-meta-label">Prepared by</span>
                        <span>Banat Zata (Tata)</span>
                    </div>
                    <div class="cover-meta-item">
                        <span class="cover-meta-label">Role</span>
                        <span>Lead Product Manager</span>
                    </div>
                    <div class="cover-meta-item">
                        <span class="cover-meta-label">Date</span>
                        <span>December 2024</span>
                    </div>
                    <div class="cover-meta-item">
                        <span class="cover-meta-label">Version</span>
                        <span>2.0</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-content">
            {content}
        </div>
        <div class="footer">
            <div class="footer-quote">"Be the golden bridge that people want to pass and could pass to make their lives and activities easier."</div>
            <div class="footer-author">— Tata</div>
        </div>
    </div>
</body>
</html>
"""


# --------- CONVERSION FUNCTIONS ---------

def convert_md_to_html(md_content: str) -> str:
    """Convert markdown to HTML with extensions"""
    md = markdown.Markdown(
        extensions=[
            'tables',
            'fenced_code',
            'toc',
        ]
    )
    return md.convert(md_content)


def replace_diagrams(html_content: str) -> str:
    """Replace diagram placeholders with colorful HTML diagrams"""
    # Remove the placeholder paragraphs
    html_content = html_content.replace('<p>[DIAGRAM: ALERT_WORKFLOW]</p>', ALERT_WORKFLOW_DIAGRAM)
    html_content = html_content.replace('<p>[DIAGRAM: REGULATORY_FLOW]</p>', REGULATORY_FLOW_DIAGRAM)
    html_content = html_content.replace('<p>[DIAGRAM: DATA_ARCHITECTURE]</p>', DATA_ARCHITECTURE_DIAGRAM)
    html_content = html_content.replace('<p>[DIAGRAM: PLATFORM_ARCHITECTURE]</p>', PLATFORM_ARCHITECTURE_DIAGRAM)

    return html_content


def add_vision_box(html_content: str) -> str:
    """Wrap the vision statement in a special box"""
    vision_text = "Make compliance invisible yet omnipresent"
    html_content = html_content.replace(
        f'<strong>The Vision:</strong> {vision_text}',
        f'</p><div class="vision-box"><p><strong>The Vision:</strong> {vision_text}</p></div><p>'
    )
    return html_content


def clean_html(html_content: str) -> str:
    """Clean up HTML - remove code blocks, empty elements"""
    # Remove pre blocks (ASCII diagrams)
    html_content = re.sub(r'<pre><code>[\s\S]*?</code></pre>', '', html_content)

    # Remove cover section from markdown (we have custom cover)
    # Remove first h1 and metadata
    html_content = re.sub(r'^<h1>COMPAS</h1>.*?<hr />', '', html_content, flags=re.DOTALL)

    # Clean empty paragraphs
    html_content = re.sub(r'<p>\s*</p>', '', html_content)

    return html_content


def render_pdf(html_path: Path, pdf_path: Path) -> None:
    """Render HTML to PDF using Playwright"""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(html_path.as_uri())
        page.wait_for_timeout(1500)
        page.pdf(
            path=str(pdf_path),
            format='A4',
            margin={
                'top': '15mm',
                'bottom': '15mm',
                'left': '15mm',
                'right': '15mm'
            },
            print_background=True,
            scale=0.9,
            prefer_css_page_size=False,
        )
        browser.close()


# --------- MAIN ---------

def main():
    print("Reading markdown file...")
    md_content = MD_INPUT.read_text(encoding='utf-8')

    print("Converting to HTML...")
    html_body = convert_md_to_html(md_content)

    print("Cleaning HTML...")
    html_body = clean_html(html_body)

    print("Replacing diagrams with colorful versions...")
    html_body = replace_diagrams(html_body)

    print("Adding vision box...")
    html_body = add_vision_box(html_body)

    full_html = HTML_TEMPLATE.format(content=html_body)

    print(f"Saving HTML to {HTML_OUT}...")
    HTML_OUT.write_text(full_html, encoding='utf-8')

    print(f"Generating PDF to {PDF_OUT}...")
    render_pdf(HTML_OUT, PDF_OUT)

    print("\nDone!")
    print(f"  HTML: {HTML_OUT}")
    print(f"  PDF:  {PDF_OUT}")


if __name__ == "__main__":
    main()
