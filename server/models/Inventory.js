const db = require('../db');

/**
 * Inventory model which stores the methods related to the inventory table below
 * Model performs actions on database and returns data/results to the controller
 *  */ 
const Inventory = {};

// CRUD operations

// Read list of all inventory entries
Inventory.get = () => {
  return db.query(`
    SELECT id, name, description, quantity, unit_price
      FROM inventory
      WHERE is_deleted = false;
  `);
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
Inventory.delete = (id, deleteComment) => {
  return db.query(`
    UPDATE inventory
      SET is_deleted = true, timestamp = current_timestamp, comment = $1
      WHERE id = $2 RETURNING *;
    `, [deleteComment, id]);
}

// get all the deleted tables, sorted by most recent first
Inventory.getDeleted = () => {
  return db.query(`
    SELECT id, name, comment, deleted_at
      FROM inventory
      WHERE is_deleted = true
      ORDER BY deleted_at DESC;
  `);
}

// undo a delete
Inventory.undoDelete = (id) => {
  return db.query(`
    UPDATE inventory
      SET is_deleted = false, deleted_at = null, comment = null
      WHERE id = $1 RETURNING *;
  `, [id]);
}

module.exports = Inventory;