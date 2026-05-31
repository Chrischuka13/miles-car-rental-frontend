// import Toggle from "@/components/ui/Toggle";
// import { useState } from "react";
// // import { boolean } from "zod";

// type Step = 1 | 2 | 3;

// interface DriverFormData {
//   // Identity
//   fullName: string;
//   phone: string;
//   email: string;
//   baseCity: string;
//   yearsExperience: string;
//   languages: string[];

//   // License
//   licenseNumber: string;
//   expiryDate: string;
//   verified: boolean;

//   // Assignment
//   assignedVehicle: string;
//   shift: string;
// }

// const languageOptions = [
//   "English",
//   "Yoruba",
//   "Igbo",
//   "Hausa",
//   "French",
//   "Pidgin",
// ];

// export default function Drivers() {
//   const [open, setOpen] = useState(false);
//   return (
//     <main className="pt-24 overflow-x-auto">
//       <div className="w-11/12 container mx-auto">
//         <div className="md:flex justify-between items-center">
//           <div className="mb-3 md:mb-0">
//             <h3 className="text-3xl font-semibold">Drivers</h3>
//             <p>Your professional driver roster - assignments, ratings and document expiry.</p>
//           </div>
//           <div>
//             <button onClick={()=>setOpen(true)} className="p-2 px-6 text-white rounded-[25px] bg-DeepOrange">Add drivers</button>
//           </div>
//           <AddDriverModal open={open} onClose={() => setOpen(false)} />
//         </div>

//       </div>
//     </main>
//   )
// }

// function AddDriverModal({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   const [step, setStep] = useState<Step>(1);

//   const [formData, setFormData] = useState<DriverFormData>({
//     fullName: "",
//     phone: "",
//     email: "",
//     baseCity: "",
//     yearsExperience: "",
//     languages: ["English"],

//     licenseNumber: "",
//     expiryDate: "",
//     verified: false,

//     assignedVehicle: "",
//     shift: "",
//   });

//   if (!open) return null;

//   const nextStep = () => {
//     if (step < 3) {
//       setStep((prev) => (prev + 1) as Step);
//     }
//   };

//   const prevStep = () => {
//     if (step > 1) {
//       setStep((prev) => (prev - 1) as Step);
//     }
//   };

//   const updateField = (field: keyof DriverFormData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const toggleLanguage = (language: string) => {
//     setFormData((prev) => {
//       const exists = prev.languages.includes(language);

//       return {
//         ...prev,
//         languages: exists
//           ? prev.languages.filter((l) => l !== language)
//           : [...prev.languages, language],
//       };
//     });
//   };

//   const handleSubmit = () => {
//     console.log(formData);
//     onClose();
//   }

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40">
//       <div className="flex min-h-full items-start justify-end p-4 md:items-center">
//         <div className="my-8 max-w-xl rounded-3xl bg-white shadow-2xl">
//           {/* Header */}
//           <div className="flex items-start justify-between border-b px-8 py-6">
//             <div>
//               <h2 className="text-2xl font-semibold text-gray-900">
//                 Add a driver
//               </h2>
//               <p className="mt-1 text-sm text-gray-500">
//                 Onboard a professional driver in three quick steps.
//               </p>
//             </div>

//             <button
//               onClick={onClose}
//               className="text-2xl text-gray-400 hover:text-gray-600"
//             >
//               <img src="/Close.svg" alt="" />
//             </button>
//           </div>

//           {/* Steps */}
//           <div className="px-8 pt-6">
//             <div className="flex items-center justify-between">
//               <StepItem active={step === 1} completed={step > 1} label="Identity" step={1}/>
//               <Line />
//               <StepItem active={step === 2} completed={step > 2} label="License" step={2}/>
//               <Line />
//               <StepItem active={step === 3} completed={false} label="Assignment" step={3}/>
//             </div>
//           </div>

//           {/* Body */}
//           <div className="max-h-[70vh] overflow-y-auto px-8 py-8">
//             {step === 1 && (
//               <IdentityStep
//                 formData={formData}
//                 updateField={updateField}
//                 toggleLanguage={toggleLanguage}
//               />
//             )}

//             {step === 2 && (
//               <LicenseStep
//                 formData={formData}
//                 updateField={updateField}
//               />
//             )}

//             {step === 3 && (
//               <AssignmentStep
//                 formData={formData}
//                 updateField={updateField}
//               />
//             )}
//           </div>

//           {/* Footer */}
//           <div className="flex items-center justify-between border-t px-8 py-5">
//             <button
//               onClick={step === 1 ? onClose : prevStep}
//               className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
//             >
//               {step === 1 ? "Cancel" : "Back"}
//             </button>

