import classNames from "classnames";
import React from "react";

type CardGridProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  minItemWidth?: number;
};

export function CardGrid({
  className,
  style,
  children,
  minItemWidth = 280,
  ...props
}: CardGridProps) {
  return (
    <div
      className={classNames(
        "grid items-top justify-center gap-12 py-1",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
