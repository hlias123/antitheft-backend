const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// middleware أساسي
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route الرئيسي مع اللغات
app.get("/", (req, res) => {
    const lang = req.query.lang || "en";
    const messages = {
        ar: { title: "نظام مكافحة السرقة", welcome: "مرحبا! النظام يعمل" },
        en: { title: "AntiTheft System", welcome: "Welcome! System is working" },
        el: { title: "Σύστημα AntiTheft", welcome: "Καλώς ορίσατε! Το σύστημα λειτουργεί" }
    };
    const t = messages[lang] || messages.en;
    
    res.send(`
        <h1>${t.title}</h1>
        <p>${t.welcome}</p>
        <div>
            <a href="?lang=ar">العربية</a> | 
            <a href="?lang=en">English</a> | 
            <a href="?lang=el">Ελληνικά</a>
        </div>
    `);
});

// نقطة لفحص الصحة
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// بدء السيرفر - مهم: استمع على 0.0.0.0 للاستضافة السحابية
app.listen(PORT, "0.0.0.0", () => {
    console.log("✅ Server running on port: " + PORT);
    console.log("🌍 Multi-language support enabled");
});
