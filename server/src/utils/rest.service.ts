import { ListAllEntitiesQuery } from "./list-all-entities.query";
import { ResponseData } from "./response-data";

/**
 * Rest service interface
 */
export interface RestService<T, C = object, U = object> {
  /**
   * Create the entity
   * @param dto Entity data
   */
  create(dto: C): Promise<ResponseData<T>>;

  /**
   * Update the entity
   * @param id Entity id
   * @param dto Entity data
   */
  update(id: string, dto: U): Promise<ResponseData<T>>;

  /**
   * Delete the entity
   * @param id Entity id
   */
  delete(id: string): Promise<ResponseData>;

  /**
   * Soft delete the entity
   * @param id Entity id
   */
  softDelete(id: string): Promise<ResponseData>;

  /**
   * Merge the entity
   * @param id Entity id
   * @param dto Entity data
   */

  //merge(id: string, dto: U): Promise<ResponseData<T>>;

  /**
   * Find all entities
   * @param query Query object
   */
  findAll(query: ListAllEntitiesQuery<T>): Promise<ResponseData<T[]>>;

  /**
   * Find one entity
   * @param id Entity id
   */
  findOne(id: string): Promise<ResponseData<T | undefined>>;
}
