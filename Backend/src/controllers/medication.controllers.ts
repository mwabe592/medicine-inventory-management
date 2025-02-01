import { Request, Response } from "express";
import * as MedicationService from "../services/medication.service";

// Handle GET request to fetch all medication
export const getAllMedications = async (req: Request, res: Response) => {
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
  const { _id, ...updateData } = req.body; // Extract the id and the rest of the update data

  console.log(req.body); // For debugging, you can remove this later

  try {
    // Ensure the ID exists
    if (!_id) {
      res.status(400).json({ message: "Medication ID is required" });
      return;
    }

    // Call the MedicationService to update the medication
    const updatedMedication = await MedicationService.updateMedication(
      _id,
      updateData
    );

    // If no medication is found, return a 404 error
    if (!updatedMedication) {
      res.status(404).json({ message: "Medication not found" });
      return;
    }

    // Return the success response
    res.status(200).json({
      message: `${updatedMedication.name} ${updatedMedication.strength} has been updated`,
      updatedMedication,
    });
  } catch (error) {
    // Catch any error and return a 500 response
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
  const { _id } = req.body;

  try {
    const deletedMedication = await MedicationService.deleteMedication(_id);
    console.log(deletedMedication);
    if (!deletedMedication) {
      res.status(404).json({ message: "Medication not found" });
      return;
    }
    res.status(200).json({
      message: `${deletedMedication.name} ${deletedMedication.strength} ${deletedMedication.dosageForm} has been deleted`,
      deletedMedication,
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error in deleting the medication",
      error,
    });
  }
};
