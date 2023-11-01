import { Button } from "@/components/Button";
import { ButtonLink } from "@/components/ButtonLink";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { useStore } from "@/dataStore";
import { Link } from "react-router-dom";

export function Settings() {
  const { reset } = useStore();
  return (
    <PageContainer>
      <PageTitle backLink="/">Settings</PageTitle>
      <nav>
        <ul className="flex flex-col gap-4">
          <li>
            <Button
              onClick={() => {
                reset();
              }}
            >
              Reset data
            </Button>
          </li>
          <li>
            <ButtonLink to="/settings/cache">Cache manager</ButtonLink>
          </li>
        </ul>
      </nav>
    </PageContainer>
  );
}
