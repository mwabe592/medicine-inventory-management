"use client";

import { useState } from "react";

const DeleteMedicine = () => {
  const [formData, setFormData] = useState({
    name: "",
    strength: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/medication`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          strength: formData.strength,
        }),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error("Failed to delete medicine");
      }

      const data = await response.json();
      console.log("Medicine deleted:", data);
      setSuccessMessage("Medicine deleted successfully");
      setErrorMessage("");
    } catch (err: any) {
      setSuccessMessage("");
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Medicine</h1>
      <form onSubmit={handleDelete} className="mb-4">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Enter medicine name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="strength"
            placeholder="Enter medicine strength"
            value={formData.strength}
            onChange={handleInputChange}
            className="border p-2 mr-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </form>

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default DeleteMedicine;
