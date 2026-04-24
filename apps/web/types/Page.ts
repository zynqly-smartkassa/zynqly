export interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number;       // 0-based page index
    totalElements: number;
    totalPages: number;
  };
}
