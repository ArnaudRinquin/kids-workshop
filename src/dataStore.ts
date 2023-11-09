import initialData from "./data.json";
import { v4 as uuid } from "uuid";
import { Category, Kid, Maybe, Progress, Workshop } from "./types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  kids: Kid[];
  workshops: Workshop[];
  progresses: Progress[];
  categories: Category[];
};

type Actions = {
  setKidPhotoUrl: (args: { kidId: string; photoUrl: Maybe<string> }) => void;
  setBookmarkedAt: (args: {
    kidId: string;
    workshopId: string;
    date?: number | null;
  }) => void;
  setPresentedAt: (args: {
    kidId: string;
    workshopId: string;
    date?: number | null;
  }) => void;
  setValidatedAt: (args: {
    kidId: string;
    workshopId: string;
    date?: number | null;
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
  persist(
    immer<State & Actions>((set) => ({
      kids: _d.kids,
      workshops: _d.workshops,
      progresses: _d.progresses,
      categories: _d.categories,
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
        });
      },
      setBookmarkedAt: ({ kidId, workshopId, date = Date.now() }) => {
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
              bookmarkedAt: date,
              presentedAt: null,
              validatedAt: null,
              completion: null,
              success: null,
            });
          } else {
            progress.bookmarkedAt = date;
          }
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
            if (date) {
              progress.bookmarkedAt = null;
            }
            progress.presentedAt = progress.presentedAt ?? date;
            progress.validatedAt = date;
            progress.completion = 1;
            progress.success = "a";
          }
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
        });
      },
    })),
    {
      name: "ms",
    }
  )
);

export function useKids() {
  return useStore((state) => state.kids);
}

export function useKidsAtLevel({ level }: { level: Kid["level"] }) {
  return useKids().filter((kid) => kid.level === level);
}

export function useWorkshops() {
  return useStore((state) => state.workshops);
}

export function useWorkshopsFromCategory({
  categoryId,
}: {
  categoryId: Category["id"];
}) {
  return useWorkshops().filter(
    (workshop) => workshop.categoryId === categoryId
  );
}

export function useCategories() {
  return useStore((state) => state.categories);
}

export function useCategory({ categoryId }: { categoryId: Category["id"] }) {
  const categories = useCategories();
  return categories.find((category) => category.id === categoryId);
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

export function useBookmarkedWorkshopsForKid({ kidId }: { kidId: string }) {
  const progresses = useProgressesForKid({ kidId });
  const workshopIds = progresses
    .filter((progress) => progress.bookmarkedAt)
    .map(({ workshopId }) => workshopId);
  return useWorkshopsFromIds({ workshopIds });
}

export function useWorkshopsInProgressForKid({ kidId }: { kidId: string }) {
  const progresses = useProgressesForKid({ kidId });
  const workshopIds = progresses
    .filter(
      (progress) =>
        progress.presentedAt && !progress.validatedAt && !progress.bookmarkedAt
    )
    .map(({ workshopId }) => workshopId);
  return useWorkshopsFromIds({ workshopIds });
}

export function useValidatedWorkshopsForKid({ kidId }: { kidId: string }) {
  const progresses = useProgressesForKid({ kidId });
  const workshopIds = progresses
    .filter((progress) => progress.validatedAt && !progress.bookmarkedAt)
    .map(({ workshopId }) => workshopId);
  return useWorkshopsFromIds({ workshopIds });
}

export function useStartableWorkshopsForKid({ kidId }: { kidId: string }) {
  const workshopIdsToExclude = useProgressesForKid({ kidId })
    .filter((progress) => progress.presentedAt || progress.bookmarkedAt)
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
