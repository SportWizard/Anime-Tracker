import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

/**
 * Database manager for animes
 */
class AnimeDBManager {
    static #instance = null;
    static #allowed = false;

    #connection = null;

    /**
     * Prevent creation of object
     */
    constructor() {
        // If allowed then it should be called from methods within the class
        if (!AnimeDBManager.#allowed)
            throw new Error("AnimeDBManager: private constructor");

        AnimeDBManager.#allowed = false;
    }

    /**
     * Single instance (singleton)
     *
     * @returns {AnimeDBManager} Instance of AnimeDBManager
     */
    static getInstance() {
        if (!AnimeDBManager.#instance) {
            AnimeDBManager.#allowed = true; // Allow to create an instance
            AnimeDBManager.#instance = new AnimeDBManager();
        }

        return AnimeDBManager.#instance;
    }

    /**
     * Connect to database
     */
    async connect() {
        if (!this.#connection) {
            try {
                this.#connection = await mysql.createConnection({
                    host: process.env.HOST || "localhost",
                    user: process.env.USERNAME,
                    password: process.env.PASSWORD,
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
    async disconnect() {
        if (this.#connection) {
            try {
                await this.#connection.end();

                this.#connection = null;

                console.log("Disconnected from database");
            }
            catch (err) {
                console.error("Disconnect error:", err);
            }
        }
    }

    /**
     * Gets all anime in the database
     *
     * @returns {object[]} All the anime's id, name and image url
     */
    async getAnimes() {
        console.log("Getting animes from database");

        const query = "SELECT id, anime_name, img_url FROM anime_info";

        const [results] = await this.#connection.execute(query);

        return results;
    }

    /**
     * Gets the anime information from the database
     *
     * @returns {object[]} All the anime's id, name and image url
     */
    async getAnimeInfo(id) {
        console.log("Getting anime's information from database");

        const query = "SELECT anime_name, img_url, author, rating FROM anime_info WHERE id = ?";

        const [results] = await this.#connection.execute(query, [id]);

        return results[0];
    }

    /**
     * Add anime and its' information to the database
     *
     * @param {string} animeName - name of the anime
     * @param {string} imgUrl - url of the image
     * @param {string} author - name of the author
     * @param {number} rating - rating of the anime
     */
    async addAnime(animeName = null, imgUrl = null, author = null, rating = null) {
        console.log("Adding anime to database");

        const query = "INSERT INTO anime_info (anime_name, img_url, author, rating) VALUES (?, ?, ?, ?)";

        await this.#connection.execute(query, [animeName, imgUrl, author, rating]);
    }

    /**
     * Update anime's information
     *
     * @param {number} id - id of the anime
     * @param {string} column - name of the column in the database
     * @param {string|number} value - value to be updated to for the column
     */
    async updateAnime(id, column, value) {
        console.log(`Updating anime in database: column: ${column}, value: ${value}`);

        const query = `UPDATE anime_info SET ${column} = ? WHERE id = ?`;

        await this.#connection.execute(query, [value, id]);
    }
}

export default AnimeDBManager;
