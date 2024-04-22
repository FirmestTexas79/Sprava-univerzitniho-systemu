import { ListAllEntitiesQuery } from "./list-all-entities.query";
import { ResponseData } from "./response-data";

/**
 * Rest service interface
 */
export interface RestService<T, C = object, U = object> {
  /**
   * Create the entity
   * @param creatorId Creator id
   * @param dto Entity data
   */
  create(creatorId: string, dto: C): Promise<ResponseData<T>>;

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
  delete(id: string): Promise<ResponseData<T>>;

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
  findOne(id: string): Promise<ResponseData<T>>;
}
