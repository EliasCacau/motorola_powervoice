export interface Pageable<T> {
    content: T[];
    totalElements: number;
    pageNumber: number;
    totalPages: number;
}
