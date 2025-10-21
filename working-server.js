const express = require("express");
const app = express();
const PORT = 5000;

console.log("🔄 Starting server...");

app.get("/", (req, res) => {
    console.log("📨 Received request for language:", req.query.lang);
    const lang = req.query.lang || "en";
    const messages = {
        ar: { title: "نظام مكافحة السرقة", welcome: "!مرحبا النظام يعمل الآن" },
        en: { title: "AntiTheft System", welcome: "Welcome! System is NOW working" },
        el: { title: "Σύστημα AntiTheft", welcome: "Καλώς ορίσατε! Το σύστημα λειτουργεί ΤΩΡΑ" }
    };
    const t = messages[lang] || messages.en;
    
    const html = `
    <html dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
        <head>
            <title>${t.title}</title>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; background: #f0f8ff; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
                h1 { color: #2c3e50; text-align: center; }
                .language-links { text-align: center; margin: 20px 0; }
                .language-links a { display: inline-block; margin: 5px; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 25px; }
                .status { background: #27ae60; color: white; padding: 10px; border-radius: 5px; text-align: center; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🛡️ ${t.title}</h1>
                <div class="status">✅ ${t.welcome}</div>
                
                <div class="language-links">
                    <h3>🌍 اختر اللغة / Choose Language / Επιλέξτε Γλώσσα:</h3>
                    <a href="?lang=ar">🇸🇦 العربية</a>
                    <a href="?lang=en">🇺🇸 English</a>
                    <a href="?lang=el">🇬🇷 Ελληνικά</a>
                </div>
                
                <p><strong>📊 معلومات النظام / System Info / Πληροφορίες Συστήματος:</strong></p>
                <ul>
                    <li>🚪 البورت / Port / Θύρα: <strong>${PORT}</strong></li>
                    <li>🕐 الوقت / Time / Ώρα: <strong>${new Date().toLocaleString()}</strong></li>
                    <li>🌐 العنوان / Address / Διεύθυνση: <strong>localhost:${PORT}</strong></li>
                </ul>
            </div>
        </body>
    </html>
    `;
    res.send(html);
});

app.listen(PORT, () => {
    console.log("🎉 ✅ Server is RUNNING on: http://localhost:" + PORT);
    console.log("🌍 Multi-language support: Arabic, English, Greek");
    console.log("📱 OPEN YOUR BROWSER and go to: http://localhost:" + PORT + "/?lang=en");
    console.log("⏹️  Press Ctrl+C to stop the server");
});
