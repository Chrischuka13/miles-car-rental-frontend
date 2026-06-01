import DriverForm from "./DriverForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddDriverModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/4">
      <div className="flex min-h-full items-start justify-end p-4 md:items-center">
        <div className="w-full max-w-2xl rounded-3xl bg-white p-6">
          <div className="flex items-start justify-between border-b  py-6">
            <div>
              <h2 className="text-2xl font-bold"> Add Driver </h2>
              <p> Onboard a professional driver to your roster in three quick steps. </p>
            </div>
            <button onClick={onClose}> <img src="/Close.svg" alt="" /> </button>
          </div>
          <DriverForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
