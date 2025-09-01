"use client";

import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  user_Name: string;
  first_Name: string;
  last_Name: string;
  email: string;
  role: string;
};

export default function AdminMenu() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/user", {
        headers: { authorization: token },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeUserRole = async (id: string, role: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(
        `/user/update/${id}/role`,
        {
          role: `${role}`,
        },
        {
          headers: { authorization: token },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="m-8">
      <div className="flex justify-between w-full bg-gray-300 rounded-t">
        <h1 className="text-2xl p-2">Admin Menu</h1>
        <button
          onClick={fetchUsers}
          className="bg-green-500 py-2 px-4 m-2 text-white font-bold cursor-pointer hover:rounded-2xl duration-300"
        >
          Reload
        </button>
      </div>
      <div className="bg-gray-200 px-2 py-4 max-h-[92vh] overflow-y-auto">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table className="table-fixed w-full text-center">
            <thead className="bg-amber-500">
              <tr className="">
                <th>ID</th>
                <th>Username</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-400">
                  <td className="p-4">{user._id}</td>
                  <td>{user.user_Name}</td>
                  <td>
                    {user.first_Name} {user.last_Name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="flex flex-col gap-1 p-1 justify-center items-center">
                    <label className="flex gap-2 text-sm justify-center items-center">
                      Select Role
                      <select
                        value={user.role}
                        onChange={(e) => {
                          setUsers((prev) =>
                            prev.map((u) =>
                              u._id === user._id
                                ? { ...u, role: e.target.value }
                                : u
                            )
                          );
                        }}
                        className="border rounded px-1"
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </label>
                    <button
                      onClick={() => changeUserRole(user._id, user.role)}
                      className="py-0.5 px-1 text-sm bg-amber-500 text-white font-bold hover:rounded-xl duration-300 cursor-pointer"
                    >
                      Change role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
