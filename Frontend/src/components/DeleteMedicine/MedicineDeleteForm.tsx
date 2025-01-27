// components/MedicineForm.tsx

interface MedicineFormProps {
  name: string;
  strength: string;
  onDelete: () => void;
  isDeleteDisabled: boolean;
}

const MedicineDeleteForm = ({
  name,
  strength,
  onDelete,
  isDeleteDisabled,
}: MedicineFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onDelete();
      }}
      className="mb-4"
    >
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Enter medicine name"
          value={name}
          className="border p-2 mr-2 rounded"
          disabled
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="strength"
          placeholder="Enter medicine strength"
          value={strength}
          className="border p-2 mr-2 rounded"
          disabled
        />
      </div>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded"
        disabled={isDeleteDisabled}
      >
        Delete
      </button>
    </form>
  );
};

export default MedicineDeleteForm;
