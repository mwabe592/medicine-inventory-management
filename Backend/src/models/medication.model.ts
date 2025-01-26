import mongoose, { Schema, Document } from "mongoose";

export interface IMedication extends Document {
  name: string;
  dosageForm: string;
  strength: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  stock: number;
  pharmaCode: number;
}

//Schema for MongoDB data
const medicationSchema: Schema = new Schema({
  name: { type: String, required: true },
  dosageForm: { type: String, required: true },
  strength: { type: String, required: true },
  manufacturer: { type: String, required: true },
  batchNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  stock: { type: Number, required: true },
  pharmaCode: { type: Number, required: true },
});

const Medication = mongoose.model<IMedication>("Medication", medicationSchema);

export default Medication;