//             {step < 3 ? (
//               <button
//                 onClick={nextStep}
//                 className="rounded-xl bg-orange-500 px-8 py-3 font-medium text-white hover:bg-orange-600"
//               >
//                 Continue
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 className="rounded-xl bg-orange-500 px-8 py-3 font-medium text-white hover:bg-orange-600"
//               >
//                 Save Driver
//               </button>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// function StepItem({
//   active,
//   completed,
//   label,
//   step,
// }: {
//   active: boolean;
//   completed: boolean;
//   label: string;
//   step: number;
// })
//  {
//   return (
//     <div className="flex items-center gap-3">
//       <div
//         className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold
//         ${
//           active
//             ? "bg-DeepOrange text-white" : completed
//             ? "bg-green-500 text-white" : "border border-gray-300 text-gray-500"
//         }`}
//       >
//         {completed ? "✓" : step}
//       </div>

//       <span
//         className={`text-sm font-medium ${
//           active ? "text-gray-900" : "text-gray-500"
//         }`}
//       >
//         {label}
//       </span>
//     </div>
//   );
// }

// function Line() {
//   return <div className="mx-4 h-px flex-1 bg-gray-200" />;
// }

// function IdentityStep({
//   formData,
//   updateField,
//   toggleLanguage,
// }: any) {
//   return (
//     <div className="space-y-6">
//       {/* Upload */}
//       <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-400">
//         <div className="flex flex-col items-center justify-center">
//           <img src="/user block.svg" alt="" className=""/>
//           <div className="flex gap-1 items-center justify-center">
//             <img src="/Gallery Add.svg" alt="" />
//              <p className="font-medium text-DeepOrange">Upload photo</p>
//           </div>

//         </div>
//       </div>

//       <div>
//         <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-500">
//           Personal Details
//         </h3>

//         <div className="grid grid-cols-2 gap-5">
//           <div className="col-span-2">
//             <Input
//               label="Full name"
//               value={formData.fullName}
//               onChange={(v) => updateField("fullName", v)}
//             />
//           </div>

//           <Input
//             label="Phone"
//             value={formData.phone}
//             onChange={(v) => updateField("phone", v)}
//           />

//           <Input
//             label="Email"
//             value={formData.email}
//             onChange={(v) => updateField("email", v)}
//           />

//           <Input
//             label="Base city"
//             value={formData.baseCity}
//             onChange={(v) => updateField("baseCity", v)}
//           />

//           <Input
//             label="Years of experience"
//             value={formData.yearsExperience}
//             onChange={(v) => updateField("yearsExperience", v)}
//           />
//         </div>
//       </div>

//       {/* Languages */}
//       <div>
//         <label className="mb-3 block text-sm font-medium text-gray-700">
//           Languages spoken
//         </label>

//         <div className="flex flex-wrap gap-3">
//           {languageOptions.map((lang) => {
//             const active = formData.languages.includes(lang);

//             return (
//               <button
//                 key={lang}
//                 type="button"
//                 onClick={() => toggleLanguage(lang)}
//                 className={`rounded-full border px-4 py-2 text-sm transition
//                 ${
//                   active
//                     ? "border-orange-500 bg-orange-50 text-orange-600"
//                     : "border-gray-300 text-gray-600 hover:border-gray-400"
//                 }`}
//               >
//                 {lang}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// function LicenseStep({ formData, updateField }: any) {
//   return (
//     <div className="space-y-6 ">
//       <h3 className="text-lg font-semibold text-neutral-400">
//         LICENSE VERIFICATION
//       </h3>

//       <div className="space-y-3">
//         <Input
//           label="FRSC license number"
//           placeholder="FRSC-LAG-000000"
//           value={formData.licenseNumber}
//           onChange={(v) => updateField("licenseNumber", v)}
//         />

//         <Input
//           label="Expiry Date"
//           type="date"
//           value={formData.expiryDate}
//           onChange={(v) => updateField("expiryDate", v)}
//         />
//       </div>

//       <div className="flex justify-between gap-2 p-2 border rounded-xl">
//         <div className="flex gap-2">
//           <img src="/humbleicons_verified.svg" alt="" className="w-5"/>
//           <div>
//             <h6 className="font-semibold">Background check verified</h6>
//             <p className="text-sm">Toggle on once compliance approves the driver.</p>
//           </div>
//         </div>

//         <Toggle
//           checked={formData.verified}
//           onChange={(v: boolean) => updateField("verified", v)}
//         />
//       </div>

//       <p className="p-2 border rounded-xl text-[#656565]">Upload license scan, LASDRI permit and a recent passport from the driver detail page after creation.</p>

//     </div>
//   );
// }

// function AssignmentStep({ formData, updateField }: any) {
//   return (
//     <div className="space-y-6">
//       <h3 className="text-lg font-semibold text-neutral-400">
//         INITIAL ASSIGNMENT
//       </h3>

//       <div className="space-y-3">
//         <div>
//           <label className="mb-2 block text-sm font-medium text-gray-700">
//             Starting status
//           </label>

