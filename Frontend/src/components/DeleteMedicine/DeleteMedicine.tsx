"use client";
import { useState, useEffect } from "react";
import { Medication } from "@/app/types/medicineType";
import { fetchMedication } from "@/utils/fetchMedication";
import apiUrl from "@/utils/apirUrl";

const DeleteMedicine = () => {
  const [medicines, setMedicines] = useState<Medication[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medication | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const data = await fetchMedication();
        console.log("Medicines fetched:", data);
        setMedicines(data);
      } catch (err) {
        setErrorMessage("Failed to load medicines");
        console.error(err);
      }
    };

    loadMedicines();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selected = medicines.find((medicine) => medicine._id === selectedId);
    setSelectedMedicine(selected || null);
  };

  const handleDelete = async () => {
    const medicineID = selectedMedicine?._id;
    if (selectedMedicine) {
      try {
        const response = await fetch(`${apiUrl}/medication/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: medicineID }),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to delete medicine");
        }

        const deleted = await response.json();

        setSuccessMessage(deleted.message);
        setErrorMessage("");
        setSelectedMedicine(null);
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "Error deleting medicine"
        );
      }
    }
  };

  return (
    <div className="mb-4">
      <select
        onChange={handleSelectChange}
        className="border p-2 rounded"
        required
      >
        <option value="">Select Medicine</option>
        {medicines.map((medicine) => (
          <option key={medicine._id} value={medicine._id}>
            {medicine.name} {medicine.strength} {medicine.dosageForm}
          </option>
        ))}
      </select>
      {selectedMedicine && (
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete{" "}
            {`${selectedMedicine.name} ${selectedMedicine.strength} ${selectedMedicine.dosageForm}`}
          </button>
        </div>
      )}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default DeleteMedicine;
