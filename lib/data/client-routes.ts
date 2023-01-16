import { ClientRoutes } from "../types/client-routes.type";

export const BASE_CLIENT_URL = "/client-area";

export const clientRoutes: ClientRoutes = [
  {
    label: "Your Trips",
    link: `${BASE_CLIENT_URL}/trip`,
  },
  {
    label: "Create Trips",
    link: `${BASE_CLIENT_URL}/trip/new`,
  },
];
