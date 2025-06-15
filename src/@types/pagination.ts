export type Pagination<T> = {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: null | number;
    next: null | number;
  };
};
