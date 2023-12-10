import { api } from "../../axios/index"
import { routes } from "../types/endpoints"

async function onGetAllUsers() {
    try {
      return (await api.get(routes.LIST_USERS)).data;
    } catch (error) {
      throw error;
    }
}

async function onGetAllPilas() {
  try {
    return (await api.get(routes.LIST_PILAS)).data;
  } catch (error) {
    throw error;
  }
}

async function onGetAllBlocks() {
  try {
    return (await api.get(routes.LIST_BLOCKS)).data;
  } catch (error) {
    throw error;
  }
}

async function onGetEventSource() {
  try {
    return (await api.get(routes.LIST_LOGS));
  } catch (error) {
    throw error;
  }
}

export {
  onGetAllUsers,
  onGetAllPilas,
  onGetAllBlocks,
  onGetEventSource
};
