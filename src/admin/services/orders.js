import { doGet, doPost, doDelete, doPut } from "./../../utils/request";
import { createOptionForReactSelect } from "./../../utils/index";
import { StoreModel } from "./../../model/StoreModel";
import { OrderModel } from "./../../model/OrderModel";

export const getAllOrderService = async (date = {}) => {
  let url = "order/getallorders";
  const response = await doPost(url, date);

  if (response?.data?.data) {
    new OrderModel(
      createOptionForReactSelect(response.data.data, "name", "id")
    )._saveAll();
  }

  return response.data;
};

export const addOrderService = async (payload) => {
  const response = await doPost("order/createorder", payload);
  return response;
};

export const updateOrderService = async (payload) => {
  const response = await doPut("order/updateorder", payload);

  if (response.data) {
    new OrderModel()._updateById(response.data?.id, response.data);
  }

  return response;
};

export const getOrderByIdService = async (id) => {
  const response = await doGet(`order/getOrderDetailsById/${id}`);

  return response;
};

export const getOrderByUserIdService = async () => {
  const response = await doGet(`order/getOrderByUserId/`);

  return response;
};

export const getOrderByAuthorIdService = async () => {
  const response = await doGet(`order/getOrderByAuthorId/`);

  return response;
};
