import { saveToCache } from "@/cache";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { KidForm } from "@/components/kids/Form";
import { useStore } from "@/dataStore";
import { useNavigate } from "react-router-dom";

export function CreateKid() {
  const navigate = useNavigate();
  const { createKid } = useStore();

  return (
    <PageContainer
      header={
        <PageTitle backLink="/settings/kids">Ajouter un enfant</PageTitle>
      }
    >
      <KidForm
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
          createKid({ ...data, photoUrl });
          navigate("/settings/kids");
        }}
      />
    </PageContainer>
  );
}
