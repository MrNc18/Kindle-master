//These are role related fature authorizatin for Users.
//When even we need add any access we can add here.

export const admin = {
  dashboard: true,
  customerManagement: false,
  storeManagement: true,
  addStore: true,
  deleteStore: true,
  blockStore: true,
  blogManagement: true,
  eventManagement: true,
  addBook: true,
  manageBookCategory: true,
  deleteStore: true,
  addBlog: true,
  manageBlogCategory: false,
  addEvent: true,
  deleteBlog: true,
  manageEventCategory: true,
  deleteEvent: true,
  cms: true,
  faq: true,
  bookManagement: true,
  orderManagement: true,
  orders: false,
};

export const superAdmin = {
  dashboard: true,
  customerManagement: true,
  storeManagement: true,
  blockStore: true,
  deleteStore: true,
  blogManagement: true,
  eventManagement: true,
  addBook: true,
  manageBookCategory: true,
  addStore: true,
  deleteStore: true,
  addBlog: true,
  manageBlogCategory: true,
  addEvent: true,
  deleteBlog: true,
  manageEventCategory: true,
  deleteEvent: true,
  cms: true,
  faq: true,
  bookManagement: true,
  orderManagement: true,
  orders: false,
};

export const author = {
  dashboard: true,
  customerManagement: false,
  storeManagement: false,
  deleteStore: false,
  addStore: false,
  blockStore: false,
  blogManagement: true,
  eventManagement: true,
  addBook: true,
  manageBookCategory: false,
  deleteStore: false,
  addBlog: true,
  manageBlogCategory: false,
  addEvent: true,
  deleteBlog: true,
  manageEventCategory: false,
  deleteEvent: true,
  faq: false,
  orderManagement: false,
  orders: false,
};

export const consignee = {
  dashboard: true,
  customerManagement: false,
  storeManagement: false,
  deleteStore: false,
  blogManagement: true,
  addStore: true,
  blockStore: true,
  eventManagement: true,
  addBook: true,
  manageBookCategory: false,
  addStore: true,
  addBlog: true,
  manageBlogCategory: false,
  addEvent: false,
  deleteBlog: true,
  manageEventCategory: false,
  deleteEvent: false,
  faq: false,
  bookManagement: true,
  orderManagement: true,
  orders: false,
};

export const buyer = {
  dashboard: false,
  customerManagement: false,
  storeManagement: false,
  blogManagement: false,
  deleteStore: true,
  addStore: true,
  blockStore: true,
  eventManagement: false,
  addBook: false,
  manageBookCategory: false,
  addStore: false,
  deleteStore: false,
  addBlog: false,
  manageBlogCategory: false,
  addEvent: false,
  deleteBlog: false,
  manageEventCategory: false,
  deleteEvent: false,
  faq: false,
  bookManagement: false,
  orderManagement: false,
  orders: true,
  homeLink: true,
};
