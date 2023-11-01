import { v4 as uuid } from "uuid";
import { saveToCache } from "@/cache";

export function CachedImageInput({
  onChange,
  children = "Take a picture",
  className,
}: {
  onChange: (url: string) => void;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <label className={className} htmlFor="photo">
        {children}
      </label>
      <input
        id="photo"
        className="hidden"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (file) {
            const dataURL = URL.createObjectURL(file);
            const url = `/${uuid()}.png`;
            await saveToCache({
              dataURL,
              url,
            });
            onChange(url);
          }
        }}
      />
    </>
  );
}
