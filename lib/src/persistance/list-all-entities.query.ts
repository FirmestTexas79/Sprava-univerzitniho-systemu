import { SortType } from "./sort-type.enum";

/**
 * List all entities query
 */
export class ListAllEntitiesQuery<T = object> {
  limit?: number;

  offset?: number;

  sortBy?: string;

  sortOrder?: SortType;

  page?: number;

  filterBy?: keyof T;

  filterValue?: string;
}
