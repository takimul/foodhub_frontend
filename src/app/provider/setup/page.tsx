"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProviderSetupPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    restaurant: "",
    description: "",
    address: "",
    phone: "",
    logoUrl: "",
  });

  const handleSubmit = async () => {
    try {
      if (
        !form.restaurant ||
        !form.description ||
        !form.address ||
        !form.phone
      ) {
        alert("All fields required");
        return;
      }

      setLoading(true);

      const res = await fetch(
        "/api/v1/providers",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed"
        );
      }

      router.push(
        "/provider/dashboard"
      );

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-10">

      <div className="max-w-2xl mx-auto space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Setup Provider Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your restaurant profile
          </p>
        </div>

        <div className="space-y-5">

          <input
            placeholder="Restaurant Name"
            value={form.restaurant}
            onChange={(e) =>
              setForm({
                ...form,
                restaurant:
                  e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent"
            rows={4}
          />

          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address:
                  e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent"
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone:
                  e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent"
          />

          <input
            placeholder="Logo URL"
            value={form.logoUrl}
            onChange={(e) =>
              setForm({
                ...form,
                logoUrl:
                  e.target.value,
              })
            }
            className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black"
          >
            {loading
              ? "Creating..."
              : "Complete Setup"}
          </button>

        </div>
      </div>
    </main>
  );
}