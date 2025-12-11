"""
Generate Enterprise Architecture diagram for COMPAS:
- Compliance Process Automation Service
- Based on EXECUTIVE_VISION.md + AI_REVIEW_SESSION.md revisions
- Render HTML+PNG via Playwright

Requirements:
    pip install pillow playwright
    python -m playwright install chromium
"""

from pathlib import Path
from typing import List, Tuple

from playwright.sync_api import sync_playwright


# --------- CONFIG: OUTPUT PATHS ---------

BASE_DIR = Path(__file__).resolve().parent
HTML_OUT = BASE_DIR / "compas_ea.html"
IMG_OUT = BASE_DIR / "compas_ea.png"


# --------- DATA: COMPAS ENTERPRISE ARCHITECTURE STRUCTURE ---------
# Based on EXECUTIVE_VISION.md + AI_REVIEW_SESSION.md recommendations

ARCHITECTURE = [
    (
        "Channel & Experience Layer",
        "#3b82f6",  # Blue
        [
            ("Intelligent Risk Dashboard", "C-Level single view, Risk Heatmap, Financial Exposure Ticker"),
            ("Web Portal", "Desktop/Mobile browser access"),
            ("AI Compliance Assistant", "Natural language Q&A in Bahasa Indonesia, 24/7"),
            ("Gamified Learning Platform", "Compliance Engagement Framework, Duolingo-style"),
            ("Mobile App", "Real-time alerts, Quick quiz, SOP access"),
        ],
    ),
    (
        "Application & Services Layer",
        "#8b5cf6",  # Purple
        [
            ("Account & Auth Module", "SSO, RBAC, Multi-entity access"),
            ("Real-Time Deviation Detection", "AI monitoring, Confidence scoring, SHAP/LIME explainability"),
            ("Regulatory Auto-Adapt Engine", "Change detection, SOP drafting, Staged rollout"),
            ("Audit Report Generator", "Auto-compile, AI summary, Regulator formats"),
            ("Training & Certification Module", "NJO Track, SOP Update Challenges"),
            ("Human-in-the-Loop Workflow", "High-risk alert review, Senior management escalation"),
        ],
    ),
    (
        "Integration Layer",
        "#ec4899",  # Pink
        [
            ("Regulatory Intelligence API", "OJK, BI, MOE, SMKP feeds"),
            ("Enterprise System Connectors", "ERP, Core Banking, Legacy systems"),
            ("OCR-to-Rule Engine", "PDF processing, Knowledge Graph"),
            ("Inter-Entity Communication", "Cross-subsidiary data sharing"),
            ("External Notification Gateway", "Email, SMS, Push notifications"),
        ],
    ),
    (
        "Data & Storage Layer",
        "#10b981",  # Green
        [
            ("User & Auth Store", "Identity, Roles, Permissions"),
            ("Compliance Rules DB", "SOPs, Regulations, Mappings"),
            ("Audit Trail Store", "Immutable logs, 7-year retention"),
            ("ML Model Registry", "Version control, Lineage tracking"),
            ("Analytics Data Lake", "Process logs, Usage metrics, Reports"),
        ],
    ),
    (
        "Governance & Security Layer",
        "#f59e0b",  # Amber
        [
            ("PDP Law Compliance", "Personal Data Protection 2023"),
            ("ISO 27001 / SOC 2", "Security standards alignment"),
            ("AI Ethics & Bias Audit", "Model fairness, Transparency"),
            ("Model Drift Monitoring", "Automated retraining triggers"),
            ("Rollout/Rollback Controls", "Feature flags, Staged deployment"),
        ],
    ),
]


# --------- HELPER FUNCTIONS ---------

def escape_html(text: str) -> str:
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def hex_to_rgb(color: str) -> Tuple[int, int, int]:
    color = color.lstrip("#")
    r = int(color[0:2], 16)
    g = int(color[2:4], 16)
    b = int(color[4:6], 16)
    return r, g, b


def best_text_color(bg_hex: str) -> str:
    r, g, b = hex_to_rgb(bg_hex)
    luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    return "#111827" if luminance > 0.5 else "#ffffff"


def lighten_color(hex_color: str, factor: float = 0.85) -> str:
    r, g, b = hex_to_rgb(hex_color)
    r = int(r + (255 - r) * factor)
    g = int(g + (255 - g) * factor)
    b = int(b + (255 - b) * factor)
    return f"#{r:02x}{g:02x}{b:02x}"


# --------- HTML GENERATION ---------

