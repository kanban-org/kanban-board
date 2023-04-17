export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "http://localhost:3080/api/";
    