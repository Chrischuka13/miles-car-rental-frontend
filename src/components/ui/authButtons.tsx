type LoadingButtonProps = {
  loading: boolean;
  loadingText: string;
  text: string;
};

const LoadingButton = ({
  loading,
  loadingText,
  text,
}: LoadingButtonProps) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full p-2 bg-orange rounded-[24px] text-white text-xl cursor-pointer bg-DeepOrange mt-4">
        <div className="flex justify-center items-center gap-3">
            <div>
                {loading && (
                <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />

                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}</div>

            <div className="flex justify-center items-center">
                {loading ? loadingText : text}
                <img src="/arroww.png" alt="" className=""/>
            </div>
        </div>
    </button>
  );
};

export default LoadingButton