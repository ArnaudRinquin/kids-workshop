import { PWAHandler } from "@/pwa";
import classNames from "classnames";

export function PageContainer({
  children,
  header,
  className,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <PWAHandler />
      <div className="py-3 md:py-6 xl:py-10 max-h-screen overflow-hidden flex flex-col items-center">
        <div className="px-3 md:px-6 xl:px-10 container shrink-0 grow-0">
          {header}
        </div>
        <div
          className={classNames(
            "px-3 md:px-6 xl:px-10 container shrink-1 grow-1 overflow-y-auto",
            className
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
