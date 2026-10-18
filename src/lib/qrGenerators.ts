import { QrCategory, QrTypeDefinition, QrTypeId, ValidationNotice } from '@/types/qr';

export const QR_CATEGORIES: { id: QrCategory; name: string; description: string }[] = [
  { id: 'internet', name: 'İnternet', description: 'Web siteleri, PDF, form ve menü bağlantıları' },
  { id: 'social', name: 'Sosyal Medya', description: 'WhatsApp, Instagram, YouTube, TikTok ve diğerleri' },
  { id: 'communication', name: 'İletişim', description: 'Telefon, e-posta, SMS ve vCard rehber kartı' },
  { id: 'business', name: 'İşletme', description: 'Menü, ödeme, ürün ve uygulama bağlantıları' },
  { id: 'personal', name: 'Kişisel & Ağ', description: 'Wi-Fi bağlantısı, takvim ve etkinlikler' },
  { id: 'other', name: 'Diğer', description: 'Düz metin, konum ve özel kombinasyonlar' },
];

export const QR_TYPES: QrTypeDefinition[] = [
  // 1. Web sitesi URL'si
  {
    id: 'url',
    name: 'Web Sitesi URL',
    category: 'internet',
    description: 'Herhangi bir internet sitesine veya bloga yönlendiren QR kod.',
    iconName: 'Globe',
    badge: 'Popüler',
    placeholder: 'https://ornek.com',
    fields: [
      {
        name: 'url',
        label: 'Web Sitesi Adresi (URL)',
        type: 'url',
        placeholder: 'https://siteniz.com',
        required: true,
        helpText: 'http:// veya https:// ile başlayan tam bağlantı adresi.',
      },
    ],
    defaultValues: {
      url: 'https://qrgdg.com',
    },
  },

  // 2. WhatsApp sohbet bağlantısı
  {
    id: 'whatsapp',
    name: 'WhatsApp Sohbet',
    category: 'social',
    description: 'Telefon numaranıza önceden hazırlanmış mesajla doğrudan WhatsApp sohbeti açar.',
    iconName: 'MessageCircle',
    badge: 'Çok Kullanılan',
    fields: [
      {
        name: 'phone',
        label: 'WhatsApp Telefon Numarası',
        type: 'tel',
        placeholder: '+90 555 123 45 67',
        required: true,
        helpText: 'Ülke kodu ile birlikte girin (örn. +905551234567).',
      },
      {
        name: 'message',
        label: 'Otomatik Mesaj (İsteğe Bağlı)',
        type: 'textarea',
        placeholder: 'Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.',
        helpText: 'Kullanıcı QR kodu okuttuğunda WhatsApp mesaj kutusunda bu metin hazır gelecektir.',
      },
    ],
    defaultValues: {
      phone: '+905551234567',
      message: 'Merhaba, QR kodunuz üzerinden ulaşıyorum!',
    },
  },

  // 3. Instagram profil bağlantısı
  {
    id: 'instagram',
    name: 'Instagram Profili',
    category: 'social',
    description: 'Instagram profilinizi doğrudan açan ve takip etmeyi kolaylaştıran QR kod.',
    iconName: 'Instagram',
    badge: 'Trend',
    fields: [
      {
        name: 'username',
        label: 'Instagram Kullanıcı Adı veya Profil Linki',
        type: 'text',
        placeholder: 'kullanici_adiniz veya https://instagram.com/...',
        required: true,
        helpText: '@ işareti olmadan sadece kullanıcı adınızı veya tam linkinizi yazabilirsiniz.',
      },
    ],
    defaultValues: {
      username: 'qrgdg',
    },
  },

  // 4. Diğer sosyal medya profilleri
  {
    id: 'other_social',
    name: 'Diğer Sosyal Medya',
    category: 'social',
    description: 'X (Twitter), Threads, Pinterest, Spotify, Twitch ve diğer profilleriniz.',
    iconName: 'Share2',
    fields: [
      {
        name: 'platform',
        label: 'Sosyal Medya Platformu',
        type: 'select',
        required: true,
        options: [
          { label: 'X (Twitter)', value: 'twitter' },
          { label: 'Threads', value: 'threads' },
          { label: 'Pinterest', value: 'pinterest' },
          { label: 'Spotify', value: 'spotify' },
          { label: 'Twitch', value: 'twitch' },
          { label: 'Snapchat', value: 'snapchat' },
          { label: 'Reddit', value: 'reddit' },
          { label: 'Diğer', value: 'other' },
        ],
      },
      {
        name: 'url',
        label: 'Profil / Sayfa Bağlantısı (URL)',
        type: 'url',
        placeholder: 'https://x.com/kullanici',
        required: true,
      },
    ],
    defaultValues: {
      platform: 'twitter',
      url: 'https://x.com/qrgdg',
    },
  },

  // 5. Düz metin
  {
    id: 'text',
    name: 'Düz Metin',
    category: 'other',
    description: 'İnternet bağlantısı gerektirmeyen; not, şifre, duyuru veya mesajlar.',
    iconName: 'FileText',
    fields: [
      {
        name: 'text',
        label: 'Metin İçeriği',
        type: 'textarea',
        placeholder: 'QR koda dönüştürmek istediğiniz metni buraya yazın...',
        required: true,
        helpText: 'Türkçe karakterleri destekler (ğ, ü, ş, ı, ö, ç).',
      },
    ],
    defaultValues: {
      text: 'qrgdg ile hızlı ve ücretsiz oluşturulmuş metin içeriği.',
    },
  },

  // 6. Telefon numarası
  {
    id: 'phone',
    name: 'Telefon Arama',
    category: 'communication',
    description: 'Taranınca tek dokunuşla belirtilen numarayı aramaya yönlendirir.',
    iconName: 'Phone',
    fields: [
      {
        name: 'phone',
        label: 'Telefon Numarası',
        type: 'tel',
        placeholder: '+90 555 123 45 67',
        required: true,
        helpText: 'Örn: +905551234567 veya 0212 000 00 00',
      },
    ],
    defaultValues: {
      phone: '+905551234567',
    },
  },

  // 7. E-posta adresi
  {
    id: 'email',
    name: 'E-posta Gönderme',
    category: 'communication',
    description: 'Kullanıcının e-posta uygulamasını alıcı, konu ve gövde hazır olarak açar.',
    iconName: 'Mail',
    fields: [
      {
        name: 'email',
        label: 'Alıcı E-posta Adresi',
        type: 'email',
        placeholder: 'iletisim@sirketiniz.com',
        required: true,
      },
      {
        name: 'subject',
        label: 'E-posta Konusu (İsteğe Bağlı)',
        type: 'text',
        placeholder: 'Fiyat Teklifi Talebi',
      },
      {
        name: 'body',
        label: 'Hazır Mesaj Metni (İsteğe Bağlı)',
        type: 'textarea',
        placeholder: 'Merhaba, detaylı bilgi almak istiyorum.',
      },
    ],
    defaultValues: {
      email: 'iletisim@qrgdg.com',
      subject: 'Bilgi Talebi',
      body: 'Merhaba, projeniz hakkında bilgi almak istiyorum.',
    },
  },

  // 8. SMS gönderme bağlantısı
  {
    id: 'sms',
    name: 'SMS Gönderme',
    category: 'communication',
    description: 'Mesaj uygulamasını alıcı numarası ve hazır SMS metni ile açar.',
    iconName: 'MessageSquare',
    fields: [
      {
        name: 'phone',
        label: 'SMS Gönderilecek Numara',
        type: 'tel',
        placeholder: '+90 555 123 45 67',
        required: true,
      },
      {
        name: 'body',
        label: 'Hazır SMS Metni (İsteğe Bağlı)',
        type: 'textarea',
        placeholder: 'ONAY veya KATILIM',
      },
    ],
    defaultValues: {
      phone: '+905551234567',
      body: 'ONAY',
    },
  },

  // 9. Wi-Fi ağına bağlanma
  {
    id: 'wifi',
    name: 'Wi-Fi Bağlantısı',
    category: 'personal',
    description: 'Misafirlerinizin şifre yazmadan Wi-Fi ağına otomatik bağlanmasını sağlar.',
    iconName: 'Wifi',
    badge: 'Çok Popüler',
    fields: [
      {
        name: 'ssid',
        label: 'Ağ Adı (SSID)',
        type: 'text',
        placeholder: 'Ev_Interneti veya Kafe_WiFi',
        required: true,
      },
      {
        name: 'encryption',
        label: 'Güvenlik Türü',
        type: 'select',
        required: true,
        options: [
          { label: 'WPA / WPA2 / WPA3 (En Yaygın)', value: 'WPA' },
          { label: 'WEP (Eski)', value: 'WEP' },
          { label: 'Şifresiz (Açık Ağ)', value: 'nopass' },
        ],
      },
      {
        name: 'password',
        label: 'Wi-Fi Şifresi',
        type: 'text',
        placeholder: 'Kablosuz Ağ Şifreniz',
      },
      {
        name: 'hidden',
        label: 'Gizli Ağ (SSID Gizli mi?)',
        type: 'checkbox',
      },
    ],
    defaultValues: {
      ssid: 'qrgdg_Misafir',
      encryption: 'WPA',
      password: 'guclusifre2026',
      hidden: false,
    },
  },

  // 10. Kişi kartı (vCard)
  {
    id: 'vcard',
    name: 'Dijital Kartvizit (vCard)',
    category: 'communication',
    description: 'Ad, soyad, telefon, e-posta ve şirket bilgilerini tek dokunuşla rehbere ekler.',
    iconName: 'Contact',
    badge: 'İşletmeler İçin',
    fields: [
      { name: 'firstName', label: 'Ad', type: 'text', placeholder: 'Ahmet', required: true },
      { name: 'lastName', label: 'Soyad', type: 'text', placeholder: 'Yılmaz', required: true },
      { name: 'phone', label: 'Cep Telefonu', type: 'tel', placeholder: '+90 555 123 45 67', required: true },
      { name: 'email', label: 'E-posta', type: 'email', placeholder: 'ahmet@sirket.com' },
      { name: 'company', label: 'Şirket / Kurum', type: 'text', placeholder: 'Teknoloji A.Ş.' },
      { name: 'title', label: 'Ünvan / Pozisyon', type: 'text', placeholder: 'Yazılım Mühendisi' },
      { name: 'website', label: 'Web Sitesi', type: 'url', placeholder: 'https://sirketiniz.com' },
      { name: 'address', label: 'Adres', type: 'text', placeholder: 'Levent, Beşiktaş, İstanbul' },
    ],
    defaultValues: {
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      phone: '+905551234567',
      email: 'ahmet@ornek.com',
      company: 'qrgdg Bilişim',
      title: 'Genel Koordinatör',
      website: 'https://qrgdg.com',
      address: 'İstanbul, Türkiye',
    },
  },

  // 11. Konum ve harita bağlantısı
  {
    id: 'geo',
    name: 'Konum Koordinatları',
    category: 'other',
    description: 'Enlem ve boylam koordinatlarıyla harita uygulamasında tam pini açar.',
    iconName: 'Navigation',
    fields: [
      { name: 'latitude', label: 'Enlem (Latitude)', type: 'text', placeholder: '41.0082', required: true },
      { name: 'longitude', label: 'Boylam (Longitude)', type: 'text', placeholder: '28.9784', required: true },
      { name: 'locationName', label: 'Konum / Mekan Adı', type: 'text', placeholder: 'Sultanahmet Meydanı' },
    ],
    defaultValues: {
      latitude: '41.0082',
      longitude: '28.9784',
      locationName: 'Tarihi Yarımada',
    },
  },

  // 12. YouTube videosu
  {
    id: 'youtube',
    name: 'YouTube Video veya Kanal',
    category: 'social',
    description: 'YouTube videonuzu, shorts veya kanalınızı doğrudan açtırın.',
    iconName: 'PlaySquare',
    fields: [
      {
        name: 'url',
        label: 'YouTube Video veya Kanal Bağlantısı',
        type: 'url',
        placeholder: 'https://youtube.com/watch?v=... veya youtu.be/...',
        required: true,
      },
    ],
    defaultValues: {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
  },

  // 13. TikTok profili
  {
    id: 'tiktok',
    name: 'TikTok Profili',
    category: 'social',
    description: 'TikTok hesabınızı tek tıkla takip ettirin veya videonuzu paylaşın.',
    iconName: 'Video',
    fields: [
      {
        name: 'username',
        label: 'TikTok Kullanıcı Adı veya Video Bağlantısı',
        type: 'text',
        placeholder: 'kullanici_adiniz veya https://tiktok.com/@...',
        required: true,
      },
    ],
    defaultValues: {
      username: 'qrgdg',
    },
  },

  // 14. Facebook profili
  {
    id: 'facebook',
    name: 'Facebook Sayfası / Profil',
    category: 'social',
    description: 'Facebook işletme sayfası, topluluk grubu veya profil bağlantısı.',
    iconName: 'Facebook',
    fields: [
      {
        name: 'url',
        label: 'Facebook Profil / Sayfa Bağlantısı',
        type: 'url',
        placeholder: 'https://facebook.com/sayfaniz',
        required: true,
      },
    ],
    defaultValues: {
      url: 'https://facebook.com/qrgdg',
    },
  },

  // 15. LinkedIn profili
  {
    id: 'linkedin',
    name: 'LinkedIn Profili',
    category: 'social',
    description: 'Kişisel profil veya şirketinizin LinkedIn sayfasına hızlı erişim.',
    iconName: 'Linkedin',
    fields: [
      {
        name: 'url',
        label: 'LinkedIn Profil veya Şirket Sayfası Linki',
        type: 'url',
        placeholder: 'https://linkedin.com/in/adiniz veya /company/...',
        required: true,
      },
    ],
    defaultValues: {
      url: 'https://linkedin.com/company/qrgdg',
    },
  },

  // 16. Telegram bağlantısı
  {
    id: 'telegram',
    name: 'Telegram Kanal / Sohbet',
    category: 'social',
    description: 'Telegram kanalınıza, grubunuza veya kullanıcı adınıza yönlendirin.',
    iconName: 'Send',
    fields: [
      {
        name: 'username',
        label: 'Telegram Kullanıcı Adı, Kanal veya Linki',
        type: 'text',
        placeholder: 'kanal_adiniz veya t.me/kanal_adiniz',
        required: true,
      },
    ],
    defaultValues: {
      username: 'qrgdg',
    },
  },

  // 17. Discord davet bağlantısı
  {
    id: 'discord',
    name: 'Discord Sunucu Daveti',
    category: 'social',
    description: 'Discord topluluğunuza veya yayın sunucunuza anında katılma bağlantısı.',
    iconName: 'Headphones',
    fields: [
      {
        name: 'inviteUrl',
        label: 'Discord Davet Bağlantısı',
        type: 'url',
        placeholder: 'https://discord.gg/ornekdavet',
        required: true,
      },
    ],
    defaultValues: {
      inviteUrl: 'https://discord.gg/qrgdg',
    },
  },

  // 18. Etkinlik bilgileri (iCalendar)
  {
    id: 'event',
    name: 'Etkinlik Bilgileri (iCal)',
    category: 'personal',
    description: 'Kullanıcının telefon takvimine tarihi, saati ve konumu otomatik kaydeder.',
    iconName: 'Calendar',
    badge: 'Takvim',
    fields: [
      { name: 'title', label: 'Etkinlik Başlığı', type: 'text', placeholder: 'Yıllık Lansman Toplantısı', required: true },
      { name: 'location', label: 'Etkinlik Yeri / Konumu', type: 'text', placeholder: 'Grand Otel Konferans Salonu' },
      { name: 'startDate', label: 'Başlangıç Tarihi ve Saati', type: 'datetime-local', required: true },
      { name: 'endDate', label: 'Bitiş Tarihi ve Saati', type: 'datetime-local', required: true },
      { name: 'description', label: 'Etkinlik Açıklaması', type: 'textarea', placeholder: 'Gündem maddeleri ve davet detayları...' },
    ],
    defaultValues: {
      title: 'qrgdg Topluluk Buluşması',
      location: 'İstanbul Kongre Merkezi',
      startDate: '2026-11-01T14:00',
      endDate: '2026-11-01T17:00',
      description: 'Yeni nesil web teknolojileri ve dijital çözümler üzerine sohbet.',
    },
  },

  // 19. Takvim etkinliği
  {
    id: 'calendar',
    name: 'Hızlı Takvim Hatırlatıcı',
    category: 'personal',
    description: 'Önemli toplantı, randevu veya doğum günlerini takvime işleyin.',
    iconName: 'Clock',
    fields: [
      { name: 'title', label: 'Hatırlatıcı Başlığı', type: 'text', placeholder: 'Doktor Randevusu', required: true },
      { name: 'startDate', label: 'Tarih ve Saat', type: 'datetime-local', required: true },
      { name: 'note', label: 'Not / Hatırlatma', type: 'text', placeholder: 'Randevu evraklarını unutma' },
    ],
    defaultValues: {
      title: 'Proje Sunumu',
      startDate: '2026-10-25T10:30',
      note: 'Sunum dosyaları hazır bulunacak.',
    },
  },

  // 20. Telefon rehberine kişi ekleme (MeCard)
  {
    id: 'mecard',
    name: 'Hızlı Kişi Ekleme (MeCard)',
    category: 'communication',
    description: 'Kompakt format ile eski model telefonlarda bile anında rehbere kişi kaydeder.',
    iconName: 'UserCheck',
    fields: [
      { name: 'name', label: 'Ad ve Soyad', type: 'text', placeholder: 'Mehmet Demir', required: true },
      { name: 'phone', label: 'Telefon Numarası', type: 'tel', placeholder: '+90 532 000 00 00', required: true },
      { name: 'email', label: 'E-posta (İsteğe Bağlı)', type: 'email', placeholder: 'mehmet@ornek.com' },
      { name: 'note', label: 'Not (İsteğe Bağlı)', type: 'text', placeholder: 'Müşteri Temsilcisi' },
    ],
    defaultValues: {
      name: 'Mehmet Demir',
      phone: '+905320000000',
      email: 'mehmet@demir.com',
      note: 'Saha Yetkilisi',
    },
  },

  // 21. PDF veya dosya bağlantısı
  {
    id: 'pdf',
    name: 'PDF / Dosya Bağlantısı',
    category: 'internet',
    description: 'Google Drive, Dropbox veya sunucunuzdaki PDF katalog, broşür veya dosya linki.',
    iconName: 'FileCheck',
    badge: 'Broşür & Menü',
    fields: [
      {
        name: 'fileUrl',
        label: 'PDF / Dosya Bağlantı Adresi',
        type: 'url',
        placeholder: 'https://drive.google.com/... veya https://site.com/dosya.pdf',
        required: true,
        helpText: 'Bağlantının "Herkese Açık" paylaşıldığından emin olun.',
      },
      {
        name: 'documentTitle',
        label: 'Belge Adı (İsteğe Bağlı Başlık)',
        type: 'text',
        placeholder: '2026 Ürün Kataloğu PDF',
      },
    ],
    defaultValues: {
      fileUrl: 'https://ornek.com/katalog.pdf',
      documentTitle: '2026 Ürün Kataloğu',
    },
  },

  // 22. Online menü bağlantısı
  {
    id: 'menu',
    name: 'Dijital Menü (Restoran & Kafe)',
    category: 'business',
    description: 'Restoran masaları için temassız dijital menü ve isteğe bağlı masa numarası.',
    iconName: 'Utensils',
    badge: 'Kafe & Restoran',
    fields: [
      {
        name: 'menuUrl',
        label: 'Menü Web Sitesi Adresi',
        type: 'url',
        placeholder: 'https://restoraniniz.com/menu',
        required: true,
      },
      {
        name: 'tableNumber',
        label: 'Masa Numarası (İsteğe Bağlı)',
        type: 'text',
        placeholder: 'Masa 14',
        helpText: 'Masa numarası girilirse linke parametre olarak eklenir (örn: ?masa=14).',
      },
      {
        name: 'restaurantName',
        label: 'Mekan / Restoran Adı',
        type: 'text',
        placeholder: 'Kafemiz & Bistro',
      },
    ],
    defaultValues: {
      menuUrl: 'https://ornekkafe.com/menu',
      tableNumber: 'Masa 5',
      restaurantName: 'QR Kolay Kafe',
    },
  },

  // 23. Ödeme bağlantısı
  {
    id: 'payment',
    name: 'Ödeme Bağlantısı & IBAN',
    category: 'business',
    description: 'IBAN, FAST, Papara, Kripto veya İyzico / Shopier gibi ödeme linki.',
    iconName: 'CreditCard',
    badge: 'Ticari',
    fields: [
      {
        name: 'paymentType',
        label: 'Ödeme Şekli',
        type: 'select',
        required: true,
        options: [
          { label: 'IBAN / FAST Transfer Bilgisi', value: 'iban' },
          { label: 'Online Ödeme Linki (Shopier, İyzico, Stripe)', value: 'link' },
          { label: 'Kripto Cüzdan Adresi', value: 'crypto' },
        ],
      },
      {
        name: 'target',
        label: 'IBAN Numarası veya Ödeme Linki',
        type: 'text',
        placeholder: 'TR33 0006 1005 1234 5678 9012 34 veya https://shopier.com/...',
        required: true,
      },
      {
        name: 'recipientName',
        label: 'Hesap Sahibi / Alıcı Adı',
        type: 'text',
        placeholder: 'Ahmet Yılmaz veya Şirket Ünvanı',
      },
      {
        name: 'amount',
        label: 'Tutar ve Para Birimi (İsteğe Bağlı)',
        type: 'text',
        placeholder: '250 TL',
      },
    ],
    defaultValues: {
      paymentType: 'iban',
      target: 'TR330006100512345678901234',
      recipientName: 'qrgdg Bilişim Hizmetleri',
      amount: '500 TL',
    },
  },

  // 24. Uygulama indirme bağlantısı
  {
    id: 'app',
    name: 'Uygulama İndirme Bağlantısı',
    category: 'business',
    description: 'Mobil uygulamanızı App Store, Google Play veya ortak açılış sayfasına yönlendirir.',
    iconName: 'Smartphone',
    fields: [
      {
        name: 'storeUrl',
        label: 'Uygulama Mağazası Linki',
        type: 'url',
        placeholder: 'https://apps.apple.com/... veya https://play.google.com/...',
        required: true,
      },
      {
        name: 'appName',
        label: 'Uygulama Adı',
        type: 'text',
        placeholder: 'qrgdg Mobil',
      },
    ],
    defaultValues: {
      storeUrl: 'https://play.google.com/store/apps/details?id=com.example.app',
      appName: 'qrgdg Mobil',
    },
  },

  // 25. Google Maps konum bağlantısı
  {
    id: 'maps',
    name: 'Google Haritalar (Mekan Linki)',
    category: 'other',
    description: 'İşletmenizin veya etkinliğin Google Haritalar pinini doğrudan açar.',
    iconName: 'MapPin',
    badge: 'Mekanlar İçin',
    fields: [
      {
        name: 'mapsUrl',
        label: 'Google Harita Bağlantısı veya Arama İfadesi',
        type: 'text',
        placeholder: 'https://maps.app.goo.gl/... veya "Galata Kulesi, İstanbul"',
        required: true,
        helpText: 'Google Haritalar uygulamasından "Paylaş" diyerek kopyaladığınız linki yapıştırabilirsiniz.',
      },
    ],
    defaultValues: {
      mapsUrl: 'https://maps.google.com/?q=Galata+Kulesi+Istanbul',
    },
  },

  // 26. Form bağlantısı
  {
    id: 'form',
    name: 'Form & Anket Bağlantısı',
    category: 'internet',
    description: 'Google Formlar, Typeform, Microsoft Forms veya anket linki.',
    iconName: 'ClipboardList',
    fields: [
      {
        name: 'formUrl',
        label: 'Form / Anket Linki',
        type: 'url',
        placeholder: 'https://forms.gle/... veya https://typeform.com/...',
        required: true,
      },
      {
        name: 'formTitle',
        label: 'Form Başlığı (İsteğe Bağlı)',
        type: 'text',
        placeholder: 'Müşteri Memnuniyet Anketi',
      },
    ],
    defaultValues: {
      formUrl: 'https://forms.gle/ornekform',
      formTitle: 'Geri Bildirim Anketi',
    },
  },

  // 27. Ürün veya hizmet sayfası
  {
    id: 'product',
    name: 'Ürün & Hizmet Sayfası',
    category: 'business',
    description: 'E-ticaret ürün detay sayfası, kampanya veya indirim kodu bilgisi.',
    iconName: 'ShoppingBag',
    fields: [
      {
        name: 'productUrl',
        label: 'Ürün Sayfası URL',
        type: 'url',
        placeholder: 'https://magazaniz.com/urun-detay',
        required: true,
      },
      {
        name: 'productName',
        label: 'Ürün / Hizmet Adı',
        type: 'text',
        placeholder: 'Kablosuz Kulaklık Pro',
      },
      {
        name: 'couponCode',
        label: 'İndirim Kupon Kodu (İsteğe Bağlı)',
        type: 'text',
        placeholder: 'INDIRIM20',
      },
    ],
    defaultValues: {
      productUrl: 'https://magazaniz.com/urunler/kulaklik',
      productName: 'Akıllı Kulaklık',
      couponCode: 'KOLAY15',
    },
  },

  // 28. Özel metin ve bağlantı kombinasyonları
  {
    id: 'custom',
    name: 'Özel Kodlama & Gelişmiş',
    category: 'other',
    description: 'Kendi özel protokolünüzü, JSON verisini veya şablonunuzu oluşturun.',
    iconName: 'Code',
    fields: [
      {
        name: 'prefix',
        label: 'Ön Ek / Protokol (İsteğe Bağlı)',
        type: 'text',
        placeholder: 'myapp:// veya skype: veya bitcoin:',
      },
      {
        name: 'payload',
        label: 'Özel Veri / Metin',
        type: 'textarea',
        placeholder: 'Özel veri veya JSON içeriği...',
        required: true,
      },
    ],
    defaultValues: {
      prefix: '',
      payload: '{"app":"qrgdg","version":"1.0","action":"checkin"}',
    },
  },
];

// Helper to normalize URLs
export function normalizeUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

// Helper to clean phone numbers (keep + and digits)
export function cleanPhoneNumber(phone: string): string {
  if (!phone) return '';
  const hasPlus = phone.trim().startsWith('+');
  const digits = phone.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
}

// Generate the exact payload string for each QR Type
export function generateQrPayload(typeId: QrTypeId, values: Record<string, any>): string {
  switch (typeId) {
    case 'url': {
      return normalizeUrl(values.url || 'https://qrgdg.com');
    }

    case 'whatsapp': {
      const phone = cleanPhoneNumber(values.phone || '');
      const cleanDigits = phone.replace(/\+/g, '');
      const message = values.message ? encodeURIComponent(values.message.trim()) : '';
      if (!cleanDigits) return 'https://wa.me/';
      return message ? `https://wa.me/${cleanDigits}?text=${message}` : `https://wa.me/${cleanDigits}`;
    }

    case 'instagram': {
      const raw = (values.username || '').trim();
      if (!raw) return 'https://instagram.com';
      if (raw.startsWith('http')) return normalizeUrl(raw);
      const cleanUsername = raw.replace(/^@/, '').trim();
      return `https://instagram.com/${cleanUsername}`;
    }

    case 'other_social': {
      return normalizeUrl(values.url || '');
    }

    case 'text': {
      return (values.text || '').trim();
    }

    case 'phone': {
      const phone = cleanPhoneNumber(values.phone || '');
      return `tel:${phone}`;
    }

    case 'email': {
      const email = (values.email || '').trim();
      const params: string[] = [];
      if (values.subject) params.push(`subject=${encodeURIComponent(values.subject.trim())}`);
      if (values.body) params.push(`body=${encodeURIComponent(values.body.trim())}`);
      const query = params.length > 0 ? `?${params.join('&')}` : '';
      return `mailto:${email}${query}`;
    }

    case 'sms': {
      const phone = cleanPhoneNumber(values.phone || '');
      const body = values.body ? `?body=${encodeURIComponent(values.body.trim())}` : '';
      return `sms:${phone}${body}`;
    }

    case 'wifi': {
      const ssid = (values.ssid || '').trim();
      const enc = values.encryption || 'WPA';
      const password = (values.password || '').trim();
      const hidden = values.hidden ? 'true' : 'false';
      if (enc === 'nopass') {
        return `WIFI:T:nopass;S:${ssid};H:${hidden};;`;
      }
      return `WIFI:T:${enc};S:${ssid};P:${password};H:${hidden};;`;
    }

    case 'vcard': {
      const first = (values.firstName || '').trim();
      const last = (values.lastName || '').trim();
      const fullName = `${first} ${last}`.trim();
      const phone = cleanPhoneNumber(values.phone || '');
      const email = (values.email || '').trim();
      const org = (values.company || '').trim();
      const title = (values.title || '').trim();
      const website = values.website ? normalizeUrl(values.website) : '';
      const address = (values.address || '').trim();

      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${last};${first};;;`,
        `FN:${fullName}`,
      ];

      if (org) lines.push(`ORG:${org}`);
      if (title) lines.push(`TITLE:${title}`);
      if (phone) lines.push(`TEL;TYPE=CELL:${phone}`);
      if (email) lines.push(`EMAIL:${email}`);
      if (website) lines.push(`URL:${website}`);
      if (address) lines.push(`ADR:;;${address};;;;`);
      lines.push('END:VCARD');

      return lines.join('\n');
    }

    case 'geo': {
      const lat = (values.latitude || '0').trim();
      const lng = (values.longitude || '0').trim();
      const name = values.locationName ? ` (${values.locationName.trim()})` : '';
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}${encodeURIComponent(name)}`;
    }

    case 'youtube': {
      return normalizeUrl(values.url || '');
    }

    case 'tiktok': {
      const raw = (values.username || '').trim();
      if (!raw) return 'https://tiktok.com';
      if (raw.startsWith('http')) return normalizeUrl(raw);
      const cleanUser = raw.replace(/^@/, '').trim();
      return `https://www.tiktok.com/@${cleanUser}`;
    }

    case 'facebook': {
      return normalizeUrl(values.url || '');
    }

    case 'linkedin': {
      return normalizeUrl(values.url || '');
    }

    case 'telegram': {
      const raw = (values.username || '').trim();
      if (!raw) return 'https://t.me/';
      if (raw.startsWith('http')) return normalizeUrl(raw);
      const cleanUser = raw.replace(/^@/, '').replace(/^t\.me\//, '').trim();
      return `https://t.me/${cleanUser}`;
    }

    case 'discord': {
      return normalizeUrl(values.inviteUrl || '');
    }

    case 'event': {
      const title = (values.title || 'Etkinlik').trim();
      const location = (values.location || '').trim();
      const desc = (values.description || '').trim();
      const formatIcalDate = (dt: string) => {
        if (!dt) return '';
        // YYYY-MM-DDTHH:mm to YYYYMMDDTHHmm00Z
        return dt.replace(/[-:]/g, '') + '00Z';
      };
      const start = formatIcalDate(values.startDate || '');
      const end = formatIcalDate(values.endDate || '');

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//qrgdg//TR',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
      ];
      if (location) lines.push(`LOCATION:${location}`);
      if (desc) lines.push(`DESCRIPTION:${desc}`);
      if (start) lines.push(`DTSTART:${start}`);
      if (end) lines.push(`DTEND:${end}`);
      lines.push('END:VEVENT', 'END:VCALENDAR');
      return lines.join('\n');
    }

    case 'calendar': {
      const title = (values.title || 'Hatırlatıcı').trim();
      const dt = (values.startDate || '').replace(/[-:]/g, '') + '00Z';
      const note = (values.note || '').trim();
      return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        dt ? `DTSTART:${dt}` : '',
        note ? `DESCRIPTION:${note}` : '',
        'END:VEVENT',
        'END:VCALENDAR',
      ].filter(Boolean).join('\n');
    }

    case 'mecard': {
      const name = (values.name || '').trim();
      const phone = cleanPhoneNumber(values.phone || '');
      const email = (values.email || '').trim();
      const note = (values.note || '').trim();

      const parts = [`N:${name}`, `TEL:${phone}`];
      if (email) parts.push(`EMAIL:${email}`);
      if (note) parts.push(`NOTE:${note}`);
      return `MECARD:${parts.join(';')};;`;
    }

    case 'pdf': {
      return normalizeUrl(values.fileUrl || '');
    }

    case 'menu': {
      const menuUrl = normalizeUrl(values.menuUrl || '');
      const table = (values.tableNumber || '').trim();
      if (!table) return menuUrl;
      const separator = menuUrl.includes('?') ? '&' : '?';
      return `${menuUrl}${separator}masa=${encodeURIComponent(table)}`;
    }

    case 'payment': {
      if (values.paymentType === 'iban') {
        const iban = (values.target || '').replace(/\s+/g, '').toUpperCase();
        const recipient = (values.recipientName || '').trim();
        const amount = (values.amount || '').trim();
        const parts = [`IBAN: ${iban}`];
        if (recipient) parts.push(`Alıcı: ${recipient}`);
        if (amount) parts.push(`Tutar: ${amount}`);
        return parts.join('\n');
      }
      return normalizeUrl(values.target || '');
    }

    case 'app': {
      return normalizeUrl(values.storeUrl || '');
    }

    case 'maps': {
      const mapsUrl = (values.mapsUrl || '').trim();
      if (mapsUrl.startsWith('http')) return normalizeUrl(mapsUrl);
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsUrl)}`;
    }

    case 'form': {
      return normalizeUrl(values.formUrl || '');
    }

    case 'product': {
      const url = normalizeUrl(values.productUrl || '');
      const coupon = (values.couponCode || '').trim();
      if (!coupon) return url;
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}kupon=${encodeURIComponent(coupon)}`;
    }

    case 'custom': {
      const prefix = (values.prefix || '').trim();
      const payload = (values.payload || '').trim();
      return `${prefix}${payload}`;
    }

    default:
      return 'https://qrgdg.com';
  }
}

