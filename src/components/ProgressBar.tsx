import { Maybe } from "@/types";
import classnames from "classnames";
import React from "react";
type Props = {
  currentStep: Maybe<number>;
  steps: {
    key: string;
    children: React.ReactNode;
    onClick: () => void;
  }[];
};

export function ProgressBar(props: Props) {
  return (
    <div className="flex items-center">
      {props.steps.map((step, index) => {
        const passed = props.currentStep != null && index <= props.currentStep;
        return (
          <React.Fragment key={step.key}>
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
              onClick={step.onClick}
            >
              {step.children}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
