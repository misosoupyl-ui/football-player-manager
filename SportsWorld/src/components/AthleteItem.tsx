import type { IAthlete } from "../interfaces/IAthlete";
import AthleteDelete from "./AthleteDelete";
import { CiEdit } from "react-icons/ci";

// Komponent som tar inn et athlete objekt.
// Kan vise handlinger som update & delete, dersom showActions er satt til true(pga at disse knappene ikke alltid skal vises)
const AthleteItem = ({
  athlete, // Selve Athlete objektet som skal vises
  onUpdate, // Funksjon som kalles når oppdatering
  onDelete, // funksjon som kalles når sletting
  showActions = true,
}: {
  athlete: IAthlete;
  onUpdate?: (athlete: IAthlete) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}) => {
  return (
    <div className="">
      {/*Boks som viser informasjon om athlete*/}
      <article className="col-span-3 border-4 border-violet-300 border-y-violet-500 shadow-xl/30 backdrop-blur-lg p-4 drop-shadow-xl/50 hover:scale-105 hover:shadow-2xl transition-transform duration-500  inset-0 bg-black/60">
        {/*Navn og ID*/}
        <h3 className="text-center font-semibold text-size-lg">
          {athlete.name} (Id: {athlete.id})
        </h3>

        {/*Bilde*/}
        <img
          className="rounded-full w-40 h-40 object-cover border-2 border-black"
          //Web apiets sin images mappe:
          src={`http://localhost:5105/images/${athlete.image}`}
          alt={`This is a image of ${athlete.name}`}
        />

        {/*Kjønn*/}
        <p className="text-start text-xl text-white mt-2">
          Gender: {athlete.gender}
        </p>

        {/*Pris*/}
        <p className="text-start text-xl text-white">
          {/* Kode inspo: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing*/}
          Price: {(athlete.price ?? 0).toLocaleString() ?? "Unknown"}
        </p>

        {/*Kjøpsstatus*/}
        <p className="text-start text-xl font-semibold text-white">
          Status: {athlete.purchaseStatus ? "Purchased" : "Not Purchased"}
        </p>

        {/*Actions (Update + Delete)*/}
        {showActions && (
          <>
            <div className="flex justify-end gap-4 mt-2 ">
              <button
                // Kaller onUpdate dersom hvis funksjonen finnes
                onClick={() => onUpdate?.(athlete)}
                className="px-3 py-1 !bg-green-600 text-white rounded hover:bg-blue-500 relative right-18 top-11"
              >
                <CiEdit />
              </button>
            </div>

            {/*Viser slett knappen kun hvis athlete eksiterer og ondelete er definert*/}
            {athlete.id !== undefined && onDelete && (
              <AthleteDelete athlete={athlete} onDelete={onDelete} />
            )}
          </>
        )}
      </article>
    </div>
  );
};

export default AthleteItem;
