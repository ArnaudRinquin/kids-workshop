import { saveToCache } from "@/cache";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { KidForm } from "@/components/kids/Form";
import { useKid, useStore } from "@/dataStore";
import { useParams, useNavigate } from "react-router-dom";

export function KidUpdate() {
  const navigate = useNavigate();
  const params = useParams<{ kidId: string }>();
  if (!params.kidId) {
    throw new Error("Missing kidId");
  }
  const kid = useKid({ kidId: params.kidId });
  const { setKidAttributes } = useStore();
  if (!kid) {
    return (
      <PageContainer>
        <PageTitle backLink="/settings/kids">Enfant perdu 🚨</PageTitle>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={<PageTitle backLink="/settings/kids">{kid.name}</PageTitle>}
    >
      <KidForm
        kid={kid}
        onSubmit={async (data) => {
          let photoUrl = kid.photoUrl;
          if (data.photoUrl?.length) {
            const file = data.photoUrl[0];
            photoUrl = await saveToCache({
              file,
            });
          }
          if (data.photoUrl === null) {
            photoUrl = null;
          }
          setKidAttributes(kid.id, { ...data, photoUrl });
          navigate("/settings/kids");
        }}
      />
    </PageContainer>
  );
}