//           <select
//             value={formData.shift}
//             onChange={(e) => updateField("shift", e.target.value)}
//             className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
//           >
//             <option value="Available">Available</option>
//             <option value="On trip">On trip</option>
//             <option value="Off duty">Off duty</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>

//         <Input
//           label="Internal notes"
//           value={formData.assignedVehicle}
//           placeholder="Strong on long-distance routes, prefers weekday shifts..."
//           onChange={(v) => updateField("assignedVehicle", v)}
//         />

//         {/* Add driver summary */}
//         <div className="bg-[#E9E9E9] p-4 rounded-2xl text-[#484848]" >
//           <h4>SUMMARY</h4>
//           <div className="space-y-2 mt-3">
//             <div className="flex justify-between">
//               <p>Name</p>
//               <p>{formData.fullName}</p>
//             </div>
//             <div className="flex justify-between">
//               <p>Phone</p>
//               <p>{formData.phone}</p>
//             </div>
//             <div className="flex justify-between">
//               <p>License</p>
//               <p>{formData.licenseNumber}</p>
//             </div>
//             <div className="flex justify-between">
//               <p>Language</p>
//               <p>{formData.languages}</p>
//             </div>
//             <div className="flex justify-between">
//               <p>Email</p>
//               <p>{formData.email}</p>
//             </div>
//             <div className="flex justify-between">
//               <p>Status</p>
//               <p>{formData.shift}</p>
//             </div>
//             <div className="flex justify-between">
//               <p>Verified</p>
//               <p>{formData.verified ? "Verified" : "Not verified"}</p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// function Input({
//   label,
//   value,
//   onChange,
//   type = "text",
//   placeholder = "",
// }: {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   type?: string;
//   placeholder?: string;
// },
// ) {

//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       <input
//         type={type}
//         value={value}
//         placeholder={placeholder}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
//       />
//     </div>
//   );
// }

import { useMemo, useState } from "react";
import DriverTable from "./DriverTable";
import DriverStats from "@/components/DriverStats";
import DriverSearch from "@/components/DriverSearch";
import DriverStatusTabs from "@/components/DriverStatusBar";
import { useDrivers } from "@/hooks/useDrivers";
import { getDriverStats } from "@/utils/driver.utils";
import AddDriverModal from "./AddDriverModal";
import Paginate from "@/components/Paginate";
import usePaginate from "@/hooks/usePaginate";

export default function DriversPage() {
  const [page, setPage] =
    useState(1);
  const [open, setOpen] = useState(false)

  const [search, setSearch] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("all");

  const {
    data,
    isLoading,
  } = useDrivers(page);

  const drivers =
    data?.body?.driver || [];

  const pagination = data?.data?.pagination;

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasMore || false,
    currentPage: pagination?.currentPage || 1,
  });


  const stats =
    getDriverStats(drivers);

  const filteredDrivers =
    useMemo(() => {
      let filtered = [...drivers];

      // FILTER BY TAB
      if (activeTab !== "all") {
        filtered = filtered.filter(
          (driver) =>
            driver.status ===
            activeTab
        );
      }

      // SEARCH
      if (search.trim()) {
        filtered = filtered.filter(
          (driver) =>
            driver.fullName
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            driver.licenseNumber
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
      }

      return filtered;
    }, [
      drivers,
      activeTab,
      search,
    ]);

    

  return (
    <main className="p-6 pt-24 overflow-x-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 sticky left-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Drivers
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Your professional driver roster - assignments, ratings and document expiry.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-DeepOrange text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition"
          onClick={() =>
            setOpen(true)
          }
        >
          + Add Driver
        </button>
      </div>

            {isLoading ? (
        <p>Loading...</p>
      ) : (
      <AddDriverModal
        open={open}
        onClose={() =>
          setOpen(false)
        }/>
      )}

      {/* STATS */}
      <DriverStats
        stats={stats}
      />

      {/* FILTERS */}
      <div className="flex items-center justify-between">
        <DriverStatusTabs
          activeTab={activeTab}
          setActiveTab={
            setActiveTab
          }
          stats={stats}
        />

        <DriverSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* TABLE */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DriverTable
          data={filteredDrivers}
        />
      )}

        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          hasMore={hasMore}
          handlePageChange={handlePageChange}
          totalItem={pagination?.total}
        />
    </main>
  );
}


      //   <button className="bg-DeepOrange p-3 px-5 text-white rounded-[25px]"
      //     onClick={() =>
      //       setOpen(true)
      //     }
      //   >
      //     + Add Driver
      //   </button>
      // </div>

      // {isLoading ? (
      //   <p>Loading...</p>
      // ) : (
      //   <DriverTable
      //     data={drivers}
      //   />
      // )}

      // <AddDriverModal
      //   open={open}
      //   onClose={() =>
      //     setOpen(false)
      //   }
      // />