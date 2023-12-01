import classnames from "classnames";

export const buttonClassName =
  "flex justify-center rounded-md bg-gradient-to-r from-indigo-400 to-blue-500 px-5 py-5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

export function Button({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button className={classnames(buttonClassName, className)} {...props} />
  );
}
