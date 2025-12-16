import { useEffect, useState } from "react";
import AthleteService from "../services/AthleteService";
import FinanceService from "../services/FinanceService";
import type { IAthlete } from "../interfaces/IAthlete";
import type { IFinance } from "../interfaces/IFinance";


/*UI for purchase og unpurchase kjøp av athletes
Etter endring hentes finance på nytt,
 fordi backend beregner moneyleft basert på purchasestatus
*/


const PurchaseSection = ({
  onFinanceUpdated,
}: {
  onFinanceUpdated: (finance: IFinance) => void;
}) => {
  const [notPurchased, setNotPurchased] = useState<IAthlete[]>([]);
  const [purchased, setPurchased] = useState<IAthlete[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchAthletes = async () => {
    const all = await AthleteService.getAllAthletes();
    setNotPurchased(all.filter((a) => !a.purchaseStatus));
    setPurchased(all.filter((a) => a.purchaseStatus));
  };

  const refreshFinance = async () => {
    const latest = await FinanceService.getFinance();
    if (latest) onFinanceUpdated(latest);
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  const setPurchaseStatus = async (athlete: IAthlete, newStatus: boolean) => {
    if (athlete.id === undefined) {
      setStatusMessage("Athlete id is missing.");
      return;
    }

    const updatedAthlete: IAthlete = { ...athlete, purchaseStatus: newStatus };
    const result = await AthleteService.putAthletes(updatedAthlete);

    if (!result) {
      setStatusMessage("Could not update athlete.");
      return;
    }

    await refreshFinance();
    await fetchAthletes();

    setStatusMessage(
      newStatus
        ? `${athlete.name} purchased!`
        : `${athlete.name} set to NOT purchased (refund).`
    );

    window.setTimeout(() => setStatusMessage(""), 3000);
  };


  // Gjenbrukes for både kjøpte og ikke-kjøpte athletes.
  const renderCards = (
    list: IAthlete[],
    statusText: string,
    buttonText: string,
    buttonClassName: string,
    newStatus: boolean
  ) => {
    if (list.length === 0) {
      return (
        <p className="text-sm text-white/70 mb-8">
          {newStatus ? "No athletes to purchase." : "No purchased athletes."}
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {list.map((a) => (
          <article
            key={a.id}
            className="border border-gray-300 shadow-lg backdrop-blur-lg p-4 drop-shadow hover:scale-105 hover:shadow-xl transition-transform duration-500 bg-black/60 overflow-hidden"
          >
            <div className="-mx-4 -mt-4 h-14 bg-white/10 border-b border-gray-300/20 flex items-center justify-center">
              <h4 className="text-sm font-semibold text-white tracking-wide">
                {a.name} <span className="text-gray-300">(Id: {a.id})</span>
              </h4>
            </div>

            <img
              className="mx-auto mt-6 rounded-full w-28 h-28 object-cover border-4 border-black bg-black"
              src={`http://localhost:5105/images/${a.image}`}
              alt={`Image of ${a.name}`}
            />

            <p className="text-sm text-gray-200 mt-4">
              <span className="text-gray-400">Gender:</span> {a.gender}
            </p>

            <p className="text-sm text-gray-200">
              <span className="text-gray-400">Price:</span>{" "}
              {(a.price ?? 0).toLocaleString()}
            </p>

            <p className="text-sm font-medium text-white mt-1">
              <span className="text-gray-400 font-normal">Status:</span>{" "}
              {statusText}
            </p>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setPurchaseStatus(a, newStatus)}
                className={buttonClassName}
              >
                {buttonText}
              </button>
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-slate-900/60 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-semibold mb-2">Purchase / Manage Athletes</h2>

      {statusMessage && <p className="mb-4 text-sm">{statusMessage}</p>}

      <h3 className="text-xl font-semibold mb-3">Not Purchased</h3>
      {renderCards(
        notPurchased,
        "Not Purchased",
        "Purchase",
        "w-40 px-4 py-2 !bg-gray-300 text-black border border-gray-400 rounded-none hover:bg-gray-400 transition shadow-sm text-center",
        true
      )}

      <h3 className="text-xl font-semibold mb-3">Purchased</h3>
      {renderCards(
        purchased,
        "Purchased",
        "Unpurchase",
        "w-40 px-4 py-2 !bg-gray-500 text-black border border-blue-700 rounded-none hover:bg-blue-800 transition shadow-sm text-center",
        false
      )}
    </section>
  );
};

export default PurchaseSection;
