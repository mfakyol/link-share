import { apiUrl } from "@/config";
import httpService from "./httpService";

type GetBackgroundsResponse =
  | { status: false; message: string }
  | { status: true; list: Array<Background> };

async function getBackgrounds(): Promise<GetBackgroundsResponse> {
  try {
    const response = await httpService.getWithAuth(`${apiUrl}/background`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

const backgroundService = {
  getBackgrounds,
};

export default backgroundService;
