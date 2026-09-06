import fs from 'node:fs';
import path from 'node:path';

const envPath = path.resolve(process.cwd(), '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local dosyası bulunamadı!');
  process.exit(1);
}

const content = fs.readFileSync(envPath, 'utf8');
const envVars = {};
for (const line of content.split('\n')) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      envVars[key] = val;
    }
  }
}

console.log('\n🔍 GROWB API & ENTEGRASYON TESTİ\n' + '='.repeat(45));

async function run() {
  let allGood = true;

  // 1. Google PageSpeed Test
  const pageSpeedKey = envVars.PAGESPEED_API_KEY;
  if (!pageSpeedKey || pageSpeedKey.includes('BURAYA_')) {
    console.log('⚠️  [PAGESPEED] API anahtarı tanımlanmamış.');
    allGood = false;
  } else {
    try {
      const res = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&strategy=mobile&key=${encodeURIComponent(pageSpeedKey)}`
      );
      if (res.ok) {
        console.log('✅ [PAGESPEED] Google PageSpeed API: Bağlantı Başarılı (200 OK)');
      } else if (res.status === 403) {
        console.log('❌ [PAGESPEED] Hata (403): API anahtarı geçersiz veya PageSpeed API etkin değil!');
        allGood = false;
      } else if (res.status === 429) {
        console.log('⚠️  [PAGESPEED] Hata (429): Google API kotası dolu!');
        allGood = false;
      } else {
        console.log(`❌ [PAGESPEED] Google API Hata döndü (${res.status})`);
        allGood = false;
      }
    } catch (err) {
      console.log('❌ [PAGESPEED] Bağlantı kurulamadı:', err.message);
      allGood = false;
    }
  }

  // 2. Telegram Bot Test
  const botToken = envVars.TELEGRAM_BOT_TOKEN;
  const chatId = envVars.TELEGRAM_CHAT_ID;

  if (!botToken || botToken.includes('BURAYA_')) {
    console.log('⚠️  [TELEGRAM] TELEGRAM_BOT_TOKEN henüz girilmemiş (veya yer tutucu metin duruyor).');
    allGood = false;
  } else {
    try {
      const meRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
      const meData = await meRes.json();
      if (meRes.ok && meData.ok) {
        console.log(`✅ [TELEGRAM] Bot Doğrulandı: @${meData.result.username} (${meData.result.first_name})`);

        if (chatId && !chatId.includes('BURAYA_')) {
          const sendRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: '🔔 <b>GrowB Dijital Entegrasyon Testi</b>\n\nTelegram bot ve bildirim kanalı başarıyla bağlandı!',
              parse_mode: 'HTML',
            }),
          });
          const sendData = await sendRes.json();
          if (sendRes.ok && sendData.ok) {
            console.log(`✅ [TELEGRAM] Test Bildirimi Gönderildi! Chat ID: ${chatId}`);
          } else {
            console.log(`⚠️  [TELEGRAM] Bot geçerli fakat ${chatId} ID'sine mesaj iletilemedi: ${sendData.description}`);
            console.log('💡 İpucu: Bota Telegram\'dan en az 1 kez /start mesajı göndermiş olmalısınız.');
            allGood = false;
          }
        } else {
          console.log('⚠️  [TELEGRAM] TELEGRAM_CHAT_ID girilmemiş.');
          allGood = false;
        }
      } else {
        console.log(`❌ [TELEGRAM] Bot Token Geçersiz (HTTP ${meRes.status}): ${meData.description}`);
        allGood = false;
      }
    } catch (err) {
      console.log('❌ [TELEGRAM] Telegram sunucusuna bağlanılamadı:', err.message);
      allGood = false;
    }
  }

  console.log('='.repeat(45));
  if (allGood) {
    console.log('🚀 TÜM ENTEGRASYONLAR HAZIR VE ÇALIŞIYOR!\n');
  } else {
    console.log('ℹ️  Yukarıdaki uyarıları gidermek için .env.local dosyasındaki değerleri kontrol edip güncelleyin.\n');
  }
}

run();
