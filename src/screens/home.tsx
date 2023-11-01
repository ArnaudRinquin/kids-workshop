import PageTitle from "@/components/PageTitle";
import "@/app.css";
import { ButtonLink } from "@/components/ButtonLink";
import { PageContainer } from "@/components/PageContainer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <PageContainer>
      <PageTitle>
        Élèves & Ateliers<Link to="/settings">⚙️</Link>
      </PageTitle>
      <div className="flex items-center justify-center gap-x-12">
        <ButtonLink className="grow" to="/kids">
          Élèves
        </ButtonLink>
        <ButtonLink className="grow" to="/workshops">
          Ateliers
        </ButtonLink>
      </div>
    </PageContainer>
  );
}
