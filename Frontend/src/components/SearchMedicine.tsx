"use client";

import { useState } from "react";
import { MedicationResponse } from "@/app/types/medicineType";

const SearchMedicine = () => {
  const [medicineName, setMedicineName] = useState("");
  const [medicineDetails, setMedicineDetails] = useState<MedicationResponse>(
    []
  );
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${API_URL}/medication?name=${medicineName}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
        }
      );

      if (!response.ok) {
        throw new Error("Medicine not found");
      }

      const data = await response.json();
      console.log("Medicine found:", data);
      setMedicineDetails(data);
      setError("");
    } catch (err: unknown) {
      setMedicineDetails([]);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search for Medicine</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter medicine name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {medicineDetails &&
        medicineDetails.map((medicine) => (
          <div key={medicine._id} className="border p-4 rounded bg-gray-100">
            <h2 className="text-xl font-semibold">Medicine Details:</h2>
            <p>
              <strong>Name:</strong> {medicine.name}
            </p>
            <p>
              <strong>Strength:</strong> {medicine.strength}
            </p>
            <p>
              <strong>Form:</strong> {medicine.dosageForm}
            </p>
            <p>
              <strong>Quantity:</strong> {medicine.stock}
            </p>
            <p>
              <strong>Expiry:</strong> {medicine.expiryDate}
            </p>
          </div>
        ))}
    </div>
  );
};

export default SearchMedicine;
