const xlsx = require('xlsx');
const mysql = require('mysql2/promise');
require('dotenv').config();

(async function importExcel() {
  const workbook = xlsx.readFile('certificates.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  for (const row of data) {
    const { student_number, name, branch, year_of_passing } = row;
    try {
      await conn.execute(
        'INSERT IGNORE INTO certificates (student_number, name, branch, year_of_passing) VALUES (?, ?, ?, ?)',
        [student_number, name, branch, year_of_passing]
      );
    } catch (err) {
      console.error(`Error inserting row: ${err.message}`);
    }
  }

  await conn.end();
  console.log('Data import completed.');
})();