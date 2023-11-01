import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { Link } from "react-router-dom";

export function Settings() {
  return (
    <PageContainer>
      <PageTitle backLink="/">Settings</PageTitle>
      <nav>
        <ul>
          <li>
            <Link to="/settings/cache">Cache manager</Link>
          </li>
        </ul>
      </nav>
    </PageContainer>
  );
}
