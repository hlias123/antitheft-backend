const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    const lang = req.query.lang || "en";
    const messages = {
        ar: { title: "نظام مكافحة السرقة", welcome: "مرحبا! النظام يعمل", status: "الحالة: يعمل" },
        en: { title: "AntiTheft System", welcome: "Welcome! System is running", status: "Status: Running" },
        el: { title: "Σύστημα AntiTheft", welcome: "Καλώς ορίσατε! Το σύστημα λειτουργεί", status: "Κατάσταση: Λειτουργεί" }
    };
    const t = messages[lang] || messages.en;
    
    const html = `
    <html dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
        <head><title>${t.title}</title></head>
        <body>
            <h1>🛡️ ${t.title}</h1>
            <p>${t.welcome}</p>
            <p><strong>${t.status}</strong></p>
            <div>
                <h3>🌍 اختر اللغة / Choose Language / Επιλέξτε Γλώσσα:</h3>
                <a href="?lang=ar">🇸🇦 العربية</a> | 
                <a href="?lang=en">🇺🇸 English</a> | 
                <a href="?lang=el">🇬🇷 Ελληνικά</a>
            </div>
            <p>✅ البورت: ${PORT} - ✅ الوقت: ${new Date().toLocaleString()}</p>
        </body>
    </html>
    `;
    res.send(html);
});

app.listen(PORT, () => {
    console.log("✅ Server running on http://localhost:" + PORT);
    console.log("🌍 Multi-language support enabled");
});
