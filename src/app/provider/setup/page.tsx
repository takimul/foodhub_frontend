// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function ProviderSetupPage() {
//   const router = useRouter();

//   const [loading, setLoading] =
//     useState(false);

//   const [form, setForm] = useState({
//     restaurant: "",
//     description: "",
//     address: "",
//     phone: "",
//     logoUrl: "",
//   });

//   const handleSubmit = async () => {
//     try {
//       if (
//         !form.restaurant ||
//         !form.description ||
//         !form.address ||
//         !form.phone
//       ) {
//         alert("All fields required");
//         return;
//       }

//       setLoading(true);

//       const res = await fetch(
//         "/api/v1/providers",
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type":
//               "application/json",
//           },
//           body: JSON.stringify(form),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           data.message ||
//             "Failed"
//         );
//       }

//       router.push(
//         "/provider/dashboard"
//       );

//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-10">

//       <div className="max-w-2xl mx-auto space-y-8">

//         <div>
//           <h1 className="text-4xl font-bold">
//             Setup Provider Profile
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Complete your restaurant profile
//           </p>
//         </div>

//         <div className="space-y-5">

//           <input
//             placeholder="Restaurant Name"
//             value={form.restaurant}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 restaurant:
//                   e.target.value,
//               })
//             }
//             className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent"
//           />

//           <textarea
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 description:
//                   e.target.value,
//               })
//             }
//             className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent"
//             rows={4}
//           />

//           <input
//             placeholder="Address"
//             value={form.address}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 address:
//                   e.target.value,
//               })
//             }
//             className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent"
//           />

//           <input
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 phone:
//                   e.target.value,
//               })
//             }
//             className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent"
//           />

//           <input
//             placeholder="Logo URL"
//             value={form.logoUrl}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 logoUrl:
//                   e.target.value,
//               })
//             }
//             className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent"
//           />

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full py-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black"
//           >
//             {loading
//               ? "Creating..."
//               : "Complete Setup"}
//           </button>

//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProviderSetupPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      restaurant: "",
      description: "",
      address: "",
      phone: "",
      logoUrl: "",
    });

  const handleSubmit =
    async () => {
      try {
        if (
          !form.restaurant ||
          !form.description ||
          !form.address ||
          !form.phone
        ) {
          alert(
            "All fields required"
          );

          return;
        }

        setLoading(true);

        // STEP 1:
        // BECOME PROVIDER
        const roleRes =
          await fetch(
            "/api/v1/auth/become-provider",
            {
              method:
                "PATCH",

              credentials:
                "include",
            }
          );

        if (!roleRes.ok) {
          throw new Error(
            "Failed to become provider"
          );
        }

        // STEP 2:
        // CREATE PROVIDER PROFILE
        const res = await fetch(
          "/api/v1/providers",
          {
            method: "POST",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              form
            ),
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data.message ||
              "Failed"
          );
        }

        // REFRESH AUTH
        window.dispatchEvent(
          new Event(
            "auth-changed"
          )
        );

        router.push(
          "/provider/dashboard"
        );
      } catch (
        err: any
      ) {
        alert(
          err.message
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-black px-6 py-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="space-y-8"
        >
          {/* HEADER */}
          <div>
            <div className="inline-flex px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-sm font-medium">
              Provider Setup
            </div>

            <h1 className="text-5xl font-black tracking-tight mt-6 leading-tight text-black dark:text-white">
              Launch your
              restaurant on
              FoodHub
            </h1>

            <p className="text-gray-500 text-lg mt-6 leading-relaxed max-w-xl">
              Set up your
              restaurant profile
              and start selling
              meals to thousands
              of customers.
            </p>
          </div>

          {/* LIVE PREVIEW */}
          <div className="rounded-[32px] overflow-hidden border dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            {/* COVER */}
            <div className="h-52 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

              <div className="absolute bottom-6 left-6 flex items-center gap-4">
                {/* LOGO */}
                <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-white/20 bg-white/10">
                  {form.logoUrl ? (
                    <img
                      src={
                        form.logoUrl
                      }
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-white">
                      🍔
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="text-white">
                  <h2 className="text-2xl font-bold">
                    {form.restaurant ||
                      "Restaurant Name"}
                  </h2>

                  <p className="text-orange-100 text-sm mt-1">
                    {form.address ||
                      "Restaurant Address"}
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {form.description ||
                  "Your restaurant description preview will appear here."}
              </p>

              <div className="mt-5 flex items-center gap-3 flex-wrap">
                <div className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-sm">
                  📞{" "}
                  {form.phone ||
                    "Phone"}
                </div>

                <div className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-sm">
                  New Provider
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="rounded-[32px] border dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 md:p-10 shadow-sm"
        >
          <div className="space-y-8">
            {/* HEADER */}
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white">
                Restaurant Info
              </h2>

              <p className="text-gray-500 mt-2">
                Fill out your
                restaurant details
              </p>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {/* NAME */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Restaurant Name
                </label>

                <input
                  placeholder="Restaurant Name"
                  value={
                    form.restaurant
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      restaurant:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border dark:border-zinc-800 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description
                </label>

                <textarea
                  placeholder="Describe your restaurant..."
                  value={
                    form.description
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      description:
                        e.target
                          .value,
                    })
                  }
                  className="w-full p-4 rounded-2xl border dark:border-zinc-800 bg-transparent outline-none resize-none focus:ring-2 focus:ring-orange-500"
                  rows={5}
                />
              </div>

              {/* ADDRESS */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Address
                </label>

                <input
                  placeholder="Restaurant Address"
                  value={
                    form.address
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      address:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border dark:border-zinc-800 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Phone Number
                </label>

                <input
                  placeholder="Phone Number"
                  value={
                    form.phone
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      phone:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border dark:border-zinc-800 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* LOGO */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Logo URL
                </label>

                <input
                  placeholder="Paste logo URL"
                  value={
                    form.logoUrl
                  }
                  onChange={(
                    e
                  ) =>
                    setForm({
                      ...form,
                      logoUrl:
                        e.target
                          .value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border dark:border-zinc-800 bg-transparent px-4 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={
                  handleSubmit
                }
                disabled={
                  loading
                }
                className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition disabled:opacity-50 mt-3"
              >
                {loading
                  ? "Creating Provider..."
                  : "Complete Setup"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}