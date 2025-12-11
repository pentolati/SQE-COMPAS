"""
Generate COMPAS Enterprise Architecture diagram - User/Actor View
Shows features accessible per user role in EA-style layout
Based on EXECUTIVE_VISION.md + AI_REVIEW_SESSION.md

Requirements:
    pip install playwright
    python -m playwright install chromium
"""

from pathlib import Path
from typing import List, Tuple

from playwright.sync_api import sync_playwright


# --------- CONFIG: OUTPUT PATHS ---------

BASE_DIR = Path(__file__).resolve().parent
HTML_OUT = BASE_DIR / "compas_ea_users.html"
IMG_OUT = BASE_DIR / "compas_ea_users.png"


# --------- DATA: USER-CENTRIC ARCHITECTURE ---------
# Based on EXECUTIVE_VISION.md stakeholder value propositions

USER_FEATURES = [
    (
        "C-Level / Board",
        "#1e3a8a",  # Dark Blue
        "Eksekutif yang membutuhkan visibility risiko enterprise-wide",
        [
            ("Intelligent Risk Dashboard", "Single view risiko seluruh entitas"),
            ("Risk Heatmap", "Visual RED/YELLOW/GREEN per subsidiary"),
            ("Financial Exposure Ticker", "Real-time 'Rp X.X B at risk'"),
            ("Regulatory Countdown", "Deadline tracker dengan days remaining"),
            ("Cross-Entity Benchmarking", "Perbandingan performa antar subsidiary"),
            ("Executive Summary Reports", "AI-generated insights untuk board meeting"),
        ],
    ),
    (
        "Compliance Officer",
        "#7c3aed",  # Purple
        "Penanggung jawab kepatuhan yang fokus pada strategic risk management",
        [
            ("Real-Time Deviation Alerts", "Notifikasi pelanggaran dengan severity level"),
            ("SOP Amendment Drafting", "AI-drafted SOP updates untuk review"),
            ("Human-in-the-Loop Approval", "Workflow approval untuk high-risk decisions"),
            ("Regulatory Change Monitor", "Tracking perubahan OJK, BI, MOE, SMKP"),
            ("Audit Report Generator", "Auto-compile dengan full audit trail"),
            ("Grace Period Manager", "Kelola transisi SOP baru (30-60 hari)"),
            ("Model Confidence Review", "Review AI decisions dengan SHAP/LIME explanation"),
        ],
    ),
    (
        "Manager / Supervisor",
        "#0891b2",  # Cyan
        "Pemimpin tim yang perlu visibility kepatuhan timnya",
        [
            ("Team Compliance Dashboard", "Status kepatuhan per anggota tim"),
            ("Actionable Alerts", "Notifikasi deviasi tim dengan action items"),
            ("Training Progress Tracker", "Monitor penyelesaian training tim"),
            ("Department Leaderboard", "Ranking kepatuhan antar departemen"),
            ("Escalation Workflow", "Eskalasi issue ke Compliance Officer"),
            ("SOP Update Notifications", "Alert ketika ada SOP baru untuk tim"),
        ],
    ),
    (
        "Employee / Staff",
        "#059669",  # Green
        "Karyawan yang perlu memahami dan mengikuti SOP dengan mudah",
        [
            ("AI Compliance Assistant", "Tanya jawab SOP dalam Bahasa Indonesia"),
            ("Personal Compliance Score", "Dashboard pribadi dengan badges"),
            ("Gamified Learning", "Daily/weekly quiz, earn points"),
            ("SOP Library", "Akses mudah ke semua SOP relevan"),
            ("Achievement Timeline", "Visual journey trainings & certifications"),
            ("Fun Reminders", "Notifikasi playful untuk SOP baru"),
            ("Document Compliance Checker", "Validasi dokumen sesuai SOP"),
        ],
    ),
    (
        "New Joiner",
        "#ca8a04",  # Yellow/Amber
        "Karyawan baru yang perlu onboarding compliance terstruktur",
        [
            ("NJO Compliance Track", "Structured learning path untuk new hire"),
            ("Onboarding Checklist", "Step-by-step compliance requirements"),
            ("Buddy System Integration", "Connect dengan mentor compliance"),
            ("Progress Milestones", "Track penyelesaian onboarding"),
            ("Quick Reference Guides", "Simplified SOP summaries"),
        ],
    ),
    (
        "Auditor (Internal/External)",
        "#dc2626",  # Red
        "Auditor yang membutuhkan akses cepat ke data kepatuhan",
        [
            ("Pre-compiled Audit Trails", "Data lengkap dengan timestamps"),
            ("AI-Explained Findings", "Reasoning di balik setiap flagged item"),
            ("Regulator-Format Export", "Output sesuai format OJK/BI/MOE"),
            ("Historical Compliance Data", "7-year retention dengan immutable logs"),
            ("Grace Period Status Report", "Siapa sudah/belum transisi ke SOP baru"),
            ("Cross-Entity Audit View", "Consolidated view untuk group audit"),
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


def lighten_color(hex_color: str, factor: float = 0.92) -> str:
    r, g, b = hex_to_rgb(hex_color)
    r = int(r + (255 - r) * factor)
    g = int(g + (255 - g) * factor)
    b = int(b + (255 - b) * factor)
    return f"#{r:02x}{g:02x}{b:02x}"


# --------- HTML GENERATION ---------

def build_html() -> str:
    users_html = []

    for idx, (user_name, user_color, user_desc, features) in enumerate(USER_FEATURES):
        header_text = best_text_color(user_color)
        light_bg = lighten_color(user_color, 0.93)
        border_color = lighten_color(user_color, 0.7)

        cards_html = []
        for feat_name, feat_desc in features:
            cards_html.append(f'''
                <div class="card">
                    <div class="card-title">{escape_html(feat_name)}</div>
                    <div class="card-desc">{escape_html(feat_desc)}</div>
                </div>
            ''')

        user_block = f'''
        <section class="user-row">
            <div class="user-label" style="background:{user_color}; color:{header_text};">
                <div class="user-icon">{'👔' if idx == 0 else '📋' if idx == 1 else '👥' if idx == 2 else '🧑‍💼' if idx == 3 else '🆕' if idx == 4 else '🔍'}</div>
                <div class="user-name">{escape_html(user_name)}</div>
                <div class="user-desc">{escape_html(user_desc)}</div>
            </div>
            <div class="user-body" style="background:{light_bg}; border-color:{border_color};">
                <div class="cards">
                    {''.join(cards_html)}
                </div>
            </div>
        </section>
        '''
        users_html.append(user_block)

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>COMPAS - User Feature Map</title>
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
            max-width: 1350px;
            margin: 0 auto;
            border-radius: 16px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 25px 80px rgba(15,23,42,0.15);
            border: 1px solid rgba(209,213,219,0.8);
        }}
        .page-header {{
            background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
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
            color: rgba(255,255,255,0.65);
            margin-top: 8px;
        }}
        .content {{
            padding: 24px 28px 32px 28px;
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
        .user-row {{
            display: grid;
            grid-template-columns: 220px minmax(0, 1fr);
            gap: 14px;
            align-items: stretch;
            margin-bottom: 16px;
        }}
        .user-label {{
            border-radius: 12px;
            padding: 18px 16px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            box-shadow: 0 8px 24px rgba(15,23,42,0.25);
        }}
        .user-icon {{
            font-size: 28px;
            margin-bottom: 8px;
        }}
        .user-name {{
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            line-height: 1.3;
            margin-bottom: 6px;
        }}
        .user-desc {{
            font-size: 10px;
            opacity: 0.9;
            line-height: 1.4;
        }}
        .user-body {{
            border-radius: 12px;
            padding: 14px 16px;
            border: 2px solid;
        }}
        .cards {{
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }}
        .card {{
            background: #ffffff;
            border-radius: 8px;
            padding: 10px 12px;
            min-width: 160px;
            flex: 1 1 180px;
            max-width: 220px;
            box-shadow: 0 2px 6px rgba(148,163,184,0.25);
            border: 1px solid rgba(209,213,219,0.7);
            transition: transform 0.15s, box-shadow 0.15s;
        }}
        .card:hover {{
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(148,163,184,0.4);
        }}
        .card-title {{
            font-size: 11px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 3px;
        }}
        .card-desc {{
            font-size: 9px;
            color: #64748b;
            line-height: 1.35;
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
        .stats {{
            display: flex;
            justify-content: center;
            gap: 32px;
            margin-top: 10px;
        }}
        .stat {{
            text-align: center;
        }}
        .stat-number {{
            font-size: 20px;
            font-weight: 800;
            color: #3b82f6;
        }}
        .stat-label {{
            font-size: 10px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }}
    </style>
</head>
<body>
    <main class="page">
        <header class="page-header">
            <div class="page-title">COMPAS</div>
            <div class="page-subtitle">User Feature Map — Fitur per Role</div>
            <div class="page-tagline">Compliance Process Automation Service — Sinar Mas Group</div>
        </header>
        <div class="content">
            <div class="legend">
                <div class="legend-left">6 User Roles × Feature Access</div>
                <div class="legend-right">Based on Executive Vision + AI Review</div>
            </div>
            {''.join(users_html)}
        </div>
        <footer class="footer">
            <div class="footer-text">COMPAS — Making compliance invisible yet omnipresent</div>
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">6</div>
                    <div class="stat-label">User Roles</div>
                </div>
                <div class="stat">
                    <div class="stat-number">37</div>
                    <div class="stat-label">Features</div>
                </div>
                <div class="stat">
                    <div class="stat-number">40+</div>
                    <div class="stat-label">Subsidiaries</div>
                </div>
            </div>
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
    width: int = 1500,
    height: int = 1200,
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
    print("Generating COMPAS User Feature Map diagram...")

    html = build_html()
    render_to_image(html, HTML_OUT, IMG_OUT)

    print(f"HTML saved to: {HTML_OUT}")
    print(f"Diagram image saved to: {IMG_OUT}")
    print("Done!")


if __name__ == "__main__":
    main()
