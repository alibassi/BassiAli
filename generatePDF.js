const PDFDocument = require('pdfkit');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const generatePDF = async () => {
  try {
    // Retrieve articles from the database (replace this with your actual data retrieval)
    const item = [
      { title: 'Article 1', content: 'This is the content of Article 1' },
      { title: 'Article 2', content: 'This is the content of Article 2' },
      // Add more articles as needed
    ];

    // Load the template file (index.ejs) from the 'views' folder
    const templatePath = path.join(__dirname, 'views', 'index.ejs');
    const template = fs.readFileSync(templatePath, 'utf-8');

    // Render the template with the article data
    const content = ejs.render(template, { item });

    // Create a new PDF document
    const doc = new PDFDocument({ autoFirstPage: false });
    let currentPage = doc.addPage(); // Keep track of the current page

    // Set the margin to 4 pixels on all sides
    doc.margins = {
      top: 4,
      bottom: 4,
      left: 4,
      right: 4,
    };

    // Convert HTML to PDF and write it to the document
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.end(content);

    console.log('PDF generated successfully!');
  } catch (error) {
    console.log('Error generating PDF:', error);
  }
};

module.exports = generatePDF;
