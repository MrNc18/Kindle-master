import { BaseModel } from "./BaseModel.js";

export class OrderModel extends BaseModel {
  static resource = {
    key: "order",
    uniqueIdentifier: "id",
  };

  constructor(props) {
    super(props);
  }
}
