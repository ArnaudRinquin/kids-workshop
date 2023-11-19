import { generateZipAndDownload, readZip } from "@/backup";
import { clearCache } from "@/cache";
import { Button } from "@/components/Button";
import { ButtonLabel } from "@/components/Button/Label";
import { ButtonLink } from "@/components/Button/Link";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { useStore } from "@/dataStore";

export function Settings() {
  const { reset } = useStore();
  const confirmAndReset = () => {
    if (confirm("Are you sure you want to reset the data?")) {
      reset();
      clearCache();
    }
  };
  return (
    <PageContainer header={<PageTitle backLink="/">Paramètres</PageTitle>}>
      <div className="flex flex-col gap-y-5">
        <SectionTitle>Rapports 📊</SectionTitle>
        <ButtonLink to="/settings/table">Vue tableau</ButtonLink>

        <SectionTitle>Sauvegarde 🛟</SectionTitle>
        <Button onClick={generateZipAndDownload}>
          Exporter une sauvegarde ⬇️
        </Button>

        <ButtonLabel>
          Importer une sauvegarde ⬆️
          <input
            className="hidden"
            type="file"
            accept=".zip"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (file) {
                readZip(file);
              }
            }}
          />
        </ButtonLabel>
        <SectionTitle>Nettoyage 🧹</SectionTitle>
        <Button onClick={confirmAndReset}>Reset</Button>
        <ButtonLink to="/settings/cache">Cache inspector 🔎</ButtonLink>
      </div>
    </PageContainer>
  );
}
