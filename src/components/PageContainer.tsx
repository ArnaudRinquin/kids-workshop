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
      <main
        className="p-3 md:p-6 xl:p-10 max-h-screen container overflow-hidden grid mx-auto"
        style={{
          gridTemplateRows: "auto 1fr",
          gridTemplateColumns: "1fr",
        }}
      >
        <div className="">{header}</div>
        <div className={classNames("overflow-y-auto", className)}>
          {children}
        </div>
      </main>
    </>
  );
}