def build_html() -> str:
    layers_html = []

    for idx, (layer_name, layer_color, items) in enumerate(ARCHITECTURE):
        header_text = best_text_color(layer_color)
        light_bg = lighten_color(layer_color, 0.9)

        cards_html = []
        for item_name, item_desc in items:
            cards_html.append(f'''
                <div class="card">
                    <div class="card-title">{escape_html(item_name)}</div>
                    <div class="card-desc">{escape_html(item_desc)}</div>
                </div>
            ''')

        layer_block = f'''
        <section class="layer-row">
            <div class="layer-label" style="background:{layer_color}; color:{header_text};">
                <div class="layer-label-main">{escape_html(layer_name)}</div>
            </div>
            <div class="layer-body" style="background:{light_bg};">
                <div class="cards">
                    {''.join(cards_html)}
                </div>
            </div>
        </section>
        '''
        layers_html.append(layer_block)

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>COMPAS Enterprise Architecture</title>
    <style>
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}
        body {{
            background: #f1f5f9;
            color: #111827;
            font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
            padding: 32px 24px 40px 24px;
        }}
        .page {{
            max-width: 1280px;
            margin: 0 auto;
            border-radius: 16px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 25px 80px rgba(15,23,42,0.15);
            border: 1px solid rgba(209,213,219,0.8);
        }}
        .page-header {{
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            padding: 28px 40px 24px 40px;
            text-align: center;
        }}
        .page-title {{
            font-size: 28px;
            font-weight: 800;
            letter-spacing: 0.08em;
            color: #ffffff;
            margin-bottom: 6px;
        }}
        .page-subtitle {{
            font-size: 14px;
            color: rgba(255,255,255,0.85);
            font-weight: 500;
        }}
        .page-tagline {{
            font-size: 12px;
            color: rgba(255,255,255,0.7);
            margin-top: 8px;
            font-style: italic;
        }}
        .content {{
            padding: 24px 32px 32px 32px;
        }}
        .legend {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e5e7eb;
        }}
        .legend-left {{
            font-size: 11px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }}
        .legend-right {{
            font-size: 11px;
            color: #9ca3af;
        }}
        .layer-row {{
            display: grid;
            grid-template-columns: 200px minmax(0, 1fr);
            gap: 12px;
            align-items: stretch;
            margin-bottom: 14px;
        }}
        .layer-label {{
            border-radius: 10px;
            padding: 16px 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-shadow: 0 8px 20px rgba(15,23,42,0.2);
        }}
        .layer-label-main {{
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            line-height: 1.4;
            text-align: center;
        }}
        .layer-body {{
            border-radius: 10px;
            padding: 14px 16px;
            border: 1px solid rgba(209,213,219,0.7);
        }}
        .cards {{
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }}
        .card {{
            background: #ffffff;
            border-radius: 8px;
            padding: 12px 14px;
            min-width: 180px;
            flex: 1 1 200px;
            max-width: 250px;
            box-shadow: 0 2px 8px rgba(148,163,184,0.3);
            border: 1px solid rgba(209,213,219,0.8);
        }}
        .card-title {{
            font-size: 12px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 4px;
        }}
        .card-desc {{
            font-size: 10px;
            color: #64748b;
            line-height: 1.4;
        }}
        .footer {{
            text-align: center;
            padding: 16px 32px;
            background: #f8fafc;
            border-top: 1px solid #e5e7eb;
        }}
        .footer-text {{
            font-size: 11px;
            color: #9ca3af;
        }}
        .footer-quote {{
            font-size: 11px;
            color: #6b7280;
            font-style: italic;
            margin-top: 8px;
        }}
    </style>
</head>
<body>
    <main class="page">
        <header class="page-header">
            <div class="page-title">COMPAS</div>
            <div class="page-subtitle">Compliance Process Automation Service</div>
            <div class="page-tagline">Enterprise Architecture Overview — Sinar Mas Group</div>
        </header>
        <div class="content">
            <div class="legend">
                <div class="legend-left">5-Layer Architecture Model</div>
                <div class="legend-right">Based on Executive Vision + AI Review Recommendations</div>
            </div>
            {''.join(layers_html)}
        </div>
        <footer class="footer">
            <div class="footer-text">COMPAS — Making compliance invisible yet omnipresent</div>
            <div class="footer-quote">"Be the golden bridge that people want to pass and could pass to make their lives and activities easier."</div>
        </footer>
    </main>
</body>
</html>
'''
    return html


# --------- RENDER HTML TO IMAGE (PLAYWRIGHT) ---------

def render_to_image(
    html: str,
    html_path: Path,
    image_path: Path,
    width: int = 1400,
    height: int = 1000,
) -> None:
    html_path.write_text(html, encoding="utf-8")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": width, "height": height})
        page.goto(html_path.as_uri())
        page.wait_for_timeout(800)
        page.screenshot(path=str(image_path), full_page=True)
        browser.close()


# --------- MAIN ---------

def main() -> None:
    print("Generating COMPAS Enterprise Architecture diagram...")

    html = build_html()
    render_to_image(html, HTML_OUT, IMG_OUT)

    print(f"HTML saved to: {HTML_OUT}")
    print(f"Diagram image saved to: {IMG_OUT}")
    print("Done!")


if __name__ == "__main__":
    main()
