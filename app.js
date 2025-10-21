// Simple working server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`
        <h1>🛡️ AntiTheft System - WORKING</h1>
        <p>✅ Node.js is now properly installed!</p>
        <div>
            <a href="?lang=ar">العربية</a> | 
            <a href="?lang=en">English</a> | 
            <a href="?lang=el">Ελληνικά</a>
        </div>
        <p><strong>Port:</strong> ${PORT}</p>
    `);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("🎉 Server running with Node.js on port " + PORT);
});
