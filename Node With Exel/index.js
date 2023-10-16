const { serchDatandReturn } = require("./controler");
const { GenrateExelSheetAndSave } = require("./create");
const { myexeldata } = require("./read");

const filePath = './MYExelSheet/new_data.xlsx';
const GetAndSaveData = async ()=>{
    try {
        const emeidata = await myexeldata(filePath);
        //  GenrateExelSheetAndSave(emeidata);
        // console.log(emeidata, emeidata.length);
        const firstlogindata = await serchDatandReturn(emeidata);
         GenrateExelSheetAndSave(firstlogindata);
    } catch (error) {
         console.log(error);
    }
}
GetAndSaveData();