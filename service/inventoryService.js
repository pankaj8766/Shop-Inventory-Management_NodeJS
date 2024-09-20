const Inventory = require('../model/inventoryModel');

const addItem = async (data) => {
  const newItem = new Inventory(data);
  return await newItem.save();
};

const updateStock = async (id, qtyChange) => {
  return await Inventory.findByIdAndUpdate(id, { $inc: { quantity: qtyChange } }, { new: true });
};

const lowStockItems = async (threshold) => {
  return await Inventory.find({ quantity: { $lt: threshold } });
};

const totalInventoryValue = async () => {
  const items = await Inventory.find();
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const getAllItems = async () => {
    try {
      const items = await Inventory.find(); // Retrieves all items
      return items;
    } catch (error) {
      throw new Error('Error retrieving items');
    }
  };

module.exports = { addItem, updateStock, lowStockItems, totalInventoryValue , getAllItems};
