import postgres = require('postgres');
import { DatabaseOptions } from '../config/Configuration'

export default class Database {
    /**
     * The sql function of the postgres client
     * 
     * @property {Function} sql
     * 
     * @private
     */
    private sql: any;

    /** 
     * @param {DatabaseOptions} config - The database configuration
     * 
     * @constructor
     */
    constructor(private config: DatabaseOptions) { 
        this.connect()
    }

    /**
     * Establishes the connection to the postgres DB
     * 
     * @method connect
     * 
     * @returns {void}
     * 
     * @private
     */
    private connect(): void {
        this.sql = postgres({
            host: this.config.host,
            port: this.config.port,
            database: this.config.database,
            username: this.config.user,
            password: this.config.password
        });
    }

    /**
     * Executes a query on the DB
     * 
     * @method query 
     * 
     * @param {string} query - The SQL statement
     * 
     * @returns {Promise<any>}
     * 
     * @public 
     */
    public query<T>(query: string): Promise<T> {
        return this.sql(query);
    }
}
