import React from "react";

type StepperProps = {
  currentStep: number;
};

const steps = [
  { id: 1, label: "Dates" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Confirm" },
];

export default function Stepper({ currentStep }: StepperProps) {
  const isCompleted = (step: number) => currentStep > step;
  const isCurrent = (step: number) => currentStep === step;

  return (
    <ul className="flex items-center justify-between    md:ml-30 lg:ml-60 mb-10">
      {steps.map((step, index) => (
        <li key={step.id} className="flex items-center  flex-1    ">
          {/* Step */}
          <div className="flex items-center gap-2">
            <div
              className={`w-6  h-6 rounded-full flex items-center justify-center text-sm  border
                ${
                  isCompleted(step.id)
                    ? "bg-orange-500 text-white border-orange-500"
                    : isCurrent(step.id)
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300"
                }`}
            >
              {isCompleted(step.id) ? "✓" : step.id}
            </div>

            <span
              className={`text-xs md:text-sm ${
                isCurrent(step.id) || isCompleted(step.id)
                  ? "text-black font-bold"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-[1px] mx-2 flex-1  ${
                currentStep > step.id ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          )}
        </li>
      ))}
    </ul>
  );
}