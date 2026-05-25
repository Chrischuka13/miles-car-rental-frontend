import { verifyPayment } from "@/api/payment";
import { Button } from "@/components/ui/button";
import { errorHandler } from "@/lib/utils";
import { CheckCheckIcon, Loader, XCircleIcon } from "lucide-react";
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
      // ... inside your component
      <div className="min-h-[70vh] container mx-auto px-4 flex items-center justify-center">
        {isPending ? (
          // LOADER STATE
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 bg-orange-50 rounded-full animate-bounce">
              <Loader className="animate-spin w-8 h-8 text-DeepOrange" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-800">
                Verifying Payment
              </h3>
              <p className="text-sm text-zinc-500 animate-pulse mt-1">
                Please do not refresh or close this page...
              </p>
            </div>
          </div>
        ) : (
         
          <div className="w-full max-w-md mx-auto bg-white border border-zinc-100 rounded-2xl shadow-xl shadow-zinc-100/50 p-8 md:p-10 transition-all">
            {isSuccess ? (
            
              <div className="flex flex-col items-center text-center">
              
                <div className="relative mb-6">
                
                  <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-75"></div>

                 
                  <div className="relative w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center ring-8 ring-emerald-50/50">
                    <CheckCheckIcon className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                  Payment Confirmed!
                </h2>
                <p className="text-zinc-500 text-sm mt-2 mb-8 leading-relaxed max-w-xs">
                  Your payment has been successfully verified. Your booking is
                  now secured.
                </p>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-[0.98]"
                  onClick={() => navigate(`/booking/${slug}?step=3`)}
                >
                  Continue to Booking
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-rose-50/50">
                  <XCircleIcon className="w-8 h-8 text-rose-600" />
                </div>

                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                  Verification Failed
                </h2>
                <p className="text-zinc-500 text-sm mt-2 mb-8 leading-relaxed">
                  We couldn't automatically verify your payment. Don't worry, if
                  money left your account, our support team can manually confirm
                  it.
                </p>

                <div className="w-full flex flex-col gap-3">
                  <Link
                    to="/cars/carlisting"
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 rounded-xl transition-all text-center text-sm shadow-md shadow-zinc-900/10"
                  >
                    Explore Cars
                  </Link>
                  <button
                    onClick={() => window.location.reload()} // Optional quick-fix retry action
                    className="text-sm font-medium text-zinc-600 hover:text-zinc-900 py-2 transition-all"
                  >
                    Try Re-verifying
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
