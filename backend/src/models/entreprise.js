import mongoose from "mongoose";

const entrepriseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  siret: { type: Number, required: true },
});

const Entreprise = mongoose.model("Entreprise", entrepriseSchema);

export default Entreprise;
