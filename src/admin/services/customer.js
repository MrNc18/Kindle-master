import { doPost, doDelete } from "./../../utils/request";
import { createOptionForReactSelect } from "./../../utils/index";
import { CustomerModel } from "./../../model/CustomerModel";

export const getAllUserService = async () => {
  const response = await doPost("admin/getAllUsers");

  if (response.data?.data?.length) {
    new CustomerModel(
      createOptionForReactSelect(response.data.data, "first_name", "id")
    )._saveAll();
  }

  return response;
};

export const getUserByIdService = async (userId) => {
  const response = await doPost("admin/getUserById", { userId });
  return response.data;
};

export const deleteUserService = async (id) => {
  const response = await doDelete("admin/deleteUser", { id });
  const data = response?.data?.data;
  if (data) {
    new CustomerModel(data)._delete(data.id);
  }

  return response;
};
