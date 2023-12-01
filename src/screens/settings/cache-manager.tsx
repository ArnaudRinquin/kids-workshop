import {
  deleteCachedRequest,
  saveToCache,
  useCachedRequests,
  useFromCache,
} from "@/cache";
import { Button } from "@/components/Button";
import { CardImage } from "@/components/Card";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
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
            const url = await saveToCache({
              file,
            });
            setKey(url);
          }
        }}
      />

      <h2>Images from cache</h2>

      <ul>
        {cachedURLs.map((request) => (
          <Item
            request={request}
            onDelete={() => {
              deleteCachedRequest(request.url);
              setKey(uuid());
            }}
          />
        ))}
      </ul>
    </PageContainer>
  );
}

function Item({
  request,
  onDelete,
}: {
  request: Request;
  onDelete: () => void;
}) {
  const src = useFromCache(request.url);
  return (
    <li key={request.url} className="flex items-center">
      <CardImage src={src} />
      {request.url}
      <Button onClick={onDelete}>Delete</Button>
    </li>
  );
}
