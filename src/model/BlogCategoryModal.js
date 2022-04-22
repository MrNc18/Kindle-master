import { BaseModel } from "./BaseModel.js";

export class BlogCategoryModal extends BaseModel {
  static resource = {
    key: "blogCategory",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}
