import {
  ZipWriter,
  ZipReader,
  BlobWriter,
  BlobReader,
  TextReader,
  TextWriter,
} from "@zip.js/zip.js";
import { useStore } from "./dataStore";
import { getCache } from "./cache";

export async function generateZipAndDownload() {
  const zipFileWriter = new BlobWriter("application/zip");
  const zipWriter = new ZipWriter(zipFileWriter);

  const state = useStore.getState();
  await zipWriter.add("state.json", new TextReader(JSON.stringify(state)));
  const cache = await getCache();
  if (cache) {
    for (const key of await cache.keys()) {
      const response = await cache.match(key);
      if (response) {
        const blob = await response.blob();
        const pathname = new URL(key.url).pathname;
        await zipWriter.add(pathname, new BlobReader(blob));
      }
    }
  }

  await zipWriter.close();

  const zipFileBlob = await zipFileWriter.getData();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(zipFileBlob);
  link.download = "test.zip";
  link.click();
  link.remove();
}

export async function readZip(zipFileBlob: Blob) {
  const zipFileReader = new BlobReader(zipFileBlob);
  const zipReader = new ZipReader(zipFileReader);
  const entries = await zipReader.getEntries();
  const stateEntry = entries.find((entry) => entry.filename === "state.json");

  if (stateEntry?.getData) {
    const stateRaw = await stateEntry.getData(new TextWriter());
    const state = JSON.parse(stateRaw);
    useStore.setState(state);
  }
  const cache = await getCache();
  if (cache) {
    for (const entry of entries) {
      if (entry.filename !== "state.json" && entry.getData) {
        const blob = await entry.getData(new BlobWriter());
        await cache.put(entry.filename, new Response(blob));
      }
    }
  }
}
