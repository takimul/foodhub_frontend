"use client";

import { useEffect, useState } from "react";

export default function ProviderProfilePage() {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [provider, setProvider] =
    useState<any>(null);

  const [formData, setFormData] =
    useState({
      restaurant: "",
      description: "",
      address: "",
      phone: "",
      logoUrl: "",
    });

  // LOAD PROFILE
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "/api/v1/providers/me",
          {
            credentials: "include",
          }
        );

        const data =
          await res.json();

        if (data.data) {
          setProvider(data.data);

          setFormData({
            restaurant:
              data.data
                .restaurant ||
              "",

            description:
              data.data
                .description ||
              "",

            address:
              data.data
                .address ||
              "",

            phone:
              data.data
                .phone || "",

            logoUrl:
              data.data
                .logoUrl ||
              "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  // SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      const endpoint =
        provider
          ? "/api/v1/providers"
          : "/api/v1/providers";

      const method = provider
        ? "PATCH"
        : "POST";

      const res = await fetch(
        endpoint,
        {
          method,

          credentials:
            "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Something went wrong"
        );

        return;
      }

      alert(
        provider
          ? "Profile updated"
          : "Provider profile created"
      );

      setProvider(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 md:p-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          {/* LOGO */}
          <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white/20 bg-white/10 flex-shrink-0">
            {formData.logoUrl ? (
              <img
                src={
                  formData.logoUrl
                }
                alt="logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl">
                🍽️
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-4xl font-bold">
              {formData.restaurant ||
                "Restaurant Name"}
            </h1>

            <p className="mt-2 text-orange-100 max-w-2xl">
              {formData.description ||
                "Add your restaurant description"}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-orange-100">
              <span>
                📍{" "}
                {formData.address ||
                  "Restaurant Address"}
              </span>

              <span>
                📞{" "}
                {formData.phone ||
                  "Phone Number"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 md:p-8 space-y-8"
      >
        <div>
          <h2 className="text-2xl font-bold">
            Provider Profile
          </h2>

          <p className="text-gray-500 mt-1">
            Manage your restaurant
            information
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* RESTAURANT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Restaurant Name
            </label>

            <input
              type="text"
              name="restaurant"
              value={
                formData.restaurant
              }
              onChange={
                handleChange
              }
              placeholder="Enter restaurant name"
              className="w-full h-14 rounded-2xl border dark:border-zinc-700 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* PHONE */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              placeholder="Enter phone number"
              className="w-full h-14 rounded-2xl border dark:border-zinc-700 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* ADDRESS */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              placeholder="Restaurant address"
              className="w-full h-14 rounded-2xl border dark:border-zinc-700 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* LOGO */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium">
              Logo URL
            </label>

            <input
              type="text"
              name="logoUrl"
              value={
                formData.logoUrl
              }
              onChange={
                handleChange
              }
              placeholder="Paste logo image URL"
              className="w-full h-14 rounded-2xl border dark:border-zinc-700 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              placeholder="Write about your restaurant..."
              className="w-full h-40 rounded-2xl border dark:border-zinc-700 bg-transparent p-4 outline-none resize-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="h-14 px-8 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : provider
              ? "Update Profile"
              : "Create Profile"}
          </button>
        </div>
      </form>
    </main>
  );
}