import classNames from "classnames";

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function Card(props: CardProps) {
  return (
    <div
      {...props}
      className={classNames(
        "relative flex flex-col rounded-xl bg-amber-50 bg-clip-border text-gray-700 shadow-md",
        props.className
      )}
    />
  );
}

type CardImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
export function CardImage({ className, ...props }: CardImageProps) {
  return (
    <div className="relative mx-4 mt-4 h-40 overflow-hidden rounded-xl bg-white bg-clip-content text-gray-700 shadow-lg flex items-center">
      <img
        className={classNames("mx-auto", className)}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        {...props}
      />
    </div>
  );
}
