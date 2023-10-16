const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// Function to create an Excel sheet from an array of objects
function createExcelSheet(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  // Add headers to the Excel worksheet
  worksheet.addRow([
    'ufw', 'uid','imei','firmwareVersion', 'LastLoginDate', 'LastLoginTime', 'BatchId', 'fotaStatus', 'mainInputVtg', 'intBatteryVtg', 'emergency', 'ignition'
  ]);
  // Add data from the array of objects to the Excel worksheet
  data.forEach(item => {
    let arr = Object.values(item);
    worksheet.addRow(arr);
  });
  worksheet.columns = [
    { header: 'ufw', width: 10 },
    { header: 'uid', width: 23 },
    { header: 'imei', width: 20 },
    { header: 'firmwareVersion', width: 15 },
    { header: 'LastLoginDate', width: 13 },
    { header: 'LastLoginTime', width: 13 },
    { header: 'BatchId', width: 8 },
    { header: 'fotaStatus', width: 12 },
    { header: 'mainInputVtg', width: 12 },
    { header: 'intBatteryVtg', width: 12 },
    { header: 'emergency', width: 12 },
    { header: 'ignition', width: 12 }
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

