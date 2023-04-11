// Part 1
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');


// Get all menu items
router.get('/', async (req, res) => {
  const menuItems = await MenuItem.find();
  res.json(menuItems);
});

// Create a menu item
router.post('/', async (req, res) => {
  const { name, description, price, image, translations } = req.body;
  const newItem = new MenuItem({ name, description, price, image, translations });
  await newItem.save();
  res.status(201).json(newItem);
});

// Update a menu item
router.put('/:id', async (req, res) => {
  const { name, description, price, image, translations } = req.body;
  const updatedItem = await MenuItem.findByIdAndUpdate(
    req.params.id,
    { name, description, price, image, translations },
    { new: true }
  );

  if (!updatedItem) {
    res.status(404).json({ msg: 'Menu item not found' });
  } else {
    res.json(updatedItem);
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    res.status(404).json({ msg: 'Menu item not found' });
  } else {
    await menuItem.remove();
    res.json({ msg: 'Menu item deleted' });
  }
});

module.exports = router;
