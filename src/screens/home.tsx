import PageTitle from "@/components/PageTitle";
import "@/app.css";
import { ButtonLink } from "@/components/ButtonLink";
import { PageContainer } from "@/components/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <PageTitle>Élèves & Ateliers</PageTitle>
      <div className="flex items-center justify-center gap-x-12">
        <ButtonLink to="/kids">Élèves</ButtonLink>
        <ButtonLink to="/workshops">Ateliers</ButtonLink>
      </div>
    </PageContainer>
  );
}
