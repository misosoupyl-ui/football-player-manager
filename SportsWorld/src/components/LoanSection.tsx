import { useState } from "react";
import FinanceService from "../services/FinanceService";
import type { IFinance } from "../interfaces/IFinance";

const LoanSection = ({
  onFinanceUpdated,
}: {
  onFinanceUpdated: (finance: IFinance) => void;
}) => {
  // Skjemaverdi
  const [loanAmount, setLoanAmount] = useState("");
  // Statusmelding til bruker
  const [statusMessage, setStatusMessage] = useState("...waiting for action");

  const addLoan = async () => {
    // Enkel validering
    if (loanAmount === "") {
      setStatusMessage("Please enter a loan amount.");
      return;
    }

    const amountAsNumber = Number(loanAmount);

    if (Number.isNaN(amountAsNumber) || amountAsNumber <= 0) {
      setStatusMessage("Loan amount must be a number greater than 0.");
      return;
    }

    // Henter finance (1 rad)
    const finance = await FinanceService.getFinance();

    if (!finance) {
      setStatusMessage("Could not load finance.");
      return;
    }

    // Lager oppdatert objekt
    const updatedFinance: IFinance = {
      ...finance,
      moneyLeft: finance.moneyLeft + amountAsNumber,
    };

    // Oppdaterer i backend
    const result = await FinanceService.putFinance(updatedFinance);

    if (result) {
      setStatusMessage("Loan added!");
      onFinanceUpdated(result);
      setLoanAmount("");
    } else {
      setStatusMessage("Something went wrong.");
    }

    setTimeout(() => setStatusMessage(""), 3000);
  };

  return (
    <section className="bg-slate-900/60 p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Get more money (Loan)</h2>

      <div className="flex flex-col gap-3 max-w-sm">
        <label className="text-sm">Loan amount</label>

        <input
          className="border rounded px-3 py-2 white"
          type="text"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />

        <button
          type="button"
          onClick={addLoan}
          className="px-4 py-2 rounded !bg-white/70 text-slate-900 hover:bg-slate-200"
        >
          Add loan
        </button>

        <p className="text-sm">Status: {statusMessage}</p>
      </div>
    </section>
  );
};

export default LoanSection;
