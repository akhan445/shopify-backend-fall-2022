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

  // updates an existing entry and returns the new row
  updateInventoryItem: async (req, res) => {
    try {
      const {name, description, quantity, unit_price} = req.body;
      const id = req.params.id;

      const updatedItem = await Inventory.update(id, name, description, quantity, unit_price);

      res.status(200).json(updatedItem.rows);
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  /**
   * This section below deals with deleted items in the API.
   * The controller support 3 operations which include the following:
   *      1) Delete- user can delete an exisitng item 
   *      2) Read- user can view a list of all deleted items
   *      3) Undo- user can undo a deleted item
   */

  //delete a single inventory item
  deleteInventoryItem: async (req, res) => {
    try {
      const { comment } = req.body;
      const id = req.params.id;

      const deletedItem = await Inventory.delete(id, comment);
      res.status(200).json(deletedItem);
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  //get a list of the deleted items
  getDeletedItems: async (req, res) => {
    try {
      const deletedData = await Inventory.getDeleted();
      res.status(200).json(deletedData.rows);
    } catch (err) {
      res.status(400).json({ err });
    }
  },

  // undo a delete
  undoDeletedItem: async (req, res) => {
    try {
      const id = req.params.id;

      const undoItem = await Inventory.undoDelete(id);
      res.status(200).json(undoItem);
    } catch (err) {
      res.status(400).json({ err });
    }
  }
}