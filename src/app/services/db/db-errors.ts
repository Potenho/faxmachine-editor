export class DBRowNotFoundError extends Error {
    constructor(dbName: string, id: number) {
        super(`[ ${dbName} ] Row with id ${id} not found`);
        this.name = 'DBRowNotFoundError';
    }
}