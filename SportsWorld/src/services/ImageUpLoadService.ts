import axios from "axios";

const endpoint = "http://localhost:5105/api/imageupload";

/*=== Laster opp et bilde til backend ===*/

const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.fileName ?? null;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default {
  uploadImage,
};
