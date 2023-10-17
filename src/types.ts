type UUID = string;

export type Maybe<T> = T | null | undefined;

export type KidLevel = "beginner" | "intermediate" | "advanced";
export type Kid = {
  id: UUID;
  name: string;
  level: KidLevel;
  photoUrl: Maybe<string>;
};

export type Workshop = {
  id: UUID;
  name: string;
  difficulty: number;
  photoUrl: Maybe<string>;
};

export type Session = {
  id: UUID;
  kidId: UUID;
  workshopId: UUID;
  succededAt: Maybe<number>;
  triedAt: Maybe<number>;
};
