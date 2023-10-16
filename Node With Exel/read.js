const ExcelJS = require('exceljs');
const fs = require('fs');

// Create a function to read the Excel file and convert it into an array of objects
async function excelToObjects(filePath) {
  const workbook = new ExcelJS.Workbook();
  const data = [];

  try {
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        // Skip the header row (row 1)
        // const object = {
        //   UIN: row.getCell(1).value,
        //   IMEI: row.getCell(2).value,
        // };
        data.push( row.getCell(2).value);
      }
    });

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Specify the path to your Excel file


// Call the function to convert Excel data to an array of objects
const myexeldata = async (filePath)=>{
    try {
        const data = await  excelToObjects(filePath);
        return data;
    } catch (error) {
        console.log(error); 
    }
}
 module.exports = {
    myexeldata
 }
