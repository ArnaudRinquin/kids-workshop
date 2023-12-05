import { saveToCache } from "@/cache";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { WorkshopForm } from "@/components/workshops/Form";
import { useStore } from "@/dataStore";
import { useNavigate } from "react-router-dom";

export function CreateWorkshop() {
  const navigate = useNavigate();
  const { createWorkshop } = useStore();

  return (
    <PageContainer
      header={
        <PageTitle backLink="/settings/workshops">Ajouter un enfant</PageTitle>
      }
    >
      <WorkshopForm
        onSubmit={async (data) => {
          let photoUrl = null;
          if (data.photoUrl?.length) {
            const file = data.photoUrl[0];
            photoUrl = await saveToCache({
              file,
            });
          }
          if (data.photoUrl === null) {
            photoUrl = null;
          }
          createWorkshop({ ...data, photoUrl });
          navigate("/settings/workshop");
        }}
      />
    </PageContainer>
  );
}
