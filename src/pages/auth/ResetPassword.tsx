import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function ResetPassword() {
  return (
    <div className="container  mx-auto h-full flex flex-col justify-center max-w-md">
      <div className="">
        <div className="flex gap-1 mt-10 text-[#4B5563] pb-8 ">
          <Link to="/auth/login">
            <ArrowLeft />
          </Link>
          <p>Back to sign in</p>
        </div>
        <img src="/Check Circle.svg" alt="" />
        <h5 className="text-[#F97316] py-3 md:py-4">CHECK YOUR INBOX</h5>
        <div className="flex gap-5">
          <h1 className="text-4xl md:text-3xl lg:text-4xl">Code sent</h1>{" "}
          <img src="/Frame 40393.svg" alt="" />
        </div>
        <p className="text-sm pt-4 text-[#393E46]">
          We’ve sent an otp code to jimohzainabajoke2019@gmail.com. It
          may take a minute to arrive.{" "}
        </p>
      <div className="rounded-lg mt-4 bg-[#F4F0EC]">
        <p className="p-3 text-sm">Didn’t get the email? Check your spam folder or try another address.</p>
      </div>
        <button
          className="btn btn-neutral w-full lg:w-110 bg-[#F97316] text-white mt-8 border rounded-3xl"
          type="submit"
        >
          <div className="flex justify-center items-center">
            <div>
              {" "}
              <h1 className="text-xl">Back to sign in</h1>
            </div>
            <div>
              <img src="/stash_arrow-down-duotone.svg" alt="" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
