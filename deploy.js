const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    const lang = req.query.lang || "en";
    const messages = {
        ar: { welcome: "نظام مكافحة السرقة", status: "يعمل" },
        en: { welcome: "AntiTheft System", status: "Running" },
        el: { welcome: "Σύστημα AntiTheft", status: "Λειτουργεί" }
    };
    const t = messages[lang] || messages.en;
    
    res.send(`
        <h1>${t.welcome}</h1>
        <p>Status: ${t.status}</p>
        <div>
            <a href="?lang=ar">العربية</a> | 
            <a href="?lang=en">English</a> | 
            <a href="?lang=el">Ελληνικά</a>
        </div>
    `);
});

app.listen(PORT, () => console.log("Server running with languages"));
