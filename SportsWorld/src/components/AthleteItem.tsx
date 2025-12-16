import type { IAthlete } from "../interfaces/IAthlete";
import AthleteDelete from "./AthleteDelete";

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
      <article className="col-span-3 border border-gray-300 shadow-lg backdrop-blur-lg p-4 drop-shadow hover:scale-105 hover:shadow-xl transition-transform duration-500 inset-0 bg-black/60 overflow-hidden">

        {/*Headerbar (lysere enn bakgrunn)*/}
        <div className="-mx-4 -mt-4 h-14 bg-white/10 border-b border-gray-300/20 flex items-center justify-center">
          <h3 className="text-sm font-semibold text-white tracking-wide">
            {athlete.name} <span className="text-gray-300">(Id: {athlete.id})</span>
          </h3>
        </div>

        {/*Bilde*/}
        <img
          className="mx-auto mt-6 rounded-full w-28 h-28 object-cover border-4 border-black bg-black"
          //Web apiets sin images mappe:
          src={`http://localhost:5105/images/${athlete.image}`}
          alt={`This is a image of ${athlete.name}`}
        />

        {/*Kjønn*/}
        <p className="text-sm text-gray-200 mt-4">
          <span className="text-gray-400">Gender:</span> {athlete.gender}
        </p>

        {/*Pris*/}
        <p className="text-sm text-gray-200">
          <span className="text-gray-400">Price:</span>{" "}
          {(athlete.price ?? 0).toLocaleString() ?? "Unknown"}
        </p>

        {/*Kjøpsstatus*/}
        <p className="text-sm font-medium text-white mt-1">
          <span className="text-gray-400 font-normal">Status:</span>{" "}
          {athlete.purchaseStatus ? "Purchased" : "Not Purchased"}
        </p>

        {/*Actions (Update + Delete)*/}
        {showActions && (
          <div className="flex justify-end gap-4 mt-6 w-full">
            <button
              // Kaller onUpdate dersom hvis funksjonen finnes
              onClick={() => onUpdate?.(athlete)}
              className="w-40 px-4 py-2 !bg-blue-900/50 !text-white border border-blue-700 !rounded-none hover:!bg-blue-800 transition shadow-sm text-center"
            >
              Edit
            </button>

            {/*Viser slett knappen kun hvis athlete eksiterer og ondelete er definert*/}
            {athlete.id !== undefined && onDelete && (
              <AthleteDelete athlete={athlete} onDelete={onDelete} />
            )}
          </div>
        )}
      </article>
    </div>
  );
};

export default AthleteItem;
