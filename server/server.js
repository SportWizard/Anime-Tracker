import express from "express";

const app = express();

const PORT = 5500;
const HOST = "0.0.0.0"; // Listen on all network interfaces (localhost, LAN IP, etc.) e.g. Entering LAN IP address or localhost IP address will access the server

app.get("/api/movies", (req, res) => {

});

app.get("/api/info", (req, res) => {

});

app.listen(PORT, HOST, () => {
    console.log("Server is running on port", PORT);
});
