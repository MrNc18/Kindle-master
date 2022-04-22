import { BaseModel } from "./BaseModel.js";

export class EventCategoryModel extends BaseModel {
  static resource = {
    key: "eventCategory",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}
