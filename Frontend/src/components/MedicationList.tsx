import React from "react";
import { Medication } from "@/app/types/medicineType";

type MedicationListProps = {
  medicineData: Medication[];
};
const MedicationList = ({ medicineData }: MedicationListProps) => {
  return (
    <div>
      {medicineData.map((medication: Medication) => (
        <li key={medication._id} className="list-none">
          {medication.name}
          <span className="ml-2">{medication.strength}</span>
          <span className="ml-2">{medication.dosageForm}</span>
        </li>
      ))}
    </div>
  );
};

export default MedicationList;
