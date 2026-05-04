// // import React from 'react'
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  validateContactUsSchema,
  type ContactUsSchemaType,
} from "@/lib/schemaTypes";
import { useMutation } from "@tanstack/react-query";

export default function ContactUs() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContactUsSchemaType>({
    resolver: zodResolver(validateContactUsSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: ContactUsSchemaType) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json();
    },

    onSuccess: (data) => {
      console.log("Success:", data);
    },

    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const onSubmitForm: SubmitHandler<ContactUsSchemaType> = (data) => {
    mutation.mutate(data);
  };
  return (
    <div>
      <div
        style={{
          backgroundImage: "url('/car1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "80vh",
          overflow: "hidden",
        }}
        className="h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center text-center px-4"
      >
        <div>
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-semibold">
            Get in <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-white mt-4 text-sm md:text-base">
            We're here to help you every step of the way! Whether you have
            questions,
            <br className="hidden md:block" />
            feedback, or need support, our team is ready to assist you.
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 md:px-6 py-12 ">
        <div className="  w-11/12 container mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div>
              <p className="text-sm text-black flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                We're ready to help
              </p>
              <h1 className="text-2xl md:text-4xl font-semibold mt-2 text-black">
                Contact Us
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
              <div>
                <img src="/icon1.png" alt="" className="mb-2" />
                <h3 className="text-lg font-semibold text-black">
                  Email Support
                </h3>
                <p className="text-gray-400 text-sm">
                  Send us an email any time
                </p>
                <p className="text-orange-500 mt-2 font-medium text-sm">
                  support@milescarrental.com
                </p>
              </div>

              <div>
                <img src="/icon2.png" alt="" className="mb-2" />
                <h3 className="text-lg font-semibold text-black">
                  Phone Number
                </h3>
                <p className="text-gray-400 text-sm">Mon–Sat from 8am to 8pm</p>
                <p className="text-orange-500 mt-2 font-medium text-sm">
                  +234 812 3333 3333
                </p>
              </div>
            </div>

            <hr className="border-gray-300 md: block" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <img src="/icon3.png" alt="" className="mb-2" />
                <h3 className="text-lg font-semibold text-black">Live Chat</h3>
                <p className="text-gray-400 text-sm">
                  Chat with our agents now
                </p>
                <p className="text-orange-500 mt-2 font-medium text-sm">
                  Start chat
                </p>
              </div>

              <div>
                <img src="/icon4.png" alt="" className="mb-2" />
                <h3 className="text-lg font-semibold text-black">
                  Our Location
                </h3>
                <p className="text-gray-400 text-sm">
                  Come say hello at our office
                </p>
                <p className="text-orange-500 mt-2 font-medium text-sm">
                  Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-8 text-black shadow-sm">
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-1">
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  {...register("fullname")}
                  className="w-full p-3 md:p-4 rounded-xl bg-[#F4F0EC] outline-none text-sm"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    {...register("email")}
                    className="w-full p-3 md:p-4 rounded-xl bg-[#F4F0EC] outline-none text-sm"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Phone number"
                    {...register("phone")}
                    className="w-full p-3 md:p-4 rounded-xl bg-[#F4F0EC] outline-none text-sm "
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder=" Subject"
                  {...register("subject")}
                  className="w-full p-3 md:p-4 rounded-xl bg-[#F4F0EC] outline-none text-sm mt-2"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors?.subject.message}
                  </p>
                )}
              </div>
              <div>
                <textarea
                  rows={5}
                  placeholder="Message (Tell us how we can help)"
                  {...register("message")}
                  className="w-full p-3 md:p-4 rounded-xl bg-[#F4F0EC] outline-none text-sm mt-2"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs">
                    {errors?.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="mt-4 w-full bg-orange-500 text-white py-1 rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-600 transition disabled:opacity-50"
              >
                {mutation.isPending ? "Sending..." : "Send message"}
                <img src="/arroww.png" alt="" />
              </button>

              <p className="text-sm text-gray-500">
                By submitting, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-orange-500  w-11/12 container mx-auto mb-10 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center p-6 md:p-8 rounded-2xl">
        <div className="flex gap-4 items-start md:items-center">
          <div className="bg-white p-3 md:p-4 rounded-2xl">
            <img src="/Question Circle.svg" alt="" />
          </div>
          <div>
            <h2 className="text-white text-xl md:text-3xl">Have Questions?</h2>
            <p className="text-white mt-2 md:mt-3 text-sm md:text-base">
              Check our FAQs — most answers are just a click away.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-[#111827] px-4 py-2 flex items-center justify-center rounded-2xl mt-4 md:mt-0">
            <p className="text-white text-sm md:text-base">View FAQ</p>
            <img src="/arrow.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
