import axios from "axios";
import { APP_URL_HTTP_BACK } from "@/globals";

export async function searchUsers(query: string) {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const response = await axios.get(
      `${APP_URL_HTTP_BACK}/profile/search-users/?query=${query}`, config
    );
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
}
