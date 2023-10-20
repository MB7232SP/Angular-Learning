const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// Function to create an Excel sheet from an array of objects
function createExcelSheet(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  // Add headers to the Excel worksheet
  worksheet.addRow([
    'imei','Total Login Packets'
  ]);
  // Add data from the array of objects to the Excel worksheet
  data.forEach(item => {
    let arr = Object.values(item);
    worksheet.addRow(arr);
  });
  worksheet.columns = [
    { header: 'imei', width: 20 },
    { header: 'Total Login Packets', width: 25 }
  ];

  return workbook;
}

const GenrateExelSheetAndSave = (data)=>{
    // Generate the Excel workbook
const workbook = createExcelSheet(data);

//OutPutFolder
const folderName = './Created';

// Generate a filename based on the current time
const currentTime = new Date().toLocaleString().replace(/[^0-9]/g, '_');
const fileName = `data_${currentTime}.xlsx`;

// Save the Excel file to the folder
const filePath = path.join(folderName, fileName);
workbook.xlsx.writeFile(filePath)
  .then(() => {
    console.log(`Excel file saved to ${filePath}`);
  })
  .catch(err => {
    console.error(err);
  });

}


module.exports = {
    GenrateExelSheetAndSave
}

