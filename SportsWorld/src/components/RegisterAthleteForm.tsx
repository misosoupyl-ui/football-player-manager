import { useRef, useState } from "react";
import AthleteService from "../services/AthleteService";
import ImageUploadService from "../services/ImageUpLoadService";
import type { IAthlete } from "../interfaces/IAthlete";

const RegisterAthleteForm = ({
  onAthleteCreated,
}: {
  onAthleteCreated: (athlete: IAthlete) => void;
}) => {
  // Skjema-state (kontrollerte inputfelter)
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Statusmelding til bruker: validering, suksess, feil
  const [statusMessage, setStatusMessage] = useState("");

  // Brukes for å trigge og resette skjult file-input (custom UI)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

// === Innsending: valider skjema, håndter eventuell bildeopplasting før lagring ===
  const handleSubmit = async () => {
    if (!name || !gender || !price) {
      setStatusMessage("You must fill out all fields.");
      return;
    }

    let uploadedFileName = "";

    // Bildet lastes opp først slik at athlete kan lagres med korrekt filnavn
    if (imageFile) {
      const uploaded = await ImageUploadService.uploadImage(imageFile);
      if (!uploaded) {
        setStatusMessage("Image upload failed.");
        return;
      }
      uploadedFileName = uploaded;
    }

    const newAthlete: IAthlete = {
      name,
      gender,
      price: Number(price), // Input er string, backend forventer number
      image: uploadedFileName,
      purchaseStatus: false, // Ny athlete starter alltid som ikke kjøpt
    };

    const response = await AthleteService.postAthletes(newAthlete);

    if (response) {
      setStatusMessage(`${response.name} has been registered!`);
      onAthleteCreated(response);

      // Reset skjema etter vellykket lagring
      setName("");
      setGender("");
      setPrice("");
      setImageFile(null);

      // File-input er ukontrollert og må nullstilles via ref
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setStatusMessage("Something went wrong.");
    }
  };

  const inputClass =
    "w-full rounded-lg bg-slate-950/40 border border-white/10 px-3 py-2 text-white placeholder:text-white/35 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/60";

  return (
    <div className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-white/80">Name</span>
        <input
          className={inputClass}
          type="text"
          placeholder="Lionel Messi"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-white/80">Gender</span>
        <input
          className={inputClass}
          type="text"
          placeholder="Male / Female"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-white/80">Price</span>
        <input
          className={inputClass}
          type="text"
          placeholder="100000"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>

      {/* Custom filvelger for å kontrollere tekst, språk og utseende */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-white/80">Image file</span>

        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 rounded-md !bg-slate-200 !text-black hover:!bg-slate-300 transition"
          >
            Choose file
          </button>

          <span className="text-sm text-white/60 truncate">
            {imageFile ? imageFile.name : "No file chosen"}
          </span>

          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
          />
        </div>
      </div>

      <button
        className="mt-2 w-full py-3 rounded-lg !bg-indigo-600 !text-white font-semibold hover:!bg-indigo-500 transition"
        onClick={handleSubmit}
      >
        Save athlete
      </button>

      {statusMessage && (
        <div className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default RegisterAthleteForm;
