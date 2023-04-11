// Part 1
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    translations: {
      pt: { type: String },
      en: { type: String },
      es: { type: String }
    }
  },
  {
    timestamps: true
  }
);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
