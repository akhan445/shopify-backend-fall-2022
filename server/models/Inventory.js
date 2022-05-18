const db = require('../db');

/**
 * Inventory model which stores the methods related to the inventory table below
 * Model performs actions on database and returns data/results to the controller
 *  */ 
const Inventory = {};

// CRUD operations

// Read list of all inventory entries
Inventory.get = () => {
  return db.query('SELECT * FROM inventory');
};

// Create a new inventory entry returning the values created
Inventory.create = (name, description, quantity, unit_price) => {
  return db.query(`
    INSERT INTO inventory(name, description, quantity, unit_price)
    VALUES (
      $1, 
      $2, 
      $3, 
      $4
      ) RETURNING *;`, [name, description, quantity, unit_price]);
};

// Update an existing entry

// Delete an existing entry

module.exports = Inventory;