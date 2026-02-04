const readXlsxFile = require("read-excel-file/node");
const path = require("path");

function pathFinder() {
  const filePath = path.join(
    __dirname,
    "..",
    "DataFilesXlsx",
    "20260128_1800_Tursøk (sortert).xlsx",
  );
  return filePath;
}

async function excelReader() {
  try {
    const filePath = pathFinder();
    const turData = await readXlsxFile(filePath);
    //console.log(turData);
    //req.excelData = excelData;
    //next();
    return turData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    //res.status(500).json({ error: "Failed to read Excel file" });
  }
}

module.exports = excelReader;
