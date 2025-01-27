// components/MedicineSelector.tsx
import { Medication } from "@/app/types/medicineType";

type MedicineSelectorProps = {
  medicines: Medication[];
  onSelect: (medicine: any) => void;
};

const MedicineSelector = ({ medicines, onSelect }: MedicineSelectorProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="medicineSelect" className="block mb-2">
        Select Medicine
      </label>
      <select
        id="medicineSelect"
        onChange={(e) => {
          const selectedMedicine = medicines.find(
            (med) => med.name === e.target.value
          );
          if (selectedMedicine) onSelect(selectedMedicine);
        }}
        className="border p-2 mr-2 rounded"
        required
      >
        <option value="">Select a medicine</option>
        {medicines.map((medicine) => (
          <option key={medicine._id} value={medicine.name}>
            {medicine.name} - {medicine.strength}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MedicineSelector;
