const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    const lang = req.query.lang || "en";
    
    const messages = {
        ar: {
            title: "نظام مكافحة السرقة",
            welcome: "مرحبا! النظام يعمل الآن",
            choose: "اختر اللغة:",
            status: "الحالة: يعمل ✅"
        },
        en: {
            title: "AntiTheft System",
            welcome: "Welcome! System is working now", 
            choose: "Choose language:",
            status: "Status: Running ✅"
        },
        el: {
            title: "Σύστημα AntiTheft",
            welcome: "Καλώς ορίσατε! Το σύστημα λειτουργεί τώρα",
            choose: "Επιλέξτε γλώσσα:",
            status: "Κατάσταση: Λειτουργεί ✅"
        }
    };
    
    const t = messages[lang] || messages.en;
    
    const html = `
    <!DOCTYPE html>
    <html dir="${lang === 'ar' ? 'rtl' : 'ltr'}" lang="${lang}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.title}</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: #333;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 15px 35px rgba(0,0,0,0.2);
                text-align: center;
            }
            h1 {
                color: #2c3e50;
                margin-bottom: 20px;
                font-size: 2.5em;
            }
            .welcome {
                background: #27ae60;
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                font-size: 1.2em;
            }
            .language-buttons {
                margin: 30px 0;
            }
            .language-buttons h3 {
                color: #7f8c8d;
                margin-bottom: 20px;
            }
            .btn {
                display: inline-block;
                margin: 10px;
                padding: 15px 30px;
                background: #3498db;
                color: white;
                text-decoration: none;
                border-radius: 50px;
                font-weight: bold;
                font-size: 1.1em;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
            }
            .btn:hover {
                background: #2980b9;
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(52, 152, 219, 0.4);
            }
            .status {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                border-left: 5px solid #2ecc71;
            }
            [dir="rtl"] .status {
                border-left: none;
                border-right: 5px solid #2ecc71;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🛡️ ${t.title}</h1>
            
            <div class="welcome">
                ${t.welcome}
            </div>
            
            <div class="language-buttons">
                <h3>🌍 ${t.choose}</h3>
                <a href="?lang=ar" class="btn">🇸🇦 العربية</a>
                <a href="?lang=en" class="btn">🇺🇸 English</a>
                <a href="?lang=el" class="btn">🇬🇷 Ελληνικά</a>
            </div>
            
            <div class="status">
                <strong>${t.status}</strong><br>
                📍 ${req.get('host')} | 🕐 ${new Date().toLocaleString()}
            </div>
        </div>
    </body>
    </html>
    `;
    
    res.send(html);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("🚀 AntiTheft System running on port " + PORT);
    console.log("🌍 Multi-language support: Arabic, English, Greek");
});

// Force Railway redeploy - Multi-language system
