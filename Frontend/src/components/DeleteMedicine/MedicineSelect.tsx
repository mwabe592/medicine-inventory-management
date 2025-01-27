// components/MedicineSelect.tsx
"use client";
import { fetchMedication } from "@/utils/FetchMedication";
import { useEffect, useState } from "react";
import { Medication } from "@/app/types/medicineType";

type MedicineSelectProps = {
  onDeleteMedicine: (id: string) => void;
};

const MedicineSelect = ({ onDeleteMedicine }: MedicineSelectProps) => {
  const [medicines, setMedicines] = useState<Medication[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medication | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  console.log(medicines);
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
  console.log(selectedMedicine?._id);
  const handleDelete = async () => {
    const medicineID = selectedMedicine?._id;
    if (selectedMedicine) {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/medication/delete`, {
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

        const data = await response.json();
        onDeleteMedicine(selectedMedicine._id);
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
            Delete {selectedMedicine.name}
          </button>
        </div>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default MedicineSelect;
