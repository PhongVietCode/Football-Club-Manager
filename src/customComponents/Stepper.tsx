import { Progress } from "@/components/ui/progress";
import { FaCheck } from "react-icons/fa6";
type StepperProps = {
  steps: number;
  activeStep: number;
};
export const Stepper = (props: StepperProps) => {
  const { steps, activeStep } = props;
  return (
    <div className="w-[500px] max-sm:w-[300px] flex flex-row justify-between">
      {Array.from(Array(steps)).map((_item, index) => (
        <div
          className={`flex flex-row items-center  ${
            index < steps - 1 && "flex-1"
          }`}
          key={index}
        >
          <span
            key={index}
            className={`px-4 py-2 rounded-full cursor-pointer ${
              activeStep > index ? "bg-vRedBold" : "bg-vGrayLight"
            }  ${activeStep == index && "bg-vRedLight"}`}
          >
            {activeStep > index ? (
              <FaCheck size={16} className="my-1" color="white" />
            ) : (
              <span
                className={`font-montserrat font-bold ${
                  activeStep == index ? "text-white" : "text-black"
                }`}
              >
                {index}
              </span>
            )}
          </span>
          {index < steps - 1 && (
            <Progress
              value={activeStep > index ? 100 : 0}
              className="h-[2px] w-full"
            />
          )}
        </div>
      ))}
    </div>
  );
};
