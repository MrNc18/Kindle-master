import {BaseModel} from './BaseModel.js';

export class BlogModel extends BaseModel {
    static resource = {
        key: 'blog',
        uniqueIdentifier: 'id'
    };

    constructor(props) {
        super(props);
    }
}
