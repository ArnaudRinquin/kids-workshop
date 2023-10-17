import PageTitle from "@/components/PageTitle";
import { KidsCard } from "@/components/kids/Card";
import { useKids } from "@/dataStore";

export default function Kids() {
  const kids = useKids();
  return (
    <main className="container mx-auto">
      <PageTitle backLink="/">Kids</PageTitle>
      <div className="flex items-center justify-center gap-x-12">
        {kids.map((kid) => (
          <KidsCard
            key={kid.id}
            id={kid.id}
            name={kid.name}
            level={kid.level}
            photoUrl={kid.photoUrl}
          />
        ))}
      </div>
    </main>
  );
}
