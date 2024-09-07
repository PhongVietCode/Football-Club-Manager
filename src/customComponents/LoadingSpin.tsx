import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Lottie from "react-lottie";
import { LoadingFootball } from "@/assets/animation";
type LoadingSpinProps = {
  useIconAnimation?: boolean;
  title?: string;
  sourceAnimation?: any;
};
export const LoadingSpin = ({
  useIconAnimation = false,
  title = "",
  sourceAnimation,
}: LoadingSpinProps) => {
  return (
    <div>
      {useIconAnimation == true ? (
        <div>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: sourceAnimation || LoadingFootball,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={400}
            width={400}
          />
          <div className="text-center font-palanquin font-semibold text-xl">{title}</div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters size={24} />
          </div>
        </div>
      )}
    </div>
  );
};
