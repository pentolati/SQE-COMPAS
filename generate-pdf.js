const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();

    // Load the HTML file
    const htmlPath = path.join(__dirname, 'COMPAS_FLOWCHARTS.html');
    await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle0',
        timeout: 60000
    });

    // Wait for Mermaid diagrams to render
    await page.waitForSelector('.mermaid svg', { timeout: 30000 });

    // Additional wait to ensure all diagrams are fully rendered
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate PDF
    await page.pdf({
        path: path.join(__dirname, 'COMPAS_FLOWCHARTS.pdf'),
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        },
        preferCSSPageSize: true
    });

    console.log('PDF generated successfully: COMPAS_FLOWCHARTS.pdf');

    await browser.close();
}

generatePDF().catch(err => {
    console.error('Error generating PDF:', err);
    process.exit(1);
});
