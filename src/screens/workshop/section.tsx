import { Card } from "@/components/Card";
import { CardGrid } from "@/components/CardGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { KidsCard } from "@/components/kids/Card";
import { BookmarkButton } from "@/components/progress/BookmarkButton";
import { ProgressCardContent } from "@/components/progress/CardContent";
import { Kid, Workshop } from "@/types";
import React from "react";

const ITEMS_PER_SHOW_MORE = 5;

type WorkshopKidsSectionProps = {
  workshop: Workshop;
  kids: Kid[];
  title: string;
  id?: string;
};

export function WorkshopKidsSection(props: WorkshopKidsSectionProps) {
  const [show, setShowMore] = React.useState(1);
  const showMore = () => setShowMore(show + 1);
  const hasMore = show * ITEMS_PER_SHOW_MORE < props.kids.length;
  const kids = props.kids.slice(0, show * ITEMS_PER_SHOW_MORE);
  if (!kids.length) {
    return null;
  }

  return (
    <>
      <SectionTitle id={props.id}>{props.title}</SectionTitle>
      <CardGrid>
        {kids.map((kid) => (
          <KidsCard
            key={kid.id}
            {...kid}
            titleControl={
              <BookmarkButton kidId={kid.id} workshopId={props.workshop.id} />
            }
          >
            <ProgressCardContent
              key={kid.id}
              workshop={props.workshop}
              kid={kid}
            />
          </KidsCard>
        ))}
        {hasMore && (
          <Card className="flex items-center justify-center">
            <button
              className="p-8 text-blue-500 hover:text-blue-600 text-lg font-semibold"
              onClick={showMore}
            >
              Voir plus
            </button>
          </Card>
        )}
      </CardGrid>
    </>
  );
}
