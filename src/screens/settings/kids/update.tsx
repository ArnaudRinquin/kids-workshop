import { v4 as uuid } from "uuid";
import { saveToCache } from "@/cache";
import { Button } from "@/components/Button";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { useKid, useStore } from "@/dataStore";
import { Kid, Maybe } from "@/types";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { CachedCardImage } from "@/components/Cache/Image";
import { CardImage } from "@/components/Card";
import placeholderSrc from "@/components/kids/default-kid.svg";

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
            const photoFile = data.photoUrl[0];
            const dataURL = URL.createObjectURL(photoFile);
            const url = `/kids/${uuid()}.png`;
            await saveToCache({
              dataURL,
              url,
            });
            photoUrl = url;
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

type KidInput = Pick<Kid, "name" | "level"> & {
  photoUrl: Maybe<FileList>;
};

type KidFormProps = { kid?: Kid; onSubmit: (data: KidInput) => void };
export function KidForm({ kid, onSubmit }: KidFormProps) {
  const { photoUrl, ...defaultValues } = kid ?? {};
  const { handleSubmit, register, setValue, watch } = useForm<KidInput>({
    defaultValues,
  });

  const photoUrlValue = watch("photoUrl");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label>
        <PendingPhoto pendingPhotoUrl={photoUrlValue} photoUrl={photoUrl} />
        <input
          id="photo"
          className="hidden"
          type="file"
          accept="image/*"
          capture="environment"
          {...register("photoUrl")}
        />
      </label>
      <Button
        onClick={(event) => {
          event.preventDefault();
          setValue("photoUrl", null);
        }}
      >
        Clear photo
      </Button>
      <label htmlFor="name">
        Nom
        <input id="name" {...register("name")} />
      </label>

      <label htmlFor="level">
        Niveau
        <select id="level" {...register("level")}>
          <option value="beginner">Petit</option>
          <option value="intermediate">Moyen</option>
          <option value="advanced">Grand</option>
        </select>
      </label>
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}

function PendingPhoto({
  pendingPhotoUrl,
  photoUrl,
}: {
  photoUrl: Maybe<string>;
  pendingPhotoUrl: Maybe<FileList>;
}) {
  if (pendingPhotoUrl === null) {
    return <CardImage src={placeholderSrc} />;
  }
  if (pendingPhotoUrl?.length) {
    return <CardImage src={URL.createObjectURL(pendingPhotoUrl[0])} />;
  }

  if (photoUrl) {
    return <CachedCardImage src={photoUrl} alt="" />;
  }

  return <CardImage src={placeholderSrc} />;
}
