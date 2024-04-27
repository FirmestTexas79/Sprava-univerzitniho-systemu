import { ListAllEntitiesQuery } from "./list-all-entities.query";
import { Response } from "express";

/**
 * Rest controller interface
 */
export interface RestController<T, C = object, U = object> {
  /**
   * Create the entity
   * @param dto Entity data
   * @param res Response object
   */
  create(dto: C, res: Response): Promise<void>;

  /**
   * Update the entity
   * @param id Entity id
   * @param dto Entity data
   * @param res Response object
   */
  update(id: string, dto: U, res: Response): Promise<void>;

  /**
   * Merge the entity
   * @param id Entity id
   * @param dto Entity data
   * @returns Response data
   */

  //merge(id: string, dto: U, res: Response): Promise<ResponseData<T>>;

  /**
   * Delete the entity
   * @param id Entity id
   * @param res Response object
   */
  delete(id: string, res: Response): Promise<void>;

  /**
   * Soft delete the entity
   * @param id Entity id
   * @param res Response object
   */
  softDelete(id: string, res: Response): Promise<void>;

  /**
   * Find all entities
   * @param query Query object
   * @param res Response object
   */
  findAll(query: ListAllEntitiesQuery<T>, res: Response): Promise<void>;

  /**
   * Find one entity
   * @param id Entity id
   * @param res Response object
   */
  findOne(id: string, res: Response): Promise<void>;
}
