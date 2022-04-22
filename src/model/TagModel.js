import { BaseModel } from "./BaseModel.js";

export class TagModel extends BaseModel {
  static resource = {
    key: "tag",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}
