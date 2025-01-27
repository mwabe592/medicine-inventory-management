"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type LoginFormData = {
  userName: string;
  password: string;
};

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    userName: "",
    password: "",
  });
  const [loggedInMessage, setLoggedInMessage] = useState(null);
  const router = useRouter();

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error("There was an error logging in");
      }

      if (response.status === 401) {
        throw new Error("Incorrect Password");
      }
      if (response.status === 404) {
        throw new Error("Username not found");
      }

      const data = await response.json();

      setLoggedInMessage(data.message);

      //reset form data
      setFormData({ userName: "", password: "" });

      //redirect to home page after login
      router.push("/medication");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("There was an error logging in. Please try again");
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {loggedInMessage && (
          <h2 className="text-center text-green-500">{loggedInMessage}</h2>
        )}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <input
              className="w-full placeholder-black p-2 border-black border-2 rounded-lg mb-4"
              type="text"
              placeholder="Username"
              required
              name="userName"
              onChange={handleInputChange}
              value={formData.userName}
            />
            <input
              className="w-full placeholder-black p-2 border-black border-2 rounded-lg"
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </div>
          <div className="flex items-center justify-between gap-4 mt-4">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
            <Link
              href="/register"
              className="w-full py-2 text-center bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
