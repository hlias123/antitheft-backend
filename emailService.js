const nodemailer = require('nodemailer');

// تهيئة إعدادات البريد - تم التصحيح
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// دالة التحقق من الإعدادات
function checkEmailConfig() {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('❌ إعدادات البريد الإلكتروني غير مكتملة');
    }
    console.log('✅ إعدادات البريد جاهزة');
}

// 1. إشعار اكتشاف سرقة
async function sendTheftAlert(deviceData, location, additionalInfo = {}) {
    try {
        checkEmailConfig();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ALERT_EMAIL,
            subject: '🚨 تنبيه سرقة - AntiTheft System',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #d63031; text-align: center;">🚨 تنبيه اكتشاف سرقة</h2>
                    
                    <div style="background: #ffeaa7; padding: 15px; border-radius: 10px; margin: 15px 0;">
                        <h3>📱 معلومات الجهاز</h3>
                        <p><strong>معرف الجهاز:</strong> ${deviceData.deviceId}</p>
                        <p><strong>المالك:</strong> ${deviceData.ownerName || 'غير محدد'}</p>
                        <p><strong>النموذج:</strong> ${deviceData.model || 'غير محدد'}</p>
                    </div>

                    <div style="background: #74b9ff; padding: 15px; border-radius: 10px; margin: 15px 0;">
                        <h3>📍 الموقع الحالي</h3>
                        <p><strong>العنوان:</strong> ${location.address || 'جارٍ التحديد'}</p>
                        <p><strong>الإحداثيات:</strong> ${location.coordinates || 'غير متاحة'}</p>
                        <p><strong>الوقت:</strong> ${new Date().toLocaleString('ar-SA')}</p>
                    </div>

                    <div style="background: #fd79a8; padding: 15px; border-radius: 10px; margin: 15px 0;">
                        <h3>🚔 الإجراءات المطلوبة</h3>
                        <ul>
                            <li>تتبع الموقع الحي للجهاز</li>
                            <li>تفعيل قفل الجهاز عن بُعد</li>
                            <li>التقاط صور للمنطقة المحيطة</li>
                            <li>إبلاغ الجهات الأمنية</li>
                        </ul>
                    </div>

                    <div style="text-align: center; margin-top: 20px;">
                        <a href="https://maps.google.com/?q=${location.coordinates}" 
                           style="background: #e17055; color: white; padding: 10px 20px; 
                                  text-decoration: none; border-radius: 5px;">
                            🗺️ عرض الموقع على الخريطة
                        </a>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ تم إرسال تنبيه السرقة بنجاح');
        return { success: true, message: 'تم إرسال التنبيه' };
    } catch (error) {
        console.error('❌ فشل إرسال تنبيه السرقة:', error);
        return { success: false, error: error.message };
    }
}

// 2. إشعار قفل الجهاز
async function sendLockNotification(deviceData, lockType) {
    try {
        checkEmailConfig();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ALERT_EMAIL,
            subject: '🔒 تنبيه قفل الجهاز - AntiTheft System',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #fdcb6e; text-align: center;">🔒 تم قفل الجهاز عن بُعد</h2>
                    
                    <div style="background: #dfe6e9; padding: 15px; border-radius: 10px;">
                        <h3>📋 تفاصيل العملية</h3>
                        <p><strong>معرف الجهاز:</strong> ${deviceData.deviceId}</p>
                        <p><strong>نوع القفل:</strong> ${lockType}</p>
                        <p><strong>وقت القفل:</strong> ${new Date().toLocaleString('ar-SA')}</p>
                        <p><strong>الحالة:</strong> <span style="color: #00b894;">مقفل وآمن</span></p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ تم إرسال إشعار القفل بنجاح');
        return { success: true };
    } catch (error) {
        console.error('❌ فشل إرسال إشعار القفل:', error);
        return { success: false, error: error.message };
    }
}

// 3. إشعار نظام عام
async function sendSystemAlert(alertType, message, severity = 'medium') {
    try {
        checkEmailConfig();

        const severityColors = {
            high: '#d63031',
            medium: '#fdcb6e', 
            low: '#00b894'
        };

        const severityIcons = {
            high: '🔴',
            medium: '🟡',
            low: '🟢'
        };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ALERT_EMAIL,
            subject: `${severityIcons[severity]} ${alertType} - AntiTheft System`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: ${severityColors[severity]}; text-align: center;">
                        ${severityIcons[severity]} ${alertType}
                    </h2>
                    
                    <div style="background: ${severityColors[severity]}20; padding: 15px; border-radius: 10px;">
                        <p><strong>نوع التنبيه:</strong> ${alertType}</p>
                        <p><strong>مستوى الخطورة:</strong> ${severity}</p>
                        <p><strong>الرسالة:</strong> ${message}</p>
                        <p><strong>الوقت:</strong> ${new Date().toLocaleString('ar-SA')}</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ تم إرسال إشعار النظام: ${alertType}`);
        return { success: true };
    } catch (error) {
        console.error('❌ فشل إرسال إشعار النظام:', error);
        return { success: false, error: error.message };
    }
}

// 4. اختبار خدمة البريد
async function testEmailService() {
    try {
        console.log('🧪 بدء اختبار خدمة البريد...');
        
        await sendSystemAlert(
            'اختبار النظام',
            'هذه رسالة اختبار للتحقق من عمل خدمة البريد الإلكتروني',
            'low'
        );
        
        console.log('✅ اختبار البريد completed successfully');
        return { success: true, message: 'تم اختبار البريد بنجاح' };
    } catch (error) {
        console.error('❌ فشل اختبار البريد:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    sendTheftAlert,
    sendLockNotification,
    sendSystemAlert,
    testEmailService,
    checkEmailConfig
};
