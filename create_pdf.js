const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a new PDF document
const doc = new PDFDocument();

// Pipe the PDF content to a writable stream (a file in this case)
const stream = fs.createWriteStream('example.pdf');
doc.pipe(stream);

// Add text at the top
doc.fontSize(24).text('Header Text', { align: 'center' });

// Define the data for the four columns
const columns = [
  { label: 'Column 1', data: 'Data for Column 1', fontSize: 14 },
  { label: 'Column 2', data: 'Data for Column 2', fontSize: 12 },
  { label: 'Column 3', data: 'Data for Column 3', fontSize: 10 },
  { label: 'Column 4', data: 'Data for Column 4', fontSize: 8 },
];

// Define the table properties
const table1 = {
  columnSpacing: 15,
  xOffset: 50, // X-coordinate of the table
  yOffset: 150, // Y-coordinate of the table
};

const table2 = {
  columnSpacing: 15,
  xOffset: 50, // X-coordinate of the table
  yOffset: 350, // Y-coordinate of the table
};

// Function to draw a table with different text sizes
function drawTable(doc, columns, table) {
  const cellHeight = 30;

  // Calculate the table width based on column widths and spacing
  const tableWidth = columns.reduce((totalWidth, column) => totalWidth + column.fontSize * column.label.length, 0) + (columns.length - 1) * table.columnSpacing;

  // Center the table on the page
  var xCentered = (doc.page.width - tableWidth) / 2;

  // Set font size for table rows
  doc.fontSize(10);

  // Draw column labels and data
  columns.forEach((column, columnIndex) => {
    // Draw column label
    doc.font('Helvetica-Bold').fontSize(column.fontSize).text(column.label, xCentered, table.yOffset, { width: column.fontSize * column.label.length, align: 'left' });

    // Draw column data
    doc.font('Helvetica').fontSize(column.fontSize).text(column.data, xCentered, table.yOffset + cellHeight, { width: column.fontSize * column.data.length, align: 'left' });

    // Move to the next column
    xCentered += column.fontSize * column.label.length + table.columnSpacing;
  });
}

// Draw the first table
drawTable(doc, columns, table1);

// Add a separator line between tables
doc.moveTo(50, 550).lineTo(550, 550).stroke();

// Draw the second table
drawTable(doc, columns, table2);

// Function to add page number and timestamp at the bottom
function addFooter(doc) {
  const pageNumber = doc.page.number;
  const timestamp = new Date().toLocaleString();

  doc.fontSize(8).text(`Page ${pageNumber} • Generated on: ${timestamp}`, 50, 750, { align: 'center' });
}

// Register a callback to add the footer on each page
doc.on('pageAdded', () => {
  addFooter(doc);
});

// Finalize and close the PDF
doc.end();
  

// Stream will be closed and the file will be saved as 'example.pdf'