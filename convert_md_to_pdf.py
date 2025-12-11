#!/usr/bin/env python3
"""
Script untuk mengkonversi Markdown PRD ke HTML dan PDF menggunakan Playwright
"""

from playwright.sync_api import sync_playwright
import os
import sys
import markdown
import re

def convert_md_to_html(md_path, html_path):
    """Convert Markdown to styled HTML"""

    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Convert markdown to HTML
    html_body = markdown.markdown(
        md_content,
        extensions=['tables', 'fenced_code', 'toc', 'nl2br']
    )

    # Fix image paths - make them absolute or relative to output
    base_dir = os.path.dirname(os.path.abspath(md_path))

    # Replace relative image paths with absolute paths
    def fix_img_path(match):
        img_tag = match.group(0)
        src_match = re.search(r'src="([^"]+)"', img_tag)
        if src_match:
            src = src_match.group(1)
            if not src.startswith(('http://', 'https://', 'file://')):
                abs_path = os.path.join(base_dir, src).replace('\\', '/')
                img_tag = img_tag.replace(f'src="{src}"', f'src="file:///{abs_path}"')
        return img_tag

    html_body = re.sub(r'<img[^>]+>', fix_img_path, html_body)

    # Create full HTML with styling
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COMPAS PRD</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #ffffff;
            padding: 40px 60px;
            max-width: 900px;
            margin: 0 auto;
        }}

        h1 {{
            font-size: 2.5rem;
            font-weight: 700;
            color: #5B21B6;
            margin: 1.5rem 0 0.5rem 0;
            padding-bottom: 0.5rem;
            border-bottom: 3px solid #A855F7;
        }}

        h2 {{
            font-size: 1.8rem;
            font-weight: 600;
            color: #7C3AED;
            margin: 2rem 0 1rem 0;
            padding-bottom: 0.3rem;
            border-bottom: 2px solid #C4B5FD;
        }}

        h3 {{
            font-size: 1.4rem;
            font-weight: 600;
            color: #5B21B6;
            margin: 1.5rem 0 0.8rem 0;
        }}

        h4 {{
            font-size: 1.1rem;
            font-weight: 600;
            color: #6D28D9;
            margin: 1rem 0 0.5rem 0;
        }}

        p {{
            margin: 0.8rem 0;
        }}

        blockquote {{
            background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%);
            border-left: 4px solid #7C3AED;
            padding: 1rem 1.5rem;
            margin: 1rem 0;
            border-radius: 0 8px 8px 0;
            font-style: italic;
        }}

        blockquote strong {{
            color: #5B21B6;
        }}

        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
            font-size: 0.9rem;
        }}

        th {{
            background: linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%);
            color: white;
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
        }}

        td {{
            padding: 10px 15px;
            border-bottom: 1px solid #e5e7eb;
        }}

        tr:nth-child(even) {{
            background: #f9fafb;
        }}

        tr:hover {{
            background: #f3e8ff;
        }}

        code {{
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.9em;
            color: #6D28D9;
        }}

        pre {{
            background: #1f2937;
            color: #e5e7eb;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 1rem 0;
        }}

        pre code {{
            background: none;
            color: inherit;
            padding: 0;
        }}

        ul, ol {{
            margin: 0.5rem 0 0.5rem 1.5rem;
        }}

        li {{
            margin: 0.3rem 0;
        }}

        hr {{
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 2rem 0;
        }}

        img {{
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            margin: 1rem 0;
        }}

        strong {{
            font-weight: 600;
            color: #374151;
        }}

        a {{
            color: #7C3AED;
            text-decoration: none;
        }}

        a:hover {{
            text-decoration: underline;
        }}

        /* Page break for PDF */
        h2 {{
            page-break-before: auto;
        }}

        table {{
            page-break-inside: avoid;
        }}

        /* Header styling for document info */
        body > p:first-of-type {{
            text-align: center;
            font-size: 0.9rem;
            color: #6b7280;
        }}

        /* Footer quote styling */
        em {{
            color: #6b7280;
        }}
    </style>
</head>
<body>
    {html_body}
</body>
</html>'''

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"[OK] HTML created: {html_path}")
    return html_path


def convert_html_to_pdf(html_path, pdf_path):
    """Convert HTML to PDF using Playwright"""
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()

            file_url = f"file:///{os.path.abspath(html_path).replace(chr(92), '/')}"
            page.goto(file_url)
            page.wait_for_timeout(3000)  # Wait for fonts and images

            page.pdf(
                path=pdf_path,
                format='A4',
                margin={
                    'top': '20mm',
                    'right': '15mm',
                    'bottom': '20mm',
                    'left': '15mm'
                },
                print_background=True
            )

            browser.close()
            print(f"[OK] PDF created: {pdf_path}")
            return True

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return False


if __name__ == "__main__":
    # Default paths
    script_dir = os.path.dirname(os.path.abspath(__file__))

    if len(sys.argv) >= 2:
        md_file = sys.argv[1]
    else:
        md_file = os.path.join(script_dir, "COMPAS_PRD.md")

    base_name = os.path.splitext(md_file)[0]
    html_file = base_name + ".html"
    pdf_file = base_name + ".pdf"

    if not os.path.exists(md_file):
        print(f"[ERROR] Markdown file not found: {md_file}")
        sys.exit(1)

    print(f"Converting {md_file}...")

    # Step 1: MD to HTML
    convert_md_to_html(md_file, html_file)

    # Step 2: HTML to PDF
    success = convert_html_to_pdf(html_file, pdf_file)

    if success:
        print(f"\n[OK] Conversion complete!")
        print(f"  HTML: {html_file}")
        print(f"  PDF:  {pdf_file}")
    else:
        sys.exit(1)