// Generate short readable summary of what is encoded
export function getPayloadSummary(typeId: QrTypeId, values: Record<string, any>): string {
  switch (typeId) {
    case 'url':
      return values.url || 'Web sitesi';
    case 'whatsapp':
      return `WhatsApp: ${values.phone || ''} ${values.message ? `("${values.message.slice(0, 30)}...")` : ''}`;
    case 'instagram':
      return `Instagram: @${(values.username || '').replace(/^@/, '')}`;
    case 'wifi':
      return `Wi-Fi: ${values.ssid || 'Ağ'} (${values.encryption || 'WPA'})`;
    case 'vcard':
      return `Kişi: ${values.firstName || ''} ${values.lastName || ''} - ${values.phone || ''}`;
    case 'phone':
      return `Arama: ${values.phone || ''}`;
    case 'email':
      return `E-posta: ${values.email || ''}`;
    case 'sms':
      return `SMS: ${values.phone || ''}`;
    case 'menu':
      return `Dijital Menü: ${values.restaurantName || ''} ${values.tableNumber ? `(${values.tableNumber})` : ''}`;
    case 'payment':
      return values.paymentType === 'iban' ? `IBAN Transferi (${values.target || ''})` : `Ödeme Bağlantısı`;
    case 'event':
      return `Etkinlik: ${values.title || ''}`;
    case 'pdf':
      return `PDF Belgesi: ${values.documentTitle || values.fileUrl || ''}`;
    case 'maps':
      return `Harita: ${values.mapsUrl || ''}`;
    default:
      return values.text || values.url || 'Özel QR İçeriği';
  }
}

