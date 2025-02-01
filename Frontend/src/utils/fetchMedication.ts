import apiUrl from "./apirUrl";

export const fetchMedication = async () => {
  try {
    const response = await fetch(`${apiUrl}/medication`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
    });
    if (!response.ok) throw new Error("Failed to fetch medicines");
    const data = await response.json();
    return data; // Return the list of medicines
  } catch (err) {
    throw new Error(`Failed to load medicines ${err}`);
  }
};
