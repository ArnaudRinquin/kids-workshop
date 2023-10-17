import Card, { CardTypes } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { useKids } from "@/dataStore";

export default function Kids() {
  const kids = useKids();
  return (
    <main className="container mx-auto">
      <PageTitle text="Kids" withBackLink />
      <div className="flex items-center justify-center gap-x-12">
        {kids.map((kid) => (
          <Card
            key={kid.id}
            type={CardTypes.KID}
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
