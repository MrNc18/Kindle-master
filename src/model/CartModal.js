import {BaseModel} from './BaseModel.js';

export class CartModel extends BaseModel {
    static resource = {
        key: 'cart',
        uniqueIdentifier: 'id'
    };

    constructor(props) {
        super(props);
    }
}

export class WishListModel extends BaseModel {
    static resource = {
        key: 'wishList',
        uniqueIdentifier: 'id'
    };

    constructor(props) {
        super(props);
    }
}