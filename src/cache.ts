import React from "react";
import { Maybe } from "./types";

const CACHE_KEY = "k&w";

async function getCache() {
  return await caches.open(CACHE_KEY);
}

export async function saveToCache({
  dataURL,
  url,
}: {
  dataURL: string;
  url: string;
}) {
  const response = await fetch(dataURL);
  const cache = await getCache();
  return cache.put(url, response);
}

export async function getFromCache(url: string) {
  const cache = await getCache();
  const match = await cache.match(url);
  if (!match) return null;
  const response = await match.blob();
  const dataURL = URL.createObjectURL(response);
  return dataURL;
}

export async function listCachedRequests() {
  return getCache().then((cache) => cache.keys());
}

export async function deleteCachedRequest(url: string) {
  return getCache().then((cache) => cache.delete(url));
}

export function useFromCache(url: Maybe<string>) {
  const [dataURL, setdataURL] = React.useState<string>();
  React.useEffect(() => {
    const fetchData = async () => {
      if (url) {
        const fromCache = await getFromCache(url);
        if (fromCache) {
          setdataURL(fromCache);
          return;
        }
      }
    };
    fetchData();
  }, [url]);
  return dataURL;
}

export function useCachedRequests(refreshKey: string) {
  const [cacheList, setCacheList] = React.useState<readonly Request[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const cachedRequests = await listCachedRequests();
      setCacheList(cachedRequests);
    };
    fetchData();
  }, [refreshKey]);
  return cacheList;
}
