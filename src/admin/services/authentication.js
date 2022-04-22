import { doGet, doPost, doPut } from "./../../utils/request";
import { FormModel } from "./../../model/FormModel";
import { updateUserAccessInRedux } from "./../../utils/index";

export const registerUser = async (data) => {
  return await doPost("admin/userRegistration", data);
};

export const updateUser = async (data) => {
  return await doPut("admin/updateProfile", data);
};

export const loginUser = async (email, password) => {
  const response = await doPost("admin/userLogin", {
    userName: email,
    password,
  });
  new FormModel("userDetails")._createForm(response?.data?.data);
  updateUserAccessInRedux(response?.data?.data?.role);

  return response;
};

export const forgotPassword = async (email) => {
  return await doPost("admin/forgotPassword", { email });
};

export const changePassword = async (data) => {
  return await doPost("admin/changePassword", data);
};

export const resetPassword = async (password, token) => {
  return await doPost("admin/resetPassword", { token, password });
};

export const getUserDetailsByToken = async () => {
  const response = await doPost("admin/getUserByToken");
  new FormModel("userDetails")._createForm(response?.data?.data);
  updateUserAccessInRedux(response?.data?.data?.role);
};
