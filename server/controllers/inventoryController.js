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
  },
  
  createInventoryItem: async (req, res) => {
    try {
      // get the information passed in the request body
      const {name, description, quantity, unit_price} = req.body;
      
      //create a new entry using the passed data
      const newItem = await Inventory.create(name, description, quantity, unit_price);
      
      //returns the rows created
      res.status(201).json(newItem.rows);
    } catch (err) {
      res.status(400).json({ err });
    }
  },
}