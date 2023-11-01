import {
  deleteCachedRequest,
  saveToCache,
  useCachedRequests,
  useFromCache,
} from "@/cache";
import { Button } from "@/components/Button";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import React from "react";
import { v4 as uuid } from "uuid";

export function CacheManager() {
  const [key, setKey] = React.useState<string>("");
  const cachedURLs = useCachedRequests(key);
  return (
    <PageContainer>
      <PageTitle backLink="/settings">Cache Manager</PageTitle>

      <h2>Save image</h2>

      <input
        id="photo"
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
            setKey(url);
          }
        }}
      />

      <h2>Images from cache</h2>

      <ul>
        {cachedURLs.map((request) => (
          <li key={request.url} className="flex items-center">
            <ImageFromCache src={request.url} />
            <Button
              onClick={() => {
                deleteCachedRequest(request.url);
                setKey(uuid());
              }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}

type ImageFromCacheProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

function ImageFromCache({ src, ...props }: ImageFromCacheProps) {
  const dataURL = useFromCache(src);
  return <img {...props} src={dataURL} />;
}
