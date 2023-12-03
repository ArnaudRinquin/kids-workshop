import { saveToCache } from "@/cache";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { WorkshopForm } from "@/components/workshops/Form";
import { useWorkshop, useStore } from "@/dataStore";
import { useParams, useNavigate } from "react-router-dom";

export function WorkshopUpdate() {
  const navigate = useNavigate();
  const params = useParams<{ workshopId: string }>();
  if (!params.workshopId) {
    throw new Error("Missing workshopId");
  }
  const workshop = useWorkshop({ workshopId: params.workshopId });
  const { setWorkshopAttributes } = useStore();
  if (!workshop) {
    return (
      <PageContainer>
        <PageTitle backLink="/settings/workshops">Atelier perdu 🚨</PageTitle>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={
        <PageTitle backLink="/settings/workshops">{workshop.name}</PageTitle>
      }
    >
      <WorkshopForm
        workshop={workshop}
        onSubmit={async (data) => {
          let photoUrl = workshop.photoUrl;
          if (data.photoUrl?.length) {
            const file = data.photoUrl[0];
            photoUrl = await saveToCache({
              file,
            });
          }
          if (data.photoUrl === null) {
            photoUrl = null;
          }
          setWorkshopAttributes(workshop.id, { ...data, photoUrl });
          navigate("/settings/workshops");
        }}
      />
    </PageContainer>
  );
}
