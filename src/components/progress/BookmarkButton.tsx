import { IconBookmark } from "../Icons";
import { useProgressForKidAndWorkshop, useStore } from "@/dataStore";

type BookmarkButtonProps = {
  kidId: string;
  workshopId: string;
};

export function BookmarkButton({ kidId, workshopId }: BookmarkButtonProps) {
  const { bookmarkedAt } =
    useProgressForKidAndWorkshop({
      kidId,
      workshopId,
    }) ?? {};

  const { setBookmarkedAt } = useStore();
  return (
    <button
      className="shrink-0"
      onClick={() => {
        setBookmarkedAt({
          kidId,
          workshopId,
          date: bookmarkedAt ? null : Date.now(),
        });
      }}
    >
      <IconBookmark
        className={{
          "stroke-2": true,
          "fill-red-400": bookmarkedAt,
          "fill-transparent": !bookmarkedAt,
          "stroke-red-400": true,
        }}
      />
    </button>
  );
}
