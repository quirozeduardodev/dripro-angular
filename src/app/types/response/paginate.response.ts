
export interface PaginateResponse<TModel> {
  page: number;
  total: number;
  pages: number;
  perPage: number;
  data: TModel[];
}
