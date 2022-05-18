const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// get all the entries
router.get('/', inventoryController.getInventory);

// route for creating a new entry
router.post('/', inventoryController.createInventoryItem);

//route for updating an entry
router.put('/:id', inventoryController.updateInventoryItem);

// route for deleting an entry
router.delete('/:id', inventoryController.deleteInventoryItem);

module.exports = router;