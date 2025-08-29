import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

/**
 * Database manager for animes
 */
class AnimeDBManager {
    static #instance = null;

    #connection = null;

    /**
     * Single instance (singleton)
     *
     * @returns {AnimeDBManager} Instance of AnimeDBManager
     */
    static getInstance() {
        if (!AnimeDBManager.#instance)
            AnimeDBManager.#instance = new AnimeDBManager();

        return AnimeDBManager.#instance;
    }

    /**
     * Connect to database
     */
    async connect() {
        if (!this.#connection) {
            try {
                this.#connection = await mysql.createConnection({
                    host: process.env.Host || "localhost",
                    user: process.env.user,
                    password: process.env.password,
                    database: "anime_db"
                });

                console.log("Connected to database");
            }
            catch (err) {
                console.error("Connection error:", err);
            }
        }
    }

    /**
     * Disconnect from database
     */
    disconnect() {
        if (!this.#connection) {
            try {
                this.#connection.end();

                console.log("Disconnected from database");
            }
            catch (err) {
                console.err("Disconnect error:", err);
            }
        }
    }
}

export default AnimeDBManager;
