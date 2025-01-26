"use client";

import { useState } from "react";

const UpdateMedicine = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    strength: "",
    dosageForm: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://medicine-inventory-management-api.vercel.app/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            strength: formData.strength,
            dosageForm: formData.dosageForm,
          }),
          credentials: "include", // Include cookies in the request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update medicine");
      }

      const data = await response.json();
      console.log("Medicine updated:", data);
      setSuccessMessage("Medicine updated successfully");
      setErrorMessage("");
    } catch (err: unknown) {
      setSuccessMessage("");
      setErrorMessage(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Update Medicine Info</h1>
      <form onSubmit={handleUpdate} className="mb-4">
        <div className="mb-4">
          <input
            type="text"
            name="id"
            placeholder="Enter medicine ID"
            value={formData.id}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Enter new name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="strength"
            placeholder="Enter new strength"
            value={formData.strength}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="dosageForm"
            placeholder="Enter new dosage form"
            value={formData.dosageForm}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded"
          />
        </div>
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
