const db = require('../db');

/**
 * Inventory model which stores the methods related to the inventory table below
 * Model performs actions on database and returns data/results to the controller
 *  */ 
const Inventory = {};

// CRUD operations

// Create a new inventory entry

// Read list of all inventory entries
Inventory.get = () => {
  return db.query('SELECT * FROM inventory');
};

// Update an existing entry

// Delete an existing entry

module.exports = Inventory;