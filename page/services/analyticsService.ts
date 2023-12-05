import { apiUrl } from "@/config";
import httpService from "./httpService";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";

function getBrowserId() {
  let browserId = Cookies.get("browserId");
  if (!browserId) {
    browserId = uuid();
    Cookies.set("browserId", browserId, { expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) });
  }

  return browserId;
}

type SendEventParams = {
  type: string;
  page: String;
  payload?: unknown;
};

async function sendEvent({ type, page, payload }: SendEventParams) {
  const browserId = getBrowserId();
 
  const search  = new URLSearchParams( window.location.search.substring(1))
   if(search.get("dashboard")) return 

  try {
    httpService.post(`${apiUrl}/analytics/event`, { browserId, page, type, payload });
  } catch (error) {}
}

async function pageLoadedEvent(page: string) {
  sendEvent({ type: "pageLoaded", page });
}

async function linkClickedEvent(page: string, linkId: String) {
  sendEvent({ type: "linkClicked", page, payload: { linkId } });
}

async function socialClickedEvent(page: string, socialType: number) {
  sendEvent({ type: "socialClicked", page, payload: { socialType } });
}

const analyticsService = {
  pageLoadedEvent,
  linkClickedEvent,
  socialClickedEvent,
};

export default analyticsService;
