import { useState } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import AthleteItem from "./AthleteItem";
import AthleteEdit from "./AthleteEdit";
import SearchBar from "./SearchBar";

const AthleteList = () => {
  // Source of truth for athletes i admin-siden
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<IAthlete | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSelectedAthlete = (athlete: IAthlete) => {
    setSelectedAthlete(athlete);
  };

  const getAthletes = async () => {
    try {
      const data = await AthleteService.getAllAthletes();
      setAthletes(data);
    } catch (error) {
      console.error("Error fetching athletes:", error);
    }
  };

  return (
      <>
      {/* Overskrift */}
      <header className="mb-4">
        <h3 className="text-2xl font-semibold text-white">Athletes</h3>
        <p className="text-sm text-gray-400 ">
          Manage athletes, pricing and availability
        </p>
      </header>

      {/* Search bar */}
      <section className="mb-4">
        <SearchBar />
      </section>

      {/* Edit athlete (kun navn / pris / bilde / gender – IKKE purchase) */}
      {selectedAthlete && (
        <AthleteEdit
          athlete={selectedAthlete}
          onSave={(updatedAthlete: IAthlete) => {
            // Oppdater kun athlete-listen (ingen finance!)
            setAthletes((prev) =>
              prev.map((a) => (a.id === updatedAthlete.id ? updatedAthlete : a))
            );

            setSelectedAthlete(null);
            setStatusMessage("Athlete updated successfully");
            setTimeout(() => setStatusMessage(""), 3000);
          }}
        />
      )}

      {/* Hent athletes */}
      <section className="mb-2">
        <button onClick={getAthletes} className="!bg-blue-900/50 border mt-6">
          Show all athletes
        </button>
      </section>

      {/* Statusmelding */}
      {statusMessage && <p className="text-green-600">{statusMessage}</p>}

      {/* Athlete grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {athletes.map((athlete) => (
          <AthleteItem
            key={athlete.id}
            athlete={athlete}
            onUpdate={handleSelectedAthlete}
            onDelete={(id: number) =>
              setAthletes((prev) => prev.filter((a) => a.id !== id))
            }
          />
        ))}
      </section>
    </>
  );
};

export default AthleteList;
