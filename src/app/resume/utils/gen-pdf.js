const html_to_pdf = require('html-pdf-node')
const fs = require('fs')
const path = require('path')

const options = { format: 'A4' }
const file = { url: 'http://localhost:3000/content' }
html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
  fs.writeFileSync(
    path.resolve(__dirname, '../public/sherotree-resume.pdf'),
    pdfBuffer
  )
})
