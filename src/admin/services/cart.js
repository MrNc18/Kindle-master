import { createOptionForReactSelect } from "./../../utils/index";
import { CartUtils } from "./../../utils/cartUtils";
import { CartModel, WishListModel } from "./../../model/CartModal";
import { doDelete, doGet, doPost } from "../../utils/request";

export const getAllWishListService = async () => {
  const response = await doGet("wishlist/getWishlist");
  if (response.data) {
    new WishListModel(
      createOptionForReactSelect(response.data, "title", "id")
    )._saveAll();
  }
  return response;
};

export const deleteWishListService = async (id) => {
  const response = await doDelete("wishlist/delete", { id });
  const data = response?.data?.data;
  if (data) {
    new WishListModel(data)._delete(data.id);
  }

  return response;
};

export const addWishlistService = async (payload) => {
  const response = await doPost("wishlist/add", payload);
  const data = response?.data?.data;
  if (data?.length) {
    new WishListModel(
      createOptionForReactSelect(data, "title", "id")
    )._saveAll();
  }

  return response;
};

export const getAllCart = () => {
  const response = CartUtils.getAll();
  new CartModel(createOptionForReactSelect(response, "title", "id"))._saveAll();
  return response;
};

export const deleteCart = (ins) => {
  const response = new CartUtils(ins).deleteCart();
  new CartModel(createOptionForReactSelect(response, "title", "id"))._saveAll();
  return response;
};

export const addOrUpdateCart = (ins) => {
  const response = new CartUtils(ins).addOrUpdateCart();
  new CartModel(createOptionForReactSelect(response, "title", "id"))._saveAll();
  return response;
};

export const saveAllCart = (insList) => {
  new CartUtils(insList).saveAllCart();
  new CartModel(createOptionForReactSelect(insList, "title", "id"))._saveAll();
  return insList;
};
