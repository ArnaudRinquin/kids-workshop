import { useForm } from "react-hook-form";
import type { Kid, Maybe } from "@/types";
import { Button } from "@/components/Button";
import placeholderSrc from "@/components/kids/placeholder.png";
import { Card, CardImage } from "@/components/Card";
import { useFromCache } from "@/cache";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4 max-w-xl">
        <div className="flex flex-col gap-4">
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
          {((photoUrl && pendingPhotoUrl != null) ||
            (pendingPhotoUrl && pendingPhotoUrl[0])) && (
            <Button
              className="from-red-400 to-pink-500 w-full"
              onClick={(event) => {
                event.preventDefault();
                setValue("photoUrl", null);
              }}
            >
              Retirer la photo
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <input
            id="name"
            className="self-stretch rounded-md"
            placeholder="Nom"
            {...register("name")}
          />

          <label htmlFor="level" className="flex justify-between items-center">
            Niveau
            <select id="level" {...register("level")} className="rounded-md">
              <option value="beginner">Petit</option>
              <option value="intermediate">Moyen</option>
              <option value="advanced">Grand</option>
            </select>
          </label>

          <div className="flex-grow" />

          <Button type="submit" className="justify-self-end">
            Enregistrer
          </Button>
        </div>
      </Card>
    </form>
  );
}
