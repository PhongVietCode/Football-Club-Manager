import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingSpin = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin">
        <AiOutlineLoading3Quarters size={24} />
      </div>
    </div>
  );
};
