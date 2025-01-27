"use client";
import { useState } from "react";
import MedicineSelect from "./MedicineSelect";

const DeleteMedicine = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleDeleteMedicine = (id: string) => {
    setSuccessMessage(`Medicine with ID ${id} has been deleted successfully!`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Medicine</h1>
      <MedicineSelect onDeleteMedicine={handleDeleteMedicine} />
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default DeleteMedicine;
