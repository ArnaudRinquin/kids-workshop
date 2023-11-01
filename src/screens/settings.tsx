import { saveToCache, useFromCache } from "@/cache";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import React from "react";
import { v4 as uuid } from "uuid";

type ImageFromCacheProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

function ImageFromCache({ src, ...props }: ImageFromCacheProps) {
  const dataUri = useFromCache(src);
  return <img {...props} src={dataUri} />;
}

export function Settings() {
  const [src, setSrc] = React.useState<string>("");

  return (
    <PageContainer>
      <PageTitle backLink="/">Settings</PageTitle>
      <input
        id="photo"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (file) {
            const dataUri = URL.createObjectURL(file);
            const targetUrl = `/${uuid()}.png`;
            await saveToCache({
              dataUri,
              targetUrl,
            });
            setSrc(targetUrl);
          }
        }}
      />
      {src && <ImageFromCache key={src} src={src} />}
    </PageContainer>
  );
}
