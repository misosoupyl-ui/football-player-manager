import type { IFinance } from "../interfaces/IFinance";

const FinancialSituation = ({ finance }: { finance: IFinance }) => {
  return (
    <section className="p-4 bg-white/10 rounded-xl text-white">
      <h2 className="text-xl font-medium mb-4">Financial situation</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Money left */}
        <div className="border border-yellow-300/40 bg-black/30 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Money left
          </p>
          <p className="text-xl font-semibold mt-1">
            {finance.moneyLeft.toLocaleString()}
          </p>
        </div>

        {/* Number of purchases */}
        <div className="border border-yellow-300/40 bg-black/30 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Purchases
          </p>
          <p className="text-xl font-semibold mt-1">
            {finance.numberOfPurchases}
          </p>
        </div>

        {/* Money spent */}
        <div className="border border-yellow-300/40 bg-black/30 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Money spent
          </p>
          <p className="text-xl font-semibold mt-1">
            {finance.moneySpent.toLocaleString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinancialSituation;
