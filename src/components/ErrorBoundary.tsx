import { useMemo } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";


interface AxiosErrorLike {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function ErrorBoundary() {
  const error = useRouteError();
  if (import.meta.env.DEV) {
    console.error(error);
  }
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    // Cast to access custom response properties safely in TS
    const apiError = error as Error & AxiosErrorLike;
    details = apiError?.response?.data?.message || error.message;
    stack = error.stack;
    console.log(stack);
  }
  const msgs = useMemo(() => ["jwt expired", "jwt malformed"], []);

  const redirect = () => {
    if (msgs.includes(details)) {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };


  const errorStatus = isRouteErrorResponse(error) ? error.status : null;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen gap-2">
      {errorStatus === 404 ? (
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230802153215/Error-404.png" alt="404" className="w-full h-full" />
      ) : (
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230802153215/Error-404.png" alt="Error" className="w-full h-full" />
      )}
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-red-600 font-bold text-xl">{message}</p>
      <p className="text-[#F97316] font-semibold">
        {msgs.includes(details) ? "Session expired" : details}
      </p>
      <button
        onClick={redirect}
        type="button"
        className="my-4 p-3 rounded-full btn bg-[#F97316] font-semibold hover:bg-gray-400 text-white"
      >
        {msgs.includes(details) ? "Refresh" : "Go back"}
      </button>
    </div>
  );
}