import {BaseModel} from './BaseModel.js';

export class CustomerModel extends BaseModel {
    static resource = {
        key: 'customer',
        uniqueIdentifier: 'id'
    };

    constructor(props) {
        super(props);
    }
}
