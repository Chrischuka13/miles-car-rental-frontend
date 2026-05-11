import React from 'react'

export default function Success() {
  return (
   <div className="md:col-span-12 p-4 text-center">
                  <img
                    src="/success.svg"
                    alt="success"
                    className=" mx-auto mb-4 "
                  />
                  <h1 className="text-[14px] text-[#F97316] ">
                    BOOKING CONFIRMED
                  </h1>
                  <p className="text-[#111827] lg:text-[32px] text-bold  ">
                    You’re all set, Lawal
                  </p>
                  <p className=" text-center  w-[79%] lg:w-[33%] mx-auto text-[14px] text-[#4B5563] ">
                    We’ve sent a confirmation to{" "}
                    <span className="font-bold">brighto360@gmail.com</span>.
                    Show this reference at pickup.
                  </p>
                </div>
  )
}
