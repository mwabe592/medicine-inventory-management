// components/MedicineUpdateForm.tsx
import React from "react";

type MedicineUpdateFormProps = {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MedicineUpdateForm = ({
  formData,
  onInputChange,
}: MedicineUpdateFormProps) => {
  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Enter new name"
          value={formData.name}
          onChange={onInputChange}
          className="border p-2 mr-2 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="strength"
          placeholder="Enter strength"
          value={formData.strength}
          onChange={onInputChange}
          className="border p-2 mr-2 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="dosageForm"
          placeholder="Enter dosage form"
          value={formData.dosageForm}
          onChange={onInputChange}
          className="border p-2 mr-2 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="manufacturer"
          placeholder="Enter manufacturer"
          value={formData.manufacturer}
          onChange={onInputChange}
          className="border p-2 mr-2 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="batchNumber"
          placeholder="Enter batch number"
          value={formData.batchNumber}
          onChange={onInputChange}
          className="border p-2 mr-2 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="expiryDate"
          placeholder="Enter expiry date"
          value={formData.expiryDate}
          onChange={onInputChange}
          className="border p-2 mr-2 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          name="stock"
          placeholder="Enter stock quantity"
          value={formData.stock}
          onChange={onInputChange}
          className="border p-2 mr-2 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          name="pharmaCode"
          placeholder="Enter pharma code"
          value={formData.pharmaCode}
          onChange={onInputChange}
          className="border p-2 mr-2 rounded"
        />
      </div>
    </>
  );
};

export default MedicineUpdateForm;
