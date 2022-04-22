import { doGet, doPost, doDelete, doPut } from "./../../utils/request";
import { createOptionForReactSelect } from "./../../utils/index";
import { StoreModel } from "./../../model/StoreModel";
import { StoreTrasctionModel } from "./../../model/StoreTransactionModel";

export const getAllStoreService = async () => {
  const response = await doGet("store");

  if (response.data) {
    new StoreModel(
      createOptionForReactSelect(response.data, "name", "id")
    )._saveAll();
  }

  return response;
};

export const addStoreService = async (payload) => {
  const response = await doPost("admin/addStore", payload);
  return response;
};

export const deleteStoreService = async (id) => {
  const response = await doDelete("admin/deleteStore", { id });
  const data = response?.data?.data;
  if (data) {
    new StoreModel(data)._delete(data.id);
  }

  return response;
};

export const blockStoreService = async (id, approved) => {
  const response = await doPost("admin/AprovedStore", { id, status: approved });
  const data = response?.data?.data;
  if (data) {
    new StoreModel(data)._update();
  }

  return response;
};

export const getAllStoreTransactionService = async (id) => {
  const response = await doPost("store/getAllTransactionBystoreId", { id });

  if (response.data.data) {
    new StoreTrasctionModel(
      createOptionForReactSelect(response.data.data, "store_name", "id")
    )._saveAll();
  }

  return response;
};

export const getTransactionDetails = async (id) => {
  const response = await doPost("store/getTransactionDetails", { id });

  return response.data;
};
