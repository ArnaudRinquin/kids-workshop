import PageTitle from "@/components/PageTitle";
import "@/app.css";
import { ButtonLink } from "@/components/ButtonLink";
import { PageContainer } from "@/components/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <PageTitle>Kids & Workshops</PageTitle>
      <div className="flex items-center justify-center gap-x-12">
        <ButtonLink to="/kids">Kids</ButtonLink>
        <ButtonLink to="/workshops">Workshops</ButtonLink>
      </div>
    </PageContainer>
  );
}
