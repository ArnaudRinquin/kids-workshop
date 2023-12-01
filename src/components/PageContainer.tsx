import { PWAHandler } from "@/pwa";
import classNames from "classnames";

export function PageContainer({
  children,
  header,
  className,
  containerRef,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      className="h-screen grid"
      style={{
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "1fr",
      }}
    >
      <PWAHandler />
      <main
        className="p-3 sm:p-6 overflow-hidden grid"
        style={{
          gridTemplateRows: "auto 1fr",
          gridTemplateColumns: "1fr",
        }}
      >
        <div className="">{header}</div>
        <div
          ref={containerRef}
          className={classNames("overflow-y-auto", className)}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
