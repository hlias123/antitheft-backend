const emailService = require('./emailService');

async function runTests() {
    console.log('🧪 بدء اختبار نظام البريد...\\n');

    // اختبار 1: التحقق من الإعدادات
    try {
        console.log('1. 🔍 التحقق من إعدادات البريد...');
        emailService.checkEmailConfig();
        console.log('   ✅ إعدادات البريد صحيحة\\n');
    } catch (error) {
        console.log('   ❌ خطأ في الإعدادات:', error.message);
        return;
    }

    // اختبار 2: إرسال إشعار نظام
    console.log('2. 📧 اختبار إرسال بريد...');
    const testResult = await emailService.testEmailService();
    
    if (testResult.success) {
        console.log('   ✅ تم إرسال البريد بنجاح\\n');
    } else {
        console.log('   ❌ فشل إرسال البريد:', testResult.error);
    }

    // اختبار 3: إشعار سرقة وهمي
    console.log('3. 🚨 اختبار إشعار السرقة...');
    try {
        const theftResult = await emailService.sendTheftAlert(
            {
                deviceId: 'TEST-001',
                ownerName: 'مستخدم اختبار',
                model: 'Samsung Galaxy S23'
            },
            {
                address: 'شارع الاختبار، الرياض',
                coordinates: '24.7136, 46.6753'
            }
        );

        if (theftResult.success) {
            console.log('   ✅ تم إرسال إشعار السرقة\\n');
        } else {
            console.log('   ⚠️ إشعار السرقة:', theftResult.error);
        }
    } catch (error) {
        console.log('   ❌ خطأ في إشعار السرقة:', error.message);
    }

    console.log('🎊 انتهى الاختبار');
}

runTests();
