import PageTitle from "@/components/PageTitle";
import "@/app.css";
import { PageContainer } from "@/components/PageContainer";
import { Link } from "react-router-dom";
import { CardGrid } from "@/components/CardGrid";
import Card, { CardImage } from "@/components/Card";
import workshopPlaceholderSrc from "@/components/workshops/placeholder.png";
import kidPlaceholderSrc from "@/components/kids/placeholder.png";

export default function Home() {
  return (
    <PageContainer header={<PageTitle>MonteSuivi</PageTitle>}>
      <CardGrid>
        <Link to="/kids">
          <Card>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Élèves
              </h4>
              <CardImage
                src={kidPlaceholderSrc}
                alt="illustration-des-eleves"
              />
            </div>
          </Card>
        </Link>

        <Link to="/workshops">
          <Card>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Ateliers
              </h4>
              <CardImage
                src={workshopPlaceholderSrc}
                alt="illustration-des-ateliers"
              />
            </div>
          </Card>
        </Link>

        <Link to="/settings">
          <Card>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Gestion
              </h4>
              <Card className="flex items-center justify-center m-2 h-40 from-stone-100 to-stone-200">
                <div className="text-6xl">⚙️</div>
              </Card>
            </div>
          </Card>
        </Link>
      </CardGrid>
    </PageContainer>
  );
}
