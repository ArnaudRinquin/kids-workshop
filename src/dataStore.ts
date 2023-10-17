import initialData from "./data.json";
import { v4 as uuid } from "uuid";
import { Kid, Session, Workshop } from "./types";

type State = {
  kids: Kid[];
  workshops: Workshop[];
  sessions: Session[];
};

function useData(): State {
  if (typeof window === "undefined") {
    return initialData as State;
  }
  const rawData = localStorage.getItem("data");
  if (!rawData) {
    localStorage.setItem("data", JSON.stringify(initialData));
  }
  return (rawData ? (JSON.parse(rawData) as State) : initialData) as State;
}

function saveData(data: State) {
  localStorage.setItem("data", JSON.stringify(data));
}

export function useKids() {
  return useData().kids;
}

export function useWorkshops() {
  return useData().workshops;
}

export function useSessions() {
  return useData().sessions;
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
  const kidSessions = useSuccessfullSessionsForKid({ kidId });
  const kidWorkshopIds = kidSessions.map((session) => session.workshopId);
  return workshops
    .filter((workshop) => !kidWorkshopIds.includes(workshop.id))
    .sort((a, b) => a.difficulty - b.difficulty);
}

export function useSessionsForKid({ kidId }: { kidId: string }) {
  const sessions = useSessions();
  return sessions.filter((session) => session.kidId === kidId);
}

export function useSuccessfullSessionsForKid({ kidId }: { kidId: string }) {
  const sessions = useSessionsForKid({ kidId });
  return sessions.filter((session) => session.succededAt);
}

export function useStartSession({
  kidId,
  workshopId,
}: {
  kidId: string;
  workshopId: string;
}) {
  const sessions = useSessions();
  const data = useData();
  const session = useSessionForKidAndWorkshop({ kidId, workshopId });

  return () => {
    if (!session) {
      sessions.push({
        id: uuid(),
        kidId,
        workshopId,
        triedAt: Date.now(),
        succededAt: null,
      } as Session);
    } else {
      throw new Error("Session already started");
    }

    saveData({ ...data, sessions });
  };
}

export function useMarkSessionAsSuccessfull({
  kidId,
  workshopId,
}: {
  kidId: string;
  workshopId: string;
}) {
  const sessions = useSessions();
  const data = useData();
  const session = useSessionForKidAndWorkshop({ kidId, workshopId });

  return () => {
    if (session) {
      if (!session.triedAt) {
        session.triedAt = Date.now();
      }
      session.succededAt = Date.now();
      const newSessions = [
        ...sessions.filter((s) => s.id !== session.id),
        session,
      ];
      const newState = { ...data, sessions: newSessions };
      saveData(newState);
    } else {
      sessions.push({
        id: uuid(),
        kidId,
        workshopId,
        triedAt: Date.now(),
        succededAt: Date.now(),
      });
      saveData({ ...data, sessions });
    }
  };
}

export function useSessionForKidAndWorkshop({
  kidId,
  workshopId,
}: {
  kidId: string;
  workshopId: string;
}) {
  const sessions = useSessions();
  return sessions.find(
    (session) => session.kidId === kidId && session.workshopId === workshopId
  );
}
