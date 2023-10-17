import { CardGrid } from "@/components/CardGrid";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { Progress } from "@/components/Progress";
import { KidLevelChip } from "@/components/kids/LevelChip";
import { WorkshopCard } from "@/components/workshops/Card";
import {
  useAvailableWorkshopsForKid,
  useKid,
  // useMarkSessionAsSuccessfull,
  useSessionForKidAndWorkshop,
  // useStartSession,
  useSuccessfullSessionsForKid,
  useWorkshop,
} from "@/dataStore";
import { Kid, Session, Workshop } from "@/types";
import { Link, useParams } from "react-router-dom";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold my-2 text-gray-900">{children}</h2>
  );
}

export default function KidPage() {
  const params = useParams<{ kidId: string }>();
  if (!params.kidId) {
    throw new Error("Missing kidId");
  }
  const kid = useKid({ kidId: params.kidId });
  const availableWorkshops = useAvailableWorkshopsForKid({
    kidId: params.kidId,
  });
  const successfullSessions = useSuccessfullSessionsForKid({
    kidId: params.kidId,
  });

  if (!kid) {
    return <main>Kid not found 🚨</main>;
  }

  return (
    <PageContainer>
      <PageTitle backLink="/kids">
        <>
          {kid.name}
          <KidLevelChip level={kid.level} />
        </>
      </PageTitle>

      <SectionTitle>Available workshops</SectionTitle>
      <CardGrid>
        {availableWorkshops.map((workshop) => (
          <AvailableWorkshop key={workshop.id} workshop={workshop} kid={kid} />
        ))}
      </CardGrid>

      <SectionTitle>Successfull sessions</SectionTitle>
      <CardGrid>
        {successfullSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </CardGrid>
    </PageContainer>
  );
}

function SessionCard({ session }: { session: Session }) {
  const workshop = useWorkshop({ workshopId: session.workshopId });
  const kid = useKid({ kidId: session.kidId });
  if (!workshop) {
    return <div>Workshop not found 🚨</div>;
  }
  if (!kid) {
    return <div>Workshop not found 🚨</div>;
  }
  return <AvailableWorkshop key={workshop.id} workshop={workshop} kid={kid} />;
}

function AvailableWorkshop({
  kid,
  workshop,
}: {
  kid: Kid;
  workshop: Workshop;
}) {
  const existingSession = useSessionForKidAndWorkshop({
    kidId: kid.id,
    workshopId: workshop.id,
  });

  const steps = [
    {
      children: "✨",
      onClick: () => {
        console.log("reset");
      },
      key: "1",
    },
    {
      children: "⏳",
      onClick: () => {
        console.log("start");
      },
      key: "2",
    },
    {
      children: <span className="text-green-300 text-xl">✓</span>,
      onClick: () => {
        console.log("finish");
      },
      key: "3",
    },
  ];

  return (
    <Link key={workshop.id} to={`/workshops/${workshop.id}`}>
      <WorkshopCard {...workshop}>
        <Progress
          steps={steps}
          currentStep={
            existingSession?.triedAt ? (existingSession.succededAt ? 2 : 1) : 0
          }
        />
      </WorkshopCard>
    </Link>
  );
}
