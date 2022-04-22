import { doPost } from "./../../utils/request";

export const addConsigneeService = async (payload) => {
  const response = await doPost("admin/addConsignee", payload);
  return response;
};
