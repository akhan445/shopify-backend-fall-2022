const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// get all the entries
router.get('/', inventoryController.getInventory);

// route for creating a new entry
router.post('/new', inventoryController.createInventoryItem);

// route for deleting an entry
router.delete('/delete/:id', inventoryController.deleteInventoryItem);

module.exports = router;