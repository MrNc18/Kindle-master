import {BaseModel} from './BaseModel.js';

export class StoreModel extends BaseModel {
    static resource = {
        key: 'store',
        uniqueIdentifier: 'id'
    };

    constructor(props) {
        super(props);
    }
}
