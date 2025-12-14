import { useEffect, useState } from "react";
import FinanceService from "../services/FinanceService";
import type { IFinance } from "../interfaces/IFinance";

import PurchaseSection from "../components/PurchaseSection";
import FinancialSituation from "../components/FinancialSituation";
import LoanSection from "../components/LoanSection";

const DashboardPage = () => {
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const fetchFinance = async () => {
    setLoading(true);
    setStatusMessage("");

    const data = await FinanceService.getFinance();
    if (data) {
      setFinance(data);
    } else {
      setStatusMessage("Could not load finance data.");
    }

    setLoading(false);
  };

  // Henter finance kun når DashboardPage lastes
  useEffect(() => {
    fetchFinance();
  }, []);

  return (
    <section className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-5xl font-bold mb-6">Dashboard</h1>

      {loading && <p>Loading finance...</p>}
      {!loading && statusMessage && (
        <p className="text-red-300">{statusMessage}</p>
      )}

      {finance && !loading && (
        <>
          {/* Section 1 */}
          <FinancialSituation finance={finance} />

          {/* Section 2 */}
          <div className="mt-6">
            <LoanSection
              onFinanceUpdated={() => {
                // Etter lån: hent finance på nytt fra backend
                fetchFinance();
              }}
            />
          </div>

          {/* Section 3 */}
          <div className="mt-6">
            <PurchaseSection
              finance={finance}
              onFinanceUpdated={() => {
                // Etter purchase: hent finance på nytt fra backend
                fetchFinance();
              }}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default DashboardPage;
