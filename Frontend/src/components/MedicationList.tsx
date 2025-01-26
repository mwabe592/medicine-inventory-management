import React from "react";
import { Medication } from "@/app/types/medicineType";

type MedicationListProps = {
  medicineData: Medication[];
};
const MedicationList = ({ medicineData }: MedicationListProps) => {
  return (
    <div>
      {medicineData.map((medication: Medication) => (
        <li key={medication._id}>{medication.name}</li>
      ))}
    </div>
  );
};

export default MedicationList;
