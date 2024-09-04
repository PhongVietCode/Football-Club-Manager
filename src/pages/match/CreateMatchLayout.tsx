import { Stepper } from "@/customComponents";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
type ContextType = {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  user: MemberResponse;
};
export const CreateMatchLayout = () => {
  const steps = 3;
  const user = useSelector((state: RootState) => state.user);
  const url = useLocation();
  const paths = url.pathname.split("/");
  const currentStep = paths[paths.length - 1].split("-")[1];

  const [activeStep, setActiveStep] = useState(parseInt(currentStep) - 1);
  const handleNextStep = () => {
    if (activeStep < steps - 1) {
      setActiveStep((cur) => cur + 1);
    }
  };
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep((cur) => cur - 1);
    }
  };
  return (
    <div className="flex-1 flex flex-col py-16 px-16">
      <div className="self-center z-10">
        <Stepper steps={3} activeStep={activeStep} />
      </div>
      <Outlet
        context={{ handleNextStep, handlePrevStep, user } satisfies ContextType}
      />
    </div>
  );
};
export function useCreateMatchContext() {
  return useOutletContext<ContextType>();
}
