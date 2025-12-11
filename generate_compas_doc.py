"""
Generate COMPAS Executive Vision v2 - HTML and PDF
Converts markdown to styled HTML then renders to PDF via Playwright

Requirements:
    pip install markdown playwright
    python -m playwright install chromium
"""

import markdown
from pathlib import Path
from playwright.sync_api import sync_playwright


# --------- CONFIG ---------

BASE_DIR = Path(__file__).resolve().parent
MD_INPUT = BASE_DIR / "COMPAS_EXECUTIVE_VISION_v2.md"
HTML_OUT = BASE_DIR / "COMPAS_EXECUTIVE_VISION_v2.html"
PDF_OUT = BASE_DIR / "COMPAS_EXECUTIVE_VISION_v2.pdf"


# --------- HTML TEMPLATE ---------

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>COMPAS Executive Vision v2.0</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #1e293b;
            background: #ffffff;
            padding: 0;
            margin: 0;
        }}

        .container {{
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm 25mm;
        }}

        /* Cover Section */
        .cover {{
            text-align: center;
            padding: 60px 0 40px 0;
            border-bottom: 3px solid #3b82f6;
            margin-bottom: 40px;
        }}

        .cover h1 {{
            font-size: 48pt;
            font-weight: 800;
            color: #1e3a8a;
            letter-spacing: 0.1em;
            margin-bottom: 8px;
        }}

        .cover h2 {{
            font-size: 16pt;
            font-weight: 600;
            color: #3b82f6;
            margin-bottom: 4px;
        }}

        .cover h3 {{
            font-size: 12pt;
            font-weight: 500;
            color: #64748b;
            margin-bottom: 30px;
        }}

        .cover-meta {{
            font-size: 10pt;
            color: #64748b;
            line-height: 1.8;
        }}

        /* Headings */
        h1 {{
            font-size: 22pt;
            font-weight: 800;
            color: #1e3a8a;
            margin: 40px 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #e2e8f0;
        }}

        h2 {{
            font-size: 16pt;
            font-weight: 700;
            color: #1e40af;
            margin: 30px 0 15px 0;
        }}

        h3 {{
            font-size: 13pt;
            font-weight: 600;
            color: #3b82f6;
            margin: 25px 0 12px 0;
        }}

        h4 {{
            font-size: 11pt;
            font-weight: 600;
            color: #475569;
            margin: 20px 0 10px 0;
        }}

        /* Paragraphs */
        p {{
            margin: 12px 0;
            text-align: justify;
        }}

        /* Lists */
        ul, ol {{
            margin: 12px 0 12px 24px;
        }}

        li {{
            margin: 6px 0;
        }}

        /* Tables */
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 10pt;
        }}

        th {{
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            font-weight: 600;
            text-align: left;
            padding: 12px 14px;
            border: 1px solid #1e3a8a;
        }}

        td {{
            padding: 10px 14px;
            border: 1px solid #e2e8f0;
            vertical-align: top;
        }}

        tr:nth-child(even) {{
            background: #f8fafc;
        }}

        tr:hover {{
            background: #f1f5f9;
        }}

        /* Code blocks */
        pre {{
            background: #1e293b;
            color: #e2e8f0;
            padding: 16px 20px;
            border-radius: 8px;
            overflow-x: auto;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 9pt;
            line-height: 1.5;
            margin: 16px 0;
        }}

        code {{
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 9pt;
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            color: #dc2626;
        }}

        pre code {{
            background: none;
            padding: 0;
            color: inherit;
        }}

        /* Blockquotes */
        blockquote {{
            border-left: 4px solid #3b82f6;
            background: #eff6ff;
            padding: 16px 20px;
            margin: 20px 0;
            font-style: italic;
            color: #1e40af;
        }}

        blockquote p {{
            margin: 0;
        }}

        /* Horizontal rules */
        hr {{
            border: none;
            border-top: 1px solid #e2e8f0;
            margin: 30px 0;
        }}

        /* Strong/Bold */
        strong {{
            font-weight: 700;
            color: #1e293b;
        }}

        /* Emphasis */
        em {{
            font-style: italic;
        }}

        /* Links */
        a {{
            color: #2563eb;
            text-decoration: none;
        }}

        a:hover {{
            text-decoration: underline;
        }}

        /* Special callout boxes */
        .new-badge {{
            display: inline-block;
            background: #10b981;
            color: white;
            font-size: 8pt;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 4px;
            margin-left: 8px;
            vertical-align: middle;
        }}

        /* Footer */
        .footer {{
            margin-top: 60px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            font-style: italic;
            color: #64748b;
        }}

        .footer .quote {{
            font-size: 12pt;
            color: #475569;
            margin-bottom: 8px;
        }}

        .footer .author {{
            font-weight: 600;
            color: #1e3a8a;
        }}

        /* Page breaks for PDF */
        .page-break {{
            page-break-after: always;
        }}

        /* Print styles */
        @media print {{
            body {{
                font-size: 10pt;
            }}

            .container {{
                padding: 15mm 20mm;
            }}

            h1 {{
                page-break-after: avoid;
            }}

            h2, h3, h4 {{
                page-break-after: avoid;
            }}

            table, pre {{
                page-break-inside: avoid;
            }}

            tr {{
                page-break-inside: avoid;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        {content}
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
            'codehilite',
            'toc',
            'nl2br',
        ]
    )
    return md.convert(md_content)


def post_process_html(html_content: str) -> str:
    """Post-process HTML for better styling"""
    # Add NEW badges
    html_content = html_content.replace('(NEW)', '<span class="new-badge">NEW</span>')
    html_content = html_content.replace('(ENHANCED)', '<span class="new-badge">ENHANCED</span>')
    html_content = html_content.replace('(REVISED TIMELINE)', '<span class="new-badge">REVISED</span>')
    html_content = html_content.replace('(REFRAMED)', '<span class="new-badge">REFRAMED</span>')

    return html_content


def render_pdf(html_path: Path, pdf_path: Path) -> None:
    """Render HTML to PDF using Playwright"""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(html_path.as_uri())
        page.wait_for_timeout(1500)  # Wait for fonts to load
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
            display_header_footer=True,
            header_template='<div style="font-size:8pt; color:#94a3b8; text-align:center; width:100%;">COMPAS Executive Vision v2.0</div>',
            footer_template='<div style="font-size:8pt; color:#94a3b8; text-align:center; width:100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
        )
        browser.close()


# --------- MAIN ---------

def main():
    print("Reading markdown file...")
    md_content = MD_INPUT.read_text(encoding='utf-8')

    print("Converting to HTML...")
    html_body = convert_md_to_html(md_content)
    html_body = post_process_html(html_body)

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
