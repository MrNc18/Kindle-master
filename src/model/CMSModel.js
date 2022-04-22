import { BaseModel } from "./BaseModel.js";

export class CMSModel extends BaseModel {
  static resource = {
    key: "cms",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}

export class FAQModel extends BaseModel {
  static resource = {
    key: "faq",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}
