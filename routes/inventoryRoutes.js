const express = require('express');
const router = express.Router();
const { addItem, updateStock, lowStockItems, totalInventoryValue, getAllItems } = require('../service/inventoryService');

// Route to add a new item
router.post('/add', async (req, res) => {
  try {
    const item = await addItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update stock quantity
router.put('/update/:id', async (req, res) => {
  try {
    const item = await updateStock(req.params.id, req.body.qtyChange);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get items with low stock
router.get('/low-stock/:threshold', async (req, res) => {
  try {
    const items = await lowStockItems(req.params.threshold);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get the total value of inventory
router.get('/total-value', async (req, res) => {
  try {
    const totalValue = await totalInventoryValue();
    res.json({ totalValue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all inventory items
router.get('/getAll', async (req, res) => {
    try {
      const items = await getAllItems();  // Get all items
      const totalValue = await totalInventoryValue();  // Calculate total value
      res.status(200).json({ items, totalValue });  // Send both items and total value in response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
