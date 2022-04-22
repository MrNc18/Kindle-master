import { BaseModel } from "./BaseModel.js";

export class BookModel extends BaseModel {
  static resource = {
    key: "book",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}
