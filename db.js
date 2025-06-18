const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'campus_marketplace'
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL database");
});

module.exports = db;
