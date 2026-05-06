                                               "use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BecomeProviderButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleBecomeProvider = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/v1/auth/become-provider",
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to become provider"
        );
      }
       router.push("/provider/setup");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBecomeProvider}
      disabled={loading}
      className="px-4 py-2 rounded-xl bg-orange-500 text-white"
    >
      {loading
        ? "Processing..."
        : "Become Provider"}
    </button>
  );
}