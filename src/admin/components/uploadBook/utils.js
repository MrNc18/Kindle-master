import { isInputValid } from "./../../../utils/validators";
import { convertOptionForValue } from "./../../../utils/index";

export const enableButton = (value, activeStep) => {
  const {
    name,
    category,
    priceType,
    itemCondition,
    publication,
    size,
    price,
    pulishRight,
    tag,
    email,
    number,
    publisherName,
    shop,
    author,
    storeId,
  } = value || {};

  switch (activeStep) {
    case 0:
      return (
        isInputValid(name) &&
        category?.value &&
        priceType?.value &&
        itemCondition?.value &&
        isInputValid(publication) &&
        size?.value &&
        isInputValid(price) &&
        author?.id
      );

    case 1:
      return pulishRight?.value && tag?.length && storeId?.value;

    case 2:
      return email && number && publisherName && shop;

    case 3:
      return true;
  }
};

export const getInitialData = (
  data = {},
  authorList = [],
  bookCategory = []
) => {
  const {
    author,
    category_id,
    cover_img,
    description,
    edition_year,
    item_condition,
    name,
    page_count,
    price,
    price_type,
    publication,
    publush_rights,
    size,
  } = data;
  return {
    category:
      (category_id && bookCategory.find((item) => item.value == category_id)) ||
      {},
    description,
    // city,
    // email,
    itemCondition: item_condition ? convertOptionForValue(item_condition) : "",
    name,
    number: page_count,
    price,
    priceType: price_type ? convertOptionForValue(price_type) : "",
    publication,
    // publisherName,
    pulishRight: publush_rights ? convertOptionForValue(publush_rights) : "",
    // shop,
    size: size ? convertOptionForValue(size) : "",
    // tag,
    author: (author && authorList.find((item) => item.value == author)) || {},
    // pages,
    edition: edition_year,
    imgUrl: cover_img,
  };
};

export const createPayloadForAddBook = ({
  age,
  category,
  city,
  email,
  itemCondition,
  name,
  number,
  price,
  priceType,
  publication,
  publisherName,
  pulishRight,
  shop,
  size,
  tag,
  author,
  pages,
  edition,
  imgUrl,
  storeId,
}) => {
  return {
    category_id: category.id,
    tag: tag.map((item) => item.label).join(),
    city,
    email,
    item_condition: itemCondition?.value,
    name,
    number,
    price,
    price_type: priceType?.value,
    publication,
    publisherName,
    publush_rights: pulishRight?.value,
    shop,
    size: size?.value,
    author: author?.id,
    cover_img: imgUrl,
    edition_year: edition,
    page_count: pages,
    storeId: storeId.value,
  };
};

export const covertNumberToPrice = (value) => {
  return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const parseParams = (querystring) => {
  // parse query string
  const params = new URLSearchParams(querystring);

  const obj = {};

  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }

  return obj;
};
