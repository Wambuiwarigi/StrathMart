const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all products
router.get('/', (req, res) => {
  const query = 'SELECT * FROM products_services WHERE available = 1';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST a new order
router.post('/order', (req, res) => {
  const { buyer_id, product_service_id, quantity, delivery_address, notes } = req.body;

  // Get price of product
  db.query(
    'SELECT price, seller_id FROM products_services WHERE id = ?',
    [product_service_id],
    (err, result) => {
      if (err || result.length === 0) return res.status(400).send('Invalid product');
      
      const price = result[0].price;
      const seller_id = result[0].seller_id;
      const total_amount = quantity * price;

      db.query(
        'INSERT INTO orders (id, buyer_id, quantity, total_amount, product_service_id, seller_id, delivery_address, notes, status) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, "pending")',
        [buyer_id, quantity, total_amount, product_service_id, seller_id, delivery_address, notes],
        (err, result) => {
          if (err) return res.status(500).send(err);
          res.send('✅ Order placed');
        }
      );
    }
  );
});

module.exports = router;
