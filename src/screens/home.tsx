import PageTitle from "@/components/PageTitle";
import "@/app.css";
import { ButtonLink } from "@/components/ButtonLink";

export default function Home() {
  return (
    <main className="container mx-auto">
      <PageTitle>Kids & Workshops</PageTitle>
      <div className="flex items-center justify-center gap-x-12">
        <ButtonLink to="/kids">Kids</ButtonLink>
        <ButtonLink to="/workshops">Workshops</ButtonLink>
      </div>
    </main>
  );
}
