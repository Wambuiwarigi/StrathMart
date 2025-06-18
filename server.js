const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs

const app = express();

// Serve static files (e.g., signup.html)
app.use(express.static(path.join(__dirname)));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve signup.html on GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

// MySQL connection
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

// Handle signup
app.post('/submit-signup', (req, res) => {
  const { first_name, last_name, email, phone, password, role } = req.body;

  const id = uuidv4(); // unique ID

  if (role === 'buyer') {
    const sql = `
      INSERT INTO student_buyers (id, first_name, last_name, email, phone, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [id, first_name, last_name, email, phone, password], (err, result) => {
      if (err) {
        console.error('Error inserting buyer:', err);
        res.status(500).json({ message: 'Buyer signup failed' });
      } else {
        res.status(200).json({ message: 'Buyer signup successful' });
      }
    });

  } else if (role === 'seller') {
    // Use default dummy business info if not in form
    const business_name = "My Business";
    const business_description = "Default seller description";

    const sql = `
      INSERT INTO student_sellers (id, first_name, last_name, email, phone, password, business_name, business_description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [id, first_name, last_name, email, phone, password, business_name, business_description], (err, result) => {
      if (err) {
        console.error('Error inserting seller:', err);
        res.status(500).json({ message: 'Seller signup failed' });
      } else {
        res.status(200).json({ message: 'Seller signup successful' });
      }
    });

  } else {
    res.status(400).json({ message: 'Invalid role selected' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
