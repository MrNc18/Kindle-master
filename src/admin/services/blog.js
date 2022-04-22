import { doGet, doPost, doDelete, doPut } from "./../../utils/request";
import { BlogModel } from "./../../model/BlogModel";
import { BlogCategoryModal } from "./../../model/BlogCategoryModal";
import { createOptionForReactSelect } from "./../../utils/index";

export const getAllBlogs = async () => {
  const response = await doGet("blog");

  if (response.data) {
    new BlogModel(
      createOptionForReactSelect(response.data, "title", "id")
    )._saveAll();
  }

  return response;
};

export const getBlogBySlugService = async (slug) => {
  const response = await doPost("blog/getBlogBySlug", {slug});
  return response;
};

export const getAllBlogCategory = async () => {
  const response = await doGet("blog/getAllBlogsCategory");
  if (response.data) {
    new BlogCategoryModal(
      createOptionForReactSelect(response.data, "name", "id")
    )._saveAll();
  }

  return response;
};

export const addBlogCategoryApi = async (name, description) => {
  const response = await doPost("blog/addBlogCategory", { name, description });
  const data = response?.data?.data;
  if (data?.length) {
    new BlogCategoryModal(
      createOptionForReactSelect(data, "name", "id")
    )._saveAll();
  }

  return response;
};

export const addBlogApi = async (payload) => {
  const response = await doPost("blog/add", payload);
  const data = response?.data?.data;
  if (data?.length) {
    new BlogModel(createOptionForReactSelect(data, "title", "id"))._saveAll();
  }

  return response;
};

export const editBlogApi = async (payload) => {
  const response = await doPut("blog/edit", payload);
  const data = response?.data?.data;
  if (data?.length) {
    new BlogModel(createOptionForReactSelect(data, "title", "id"))._saveAll();
  }

  return response;
};

export const deleteBlogCategoryService = async (id) => {
  const response = await doDelete("blog/deleteBlogCategory", { id });
  const data = response?.data?.data;
  if (data) {
    new BlogCategoryModal(data)._delete(data.id);
  }

  return response;
};

export const deleteBlogService = async (id) => {
  const response = await doDelete("blog/delete", { id });
  const data = response?.data?.data;
  if (data) {
    new BlogModel(data)._delete(data.id);
  }

  return response;
};

export const getAllBlogBycategoryService = async (id) => {
  const response = await doPost("blog/getBlogsByCategoryId", { id });

  new BlogModel(
    createOptionForReactSelect(
      response?.data?.data?.[0]?.blogs || [],
      "title",
      "id"
    )
  )._saveAll();

  return response;
};

export const addBlogReviewService = async (data) => {
  const response = await doPost("blog/addBlogComment", data);

  return response;
};
