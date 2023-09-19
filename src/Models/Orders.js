const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: { type: Number, required: false },
  stock: { type: Number, required: false },
});

const colorSchema = new mongoose.Schema({
  name: { type: String, required: false },
  color: { type: String, required: false },
});

const variationSchema = new mongoose.Schema({
  name: { type: String, required: false },
  color: { type: String, required: false },
  images: { type: [String], required: false },
  size: [sizeSchema],
  in_stock: { type: Boolean, required: false },
});

const shoeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  gender: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  in_stock: { type: Boolean, required: true },
  stock: { type: Number, required: false, default: null },
  images: { type: [String], required: false },
  in_discount: { type: Boolean, required: false },
  original_price: { type: Number, required: true },
  discount_price: { type: Number, required: false },
  have_variations: { type: Boolean, required: true },
  features: { type: [String], required: true },
  material: { type: String, required: true },
  color: colorSchema,
  size: [sizeSchema],
  variations: [variationSchema],
  background_card: { type: String, required: true },
});

const productsOrderSchema = new mongoose.Schema({
  sizeSelected: { type: String, required: true },
  colorSelected: { type: String, required: true },
  product: shoeSchema,
});

const addresSchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  street: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  address: addresSchema,
  products: [productsOrderSchema],
  pending: { type: Boolean, required: true, default: true },
  in_shipping: { type: Boolean, required: true, default: false },
  date: {type: String, required: true}
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
