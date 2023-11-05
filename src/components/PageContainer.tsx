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
      <div className="p-10 pb-0 container mx-auto  max-h-screen overflow-hidden flex flex-col">
        <div className="shrink-0 grow-0">{header}</div>
        <div
          className={classNames("shrink-1 grow-1 overflow-y-auto", className)}
        >
          {children}
        </div>
      </div>
    </>
  );
}
