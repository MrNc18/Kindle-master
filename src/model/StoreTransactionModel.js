import { BaseModel } from "./BaseModel.js";

export class StoreTrasctionModel extends BaseModel {
  static resource = {
    key: "storeTransaction",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}
