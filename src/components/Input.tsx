import classNames from "classnames";
import { forwardRef } from "react";

type InputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "ref"
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props }: InputProps,
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={classNames("self-stretch rounded-md", className)}
    />
  );
});
