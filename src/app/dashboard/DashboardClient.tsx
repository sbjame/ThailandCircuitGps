"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { User } from "@/types/user";

export default function DashboardClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/user/me", {
        headers: {
          authorization: `${token}`,
        },
      });
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUser();
    } else {
      setIsLoggedIn(false);
      router.push("/login");
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isLoggedIn) return null;
  return (
    <div className="w-screen h-screen flex flex-col items-center py-12 px-8 gap-4">
      <h1 className="text-2xl text-amber-500 font-bold">Dashboard</h1>
      <div className="w-full">
        <div className="flex justify-between text-2xl bg-gray-300 p-2 rounded-t">
          <h1>User Info</h1>
          <button className="text-base px-4 py-2 bg-amber-500 text-white font-bold rounded hover:rounded-2xl duration-300 ease-in-out cursor-pointer">
            Logout
          </button>
        </div>
        <div>
          {user && (
            <div className="flex flex-col gap-4 my-0 bg-gray-200 p-2 rounded-b">
              <div className="flex gap-2">
                <p>username:</p>
                <p>{user.user_Name}</p>
              </div>
              <div className="flex gap-2">
                <p>email:</p>
                <p>{user.email}</p>
              </div>
              <div className="flex gap-2">
                <p>name:</p>
                <p>
                  {user.first_Name} {user.last_Name}
                </p>
              </div>
              <div className="flex gap-2">

              <button className="text-lg font-bold w-full text-white px-2 py-2 bg-amber-500 hover:rounded-2xl duration-300 ease-in-out cursor-pointer">
                Change name
              </button>
              <button className="text-lg font-bold w-full text-white px-4 py-2 bg-amber-500 hover:rounded-2xl duration-300 ease-in-out cursor-pointer">
                Change Password
              </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//todo changename, change password, logout button and admin,manager dashboard
