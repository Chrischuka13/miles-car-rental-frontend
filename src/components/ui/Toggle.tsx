
type ToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};


const Toggle = ({checked, onChange}: ToggleProps) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          checked ? "bg-DeepOrange" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>


    </div>
  );
}

export default Toggle