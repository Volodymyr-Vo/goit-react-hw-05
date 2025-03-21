import axios from "axios";

const API_KEY = "nPAnBXgXRH3Bgwadcppr5AsKtjRk6FsV8RegisSFaFg";
const BASE_URL = "https://api.unsplash.com/search/photos";

export const fetchImages = async (query, page = 1, perPage = 12) => {
  if (!query.trim()) {
    throw new Error("Запит не може бути порожнім!");
  }
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query,
        page: Math.max(1, Math.floor(page)),
        per_page: perPage,
        client_id: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching images", error);
    throw error;
  }
};
