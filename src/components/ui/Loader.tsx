

export default function Loader() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center w-full min-h-screen  rounded-2xl">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      <p className="mt-4 text-orange-500 font-medium">
        Loading...
      </p>
    </div>
  );
}
