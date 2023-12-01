import { saveToCache, useFromCache } from "@/cache";
import { Button } from "@/components/Button";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { useKid, useStore } from "@/dataStore";
import { Kid, Maybe } from "@/types";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import placeholderSrc from "@/components/kids/default-kid.svg";
import { CardImage } from "@/components/Card";

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

type KidInput = Pick<Kid, "name" | "level"> & {
  photoUrl: Maybe<FileList>;
};

type KidFormProps = { kid?: Kid; onSubmit: (data: KidInput) => void };
export function KidForm({ kid, onSubmit }: KidFormProps) {
  const { photoUrl, ...defaultValues } = kid ?? {};
  const { handleSubmit, register, setValue, watch } = useForm<KidInput>({
    defaultValues,
  });

  const pendingPhotoUrl = watch("photoUrl");
  const pendingSrc =
    pendingPhotoUrl === null
      ? placeholderSrc
      : pendingPhotoUrl && pendingPhotoUrl.length
      ? URL.createObjectURL(pendingPhotoUrl[0])
      : undefined;
  const existingSrc = useFromCache(photoUrl) ?? placeholderSrc;
  const src = pendingSrc ?? existingSrc;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label>
        <CardImage src={src} />
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
