"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/map.module.css";
import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { User } from "@/types/user"

export default function LoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [createStatus, setCreateStatus] = useState("hidden");

  const [top, setTop] = useState("top-[-1000px]");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axiosInstance.post<{
        token?: string;
        user?: User;
        message?: string;
      }>("/user/login", {
        user_Name: username,
        password: password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      setError(error.response?.data?.error || "Network error");
    }
  };

  const handleCreateAccount = async () => {
    setError("");
    try {
      const res = await axiosInstance.post("/user", {
        user_Name: username,
        first_Name: firstName,
        last_Name: lastName,
        email: email,
        password: password,
      });
      setError("Create Successed");
      setCreateStatus("block");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Network error");
    }
  };

  const handleToCreateAccount = () => {
    setError("");
    setTop("top-1/2");
  };

  const handleToLogin = () => {
    setError("");
    setCreateStatus("hidden");
    setTop("top-[-1000px]");
  };

  return (
    <div className="relative border h-screen w-screen flex gap-4 justify-center items-center">
      <div className={`${styles.grid} absolute inset-0 z-10 opacity-60`}></div>
      <div className="bg-gray-300 w-100 h-auto rounded-2xl z-20 drop-shadow-xl drop-shadow-black/40">
        <h1 className="w-full bg-amber-500 p-2 rounded-t-2xl text-white font-bold text-2xl">
          Login
        </h1>
        <div className="flex flex-col px-4 py-8 gap-4">
          <input
            type="text"
            placeholder="Username"
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex flex-col justify-center items-center mb-4 gap-2">
          <button
            onClick={handleLogin}
            className="py-2 px-16 bg-amber-500 rounded text-white font-bold cursor-pointer hover:scale-110 hover:rounded-4xl duration-300 ease-in-out active:scale-100"
          >
            Login
          </button>
          <div
            onClick={handleToCreateAccount}
            className="text-sm text-gray-600 hover:underline duration-300 cursor-pointer"
          >
            Create Account
          </div>
        </div>
      </div>
      <div
        className={`absolute ${top} left-1/2 -translate-y-1/2 -translate-x-1/2 createAccount bg-gray-300 w-100 h-auto rounded-2xl z-30 drop-shadow-xl drop-shadow-black/40`}
      >
        <h1 className="w-full bg-amber-500 p-2 rounded-t-2xl text-white font-bold text-2xl">
          Create Account
        </h1>
        <div className="flex flex-col px-4 py-8 gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-white rounded-xl"
          />
          <input
            type="text"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 bg-white rounded-xl"
          />
          <input
            type="text"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 bg-white rounded-xl"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-white rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-white rounded-xl"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex flex-col gap-2 mb-4 justify-center items-center">
          <button
            onClick={handleCreateAccount}
            className="py-2 px-16 bg-amber-500 rounded text-white font-bold cursor-pointer hover:scale-110 hover:rounded-4xl duration-300 ease-in-out active:scale-100"
          >
            Create
          </button>
          <div
            onClick={handleToLogin}
            className="text-sm text-gray-600 hover:underline duration-300 cursor-pointer"
          >
            Login
          </div>
        </div>
      </div>
      <div
        className={`${createStatus} absolute z-30 bg-black/20 w-screen h-screen flex justify-center items-center`}
      >
        <div className="flex flex-col justify-self-center items-center gap-4 p-10 bg-white rounded text-xl">
          <h1>Create Successed</h1>
          <div
            onClick={handleToLogin}
            className="text-sm text-gray-600 hover:underline duration-300 cursor-pointer"
          >
            Go to Login
          </div>
        </div>
      </div>
    </div>
  );
}
