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
  setWorkshopPhotoUrl: (args: {
    workshopId: string;
    photoUrl: Maybe<string>;
  }) => void;
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
      setWorkshopPhotoUrl: ({ workshopId, photoUrl }) => {
        set((state) => {
          const workshops = state.workshops;
          const workshop = workshops.find(
            (workshop) => workshop.id === workshopId
          );
          if (workshop) {
            workshop.photoUrl = photoUrl;
          } else {
            throw new Error(`Workshop with id ${workshopId} not found`);
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

export function useProgressesForWorkshop({
  workshopId,
}: {
  workshopId: string;
}) {
  const progresses = useProgresses();
  return progresses.filter((progress) => progress.workshopId === workshopId);
}

export function useKidsFromIds({
  kidIds,
  sort = sortKidsByDescLevel,
}: {
  kidIds: string[];
  sort?: (a: Kid, b: Kid) => number;
}) {
  const kids = useKids();
  return kids.filter((kid) => kidIds.includes(kid.id)).sort(sort);
}

export function useWorkshopsFromIds({
  workshopIds,
  sort = sortWorkshopsByAscDifficulty,
}: {
  workshopIds: string[];
  sort?: (a: Workshop, b: Workshop) => number;
}) {
  const workshops = useWorkshops();
  return workshops
    .filter((workshop) => workshopIds.includes(workshop.id))
    .sort(sort);
}

function filterBookmarked(progress: Progress) {
  return progress.bookmarkedAt;
}

export function useBookmarkedWorkshopsForKid({ kidId }: { kidId: string }) {
  const progresses = useProgressesForKid({ kidId });
  const workshopIds = progresses
    .filter(filterBookmarked)
    .map(({ workshopId }) => workshopId);
  return useWorkshopsFromIds({ workshopIds });
}

export function useBookmarkedKidsForWorkshop({
  workshopId,
}: {
  workshopId: string;
}) {
  const progresses = useProgressesForWorkshop({ workshopId });
  const kidIds = progresses.filter(filterBookmarked).map(({ kidId }) => kidId);
  return useKidsFromIds({ kidIds });
}

function filterInProgress(progress: Progress) {
  return (
    progress.presentedAt && !progress.validatedAt && !progress.bookmarkedAt
  );
}

export function useWorkshopsInProgressForKid({ kidId }: { kidId: string }) {
  const progresses = useProgressesForKid({ kidId });
  const workshopIds = progresses
    .filter(filterInProgress)
    .map(({ workshopId }) => workshopId);
  return useWorkshopsFromIds({ workshopIds });
}

export function useKidsInProgressForWorkshop({
  workshopId,
}: {
  workshopId: string;
}) {
  const progresses = useProgressesForWorkshop({ workshopId });
  const kidIds = progresses.filter(filterInProgress).map(({ kidId }) => kidId);
  return useKidsFromIds({ kidIds });
}

function filterValidated(progress: Progress) {
  return progress.validatedAt && !progress.bookmarkedAt;
}

export function useValidatedWorkshopsForKid({ kidId }: { kidId: string }) {
  const progresses = useProgressesForKid({ kidId });
  const workshopIds = progresses
    .filter(filterValidated)
    .map(({ workshopId }) => workshopId);
  return useWorkshopsFromIds({ workshopIds });
}

export function useKidsValidatedForWorkshop({
  workshopId,
}: {
  workshopId: string;
}) {
  const progresses = useProgressesForWorkshop({ workshopId });
  const kidIds = progresses.filter(filterValidated).map(({ kidId }) => kidId);
  return useKidsFromIds({ kidIds });
}

export function useStartableWorkshopsForKid({ kidId }: { kidId: string }) {
  const workshopIdsToExclude = useProgressesForKid({ kidId })
    .filter(function (progress) {
      return progress.presentedAt || progress.bookmarkedAt;
    })
    .map(({ workshopId }) => workshopId);
  const workshops = useWorkshops();
  return workshops
    .filter((workshop) => !workshopIdsToExclude.includes(workshop.id))
    .sort(sortWorkshopsByAscDifficulty);
}

export function useKidsStartableForWorkshop({
  workshopId,
}: {
  workshopId: string;
}) {
  const kidIdsToExclude = useProgressesForWorkshop({ workshopId })
    .filter(function (progress) {
      return progress.presentedAt || progress.bookmarkedAt;
    })
    .map(({ kidId }) => kidId);
  const kids = useKids();
  return kids
    .filter((kid) => !kidIdsToExclude.includes(kid.id))
    .sort(sortKidsByDescLevel);
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

export function useSetWorkshopPhotoUrl() {
  return useStore((state) => state.setWorkshopPhotoUrl);
}

export function sortWorkshopsByAscDifficulty(a: Workshop, b: Workshop) {
  return a.difficulty - b.difficulty;
}

const KidLevelToScore = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

export function sortKidsByDescLevel(a: Kid, b: Kid) {
  return KidLevelToScore[b.level] - KidLevelToScore[a.level];
}
