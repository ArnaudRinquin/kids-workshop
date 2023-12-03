import { Maybe } from "@/types";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import React from "react";

type Option = {
  id: string;
  label: React.ReactNode;
  description: React.ReactNode;
};

type RadioProps<OptionType extends Option> = {
  options: OptionType[];
  selected: Maybe<OptionType["id"]>;
  onChange: (id: Maybe<OptionType["id"]>) => void;
};

export function Radio<OptionType extends Option>(
  props: RadioProps<OptionType>
) {
  return (
    <RadioGroup value={props.selected} onChange={props.onChange}>
      <div className="space-y-2">
        {props.options.map((option) => (
          <RadioGroup.Option
            key={option.id}
            value={option.id}
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                  : ""
              }
                  ${checked ? "bg-sky-900/75 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
            }
          >
            {({ checked }) => (
              <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium mb-1 ${
                          checked ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {option.label}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={`inline ${
                          checked ? "text-sky-100" : "text-gray-500"
                        }`}
                      >
                        <span>{option.description}</span>
                      </RadioGroup.Description>
                    </div>
                  </div>
                  {checked && (
                    <div className="shrink-0 text-white">
                      <CheckIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
