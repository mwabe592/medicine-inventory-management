export const fetchMedication = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${API_URL}/medication`, {
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
