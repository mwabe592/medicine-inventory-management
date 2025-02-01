const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export default apiUrl;
