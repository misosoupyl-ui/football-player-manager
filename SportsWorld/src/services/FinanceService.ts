import type { IFinance } from "../interfaces/IFinance";
import axios from "axios";

const financeEndpoint = "http://localhost:5105/finance";

/*
  GET /finance
  Backend returnerer en liste (fordi controlleren din returnerer List<Finance>).
*/
const getAllFinance = async (): Promise<IFinance[]> => {
  try {
    const response = await axios.get<IFinance[]>(financeEndpoint);
    return response.data;
  } catch (error) {
    console.error("Error getting finance list:", error);
    return [];
  }
};

/*
  GET /finance (men vi bruker kun første rad)
  Vi har bare 1 rad i tabellen, derfor tar vi [0].
*/
const getFinance = async (): Promise<IFinance | null> => {
  try {
    const response = await axios.get<IFinance[]>(financeEndpoint);
    return response.data[0] ?? null;
  } catch (error) {
    console.error("Error getting finance:", error);
    return null;
  }
};

/*
  PUT /finance
  Backend forventer et HELT Finance-objekt (editedFinance).
  Viktig: din controller returnerer NoContent() (204), så response.data blir tomt.
  Derfor returnerer vi updatedFinance tilbake (frontend vet hva den sendte).
*/
const putFinance = async (
  updatedFinance: IFinance
): Promise<IFinance | null> => {
  try {
    const response = await axios.put<IFinance>(financeEndpoint, updatedFinance);
    return response.data; // <-- kommer fra backend
  } catch (error) {
    console.error("Error updating finance:", error);
    return null;
  }
};

export default { getAllFinance, getFinance, putFinance };
