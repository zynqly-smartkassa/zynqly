import axios, { AxiosError } from "axios";
/**
 * Fetches all rides for a specific user from the backend API.
 *
 * This function makes a POST request to the `/all-rides` endpoint with the user ID
 * and returns all ride records associated with that user. It includes comprehensive
 * error handling for various HTTP status codes.
 *
 * @param {number} user_id - The ID of the user whose rides should be retrieved.
 * @returns {Promise<any>} A promise that resolves to the ride data object containing all user rides.
 * @throws {Error} Throws specific errors for 400 (invalid fields), 409 (conflict), 500 (server error), or unknown errors.
 */
export async function getAllRides(cursor: string | undefined, retry: boolean = false) {
  try {

    const { data } = await axios.get(`http://localhost:8080/api/v1/ride`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        cursor: cursor,
        limit: 12,
      },
    });

    if (!data) {
      throw new Error("Response is empty");
    }
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.response?.status;
      const error = err.response?.data?.error;
      const path = error.response?.data?.path;

      const isAuthError =
        status === 403 || status === 401 || path === "auth middleware";

      if (isAuthError && !retry) {
        return await getAllRides(cursor, true);
      } else if (isAuthError && retry) {
        console.error("Error while sending ride:", err);
        throw new Error("Session Expired");
      }
      console.error("Error while sending ride:", err);
      if (err.response?.status === 500) {
        throw new Error("Internal Server Error");
      }

      if (err.response?.status === 400) {
        throw new Error("Missing or invalid ride fields");
      }
    } else {
      console.error("Error while sending ride:", err);
      throw new Error("Unknown Error while sending ride");
    }
  }
}
