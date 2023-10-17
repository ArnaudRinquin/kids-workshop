import classnames from "classnames";
type Props = {
  currentStep: number;
  steps: {
    key: string;
    children: React.ReactNode;
    onClick: () => void;
  }[];
};

export function Progress(props: Props) {
  return (
    <div className="flex items-center">
      {props.steps.map((step, index) => {
        const passed = index <= props.currentStep;
        return (
          <>
            {index !== 0 && (
              <hr
                className={classnames("grow h-0.5 border-2", {
                  "border-blue-500": passed,
                  "border-gray-500": !passed,
                })}
              />
            )}
            <button
              className={classnames(
                "w-10 h-10 flex items-center justify-center rounded-full grow-0 text-white",
                {
                  "bg-blue-500": passed,
                  "bg-gray-500": !passed,
                }
              )}
              key={step.key}
              onClick={step.onClick}
            >
              {step.children}
            </button>
          </>
        );
      })}
    </div>
  );
}
