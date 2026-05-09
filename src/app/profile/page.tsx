"use client";

import { User } from "@/src/types/user";
import { useEffect, useState } from "react";



export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    image: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/v1/auth/me", {
        credentials: "include"
      });

      const data = await res.json();

      setUser(data.data);

      setFormData({
        name: data.data.name || "",
        phone: data.data.phone || "",
        image: data.data.image || ""
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await fetch("/api/v1/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={
                formData.image ||
                "https://ui-avatars.com/api/?name=" +
                  formData.name
              }
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-orange-100"
            />

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.name}
              </h1>

              <p className="text-gray-500 mt-1">
                {user?.email}
              </p>

              <div className="mt-4 inline-flex px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                {user?.role}
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter name"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter phone number"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-100 text-gray-500"
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Profile Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Paste image URL"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-8 h-12 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}