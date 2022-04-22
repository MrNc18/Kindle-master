import { doDelete, doGet, doPost } from "../../utils/request";
import { BookCategoryModel } from "../../model/BookCategoryModel";
import { createOptionForReactSelect } from "./../../utils/index";
import { BookModel } from "./../../model/BookModel";
import { TagModel } from "./../../model/TagModel";

export const getAllBookService = async () => {
  const response = await doGet("book");

  if (response.data) {
    new BookModel(
      createOptionForReactSelect(response.data, "name", "id")
    )._saveAll();
  }

  return response;
};

export const getAllBookCategoryService = async () => {
  const response = await doGet("book/getAllCategory");

  if (response.data) {
    new BookCategoryModel(
      createOptionForReactSelect(response.data, "name", "id")
    )._saveAll();
  }

  return response;
};

export const addBookCategoryService = async (name, description) => {
  const response = await doPost("book/addBookCategory", {
    name,
    description,
  });
  const data = response?.data?.data;
  if (data?.length) {
    new BookCategoryModel(
      createOptionForReactSelect(data, "name", "id")
    )._saveAll();
  }

  return response;
};

export const deleteBookCategoryService = async (id) => {
  const response = await doDelete("book/deleteBookCategory", { id });
  const data = response?.data?.data;
  if (data) {
    new BookCategoryModel(data)._delete(data.id);
  }

  return response;
};

export const addBookService = async (data) => {
  const response = await doPost("book/add", data);
  return response;
};

export const getAllTags = async () => {
  const response = await doGet("book/getAllTags");

  if (response?.data) {
    new TagModel(
      createOptionForReactSelect(response.data, "name", "id")
    )._saveAll();
  }
  return response;
};

export const filterBook = async (
  min_price,
  max_price,
  category,
  authorList,
  storeId,
  tagList
) => {
  const response = await doPost("book/getBooksByFilter", {
    min_price,
    max_price,
    category_id: category,
    author: authorList.join(),
    storeId,
    tags: tagList,
  });

  const data = response?.data?.data;
  if (data) {
    new BookModel(createOptionForReactSelect(data, "name", "id"))._saveAll();
  }

  return response;
};

export const getBookBySlugService = async (slug) => {
  const response = await doPost("book/getBookBySlug", { slug });

  return response;
};

export const getBookListByUser = async () => {
  const response = await doGet("book/getBooksByUserId");
  if (response.data) {
    new BookModel(
      createOptionForReactSelect(response.data, "name", "id")
    )._saveAll();
  }

  return response;
};

export const deleteBookService = async (id) => {
  const response = await doDelete("book/delete", { id });
  const data = response?.data?.data;
  if (data) {
    new BookModel()._delete(data.id);
  }

  return response;
};

export const getBookByTag = async (slug) => {
  const response = await doPost("book/getBooksByTag", { slug: ["asfasfsaf"] });
  const data = response?.data?.data;

  return response;
};

export const getLatestBook = async () => {
  const response = await doGet("book/getLatestBooks ");
  const data = response?.data;
  return data;
};

export const getBookByStoreId = async (storeId) => {
  const response = await doPost("book/getBookByStoreId", { storeId });

  if (response?.data?.data) {
    new BookModel(
      createOptionForReactSelect(response?.data?.data, "name", "id")
    )._saveAll();
  }

  return response;
};
