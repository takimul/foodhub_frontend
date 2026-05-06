"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "/api/v1/admin/users",
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      setUsers(data.data || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await fetch(
        `/api/v1/admin/users/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      fetchUsers();

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Users
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all platform users
        </p>
      </div>

      <div className="overflow-x-auto border rounded-3xl dark:border-zinc-800">

        <table className="w-full">

          <thead className="border-b dark:border-zinc-800">

            <tr className="text-left">

              <th className="p-5">
                User
              </th>

              <th className="p-5">
                Role
              </th>

              <th className="p-5">
                Status
              </th>

              <th className="p-5">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b dark:border-zinc-800"
              >
                <td className="p-5">
                  <div>
                    <h3 className="font-medium">
                      {user.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </td>

                <td className="p-5">
                  {user.role}
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status ===
                      "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-5">

                  <select
                    value={user.status}
                    onChange={(e) =>
                      updateStatus(
                        user.id,
                        e.target.value
                      )
                    }
                    className="border rounded-xl px-3 py-2 bg-transparent"
                  >
                    <option value="ACTIVE">
                      ACTIVE
                    </option>

                    <option value="SUSPENDED">
                      SUSPENDED
                    </option>

                  </select>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}