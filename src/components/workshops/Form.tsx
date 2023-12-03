import { useForm } from "react-hook-form";
import type { Workshop, Maybe } from "@/types";
import { Button } from "@/components/Button";
import placeholderSrc from "@/components/workshops/placeholder.png";
import { Card, CardImage } from "@/components/Card";
import { useFromCache } from "@/cache";
import { Input } from "@/components/Input";

type WorkshopInput = Pick<Workshop, "name" | "difficulty" | "categoryId"> & {
  photoUrl: Maybe<FileList>;
};

type WorkshopFormProps = {
  workshop?: Workshop;
  onSubmit: (data: WorkshopInput) => void;
};
export function WorkshopForm({ workshop, onSubmit }: WorkshopFormProps) {
  const { photoUrl, ...defaultValues } = workshop ?? {};
  const { handleSubmit, register, setValue, watch } = useForm<WorkshopInput>({
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
          <Input id="name" placeholder="Nom" {...register("name")} />

          <Input
            id="name"
            placeholder="Difficulté"
            type="number"
            {...register("difficulty")}
          />

          <label htmlFor="level" className="flex justify-between items-center">
            Categorie
            <select
              id="level"
              {...register("categoryId")}
              className="rounded-md"
            >
              <option value="1">Vie pratique</option>
              <option value="2">Vie sensorielle</option>
              <option value="3">Langage</option>
              <option value="4">Mathématiques</option>
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
