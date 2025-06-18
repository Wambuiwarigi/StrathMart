const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Radha.26',
  database: 'strathmart'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Handle signup form POST
app.post('/submit-signup', (req, res) => {
  const { first_name, last_name, email, phone, registration_number } = req.body;

  const sql = `
    INSERT INTO student_buyers (id, first_name, last_name, email, phone, registration_number, status)
    VALUES (?, ?, ?, ?, ?, ?, 'active')
  `;

  const id = 'buyer-' + Math.floor(Math.random() * 10000);

  db.query(sql, [id, first_name, last_name, email, phone, registration_number], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Failed to sign up');
    } else {
      res.send('Signup successful!');
    }
  });
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
