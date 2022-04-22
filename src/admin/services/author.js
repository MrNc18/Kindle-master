import { doGet } from "./../../utils/request";
import { createOptionForReactSelect } from "./../../utils/index";
import { AuthorModel } from "./../../model/AuthorModel";

export const getAllAuthorService = async () => {
  const response = await doGet("admin/getAllAuthor");

  if (response.data) {
    new AuthorModel(
      createOptionForReactSelect(response.data, "first_name", "id")
    )._saveAll();
  }

  return response;
};
