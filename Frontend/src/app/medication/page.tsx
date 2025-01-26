import { cookies } from "next/headers";
import MedicationList from "@/components/MedicationList";
import SearchMedicine from "@/components/SearchMedicine";
import UpdateMedicine from "@/components/UpdateMedicine";
import DeleteMedicine from "@/components/DeleteMedicine";
import AddMedication from "@/components/AddMedication";

const page = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  try {
    const response = await fetch(
      "https://medicine-inventory-management-api.vercel.app/medication",
      {
        method: "GET",
        credentials: "include", // Add this
        headers: {
          "Content-Type": "application/json",
          ...(accessToken?.value && {
            Cookie: `accessToken=${accessToken.value}`,
          }),
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Fetch error:", errorDetails);
      return <div>Error loading medications</div>; // Render error state
    }

    const data = await response.json();

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Medications Management
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Medication List</h2>
            <MedicationList medicineData={data} />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Search Medicine</h2>
            <SearchMedicine />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Update Medicine</h2>
            <UpdateMedicine />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Delete Medicine</h2>
            <DeleteMedicine />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Add Medication</h2>
            <AddMedication />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return <div>Error loading medications</div>; // Fallback error state
  }
};
export default page;
