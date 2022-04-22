import {BaseModel} from './BaseModel.js';

export class AuthorModel extends BaseModel {
    static resource = {
        key: 'author',
        uniqueIdentifier: 'id'
    };

    constructor(props) {
        super(props);
    }
}
