import express from "express";

import AnimeDBManager from "./anime-db-manager.js";

const app = express();

app.use(express.json());

const PORT = 5500;
const HOST = "0.0.0.0"; // Listen on all network interfaces (localhost, LAN IP, etc.) e.g. Entering LAN IP address or localhost IP address will access the server

app.get("/api/animes", async (req, res) => {
    const animeDBManager = AnimeDBManager.getInstance();

    try {
        await animeDBManager.connect();

        const results = await animeDBManager.getAnimes();

        res.status(200).json({ results: results });
    }
    catch (err) {
        console.error("API GET anime error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    finally {
        await animeDBManager.disconnect();
    }
});

app.get("/api/anime-info", async (req, res) => {
    const animeDBManager = AnimeDBManager.getInstance();

    try {
        await animeDBManager.connect();

        const results = await animeDBManager.getAnimeInfo(req.query.id);

        res.status(200).json({ results: results });
    }
    catch (err) {
        console.error("API GET anime info error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    finally {
        await animeDBManager.disconnect();
    }
});

app.post("/api/anime", async (req, res) => {
    const animeDBManager = AnimeDBManager.getInstance();

    try {
        await animeDBManager.connect();

        await animeDBManager.addAnime(req.body.anime_name, req.body.img_url, req.body.author, req.body.rating);

        res.status(200).json({ msg: "Successfully added anime to database" });
    }
    catch (err) {
        console.error("API POST anime error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    finally {
        await animeDBManager.disconnect();
    }
});

app.listen(PORT, HOST, () => {
    console.log("Server is running on port", PORT);
});
