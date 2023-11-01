import React from "react";
import { Maybe } from "./types";

const CACHE_KEY = "k&w";

async function getCache() {
  return await caches.open(CACHE_KEY);
}

export async function saveToCache({
  dataUri,
  targetUrl,
}: {
  dataUri: string;
  targetUrl: string;
}) {
  const response = await fetch(dataUri);
  const cache = await getCache();
  return cache.put(targetUrl, response);
}

export async function getFromCache(targetUrl: string) {
  const cache = await getCache();
  const match = await cache.match(targetUrl);
  if (!match) return null;
  const response = await match.blob();
  const dataUri = URL.createObjectURL(response);
  return dataUri;
}

export function useFromCache(url: Maybe<string>) {
  const [dataUri, setDataUri] = React.useState<string>();
  React.useEffect(() => {
    const fetchData = async () => {
      if (url) {
        const fromCache = await getFromCache(url);
        if (fromCache) {
          setDataUri(fromCache);
          return;
        }
      }
    };
    fetchData();
  }, [url]);
  return dataUri;
}
