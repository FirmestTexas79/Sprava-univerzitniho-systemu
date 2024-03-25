import { RowDataPacket } from "mysql2"

/**
 * TableEntity is the base class for all data models.
 */
//@ts-ignore
export abstract class TableEntity implements RowDataPacket {
    id?: string
    visibility?: string
    static tableName?: TableEnum

    protected constructor(data?: Partial<TableEntity>) {
        Object.assign(this, data)
    }

    /**
     * Set the data for the model
     * @param data The data to set
     */
    public set(data: Partial<TableEntity>) {
        this.hydrate(data)
    }

    /**
     * Hydrate the model with data
     * @param data The data to hydrate the model with
     * @protected This method should only be called from within the class
     */
    protected hydrate(data: Partial<TableEntity>) {
        Object.assign(this, data)
    }
}

export enum TableEnum {
    USERS = "users",
}

export interface TableEntityConstructor<T extends TableEntity> {
    new(data?: T): T;

    tableName?: TableEnum;
}