const puppeteer = require("puppeteer");

async function generatePDF() {
  const browser = await puppeteer.launch({
    args: [
    '--no-sandbox',
    '--disable-web-security'
  ],
  });
  const page = await browser.newPage();
  // await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36");


  const filePath =
    "/Users/harshbangari/Documents/GitHub/pdf-creater-node/sample.html";
  const fileUrl = `file://${filePath}`;

  // Load an HTML page from a URL or a local file
  await page.goto(fileUrl);
  // Replace with your HTML source

  // Generate a PDF with multiple pages
  await page.pdf({
    path: "multi-page-pdf.pdf",
    format: "A4", // Page format
    margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" }, // Page margins
    printBackground: true, // Include background colors and images
    displayHeaderFooter: true,
    headerTemplate: "<div></div>",
    footerTemplate: `
<div style="width:100%; font-size: 12px; text-align: center; padding: 10px;">
       Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
`,
    margin: {
      top: "50px", // Adjust top margin as needed
      bottom: "50px", // Adjust bottom margin as needed
      left: "20px",
      right: "20px",
    },
  });

  await browser.close();
}

generatePDF();
