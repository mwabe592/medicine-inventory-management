import { cookies } from "next/headers";
import MedicationList from "@/components/MedicationList";
import SearchMedicine from "@/components/SearchMedicine";
import UpdateMedicine from "@/components/UpdateMedicine/UpdateMedicine";
import DeleteMedicine from "@/components/DeleteMedicine/DeleteMedicine";
import AddMedication from "@/components/AddMedication";
import LogoutButton from "@/components/LogoutButton";

const page = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/medication`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken?.value}`, // Pass the cookie manually
    },
  });

  console.log("Response status:", response.status);
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Error fetching medications:", errorDetails);
    throw new Error("There was an error fetching medication data");
  }
  const data = await response.json();

  return (
    <div className="container mx-auto min-h-screen relative p-4 flex flex-col items-center">
      {/* Logout Button */}
      <LogoutButton />

      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center mt-16 mb-8">
        Medications Management
      </h1>

      {/* Function Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
};

export default page;

//hello world
