// Define the Medication type here
export type Medication = {
  _id: string;
  name: string;
  dosageForm: string;
  strength: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  stock: number;
  pharmaCode: number;
};

export type MedicationResponse = Medication[];
