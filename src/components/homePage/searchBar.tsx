import { useState } from "react";


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
    <section className="">
      <div className="w-full bg-white rounded-2xl">
        
        <div className="relative">
          <img src="/search.svg" alt="" className="px-4 absolute top-2"/>
              <input
                type="email"
                placeholder="Search for cars, trucks..."
                className="p-4 bg-[#ffffff0c] rounded-[8px] w-full border-none px-20"
              />

              <button className="flex items-center justify-center px-6 bg-DeepOrange rounded-full p-2 cursor-pointer text-white absolute top-2 right-2 mb-4 hover:bg-[#FF4F39] hover:cursor-pointer font-semibold">Find a car<img src="/arroww.png" alt="" className="w-6"/></button>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;