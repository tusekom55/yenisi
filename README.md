# CryptoFX - Modern Trading Platform

Gelişmiş, modern ve şık bir kripto/forex trading platformunun frontend tasarımı.

## 🚀 Özellikler

### 🎯 Ana Sayfa
- Giriş/kayıt butonları ile kullanıcı dostu arayüz
- Canlı coin fiyatları ve market verileri
- Platform avantajlarını gösteren tanıtım alanı
- Responsive tasarım ve animasyonlar

### 👤 Kullanıcı Paneli
- Modern kayıt/giriş sayfaları (email/şifre)
- Detaylı kullanıcı profili yönetimi
- Hesap doğrulama ve güvenlik ayarları
- Bildirim tercihleri

### 💸 Kripto Trading
- 500+ kripto para ile trading
- Coin seçme ve filtreleme sistemi
- Interaktif trading grafikleri
- Pozisyon yönetimi ve P&L takibi
- Al/sat işlem paneli

### 📈 Forex Trading
- 35+ döviz çifti
- 100:1'e kadar kaldıraç
- Stop Loss ve Take Profit yönetimi
- Ekonomik takvim entegrasyonu
- Risk yönetim araçları

### 💳 Para İşlemleri
- Çoklu ödeme yöntemi (Papara, Havale, Kredi Kartı)
- Anlık para yatırma/çekme
- İşlem geçmişi ve durum takibi
- Otomatik ücret hesaplama

### 🛠️ Admin Paneli
- Kullanıcı yönetimi ve durum kontrolü
- Para yatırma/çekme onay sistemi
- Yeni coin ekleme formu
- Sistem istatistikleri ve raporlama

### 📃 Fatura Sistemi
- Otomatik fatura oluşturma
- PDF önizleme ve indirme
- Detaylı işlem dökümü
- E-posta ile gönderim

## 🛠️ Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Modern styling
- **Framer Motion** - Animasyonlar
- **Lucide React** - İkonlar
- **Recharts** - Grafik bileşenleri

## 🎨 Tasarım Özellikleri

- **Dark/Light Mode** - Tema değiştirme
- **Responsive Design** - Tüm cihazlarda uyumlu
- **Modern UI/UX** - Kullanıcı dostu arayüz
- **Smooth Animations** - Akıcı geçişler
- **Professional Layout** - Dashboard tasarım

## 📱 Sayfa Yapısı

```
├── Ana Sayfa (/)
├── Giriş/Kayıt (/auth/login, /auth/register)
├── Dashboard (/dashboard)
├── Profil (/profile)
├── Kripto Trading (/trading)
├── Forex Trading (/forex)
├── Para İşlemleri (/wallet)
├── Admin Paneli (/admin)
└── Fatura (/invoice)
```

## 🚦 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda `http://localhost:3000` adresini açın.

## 📦 Proje Yapısı

```
src/
├── app/                 # Next.js App Router sayfaları
├── components/          # React bileşenleri
│   ├── Layout/         # Layout bileşenleri
│   ├── Trading/        # Trading bileşenleri
│   ├── UI/            # Temel UI bileşenleri
│   └── Providers/      # Context providers
├── data/               # Mock data
├── hooks/              # Custom hooks
├── lib/                # Utility fonksiyonları
└── types/              # TypeScript type tanımları
```

## 🎯 Öne Çıkan Özellikler

### Modern Trading Interface
- Gerçek zamanlı fiyat göstergeleri
- Interaktif grafikler ve teknik analiz
- Hızlı işlem panelleri
- Pozisyon yönetimi

### Güvenlik & Kullanıcı Deneyimi
- İki faktörlü doğrulama (2FA) UI
- Hesap doğrulama sistemi
- Risk uyarıları ve limitler
- Kullanıcı dostu onboarding

### Admin & Yönetim
- Kapsamlı admin paneli
- Kullanıcı ve işlem yönetimi
- Raporlama ve analitik
- Sistem durumu izleme

## 🔧 Özelleştirme

Tailwind CSS konfigürasyonu `tailwind.config.js` dosyasında özelleştirilebilir. 
Tema renkleri, animasyonlar ve responsive breakpoint'ler kolayca değiştirilebilir.

## 📝 Notlar

- Bu proje sadece frontend tasarımıdır (mockup)
- Gerçek API entegrasyonu yapılmamıştır
- Tüm veriler dummy/test verisidir
- Gerçek para işlemleri gerçekleştirilmez

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**⚠️ Risk Uyarısı:** Bu bir demo/mockup projesidir. Gerçek finansal işlemler için kullanılmamalıdır.