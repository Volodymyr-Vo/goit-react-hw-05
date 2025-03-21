import axios from "axios";
// import { string } from "yup";

const BASE_URL = "https://api.themoviedb.org/3";

const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjdiZGIxYmQ5ZjM4NzlkZmRiYjg2ZjgzODI0N2JiYyIsIm5iZiI6MTc0MjMwNDQzMS4zNzUsInN1YiI6IjY3ZDk3NGFmYzI0NTI5YmU5MjA4OGY2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hb2wxvvtHPFum2EET09_7rLqxCf1tGEeiRczZdHAV_4";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = API_TOKEN;

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get("/trending/movie/day", {
      params: { language: "en-US" },
    });
    return data.results;
  } catch (error) {
    console.error(" Error fetching trending movies:", error);
    return [];
  }
};

export const fetchMoviesByQuery = async (query) => {
  try {
    const { data } = await axios.get("/search/movie", {
      params: { query, language: "en-US", include_adult: false, page: 1 },
    });
    return data.results;
  } catch (error) {
    console.error(" Error fetching movies by query:", error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}`, {
      params: { language: "en-US" },
    });
    return data;
  } catch (error) {
    console.error(" Error fetching movie details:", error);
    return null;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/credits`, {
      params: { language: "en-US" },
    });
    return data.cast;
  } catch (error) {
    console.error(" Error fetching movie cast:", error);
    return [];
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/reviews`, {
      params: { language: "en-US", page: 1 },
    });
    return data.results;
  } catch (error) {
    console.error(" Error fetching movie reviews:", error);
    return [];
  }
};
