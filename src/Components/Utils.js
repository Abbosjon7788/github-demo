import { error } from "./MyAlerts";

export const checkNetworkErr = (err) => {
     if (err?.message === "Network Error") {
          error("Network Error")
     }
}