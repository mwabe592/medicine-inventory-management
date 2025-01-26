import { Request, Response } from "express";
import * as MedicationService from "../services/medication.service";

// Handle GET request to fetch all medication
export const getAllMedications = async (req: Request, res: Response) => {
  console.log("this route has been hit");

  // Extract the search parameters (id or name) from the query string
  const { id, name } = req.query;

  try {
    let medications;

    if (id) {
      // If id is provided in the query parameter, fetch by id
      medications = await MedicationService.getMedicationbyId(id as string); // Type assertion
    } else if (name) {
      // If name is provided, search by name
      medications = await MedicationService.getMedicationsByName(
        name as string
      );
    } else {
      // If neither id nor name is provided, fetch all medications
      medications = await MedicationService.getAllMedications();
    }

    res.status(200).json(medications);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "There was an error fetching medication data",
      error,
    });
  }
};

// handle POST request to add a new medication to the database
export const addMedication = async (req: Request, res: Response) => {
  try {
    const newMedication = await MedicationService.addMedication(req.body);
    res.status(201).json(newMedication);
    console.log(newMedication);
  } catch (error: any) {
    console.error(error);

    //handle existing medicine
    if (error.message === "Medication already exists in the database") {
      res.status(400).json({ message: error.message });
    } else {
      // Handle all other errors
      res.status(500).json({
        message: "There was an error adding medication to the database",
        error,
      });
    }
  }
};
//handle PUT request to update a medication already in the database
export const updateMedication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedMedication = await MedicationService.updateMedication(
      id,
      req.body
    );
    if (!updatedMedication) {
      res.status(404).json({ message: "Medication not found" });
    }
    res.status(200).json(updatedMedication);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error updating the medication", error });
  }
};

// handle a DELETE request to delete a medicine from the database
export const deleteMedication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, strength } = req.body;

  try {
    const deletedMedication = await MedicationService.deleteMedication(
      name,
      strength
    );
    if (!deletedMedication) {
      res.status(404).json({ message: "Medication not found" });
      return;
    }
    res.status(200).json({ message: "Medication deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "There was an error in deleting the medication",
      error,
    });
  }
};
