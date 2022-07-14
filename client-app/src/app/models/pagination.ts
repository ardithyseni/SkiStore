// inside here we are wanting to match the properties 
// that we are getting back from our API

export interface MetaData {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}

// for creating a class we need to specify the values when creating properties
export class PaginatedResponse<T> {
    items: T;
    metaData: MetaData;

    constructor(items: T, metaData: MetaData) {
        this.items = items;
        this.metaData = metaData;
    }
}