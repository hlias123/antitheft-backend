const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`
        <h1>🛡️ AntiTheft System</h1>
        <p>✅ System is working!</p>
        <div>
            <a href="?lang=ar">العربية</a> | 
            <a href="?lang=en">English</a> | 
            <a href="?lang=el">Ελληνικά</a>
        </div>
    `);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("🚀 Server started successfully on port " + PORT);
});
