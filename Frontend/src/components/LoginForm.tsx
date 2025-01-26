"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type LoginFormData = {
  userName: string;
  password: string;
};

const loginForm = () => {
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
      const response = await fetch("http://localhost:8000/auth/login", {
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
      console.log("Logged in successfully", data);
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
    <div className="flex flex-col items-center justify-center  mt-4">
      {loggedInMessage && <h2>{loggedInMessage}</h2>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className=" placeholder-black p-2  border-black border-2 mx-2 rounded-lg"
            type="text"
            placeholder="Username"
            required
            name="userName"
            onChange={handleInputChange}
            value={formData.userName}
          />
          <input
            className=" placeholder-black p-2 border-black border-2 mx-2 rounded-lg"
            type="password"
            placeholder="Password"
            required
            name="password"
            onChange={handleInputChange}
            value={formData.password}
          />
        </div>
        <div className="flex items-center justify-center ">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default loginForm;
