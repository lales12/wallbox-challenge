import { IQuery } from '../Bus/Query/IQuery';

export class HandlerForQueryNotFoundException extends Error {
    constructor(query: IQuery) {
        super(`Handler for query ${query.constructor.name} does not exist`);
    }
}
