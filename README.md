# qrgdg — Ücretsiz ve Hızlı QR Kod Oluşturucu

Modern, mobil öncelikli, tamamen istemci tarafında (client-side) çalışan ve hiçbir kişisel veri kaydetmeyen açık kaynaklı QR kod oluşturma ve paylaşma platformu.

## Özellikler

- **28 Farklı QR Türü:**
  - **İnternet:** Web sitesi URL, PDF/dosya linki, online restoran/kafe dijital menü, Google Forms/Typeform, ürün/hizmet sayfası, mobil uygulama indirme bağlantısı.
  - **Sosyal Medya:** WhatsApp sohbet (otomatik mesajlı), Instagram profili, YouTube, TikTok, Facebook, LinkedIn, Telegram, Discord daveti, diğer profiller.
  - **İletişim:** Telefon arama (`tel:`), e-posta (`mailto:`), SMS (`sms:`), vCard (tek dokunuşla rehbere kayıt), MeCard.
  - **Kişisel & Ağ:** Wi-Fi ağına şifresiz bağlanma (`WIFI:`), takvim etkinlikleri (iCalendar).
  - **Konum:** Google Haritalar arama linki, harita koordinatları (`geo:`).
  - **Finans & Özel:** IBAN / ödeme linki, düz metin, özel protokol/JSON formatı.
- **Canlı Ön İzleme:** Form alanları değiştikçe gerçek zamanlı render.
- **Yüksek Çözünürlüklü Dışa Aktarma:**
  - PNG indirme (256px - 2048px).
  - Vektörel SVG indirme (matbaa ve tabela baskısına uygun).
- **Paylaşım Entegrasyonları:**
  - **WhatsApp:** Web Share API veya doğrudan sohbet linki.
  - **Instagram:** Cihaza otomatik kaydetme ve adım adım hikaye paylaşım rehberi.
  - **Kopyalama:** QR görselini veya metin içeriğini panoya kopyalama.
- **Özelleştirme:** Ön plan ve arka plan renk seçici, logo/ikon yükleme, hata düzeltme seviyeleri (L, M, Q, H).
- **Yerel Geçmiş (LocalStorage):** Oluşturulan son kodlar sunucuya gitmeden tarayıcıda saklanır.
- **Koyu ve Açık Tema:** Sistem tercihi ve manuel geçiş desteği.

## Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresine gidin.

## Vercel ile Yayınlama

1. Bu depoyu GitHub hesabınıza forklayın veya ekleyin.
2. [Vercel](https://vercel.com) paneline gidin ve **"Add New Project"** seçin.
3. `qr-gdg` reposunu seçin ve **Deploy** butonuna tıklayın.
4. Sıfır konfigürasyon ile doğrudan yayına alınır.

## Lisans

MIT
