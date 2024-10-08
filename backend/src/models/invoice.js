import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  entreprise: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    siret: { type: Number, required: true },
  },
  client: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  product: {
    title: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
  },

  totalHT: {
    type: Number,
    required: true,
  },
  totalTVA: {
    type: Number,
    required: true,
  },
  totalTTC: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    required: false,
  },
  remainsToPay: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPaid: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
