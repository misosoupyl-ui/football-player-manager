import { useEffect, useState } from "react";
import AthleteService from "../services/AthleteService";
import FinanceService from "../services/FinanceService";
import type { IAthlete } from "../interfaces/IAthlete";
import type { IFinance } from "../interfaces/IFinance";

const PurchaseSection = ({
  finance,
  onFinanceUpdated,
}: {
  finance: IFinance;
  onFinanceUpdated: (finance: IFinance) => void;
}) => {
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const fetchNotPurchasedAthletes = async () => {
    const all = await AthleteService.getAllAthletes();
    const notPurchased = all.filter(
      (a) => (a.purchaseStatus ?? false) === false
    );
    setAthletes(notPurchased);
  };

  useEffect(() => {
    fetchNotPurchasedAthletes();
  }, []);

  const handlePurchase = async (athlete: IAthlete) => {
    setStatusMessage("");

    if (athlete.id === undefined) {
      setStatusMessage("Athlete id is missing.");
      return;
    }

    const price = athlete.price ?? 0;
    if (price <= 0) {
      setStatusMessage("Athlete price is missing/invalid.");
      return;
    }

    if (finance.moneyLeft < price) {
      setStatusMessage("Not enough money to purchase this athlete.");
      return;
    }

    // 1) Oppdater athlete: purchaseStatus = true
    // Backend PUT /athlete oppdaterer ogsÃ¥ Finance
    const updatedAthlete: IAthlete = { ...athlete, purchaseStatus: true };

    const athleteResult = await AthleteService.putAthletes(updatedAthlete);
    if (!athleteResult) {
      setStatusMessage("Could not update athlete purchase status.");
      return;
    }

    // 2) Hent fersk finance fra backend (source of truth)
    const latestFinance = await FinanceService.getFinance();
    if (!latestFinance) {
      setStatusMessage("Purchased athlete, but could not refresh finance.");
      return;
    }

    // 3) Oppdater UI
    onFinanceUpdated(latestFinance);
    setAthletes((prev) => prev.filter((a) => a.id !== athlete.id));

    setStatusMessage(`${athlete.name} purchased successfully!`);
    setTimeout(() => setStatusMessage(""), 3000);
  };

  return (
    <section className="bg-slate-900/60 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Purchase Athletes</h2>
      <p className="text-sm text-white/80 mb-6">Athletes not purchased yet</p>

      {statusMessage && <p className="mb-4 text-sm">{statusMessage}</p>}

      {athletes.length === 0 ? (
        <p className="text-sm text-white/80">
          No athletes available for purchase.
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {athletes.map((athlete) => (
            <article
              key={athlete.id}
              className="border-4 border-violet-300 border-y-violet-500 shadow-xl/30 bg-slate-900 p-4 drop-shadow-xl/50"
            >
              <h3 className="text-center font-semibold">
                {athlete.name} (id: {athlete.id})
              </h3>

              <img
                className="rounded-full w-40 h-40 object-cover border-2 border-black mx-auto my-3"
                src={`http://localhost:5105/images/${athlete.image}`}
                alt={`This is a image of ${athlete.name}`}
              />

              <p className="text-start text-white">Gender: {athlete.gender}</p>
              <p className="text-start text-white">
                Price: {(athlete.price ?? 0).toLocaleString()}
              </p>
              <p className="text-start text-white">Status: Not Purchased</p>

              <div className="flex justify-end mt-3">
                <button
                  type="button"
                  onClick={() => handlePurchase(athlete)}
                  className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-400"
                >
                  Purchase
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PurchaseSection;
