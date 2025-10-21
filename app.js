const express = require('express');
const emailService = require('./emailService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// دعم متعدد اللغات
const messages = {
    ar: {
        welcome: "نظام مكافحة السرقة - الواجهة الخلفية",
        status: "يعمل",
        endpoints: "نقاط الوصول",
        emailSettings: "إعدادات البريد جاهزة",
        emailError: "خطأ في إعدادات البريد",
        emailTest: "تم اختبار البريد بنجاح",
        theftReport: "تم إرسال بلاغ السرقة",
        deviceLocked: "تم قفل الجهاز",
        systemAlert: "تم إرسال تنبيه النظام",
        language: "اللغة: العربية",
        chooseLanguage: "اختر اللغة:",
        links: "روابط سريعة"
    },
    en: {
        welcome: "AntiTheft System - Backend API",
        status: "Running",
        endpoints: "Available Endpoints",
        emailSettings: "Email settings are ready",
        emailError: "Email configuration error",
        emailTest: "Email test completed successfully",
        theftReport: "Theft report sent",
        deviceLocked: "Device locked",
        systemAlert: "System alert sent",
        language: "Language: English",
        chooseLanguage: "Choose language:",
        links: "Quick Links"
    },
    el: {
        welcome: "Σύστημα AntiTheft - Backend API",
        status: "Λειτουργεί",
        endpoints: "Διαθέσιμα Endpoints",
        emailSettings: "Οι ρυθμίσεις email είναι έτοιμες",
        emailError: "Σφάλμα διαμόρφωσης email",
        emailTest: "Η δοκιμή email ολοκληρώθηκε επιτυχώς",
        theftReport: "Αποστάλθηκε αναφορά κλοπής",
        deviceLocked: "Συσκευή κλειδώθηκε",
        systemAlert: "Αποστάλθηκε ειδοποίηση συστήματος",
        language: "Γλώσσα: Ελληνικά",
        chooseLanguage: "Επιλέξτε γλώσσα:",
        links: "Γρήγοροι Σύνδεσμοι"
    }
};

// middleware للكشف عن اللغة
app.use((req, res, next) => {
    const lang = req.query.lang || req.headers['accept-language'] || 'en';
    req.language = lang.includes('ar') ? 'ar' : lang.includes('el') ? 'el' : 'en';
    next();
});

// الصفحة الرئيسية مع دعم اللغات
app.get('/', (req, res) => {
    const t = messages[req.language];
    
    const html = `
    <!DOCTYPE html>
    <html dir="${req.language === 'ar' ? 'rtl' : 'ltr'}" lang="${req.language}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AntiTheft System</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: #333;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #eee;
                padding-bottom: 20px;
            }
            .header h1 {
                color: #2c3e50;
                margin: 0;
                font-size: 2.5em;
            }
            .language-selector {
                text-align: center;
                margin: 20px 0;
            }
            .language-selector a {
                display: inline-block;
                margin: 0 10px;
                padding: 10px 20px;
                background: #3498db;
                color: white;
                text-decoration: none;
                border-radius: 25px;
                transition: background 0.3s;
            }
            .language-selector a:hover {
                background: #2980b9;
            }
            .status {
                background: #2ecc71;
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                display: inline-block;
                margin: 10px 0;
            }
            .endpoints {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }
            .endpoint {
                background: white;
                margin: 10px 0;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #3498db;
            }
            .method {
                display: inline-block;
                padding: 5px 10px;
                background: #3498db;
                color: white;
                border-radius: 5px;
                margin-right: 10px;
                font-weight: bold;
            }
            .get { background: #2ecc71; }
            .post { background: #f39c12; }
            .quick-links {
                text-align: center;
                margin-top: 30px;
            }
            .quick-links a {
                display: inline-block;
                margin: 0 10px;
                padding: 12px 25px;
                background: #9b59b6;
                color: white;
                text-decoration: none;
                border-radius: 25px;
                transition: transform 0.3s;
            }
            .quick-links a:hover {
                transform: translateY(-2px);
            }
            [dir="rtl"] {
                text-align: right;
            }
            [dir="rtl"] .endpoint {
                border-left: none;
                border-right: 4px solid #3498db;
            }
            [dir="rtl"] .method {
                margin-right: 0;
                margin-left: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛡️ ${t.welcome}</h1>
                <div class="status">✅ ${t.status}</div>
            </div>

            <div class="language-selector">
                <strong>${t.chooseLanguage}</strong><br>
                <a href="?lang=ar">🇸🇦 العربية</a>
                <a href="?lang=en">🇺🇸 English</a>
                <a href="?lang=el">🇬🇷 Ελληνικά</a>
            </div>

            <div class="endpoints">
                <h2>🔗 ${t.endpoints}</h2>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <strong>/check-email</strong> - ${t.emailSettings}
                </div>
                
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <strong>/test-email</strong> - ${t.emailTest}
                </div>
                
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <strong>/report-theft</strong> - ${t.theftReport}
                </div>
                
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <strong>/device-locked</strong> - ${t.deviceLocked}
                </div>
                
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <strong>/system-alert</strong> - ${t.systemAlert}
                </div>
            </div>

            <div class="quick-links">
                <strong>🔗 ${t.links}</strong><br>
                <a href="/check-email?lang=${req.language}">📧 فحص البريد</a>
                <a href="/test-email?lang=${req.language}">🧪 اختبار البريد</a>
            </div>
        </div>
    </body>
    </html>
    `;
    
    res.send(html);
});

// نقاط API مع ردود متعددة اللغات
app.get('/check-email', async (req, res) => {
    const t = messages[req.language];
    try {
        emailService.checkEmailConfig();
        res.json({ 
            success: true, 
            message: t.emailSettings,
            language: req.language
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: t.emailError,
            details: error.message 
        });
    }
});

app.get('/test-email', async (req, res) => {
    const t = messages[req.language];
    try {
        const result = await emailService.testEmailService();
        res.json({
            ...result,
            message: t.emailTest,
            language: req.language
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message,
            language: req.language
        });
    }
});

app.post('/report-theft', async (req, res) => {
    const t = messages[req.language];
    try {
        const { deviceId, ownerName, model, location } = req.body;

        const result = await emailService.sendTheftAlert(
            { deviceId, ownerName, model },
            location
        );

        res.json({
            ...result,
            message: t.theftReport,
            language: req.language
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message,
            language: req.language
        });
    }
});

app.post('/device-locked', async (req, res) => {
    const t = messages[req.language];
    try {
        const { deviceId, lockType } = req.body;

        const result = await emailService.sendLockNotification(
            { deviceId },
            lockType
        );

        res.json({
            ...result,
            message: t.deviceLocked,
            language: req.language
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message,
            language: req.language
        });
    }
});

app.post('/system-alert', async (req, res) => {
    const t = messages[req.language];
    try {
        const { alertType, message, severity } = req.body;

        const result = await emailService.sendSystemAlert(
            alertType,
            message,
            severity || 'medium'
        );

        res.json({
            ...result,
            message: t.systemAlert,
            language: req.language
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message,
            language: req.language
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 AntiTheft Backend running on port ${PORT}`);
    console.log('🌍 Multi-language support: Arabic, English, Greek');
    console.log('📧 Email service ready');
});
