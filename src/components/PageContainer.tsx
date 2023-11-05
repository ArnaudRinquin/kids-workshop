import { PWAHandler } from "@/pwa";
import classNames from "classnames";

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <PWAHandler />
      <div className={classNames("container mx-auto p-10", className)}>
        {children}
      </div>
    </>
  );
}
