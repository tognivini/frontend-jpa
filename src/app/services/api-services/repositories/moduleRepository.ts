import { api } from "../../axios/index"
import { routes } from "../types/endpoints"

async function onGetAllModules() {
    try {
      return (await api.get(routes.LIST_ALL_MODULES)).data;
    } catch (error) {
      throw error;
    }
}

export {
  onGetAllModules
};
