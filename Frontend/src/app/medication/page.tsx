"use client";

import { useState, useEffect } from "react";
import MedicationList from "@/components/MedicationList";
import SearchMedicine from "@/components/SearchMedicine";
import UpdateMedicine from "@/components/UpdateMedicine/UpdateMedicine";
import DeleteMedicine from "@/components/DeleteMedicine/DeleteMedicine";
import AddMedication from "@/components/AddMedication";
import LogoutButton from "@/components/LogoutButton";
import { Medication } from "@/app/types/medicineType";
import apiUrl from "@/utils/apirUrl";

const Page = () => {
  const [medicineData, setMedicineData] = useState<Medication[]>([]);

  // Fetch medications
  const fetchMedications = async () => {
    try {
      const response = await fetch(`${apiUrl}/medication`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error fetching medications:", errorDetails);
        throw new Error("There was an error fetching medication data");
      }

      const data = await response.json();
      setMedicineData(data);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, [medicineData]);

  return (
    <div className="container mx-auto  relative p-4 flex flex-col items-center">
      {/* Logout Button */}
      <LogoutButton />

      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center mt-16 mb-8">
        Medications Management
      </h1>

      {/* Search Bar at the Top */}
      <div className="w-full max-w-3xl mb-6">
        <SearchMedicine />
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row w-full gap-6">
        {/* Medication List in the Center */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Medication List</h2>
          <MedicationList medicineData={medicineData} />
        </div>

        {/* Side Sections (Add, Update, Delete) */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Add Medication</h2>
            <AddMedication />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Update Medicine</h2>
            <UpdateMedicine />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Delete Medicine</h2>
            <DeleteMedicine />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
