import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateCertificatePDF = async (
  element: HTMLElement,
  fileName: string = 'certificate.pdf'
): Promise<void> => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
  } catch (error) {
    console.error('Certificate PDF generation failed:', error);
    throw new Error('Failed to generate certificate PDF');
  }
};

export const generatePortfolioPDF = async (
  data: {
    name: string;
    xp: number;
    level: number;
    badges: Array<{ name: string; earnedAt: string }>;
    achievements: Array<{ title: string; description: string; date: string }>;
  },
  fileName: string = 'portfolio.pdf'
): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Title
    pdf.setFontSize(24);
    pdf.setTextColor(26, 35, 126); // Deep Cobalt
    pdf.text('Student Portfolio Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Student info
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Name: ${data.name}`, 20, yPosition);
    yPosition += 10;
    pdf.text(`Level: ${data.level}`, 20, yPosition);
    yPosition += 10;
    pdf.text(`Total XP: ${data.xp}`, 20, yPosition);
    yPosition += 20;

    // Badges section
    pdf.setFontSize(18);
    pdf.setTextColor(26, 35, 126);
    pdf.text('Badges Earned', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    data.badges.forEach((badge) => {
      pdf.text(`• ${badge.name} - ${new Date(badge.earnedAt).toLocaleDateString()}`, 20, yPosition);
      yPosition += 8;
    });
    yPosition += 10;

    // Achievements section
    pdf.setFontSize(18);
    pdf.setTextColor(26, 35, 126);
    pdf.text('Achievements', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    data.achievements.forEach((achievement) => {
      pdf.text(`${achievement.title}`, 20, yPosition);
      yPosition += 6;
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(achievement.description, 25, yPosition);
      yPosition += 6;
      pdf.text(new Date(achievement.date).toLocaleDateString(), 25, yPosition);
      yPosition += 10;
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
    });

    // Footer
    yPosition = pageHeight - 20;
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, {
      align: 'center',
    });

    pdf.save(fileName);
  } catch (error) {
    console.error('Portfolio PDF generation failed:', error);
    throw new Error('Failed to generate portfolio PDF');
  }
};

export const exportJournalAsPDF = async (
  entries: Array<{ title: string; content: string; date: string }>,
  fileName: string = 'journal.pdf'
): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 20;

    pdf.setFontSize(20);
    pdf.setTextColor(26, 35, 126);
    pdf.text('Journal Entries', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    entries.forEach((entry, index) => {
      // New page if needed
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text(entry.title, 20, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(new Date(entry.date).toLocaleDateString(), 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setTextColor(50, 50, 50);
      const lines = pdf.splitTextToSize(entry.content, pageWidth - 40);
      pdf.text(lines, 20, yPosition);
      yPosition += lines.length * 6 + 15;
    });

    pdf.save(fileName);
  } catch (error) {
    console.error('Journal PDF export failed:', error);
    throw new Error('Failed to export journal as PDF');
  }
};
