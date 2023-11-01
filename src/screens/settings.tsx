import { clearCache } from "@/cache";
import { Button } from "@/components/Button";
import { ButtonLink } from "@/components/ButtonLink";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
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
    <PageContainer>
      <PageTitle backLink="/">Settings</PageTitle>
      <div className="flex items-center justify-center gap-x-12">
        <Button onClick={confirmAndReset}>Reset data</Button>
        <ButtonLink to="/settings/cache">Cache manager</ButtonLink>
      </div>
    </PageContainer>
  );
}
