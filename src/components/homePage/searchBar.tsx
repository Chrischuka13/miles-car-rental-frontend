import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarTypes } from "@/api/cars";

type FormState = {
  location: string;
  pickupDate: string;
  returnDate: string;
  carType: string;
};

function SearchBar() {
  const [formData, setFormData] = useState<FormState>({
    location: "",
    pickupDate: "",
    returnDate: "",
    carType: "",
  });

  // Fetch car types
  const { data: carTypes, isLoading } = useQuery({
    queryKey: ["carTypes"],
    queryFn: fetchCarTypes,
  });

  const handleChange = (name: keyof FormState, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);

    // fetch("/api/search", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    // });
  };

  return (
   <div className="w-full mt-10">
  <div className="w-full rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl 
                  py-3  px-6  flex flex-col lg:flex-row md:items-center gap-5 md:gap-7 text-white
                  transition-all duration-300 hover:bg-white/15 hover:shadow-2xl ">

    
    <div className=" w-full md:w-55 font-semibold leading-snug mb-3 md:mb-0 text-center md:text-start">
      Need to Rent a <br className="hidden" />
      Luxury Car?
    </div>

  
    <div className="flex-1 w-full min-w-45">
      <label className="text-sm  flex items-center gap-2 text-white/80 ">
        Pickup Location
        <img src="/Vector (2).png" alt="location_icon" />
      </label>
      <input
        type="text"
        placeholder="Lekki, Lagos"
        value={formData.location}
        onChange={(e) => handleChange("location", e.target.value)}
        className="w-full rounded-xl bg-white/10 border border-white/20 
                   px-3 py-2 text-sm text-white placeholder-white/40
                   focus:outline-none focus:ring-2 focus:ring-orange-500
                   transition-all duration-200 hover:border-white/40 mt-2"
      />
    </div>


   <div className="flex-1 min-w-45 w-full">
      <label className="text-sm  flex items-center gap-2 text-white/80">
        Pickup Date
        <img src="/Union.png" alt="date_icon" />
      </label>
      <input
        type="date"
        value={formData.pickupDate}
        onChange={(e) => handleChange("pickupDate", e.target.value)}
        className="w-full rounded-xl bg-white/10 border border-white/20 
                   px-3 py-2 text-sm text-white
                   focus:outline-none focus:ring-2 focus:ring-orange-500
                   transition-all duration-200 hover:border-white/40 mt-2"
      />
    </div>

   
    <div className="flex-1 w-full min-w-45">
      <label className="text-sm  flex items-center gap-2 text-white/80">
        Return Date
        <img src="/Union (1).png" alt="date_icon" />
      </label>
      <input
        type="date"
        value={formData.returnDate}
        onChange={(e) => handleChange("returnDate", e.target.value)}
        className="w-full rounded-xl bg-white/10 border border-white/20 
                   px-3 py-2 text-sm text-white
                   focus:outline-none focus:ring-2 focus:ring-orange-500
                   transition-all duration-200 hover:border-white/40 mt-2"
      />
    </div>

    {/* Car Type */}
    <div className="flex-1 w-full min-w-45">
      <label className="text-sm  flex items-center gap-2 text-white/80">
        Car Type
        <img src="/Vector (3).png" alt="car_icon" />
      </label>
      <select
        value={formData.carType}
        onChange={(e) => handleChange("carType", e.target.value)}
        className="w-full rounded-xl bg-white/10 border border-white/20 
                   px-3 py-2 text-sm text-white
                   focus:outline-none focus:ring-2 focus:ring-orange-500
                   transition-all duration-200 hover:border-white/40 mt-2">
        
        <option value="">
          {isLoading ? "Loading..." : "Select Car Type"}
        </option>

        {carTypes?.map((type: any) => (
          <option key={type.id || type} value={type.name || type}>
            {type.name || type}
          </option>
        ))}
      </select>
    </div>

    
   <div className="w-full lg:w-auto mt-3 mb-2">
  <button
    onClick={handleSubmit}
    className="w-full lg:w-auto px-8 py-1 rounded-full bg-orange-500 
               hover:bg-orange-600 active:scale-95 whitespace-nowrap
               transition-all duration-200 text-white font-medium shadow-lg flex items-center justify-center gap-2">
    Find a car 
    <img src="/stash_arrow-down-duotone.png" className="w-8 h-8" alt="arrow" />
  </button>
</div>
  </div>
</div>
  );
}

export default SearchBar;