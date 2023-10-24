import initialData from "./data.json";
import { v4 as uuid } from "uuid";
import { Kid, Progress, Workshop } from "./types";
import { create } from "zustand";

type State = {
  kids: Kid[];
  workshops: Workshop[];
  progresses: Progress[];
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
};

const _d = initialData as State;

export const useStore = create<State>((set) => ({
  kids: _d.kids,
  workshops: _d.workshops,
  progresses: _d.progresses,
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
}));

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

export function useAvailableWorkshopsForKid({ kidId }: { kidId: string }) {
  const workshops = useWorkshops();
  const kidProgresses = useSuccessfullProgressesForKid({ kidId });
  const kidWorkshopIds = kidProgresses.map((progress) => progress.workshopId);
  return workshops
    .filter((workshop) => !kidWorkshopIds.includes(workshop.id))
    .sort((a, b) => a.difficulty - b.difficulty);
}

export function useProgressesForKid({ kidId }: { kidId: string }) {
  const progresses = useProgresses();
  return progresses.filter((progress) => progress.kidId === kidId);
}

export function useSuccessfullProgressesForKid({ kidId }: { kidId: string }) {
  const progresses = useProgressesForKid({ kidId });
  return progresses.filter((progress) => progress.validatedAt);
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
