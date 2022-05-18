const Inventory = require('../models/Inventory');

/**
 * Controller for inventory model from database
 * Processes returned data and communicates it to the client to render a view
 */
module.exports = {
  // Processes data to display a list of all entries in inventory table
  getInventory: async (req, res) => {
    try {
      const data = await Inventory.get();
      res.status(200).json(data.rows);
    } catch (err) {
      res.status(400).json({ err });
    }
  }
}