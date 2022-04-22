import { doGet, doPost, doDelete, doPut } from "./../../utils/request";
import { createOptionForReactSelect } from "./../../utils/index";
import { EventModel } from "./../../model/EventModel";
import { EventCategoryModel } from "./../../model/EventCategoryModel";

export const getAllEventService = async () => {
  const response = await doGet("event");

  if (response.data) {
    new EventModel(
      createOptionForReactSelect(response.data, "title", "id")
    )._saveAll();
  }

  return response;
};

export const getAllEventCategoryService = async () => {
  const response = await doGet("event/getAllEventsCategory");

  if (response.data) {
    new EventCategoryModel(
      createOptionForReactSelect(response.data, "name", "id")
    )._saveAll();
  }

  return response;
};

export const addEventCategoryService = async (name, description) => {
  const response = await doPost("event/addEventCategory", {
    name,
    description,
  });
  const data = response?.data?.data;
  if (data?.length) {
    new EventCategoryModel(
      createOptionForReactSelect(data, "name", "id")
    )._saveAll();
  }

  return response;
};

export const addEventService = async (payload) => {
  const response = await doPost("event/add", payload);
  const data = response?.data?.data;
  if (data?.length) {
    new EventModel(createOptionForReactSelect(data, "title", "id"))._saveAll();
  }

  return response;
};

export const editEventService = async (payload) => {
  const response = await doPut("event/edit", payload);
  const data = response?.data?.data;
  if (data?.length) {
    new EventModel(createOptionForReactSelect(data, "title", "id"))._saveAll();
  }

  return response;
};

export const getEventBySlugService = async (slug) => {
  const response = await doPost("event/getEventBySlug", slug);
  const data = response?.data?.data;
  if (data?.length) {
    new EventModel(createOptionForReactSelect(data, "title", "id"))._saveAll();
  }

  return response;
};

export const deleteEventCategoryService = async (id) => {
  const response = await doDelete("event/deleteEventCategory", { id });
  const data = response?.data?.data;
  if (data) {
    new EventCategoryModel(data)._delete(data.id);
  }

  return response;
};

export const deleteEventService = async (id) => {
  const response = await doDelete("event/delete", { id });
  const data = response?.data?.data;
  if (data) {
    new EventModel(data)._delete(data.id);
  }

  return response;
};

export const getAllEventBycategoryService = async (id) => {
  const response = await doPost("event/getEventsByCategoryId", { id });

  if (response.data?.data?.length) {
    new EventModel(
      createOptionForReactSelect(response.data.data, "title", "id")
    )._saveAll();
  }

  return response;
};
