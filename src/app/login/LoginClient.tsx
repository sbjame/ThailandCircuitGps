"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/map.module.css";
import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { User } from "@/types/user";
import { Transition } from "@headlessui/react";

export default function LoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [createStatus, setCreateStatus] = useState("hidden");


  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true)
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
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setError("");
    setLoading(true)
    try {
      const res = await axiosInstance.post("/user", {
        user_Name: username,
        first_Name: firstName,
        last_Name: lastName,
        email: email,
        password: password,
      });
      setLoading(false)
      setCreateStatus("block");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Network error");
    }
  };

  const handleToCreateAccount = () => {
    setShowCreateAccount(true);
  };

  const handleToLogin = () => {
    setShowCreateAccount(false);
    setCreateStatus("hidden")
  };

  return (
    <div className="relative border h-screen w-screen flex gap-4 justify-center items-center">
      {loading && (
        <div className={`absolute top-0 left-0 h-full w-full bg-black/40 z-40 flex justify-center items-center`}>
          <span className={`${styles.loader}`}></span>
        </div>
      )}
      <div className={`${styles.grid} absolute inset-0 z-10 opacity-60`}></div>

      {/* --- Login Card --- */}
      <div className="flex flex-col items-center justify-center bg-gray-300 w-100 h-auto rounded-2xl z-20 drop-shadow-xl drop-shadow-black/40">
        <h1 className="w-full bg-amber-500 p-2 rounded-t-2xl text-white font-bold text-2xl">
          Login
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col p-4 gap-4 w-full"
        >
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
          <button
            type="submit"
            className="py-2 px-16 bg-amber-500 text-white text-2xl font-bold cursor-pointer hover:rounded-2xl duration-300 ease-in-out active:scale-100"
          >
            Login
          </button>
        </form>
        <button
          type="button"
          onClick={handleToCreateAccount}
          className="text-sm text-gray-600 hover:underline duration-300 cursor-pointer mb-4"
        >
          Create Account
        </button>
        <div className="flex gap-8 px-8 py-2 mb-4 bg-gray-200 rounded text-gray-600 text-sm font-light">
          <div>
            <p>Admin Account</p>
            <p>Username: admin</p>
            <p>Password: 1234</p>
          </div>
          <div>
            <p>Manager Account</p>
            <p>Username: manager</p>
            <p>Password: 1234</p>
          </div>
        </div>
      </div>

      {/* Create Account */}
      <Transition
        show={showCreateAccount}
        enter="transition duration-300 ease-out"
        enterFrom="opacity-0 scale-90 translate-y-10"
        enterTo="opacity-100 scale-100 -translate-y-0"
        leave="transition duration-200 ease-in"
        leaveFrom="opacity-100 scale-100 -translate-y-0"
        leaveTo="opacity-0 scale-90 translate-y-10"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-gray-300 h-auto rounded-2xl drop-shadow-xl drop-shadow-black/40 w-100 flex flex-col justify-center items-center">
          <h1 className="w-full bg-amber-500 p-2 rounded-t-2xl text-white font-bold text-2xl">
            Create Account
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateAccount();
            }}
            className="flex flex-col p-4 gap-4 w-full"
          >
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
            <button
              type="submit"
              className="py-2 px-16 bg-amber-500 text-white text-2xl font-bold cursor-pointer hover:rounded-2xl duration-300 ease-in-out active:scale-100"
            >
              Create
            </button>
          </form>
          <button
            onClick={handleToLogin}
            className="text-sm text-gray-600 hover:underline duration-300 cursor-pointer mb-4"
          >
            Login
          </button>
        </div>
      </Transition>

      {/* Create Success Popup */}
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
