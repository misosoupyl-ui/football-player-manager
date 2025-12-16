import { useState } from "react";
import RegisterAthleteForm from "../components/RegisterAthleteForm";
import AthleteItem from "../components/AthleteItem";
import type { IAthlete } from "../interfaces/IAthlete";

const RegisterAthletePage = () => {
  const [createdAthletes, setCreatedAthletes] = useState<IAthlete[]>([]);

  const handleAthleteCreated = (athlete: IAthlete) => {
    setCreatedAthletes((prev) => [athlete, ...prev]);
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Page header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-3">
            <div className="h-10 w-1 rounded-full bg-indigo-500" />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Register athlete
              </h1>
              <p className="text-sm text-white/60 mt-1">
                Create a new athlete profile and upload an image.
              </p>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Athlete details</h2>
              <RegisterAthleteForm onAthleteCreated={handleAthleteCreated} />
            </div>
          </div>

          {/* Right: list */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md shadow-xl p-6">
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Newly registered</h2>
                  <p className="text-sm text-white/60">
                    Shows athletes registered during this session.
                  </p>
                </div>
                <div className="text-sm text-white/60">
                  Count:{" "}
                  <span className="text-white font-semibold">
                    {createdAthletes.length}
                  </span>
                </div>
              </div>

              {createdAthletes.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-black/20 p-6 text-white/70">
                  No athletes registered yet. Use the form to add one.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {createdAthletes.map((athlete) => (
                    <AthleteItem
                      key={athlete.id}
                      athlete={athlete}
                      showActions={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterAthletePage;
