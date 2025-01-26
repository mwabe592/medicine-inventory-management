import Medication from "../models/medication.model";
import { IMedication } from "../models/medication.model";

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
  newMedicineInfo: IMedication
) => {
  const { name } = newMedicineInfo;
  const capitalisedName = name.charAt(0).toUpperCase() + name.slice(1);

  const updatedMedicineInfo = { ...newMedicineInfo, name: capitalisedName };
  try {
    const updatedMedication = await Medication.findByIdAndUpdate(
      id,
      updatedMedicineInfo,
      { new: true } // Returns the updated document
    );

    if (!updatedMedication) {
      throw new Error("Medication not found");
    }

    return updatedMedication;
  } catch (error) {
    console.error(error);
    throw new Error("There was an error updating the medication");
  }
};

export const deleteMedication = async (name: string, strength: string) => {
  try {
    const deletedMedication = await Medication.findOneAndDelete({
      //Case-insensitive matches
      name: new RegExp(`^${name}$`, "i"),
      strength: new RegExp(`^${strength}$`, "i"),
    });
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
