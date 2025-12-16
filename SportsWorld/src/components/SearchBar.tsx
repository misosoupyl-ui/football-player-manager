import { useState } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import { MdPersonSearch } from "react-icons/md";

//Kode inspirert fra: https://www.kindacode.com/article/how-to-create-a-filter-search-list-in-react
//https://www.geeksforgeeks.org/reactjs/how-to-build-a-search-filter-using-react-hooks/
//

const SearchBar = () => {
  //** STATE VARIABLER **//

  //For huske hvilken ID brukeren skriver i søkefeltet
  const [searchId, setSearchId] = useState("");
  // Vise status meldinger til brukeren
  const [statusMessage, setStatusMessage] = useState("");
  // Lagrer resultatet av søket, enten athlete som ble funnet eller null hvis ingen
  const [foundAthlete, setFoundAthlete] = useState<IAthlete | null>(null);

  //**FUNKSJON FOR Å HÅNDTERE SØKET**//

  const filterSearch = async () => {
    const id = Number(searchId); // konverterer input til number
    if (!isNaN(id)) {
      // Hvis ID er gyldig hent athlete fra backend
      const athlete = await AthleteService.getAthletesById(id);

      if (athlete) {
        // Hvis athlete er funnet oppdaterer resultatet og ny statusmelding
        setFoundAthlete(athlete);
        setStatusMessage(`Found Athlete Id:  ${athlete.id}`);
      } else {
        // Hvis ikke, nullstill resultat og vis error statusmelding
        setFoundAthlete(null);
        setStatusMessage("Did not find athlete");
      }
    } else {
      // Hvis input ikke er et tall, nullstill og vis feilmelding
      setFoundAthlete(null);
      setStatusMessage("Id must be a number");
    }
  };

  return (
    <section>
      <div className=" max-w-md mx-aut shadow-xl/30 p-4">
        <input
          className="border border-white px-2 h-11"
          type="text"
          value={searchId}
          onChange={(event) => setSearchId(event.target.value)}
          placeholder="Search athlete by Id.."
        />
        <button className="!bg-slate-700 m-4" onClick={filterSearch}>
          <MdPersonSearch />
        </button>

        {statusMessage}

        {foundAthlete && (
          <div className="col-span-3 border border-gray-300 shadow-lg backdrop-blur-lg p-4 drop-shadow hover:scale-105 hover:shadow-xl transition-transform duration-500 inset-0 bg-black/60">
            <h3 className="text-center font-semibold">
              {foundAthlete.name} (id:{foundAthlete.id})
            </h3>

            <img
              className="rounded-full w-40 h-40  object-cover border-4"
              src={`http://localhost:5105/images/${foundAthlete.image}`}
              alt={`This is a image of${foundAthlete.name}`}
            />
            <p className="text-center text-white">
              Gender: {foundAthlete.gender}
            </p>
            <p className="text-center text-white">
              Price: {(foundAthlete.price ?? 0).toLocaleString() ?? ""}
            </p>
            <p className="text-center text-white">
              Status:{" "}
              {foundAthlete.purchaseStatus ? "Purchased" : "Not purchased"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchBar;
