import DriverForm from "./DriverForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddDriverModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
      <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl p-4 flex flex-col justify-between">
        <div className="w-full max-w-2xl rounded-3xl bg-white p-3">
          <div className="flex justify-between mb-1">
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
