"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/map.module.css";
import { axiosInstance } from "@/lib/axiosInstance";

export default function LoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axiosInstance.post("/user/login", {
        user_Name: username,
        password: password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user))
        router.push("/dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Network error");
    }
  };

  return (
    <div className="relative border h-screen w-screen flex justify-center items-center">
      <div className={`${styles.grid} absolute inset-0 z-10 opacity-60`}></div>
      <div className="bg-gray-300 w-100 h-auto rounded-2xl z-20 drop-shadow-xl drop-shadow-black/40">
        <h1 className="w-full bg-amber-500 p-2 rounded-t-2xl text-white font-bold text-2xl">
          Login
        </h1>
        <div className="flex flex-col px-4 py-8 gap-4">
          <input
            type="text"
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-white rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-white rounded-xl"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handleLogin}
            className="py-2 px-16 bg-amber-500 mb-4 rounded text-white font-bold cursor-pointer hover:scale-110 hover:rounded-4xl duration-300 ease-in-out active:scale-100"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
