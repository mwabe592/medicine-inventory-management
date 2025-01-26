"use client";
import { useState } from "react";

const AddMedication = () => {
  const [formData, setFormData] = useState({
    name: "",
    dosageForm: "",
    strength: "",
    manufacturer: "",
    batchNumber: "",
    expiryDate: "",
    stock: 0,
    pharmaCode: 0,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stock" || name === "pharmaCode" ? +value : value,
    });
  };

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/medication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const errorInfo = await response.json();
        throw new Error(errorInfo.message);
      }

      const data = await response.json();
      console.log("Medication added:", data);
      setSuccessMessage("Medication added successfully");
      setFormData({
        name: "",
        dosageForm: "",
        strength: "",
        manufacturer: "",
        batchNumber: "",
        expiryDate: "",
        stock: 0,
        pharmaCode: 0,
      });
    } catch (err: unknown) {
      setSuccessMessage("");
      console.error("Error adding medication:", err);
      setErrorMessage(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Medication</h1>
      <form
        onSubmit={handleAddMedication}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Medication Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Medication name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dosageForm"
            className="block text-sm font-medium text-gray-700"
          >
            Dosage Form
          </label>
          <input
            type="text"
            name="dosageForm"
            id="dosageForm"
            placeholder="Dosage form"
            value={formData.dosageForm}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="strength"
            className="block text-sm font-medium text-gray-700"
          >
            Strength
          </label>
          <input
            type="text"
            name="strength"
            id="strength"
            placeholder="Strength"
            value={formData.strength}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="manufacturer"
            className="block text-sm font-medium text-gray-700"
          >
            Manufacturer
          </label>
          <input
            type="text"
            name="manufacturer"
            id="manufacturer"
            placeholder="Manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="batchNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Batch Number
          </label>
          <input
            type="text"
            name="batchNumber"
            id="batchNumber"
            placeholder="Batch number"
            value={formData.batchNumber}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expiry Date
          </label>
          <input
            type="date"
            name="expiryDate"
            id="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            placeholder="Stock quantity"
            value={formData.stock}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pharmaCode"
            className="block text-sm font-medium text-gray-700"
          >
            Pharma Code
          </label>
          <input
            type="number"
            name="pharmaCode"
            id="pharmaCode"
            placeholder="Pharma code"
            value={formData.pharmaCode}
            onChange={handleInputChange}
            className="border p-2 w-full rounded-sm"
            required
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-sm w-full sm:w-auto"
          >
            Add Medication
          </button>
        </div>
      </form>

      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default AddMedication;
