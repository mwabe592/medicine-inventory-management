import { IMedication } from "../models/medication.model";
import Medication from "../models/medication.model";

//Service functions for handling the manipulation of data and database calls

export const getAllMedications = async () => {
  const allMedication = await Medication.find();
  return allMedication;
};

export const getMedicationsByName = async (name: string) => {
  const medication = await Medication.find({
    name: new RegExp(name, "i"), // Case-insensitive search
  });
  return medication;
};

export const getMedicationbyId = async (id: string) => {
  const medication = await Medication.findById(id);
  return medication;
};

export const addMedication = async (medicationData: IMedication) => {
  // Check if medication already exists
  const medicationExists = await Medication.exists({
    name: medicationData.name,
    strength: medicationData.strength,
  });

  if (medicationExists) {
    throw new Error("Medication already exists in the database");
  }

  // Capitalize the first letter of the medication name
  try {
    const capitalisedName =
      medicationData.name.charAt(0).toUpperCase() +
      medicationData.name.slice(1);

    medicationData.name = capitalisedName; // Update the medication name with the capitalized version

    const newMedication = new Medication(medicationData);
    await newMedication.save();
    return newMedication;
  } catch (error) {
    console.error(error);
    throw new Error("There was an error adding medication to the database");
  }
};

export const updateMedication = async (
  id: string,
  updateData: Partial<IMedication>
) => {
  try {
    // Find and update the medication by ID
    const updatedMedication = await Medication.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation runs for the update
      }
    );

    return updatedMedication;
  } catch (error) {
    throw new Error("Error updating medication");
  }
};

export const deleteMedication = async (_id: string) => {
  try {
    const deletedMedication = await Medication.findByIdAndDelete({ _id });
    console.log(deletedMedication);
    if (!deletedMedication) {
      throw new Error("Deleting medication not found");
    }
    return deletedMedication;
  } catch (error) {
    console.error(error);
    throw new Error("There was an error deleting the medication");
  }
};
