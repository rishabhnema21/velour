import axios from "axios";
import config from "../config/config";

export const searchInGoogleBooks = async (query: string) => {
  try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: query,
        maxResults: 10,
        key: config.googleBooksApiKey,
      },
      timeout: 5000,
    });

    return response.data.items ?? [];
  } catch (err: any) {
    console.log("Google Books API Error: ",err);
    throw new Error("Failed to fetch books from Google Books API");
  }
};
