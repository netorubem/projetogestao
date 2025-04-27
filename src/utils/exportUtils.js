import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Exportar para Excel
export const exportToExcel = (data, fileName = 'clientes') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

// Exportar para PDF
export const exportToPDF = async (elementId, fileName = 'clientes') => {
  const element = document.getElementById(elementId);
  const canvas = await html2canvas(element, {
    scale: 2, // Melhora a resolução
    logging: false,
    useCORS: true,
  });
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgData = canvas.toDataURL('image/png');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${fileName}.pdf`);
};

// Exportar para CSV
export const exportToCSV = (data, fileName = 'clientes') => {
  const headers = Object.keys(data[0]).join(',');
  const csv = data
    .map((row) =>
      Object.values(row)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(','),
    )
    .join('\n');

  const blob = new Blob([`${headers}\n${csv}`], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();
};

// Exportar para JSON
export const exportToJSON = (data, fileName = 'clientes') => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.json`;
  link.click();
};
