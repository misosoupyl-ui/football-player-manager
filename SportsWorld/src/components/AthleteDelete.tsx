import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import { useState, type ReactNode } from "react";
import { FaTrashAlt } from "react-icons/fa";

const AthleteDelete = ({
  athlete,
  onDelete,
}: {
  athlete: IAthlete;
  onDelete: (id: number) => void;
}) => {
  const [statusMessage, setStatusMessage] = useState("");

  const deleteAthlete = async (id: number) => {
    try {
      await AthleteService.deleteAthletes(id); //sender til backend
      onDelete(id);
      setStatusMessage("Athlete deleted successfully");
    } catch (error) {
      setStatusMessage("Error: Deleting went wrong");
    }
  };

  return (
    <div className="w-40">

      <button
        onClick={() => deleteAthlete(athlete.id!)}
       className="w-full px-4 py-2 !bg-blue-900/50 !text-white border border-blue-700 !rounded-none hover:!bg-blue-800 transition shadow-sm"


      >
        Delete
      </button>

      {statusMessage && <p className="text-green-600">{statusMessage}</p>}
    </div>
  );
};

export default AthleteDelete;
