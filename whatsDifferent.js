/* const readXlsxFile = require("read-excel-file/node");
const path = require("path");

function rowsToObjects(rows) {
  if (!rows || rows.length === 0) return [];

  const [headerRow, ...dataRows] = rows;
  return dataRows.map((row) => {
    const obj = {};
    headerRow.forEach((key, index) => {
      const safeKey = String(key || `col_${index}`);
      obj[safeKey] = row[index];
    });
    return obj;
  });
}

async function excelReader(req, res, next) {
  try {
    const filePath = path.join(
      __dirname,
      "..",
      "DataFilesXlsx",
      "20260128_1800_Tursøk (sortert).xlsx"
    );

    const rows = await readXlsxFile(filePath);
    const excelData = rowsToObjects(rows);

    req.excelData = excelData;
    next();
  } catch (error) {
    console.error("Error reading Excel file:", error);
    res.status(500).json({ error: "Failed to read Excel file" });
  }
}

module.exports = excelReader; */