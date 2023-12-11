import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { ComboBox } from "@/components/ComboBox";
import { useKids } from "@/dataStore";
import { Kid, Maybe } from "@/types";
import { useState } from "react";
import { Radio } from "@/components/RadioGroup";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";
import { CardGrid } from "@/components/CardGrid";
import { Button } from "@/components/Button";
import { basename } from "@/config";
import { type OptionId } from "./types";

export function Progress() {
  const kids = useKids();
  const [selectedKid, setSelectedKid] = useState<Maybe<Kid>>(null);
  const [includePercentages, setIncludePercentages] = useState<boolean>(false);
  const options: {
    id: OptionId;
    label: string;
    description: React.ReactNode;
  }[] = [
    {
      id: "all",
      label: "Tous",
      description: <>{kids.length} enfants</>,
    },
    {
      id: "kid",
      label: "Un enfant",
      description: (
        <ComboBox<Kid>
          items={kids}
          onChange={setSelectedKid}
          selectedItem={selectedKid}
          emptyPlaceholder="Aucun enfant"
          inputPlaceholder="Rechercher un enfant"
        />
      ),
    },
  ];
  const [mode, setMode] = useState<OptionId>("all");
  const [from, setFrom] = useState<Maybe<Date>>(null);
  const [to, setTo] = useState<Maybe<Date>>(null);

  return (
    <PageContainer
      header={<PageTitle backLink="/settings">Progression</PageTitle>}
    >
      <CardGrid className="min-h-[500px]">
        <Card className="p-4 flex flex-col gap-4">
          <Radio
            options={options}
            onChange={(value) => setMode(value ?? "all")}
            selected={mode}
          />
          <DateWithLabel label="Depuis le" value={from} onChange={setFrom} />
          <DateWithLabel label="Jusqu'au" value={to} onChange={setTo} />
          <label>
            Inclure les pourcentages de progression
            <input
              type="checkbox"
              checked={includePercentages}
              onChange={() => setIncludePercentages(!includePercentages)}
            />
          </label>
          <Button
            disabled={mode === "kid" && !selectedKid}
            onClick={() => {
              window.open(
                generateURL({
                  mode,
                  from,
                  to,
                  kidId: selectedKid?.id,
                  includePercentages,
                }),
                "_blank"
              );
            }}
          >
            Générer
          </Button>
        </Card>
      </CardGrid>
    </PageContainer>
  );
}

export function DateWithLabel({
  value,
  onChange,
  label,
}: {
  value: Maybe<Date>;
  onChange: (date: Maybe<Date>) => void;
  label: React.ReactNode;
}) {
  return (
    <label className="flex justify-between items-center">
      {label}
      <Input
        type="date"
        value={value?.toISOString().slice(0, 10) ?? ""}
        onChange={({ target: { valueAsDate } }) => onChange(valueAsDate)}
      />
    </label>
  );
}

function generateURL({
  mode,
  from,
  to,
  kidId,
  includePercentages,
}: {
  mode: OptionId;
  from: Maybe<Date>;
  to: Maybe<Date>;
  kidId: Maybe<string>;
  includePercentages: boolean;
}) {
  const params = new URLSearchParams();
  if (mode === "kid") {
    params.set("kidId", kidId ?? "");
  }
  if (from) {
    params.set("from", from.toISOString());
  }
  if (to) {
    params.set("to", to.toISOString());
  }
  if (includePercentages) {
    params.set("includePercentages", "true");
  }
  const url = new URL(window.location.href);
  url.pathname = `${basename}/settings/progress/${mode}`;
  url.search = params.toString();
  return url.toString();
}
