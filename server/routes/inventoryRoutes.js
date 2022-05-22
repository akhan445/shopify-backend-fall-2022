const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// get all the entries
router.get('/', inventoryController.getInventory);

// route for creating a new entry
router.post('/', inventoryController.createInventoryItem);

//route for updating an entry
router.patch('/:id', inventoryController.updateInventoryItem);

// route for deleting an entry
router.delete('/:id', inventoryController.deleteInventoryItem);

// DELETED Items routes

// get all the deleted entries
router.get('/deleted', inventoryController.getDeletedItems);

// undo deleted item
router.delete('/undo-delete/:id', inventoryController.undoDeletedItem);

module.exports = router;