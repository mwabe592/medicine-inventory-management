"use client";

import { useState, useEffect } from "react";
import MedicineSelector from "./MedicineSelector";
import MedicineUpdateForm from "./MedicineUpdateForm";
import { Medication } from "@/app/types/medicineType";

const UpdateMedicine = () => {
  const [medicines, setMedicines] = useState<Medication[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    strength: "",
    dosageForm: "",
    manufacturer: "",
    batchNumber: "",
    expiryDate: "",
    stock: 0,
    pharmaCode: 0,
    _id: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch the list of medicines from the backend
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/medication`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
        });
        const data = await response.json();

        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectMedicine = (selectedMedicine: Medication) => {
    setFormData(selectedMedicine); // Pre-fill the form with selected medicine details
    console.log(selectedMedicine);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/medication/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error("Failed to update medicine");
      }

      const data = await response.json();
      console.log("Medicine updated:", data);
      setSuccessMessage(data.message);
      setErrorMessage("");
      setFormData({
        name: "",
        strength: "",
        dosageForm: "",
        manufacturer: "",
        batchNumber: "",
        expiryDate: "",
        stock: 0,
        pharmaCode: 0,
        _id: "",
      });
    } catch (err: unknown) {
      setSuccessMessage("");
      setErrorMessage(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleUpdate} className="mb-4">
        {/* Medicine selector */}
        <MedicineSelector
          medicines={medicines}
          onSelect={handleSelectMedicine}
        />

        {/* Medicine update form */}
        <MedicineUpdateForm
          formData={formData}
          onInputChange={handleInputChange}
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default UpdateMedicine;
