const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'campus_marketplace'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to database');
});

// Show all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products_services WHERE available = 1', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Place an order
app.post('/order', (req, res) => {
  const { buyer_id, product_service_id, quantity, delivery_address, notes } = req.body;

  db.query('SELECT price, seller_id FROM products_services WHERE id = ?', [product_service_id], (err, result) => {
    if (err || result.length === 0) return res.status(400).send("Invalid product");

    const { price, seller_id } = result[0];
    const total_amount = quantity * price;

    db.query('INSERT INTO orders (id, buyer_id, product_service_id, seller_id, quantity, total_amount, delivery_address, notes, status) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, "pending")',
      [buyer_id, product_service_id, seller_id, quantity, total_amount, delivery_address, notes],
      (err) => {
        if (err) return res.status(500).send(err);
        res.send("✅ Order placed successfully!");
      });
  });
});

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
