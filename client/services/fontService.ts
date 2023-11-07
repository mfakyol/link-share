import { apiUrl } from "@/config";
import httpService from "./httpService";

type GetFontsResponse = { status: false; message: string } | { status: true; list: Array<{_id:string, fontFamily:string}> };

async function getFonts(): Promise<GetFontsResponse> {
  try {
    const response = await httpService.getWithAuth(`${apiUrl}/font`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else return { status: false, message: "unknown_error" };
  } catch (error) {
    return { status: false, message: "unknown_error" };
  }
}

const fontService = {
  getFonts,
};

export default fontService;
