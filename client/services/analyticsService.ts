import { apiUrl } from "@/config";
import httpService from "./httpService";

async function getRangeAnalitics( startDate: number, endDate: number) {
  httpService.getWithAuth(`${apiUrl}/analytics/range?startDate=${startDate}&endDate=${endDate}`);
}

const analyticsService = {
  getRangeAnalitics,
};

export default analyticsService;
