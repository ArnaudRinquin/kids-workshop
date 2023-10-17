interface Props {
  children: React.ReactNode;
}

export default function Card(props: Props) {
  return (
    <div className="relative flex flex-col rounded-xl bg-amber-50 bg-clip-border text-gray-700 shadow-md">
      {props.children}
    </div>
  );
}

export function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-4 mt-4 h-40 overflow-hidden rounded-xl bg-white bg-clip-content text-gray-700 shadow-lg">
      <img src={src} alt={alt} className="mx-auto w-full" />
    </div>
  );
}
