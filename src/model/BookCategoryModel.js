import { BaseModel } from "./BaseModel.js";

export class BookCategoryModel extends BaseModel {
  static resource = {
    key: "bookCategory",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}
