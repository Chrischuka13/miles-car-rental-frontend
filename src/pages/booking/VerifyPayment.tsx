import { verifyPayment } from "@/api/payment";
import { Button } from "@/components/ui/button";
import { errorHandler } from "@/lib/utils";
import { CheckCheckIcon, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export default function VerifyPayment() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const slug = searchParams.get("slug");
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (reference) {
      const verifyRef = async () => {
        setIsPending(true);
        try {
          const response = await verifyPayment(reference);
          if (response.status === 200) {
            setIsSuccess(true);
            toast.success(response.data.message);
          } else {
            setIsSuccess(false);
            toast.error(response.data.message || "Payment verification failed");
          }
        } catch (error) {
          errorHandler(error);
        } finally {
          setIsPending(false);
        }
      };
      verifyRef();
    }
  }, [reference]);

  return (
    <>
      <div
        className="mt-40 container mx-auto p-6 flex h-full
    items-center justify-center"
      >
        {isPending ? (
          <div className="mt-30 flex flex-col items-center gap-4">
            <Loader className="animate-spin w-4 h-4 text-DeepOrange" />
            <p className="text-md animate-pulse font-medium">
              Verifying payment...
            </p>
          </div>
        ) : (
          <div className="w-full max-w-lg  mx-auto">
            {isSuccess ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <CheckCheckIcon className="w-10 h-10 text-DeepOrange" />
                <p className="text-gray-500 text-sm leading-relaxed">You have successfully verified your payment</p>
                <Button className={" bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-xl transition-all"} onClick={() => navigate(`/booking/${slug}?step=3`)}>
                  Click to continue
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <p>
                  We couldn't verify your payment. <br />
                  Please try again or contact support
                </p>
                <Link
                  to="cars/carlisting"
                  className="text-center mt-4 text-DeepOrange"
                >
                  Explore cars
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
