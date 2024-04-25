import { AxiosRequestConfig } from "axios";
import axios from "../api/axios.ts";
import { ResponseData } from "../../../lib/src/persistance/response-data.ts";
import { ListAllEntitiesQuery } from "../../../server/src/utils/list-all-entities.query.ts";
import { RoutePath } from "../../../lib/src/persistance/RoutePath.ts";

export abstract class Api<T = object, U = object> {
  protected config: AxiosRequestConfig = {};
  protected path: RoutePath;

  protected constructor(token: string | null = null, path: RoutePath) {
    this.config = { headers: { Authorization: `Bearer ${token}` } };
    this.path = path;
  }

  /**
   * Create a new entity
   * @param form - The form data to create the entity
   */
  async create(form: U) {
    const { data } = await axios.post<any, { data: ResponseData<T> }>(this.path, form, this.config);
    return data;
  }

  /**
   * Update an entity
   * @param id - The id of the entity to update
   * @param form - The form data to update the entity
   */
  async update(id: string, form: U) {
    const { data } = await axios.put<any, { data: ResponseData<T> }>(this.path + id, form, this.config);
    return data;
  }

  /**
   * Delete an entity
   * @param id - The id of the entity to delete
   */
  async delete(id: string) {
    const { data } = await axios.delete<any, { data: ResponseData<T> }>(this.path + id, this.config);
    return data;
  }

  /**
   * Find all entities
   * @param query - The query to filter the entities
   */
  async findAll(query: ListAllEntitiesQuery<T>) {
    const { data } = await axios.get<any, { data: ResponseData<T[]> }>(this.path, {
      ...this.config,
      params: query,
    });
    return data;
  }

  /**
   * Find one entity
   * @param id - The id of the entity to find
   */
  async findOne(id: string) {
    const { data } = await axios.get<any, { data: ResponseData<T> }>(this.path + id, this.config);
    return data;
  }

  /**
   * Soft delete an entity
   * @param id - The id of the entity to soft delete
   */
  async softDelete(id: string) {
    const { data } = await axios.delete<any, { data: ResponseData }>(this.path + "soft/" + id, this.config);
    return data;
  }
}
