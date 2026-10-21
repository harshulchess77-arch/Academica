import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportCertificate(
  elementId: string,
  studentName: string,
  subject: string,
  date: string
): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error('Certificate element not found')
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('landscape', 'mm', 'a4')

  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save(`academica-certificate-${subject}-${studentName.replace(/\s+/g, '-')}.pdf`)
}

export async function exportPortfolio(
  elementId: string,
  studentName: string
): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error('Portfolio element not found')
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')

  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  const imgWidth = pdfWidth
  const imgHeight = (canvas.height * pdfWidth) / canvas.width

  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pdfHeight

  while (heightLeft > 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight
  }

  pdf.save(`academica-portfolio-${studentName.replace(/\s+/g, '-')}.pdf`)
}
