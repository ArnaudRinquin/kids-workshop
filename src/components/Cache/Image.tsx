import { useFromCache } from "@/cache";
import { CardImage } from "../Card";

type CachedImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function CachedImage({ src, ...props }: CachedImageProps) {
  const dataURL = useFromCache(src);
  return <img {...props} src={dataURL} />;
}

export function CachedCardImage({ src, ...props }: CachedImageProps) {
  const dataURL = useFromCache(src);
  return <CardImage src={dataURL} {...props} />;
}
