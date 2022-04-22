import { doGet, doPost, doDelete, doPut } from "./../../utils/request";
import { CMSModel, FAQModel } from "./../../model/CMSModel";

export const getAllCMSDataService = async () => {
  const response = await doGet("cms/getAllCms");

  if (response.data) {
    new CMSModel(response.data)._saveAll();
  }
  return response;
};

export const getCMSforAll = async () => {
  const response = await doGet("cms");

  return response.data;
};

export const addCMSService = async (payload) => {
  const response = await doPost("cms/add", payload);
  const data = response?.data?.data;
  if (data) {
    new CMSModel(data)._save();
  }
  return response;
};

export const editCMSService = async (payload) => {
  const response = await doPut("cms/edit", payload);
  return response;
};

export const deleteCMSService = async (id) => {
  const response = await doDelete("cms/delete", { id });
  const data = response?.data?.data;
  if (data) {
    new CMSModel(data)._delete(data.id);
  }

  return response;
};

export const publishOrBlockService = async (id, status) => {
  const response = await doPut("cms/cmsAprovedStatus", {
    id,
    approved: status,
  });

  return response;
};

export const getAllFAQService = async () => {
  const response = await doGet("faq/getAllFaq");
  if (response.data) {
    new FAQModel(response.data)._saveAll();
  }
  return response;
};

export const addFQAService = async (payload) => {
  const response = await doPost("faq/add", payload);
  const data = response?.data?.data;
  if (data) {
    new FAQModel(data)._save();
  }
  return response;
};
export const editFQAService = async (payload) => {
  const response = await doPut("faq/edit", payload);
  const data = response?.data?.data;
  if (data) {
    new FAQModel(data)._update();
  }
  return response;
};

export const approveFAQService = async (id) => {
  const response = await doPut("faq/faqAprovedStatus", {
    id,
    approved: 1,
  });

  const data = response?.data?.data;
  if (data) {
    new FAQModel(data)._update();
  }

  return response;
};

export const deleteFAQService = async (id) => {
  const response = await doDelete("faq/delete", { id });
  const data = response?.data?.data;
  if (data) {
    new FAQModel(data)._delete(data.id);
  }

  return response;
};

export const getFAQforAll = async () => {
  const response = await doGet("faq");

  return response.data;
};
