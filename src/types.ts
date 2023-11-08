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
  categoryId: Category["id"];
};

export type Progress = {
  id: UUID;
  kidId: Kid["id"];
  workshopId: Workshop["id"];
  presentedAt: Maybe<number>;
  success: Maybe<"a" | "b" | "c">;
  completion: Maybe<1 | 2>;
  validatedAt: Maybe<number>;
  bookmarkedAt?: Maybe<number>;
};

export type Category = {
  id: UUID;
  name: string;
};
