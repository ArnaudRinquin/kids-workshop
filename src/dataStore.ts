import initialData from "./data.json";
import { v4 as uuid } from "uuid";
import { Kid, Maybe, Progress, Workshop } from "./types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  kids: Kid[];
  workshops: Workshop[];
  progresses: Progress[];
  setKidPhotoUrl: (args: { kidId: string; photoUrl: Maybe<string> }) => void;
  setPresentedAt: (args: {
    kidId: string;
    workshopId: string;
    date?: number;
  }) => void;
  setValidatedAt: (args: {
    kidId: string;
    workshopId: string;
    date?: number;
  }) => void;
  setSuccess: (args: {
    kidId: string;
    workshopId: string;
    success: Progress["success"];
  }) => void;
  setCompletion: (args: {
    kidId: string;
    workshopId: string;
    completion: Progress["completion"];
  }) => void;
  reset: () => void;
};

const _d = initialData as State;

export const useStore = create(
  persist<State>(
    (set) => ({
      kids: _d.kids,
      workshops: _d.workshops,
      progresses: _d.progresses,
      reset: () => {
        set({
          kids: _d.kids,
          workshops: _d.workshops,
          progresses: _d.progresses,
        });
      },
      setKidPhotoUrl: ({ kidId, photoUrl }) => {
        set((state) => {
          const kids = state.kids;
          const kid = kids.find((kid) => kid.id === kidId);
          if (kid) {
            kid.photoUrl = photoUrl;
          } else {
            throw new Error(`Kid with id ${kidId} not found`);
          }
          return { ...state, kids };
        });
      },
      setPresentedAt: ({ kidId, workshopId, date = Date.now() }) => {
        set((state) => {
          const progresses = state.progresses;
          const progress = progresses.find(
            (progress) =>
              progress.kidId === kidId && progress.workshopId === workshopId
          );
          if (!progress) {
            progresses.push({
              id: uuid(),
              kidId,
              workshopId,
              presentedAt: date,
              validatedAt: null,
              completion: null,
              success: null,
            });
          } else {
            progress.presentedAt = date;
          }
          return { ...state, progresses };
        });
      },
      setValidatedAt: ({ kidId, workshopId, date = Date.now() }) => {
        set((state) => {
          const progresses = state.progresses;
          const progress = progresses.find(
            (progress) =>
              progress.kidId === kidId && progress.workshopId === workshopId
          );
          if (!progress) {
            progresses.push({
              id: uuid(),
              kidId,
              workshopId,
              presentedAt: date,
              validatedAt: date,
              completion: 1,
              success: "a",
            });
          } else {
            progress.presentedAt = progress.presentedAt ?? date;
            progress.validatedAt = date;
            progress.completion = 1;
            progress.success = "a";
          }
          return { ...state, progresses };
        });
      },
      setSuccess: ({ kidId, workshopId, success }) => {
        set((state) => {
          const progresses = state.progresses;
          const progress = progresses.find(
            (progress) =>
              progress.kidId === kidId && progress.workshopId === workshopId
          );
          if (!progress) {
            progresses.push({
              id: uuid(),
              kidId,
              workshopId,
              presentedAt: Date.now(),
              validatedAt: null,
              completion: null,
              success,
            });
          } else {
            progress.presentedAt = progress.presentedAt ?? Date.now();
            progress.success = success;
          }
          return { ...state, progresses };
        });
      },
      setCompletion: ({ kidId, workshopId, completion }) => {
        set((state) => {
          const progresses = state.progresses;
          const progress = progresses.find(
            (progress) =>
              progress.kidId === kidId && progress.workshopId === workshopId
          );
          if (!progress) {
            progresses.push({
              id: uuid(),
              kidId,
              workshopId,
              presentedAt: Date.now(),
              validatedAt: null,
              completion,
              success: null,
            });
          } else {
            progress.presentedAt = progress.presentedAt ?? Date.now();
            progress.completion = completion;
          }
          return { ...state, progresses };
        });
      },
    }),
    {
      name: "k&w",
    }
  )
);

export function useKids() {
  return useStore((state) => state.kids);
}

export function useWorkshops() {
  return useStore((state) => state.workshops);
}

export function useProgresses() {
  return useStore((state) => state.progresses);
}

export function useKid({ kidId }: { kidId: string }) {
  const kids = useKids();
  return kids.find((kid) => kid.id === kidId);
}

export function useWorkshop({ workshopId }: { workshopId: string }) {
  const workshops = useWorkshops();
  return workshops.find((workshop) => workshop.id === workshopId);
}

export function useProgressesForKid({ kidId }: { kidId: string }) {
  const progresses = useProgresses();
  return progresses.filter((progress) => progress.kidId === kidId);
}

export function useWorkshopsFromIds({
  workshopIds,
}: {
  workshopIds: string[];
}) {
  const workshops = useWorkshops();
  return workshops
    .filter((workshop) => workshopIds.includes(workshop.id))
    .sort(sortWorkshops);
}

export function useWorkshopsInProgressForKid({ kidId }: { kidId: string }) {
  const progresses = useProgressesForKid({ kidId });
  const workshopIds = progresses
    .filter((progress) => progress.presentedAt && !progress.validatedAt)
    .map(({ workshopId }) => workshopId);
  return useWorkshopsFromIds({ workshopIds });
}

export function useValidatedWorkshopsForKid({ kidId }: { kidId: string }) {
  const progresses = useProgressesForKid({ kidId });
  const workshopIds = progresses
    .filter((progress) => progress.validatedAt)
    .map(({ workshopId }) => workshopId);
  return useWorkshopsFromIds({ workshopIds });
}

export function useStartableWorkshopsForKid({ kidId }: { kidId: string }) {
  const workshopIdsToExclude = useProgressesForKid({ kidId })
    .filter((progress) => progress.presentedAt)
    .map(({ workshopId }) => workshopId);
  const workshops = useWorkshops();
  return workshops
    .filter((workshop) => !workshopIdsToExclude.includes(workshop.id))
    .sort(sortWorkshops);
}

export function useProgressForKidAndWorkshop({
  kidId,
  workshopId,
}: {
  kidId: string;
  workshopId: string;
}) {
  const progresses = useProgresses();
  return progresses.find(
    (progress) => progress.kidId === kidId && progress.workshopId === workshopId
  );
}

export function useSetKidPhotoUrl() {
  return useStore((state) => state.setKidPhotoUrl);
}

export function sortWorkshops(a: Workshop, b: Workshop) {
  return a.difficulty - b.difficulty;
}