// Calculate color contrast ratio (WCAG 2.1)
export function getContrastRatio(hex1: string, hex2: string): number {
  const getLuminance = (hex: string): number => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map((c) => c + c).join('');
    }
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const sRGB = [r, g, b].map((val) => {
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  try {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  } catch {
    return 10;
  }
}

// Check validity and generate warnings if settings may hinder scanning
export function validateQrSettings(
  payload: string,
  fgColor: string,
  bgColor: string,
  hasLogo: boolean,
  errorCorrectionLevel: string
): ValidationNotice[] {
  const notices: ValidationNotice[] = [];

  if (!payload || payload.trim().length === 0) {
    notices.push({
      type: 'error',
      message: 'Lütfen QR kodu oluşturmak için gerekli alanları doldurun.',
    });
    return notices;
  }

  // Length check
  if (payload.length > 900) {
    notices.push({
      type: 'warning',
      message: `İçerik çok uzun (${payload.length} karakter). QR kod noktacıkları sıklaşacak ve küçük ekranlarda okunması zorlaşabilir. Mümkünse link kısaltıcı kullanın.`,
    });
  }

  // Contrast check
  const contrast = getContrastRatio(fgColor, bgColor);
  if (contrast < 3.0) {
    notices.push({
      type: 'warning',
      message: 'Renk kontrastı düşük (Oran: ' + contrast.toFixed(1) + ':1). Telefon kameraları okumakta zorlanabilir. Koyu QR rengi ve açık arka plan önerilir.',
    });
  }

  // Logo error correction warning
  if (hasLogo && (errorCorrectionLevel === 'L' || errorCorrectionLevel === 'M')) {
    notices.push({
      type: 'info',
      message: 'QR kod içine logo eklediğinizde hata düzeltme seviyesini "Yüksek (Q)" veya "Maksimum (H)" yapmanız önerilir.',
    });
  }

  return notices;
}
