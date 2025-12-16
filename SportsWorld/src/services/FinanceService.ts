import type { IFinance } from "../interfaces/IFinance";
import axios from "axios";

const financeEndpoint = "http://localhost:5105/finance";

/*
 Service for kall mot finance API-et
 API-et returnerer liste, men løsning bruker kun en finance-rad
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
  Oppdaterer ifnance moenyleft ved lån
  Returnerer objektet backend svarer med (vis api returnerer data)
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
