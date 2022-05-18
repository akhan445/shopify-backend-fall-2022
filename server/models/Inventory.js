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
Inventory.update = (id, name, description, quantity, unit_price) => {
  return db.query(`
    UPDATE inventory
    SET name = $1, description = $2, quantity = $3, unit_price = $4
    WHERE id = $5 RETURNING *;
    `, [name, description, quantity, unit_price, id]);
}

// Delete an existing entry
Inventory.delete = (id) => {
  return db.query(`
    DELETE from inventory WHERE id = $1 RETURNING *;
    `, [id]);
}

module.exports = Inventory;