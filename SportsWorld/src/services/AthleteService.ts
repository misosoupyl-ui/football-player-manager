import type { IAthlete } from "../interfaces/IAthlete";
import axios from "axios";

const athleteEndpoint = "http://localhost:5105/athlete";

/*=== Service for kommunikasjon med athlete-endepunkt i API-et ===*/


const getAllAthletes = async (): Promise<IAthlete[]> => {
  try {
    const response = await axios.get<IAthlete[]>(athleteEndpoint);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const getAthletesById = async (id: number): Promise<IAthlete | null> => {
  try {
    const response = await axios.get<IAthlete>(`${athleteEndpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const postAthletes = async (newAthlete: IAthlete): Promise<IAthlete | null> => {
  try {
    const response = await axios.post<IAthlete>(athleteEndpoint, newAthlete);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const putAthletes = async (editedAthlete: IAthlete): Promise<boolean> => {
  try {
    await axios.put(athleteEndpoint, editedAthlete);
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

const deleteAthletes = async (id: number): Promise<boolean> => {
  try {
    const response = await axios.delete<IAthlete>(`${athleteEndpoint}/${id}`);
    console.log("Delete response:", response);
    return true;
  } catch (error) {
    console.error("Error deleting athlete:", error);
    return false;
  }
};
export default {
  getAllAthletes,
  getAthletesById,
  postAthletes,
  putAthletes,
  deleteAthletes,
};
