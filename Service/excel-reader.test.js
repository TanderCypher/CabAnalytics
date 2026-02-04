/* const readXlsxFile = require("read-excel-file/node");
const path = require("path");

function pathFinder() {
  return filePath = path.join(
    __dirname,
    "..",
    "DataFilesXlsx",
    "20260128_1800_Tursøk (sortert).xlsx",
  );
  //return filePath;
}

async function excelReader() {
  try {
    const filePath = pathFinder();
    const excelData = await readXlsxFile(filePath);
    console.log(excelData);
  } catch (error) {
    console.error("Error reading Excel file:", error);
  }
}

excelReader();
 */