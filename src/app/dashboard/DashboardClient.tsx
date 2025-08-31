"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { User } from "@/types/user";
import UserinfoClient from "./components/Userinfo";
import CreateCircuitMenu from "./components/CreateCircuitMenu";
import AdminMenu from "./components/AdminMenu";
import UpdateCircuit from "./components/UpdateCircuit";

export default function DashboardClient() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axiosInstance.get("/user/me", {
        headers: { authorization: `${token}` },
      });
      setUser(res.data);
      console.log("Role: ", res.data.role);
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
  }, []);

  if (!isLoggedIn || !user) return null;

  return (
    <div>
      <UserinfoClient user={user} onUserChange={setUser} />
      {(user.role === "manager" || user.role === "admin") && (
        <div>
          <CreateCircuitMenu role={user.role} />
          <UpdateCircuit />
        </div>
      )}

      {user.role === "admin" && (
        <div>
          <AdminMenu />
        </div>
      )}
    </div>
  );
}
