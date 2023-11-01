import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from "./components/Button";

export function PWAHandler() {
  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onOfflineReady() {
      console.log("App is offline ready");
    },
  });

  if (needRefresh[0]) {
    return (
      <div className="bg-amber-400 text-indigo-600 p-4 flex gap-2 flex-col">
        Une mise à jour est disponible.
        <Button onClick={() => updateServiceWorker()}>Rafraichir</Button>
      </div>
    );
  }
}
