"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { User } from "@/types/user";
import { div } from "framer-motion/client";

type Props = {
  user: User;
  onUserChange: (user: User) => void;
};

export default function UserinfoClient({ user, onUserChange }: Props) {
  const router = useRouter();

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassworrd, setErrorPassword] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [errorNewPassWord, setErrorNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errorOldPassword, setErrorOldPassword] = useState("");
  const [confirmOldPassword, setConfirmOldPassword] = useState("");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/user/me", {
        headers: { authorization: `${token}` },
      });
      onUserChange(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeName = async () => {
    if (!newFirstName) return setErrorFirstName("Enter Firstname");
    if (!newLastName) return setErrorLastName("Enter Lastname");

    if(!password) return setErrorPassword("Password is incorrect")

    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(
        "/user/update/name/me",
        { new_first_name: newFirstName, new_last_name: newLastName, password },
        { headers: { authorization: `${token}` } }
      );

      onUserChange(res.data);
      setNewFirstName("");
      setNewLastName("");
      setPassword("");
      setErrorPassword("")
      setErrorFirstName("")
      setErrorLastName("")
      await fetchUser();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleChangePassword = async () => {
    if (newPassword === "") {
      setErrorNewPassword("New Password is Empty");
      return;
    }
    if (oldPassword === "" || confirmOldPassword === "") {
      setErrorOldPassword("Old Password is empty");
      return;
    }
    if (oldPassword !== confirmOldPassword) {
      setErrorOldPassword("Old Password doesn't match");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(
        "/user/update/password/me",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: { authorization: `${token}` },
        }
      );

      setPassword("");
      setOldPassword("");
      setConfirmOldPassword("");

      localStorage.removeItem("token");
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="flex flex-col items-center px-8 pt-4 gap-4">
        <h1 className="text-2xl text-amber-500 font-bold">Dashboard</h1>
        <div className="w-full">
          <div className="flex justify-between text-2xl bg-gray-300 p-2 rounded-t">
            <h1>User Info</h1>
            <button
              onClick={handleLogout}
              className="text-base px-4 py-2 bg-amber-500 text-white font-bold rounded hover:rounded-2xl duration-300 ease-in-out cursor-pointer"
            >
              Logout
            </button>
          </div>
          <div>
            {user && (
              <div className="flex flex-col gap-4 my-0 bg-gray-200 p-2 rounded-b">
                <div className="flex gap-2">
                  <p>Username:</p>
                  <p>{user.user_Name}</p>
                </div>
                <div className="flex gap-2">
                  <p>Name:</p>
                  <p>
                    {user.first_Name} {user.last_Name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p>Email:</p>
                  <p>{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <p>Role:</p>
                  <p className="capitalize">{user.role}</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col flex-auto gap-2">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="newFirstName"
                        className="relative p-2 bg-white rounded"
                      >
                        <input
                          type="text"
                          value={newFirstName}
                          onChange={(e) => setNewFirstName(e.target.value)}
                          placeholder="New Firstname"
                          className="w-full outline-0"
                        />
                        {errorFirstName && (
                          <p className="text-xs text-red-500 absolute right-4 top-1/2 -translate-y-1/2">
                            {errorFirstName}
                          </p>
                        )}
                      </label>
                      <label
                        htmlFor="newLastName"
                        className="relative p-2 bg-white rounded"
                      >
                        <input
                          type="text"
                          value={newLastName}
                          onChange={(e) => setNewLastName(e.target.value)}
                          placeholder="New Lastname"
                          className="w-full outline-0"
                        />
                        {errorLastName && (
                          <p className="text-xs text-red-500 absolute right-4 top-1/2 -translate-y-1/2">
                            {errorLastName}
                          </p>
                        )}
                      </label>
                      <label
                        htmlFor="password"
                        className="relative p-2 bg-white rounded"
                      >
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full outline-0"
                        />
                        {errorPassworrd && (
                          <p className="absolute text-red-500 text-xs right-4 top-1/2 -translate-y-1/2">
                            {errorPassworrd}
                          </p>
                        )}
                      </label>
                    </div>
                    <button
                      onClick={handleChangeName}
                      className="text-lg font-bold w-full text-white px-2 py-2 bg-amber-500 hover:rounded-2xl duration-300 ease-in-out cursor-pointer"
                    >
                      Change name
                    </button>
                  </div>
                  <div className="flex flex-col flex-auto gap-2">
                    <label
                      htmlFor="new_password"
                      className="relative p-2 bg-white rounded"
                    >
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="w-full outline-0"
                      />
                      {errorNewPassWord && (
                        <p className="absolute text-red-500 text-xs right-4 top-1/2 -translate-y-1/2">
                          {errorNewPassWord}
                        </p>
                      )}
                    </label>
                    <label
                      htmlFor="old_password"
                      className="relative p-2 bg-white rounded"
                    >
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Old password"
                        className="w-full outline-0"
                      />
                      {errorOldPassword && (
                        <p className="text-red-500 text-xs absolute top-1/2 -translate-y-1/2 right-4">
                          {errorOldPassword}
                        </p>
                      )}
                    </label>
                    <label
                      htmlFor="old_password_confirm"
                      className="relative p-2 bg-white rounded"
                    >
                      <input
                        type="password"
                        value={confirmOldPassword}
                        onChange={(e) => setConfirmOldPassword(e.target.value)}
                        placeholder="Old password confirm"
                        className="w-full outline-0"
                      />
                      {errorOldPassword && (
                        <p className="text-red-500 text-xs absolute top-1/2 -translate-y-1/2 right-4">
                          {errorOldPassword}
                        </p>
                      )}
                    </label>
                    <button
                      onClick={handleChangePassword}
                      className="text-lg font-bold w-full text-white px-4 py-2 bg-amber-500 hover:rounded-2xl duration-300 ease-in-out cursor-pointer"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
