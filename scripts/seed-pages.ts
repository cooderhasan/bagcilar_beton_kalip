import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pages = [
    {
        slug: 'privacy-policy',
        title: {
            tr: 'Gizlilik Politikası',
            en: 'Privacy Policy'
        },
        content: {
            tr: `<h2>1. Giriş</h2>
<p>Bağcılar Beton Kalıp olarak, kişisel verilerinizin gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.</p>

<h2>2. Toplanan Bilgiler</h2>
<p>Web sitemizi ziyaret ettiğinizde aşağıdaki bilgileri toplayabiliriz:</p>
<ul>
<li>İletişim formu aracılığıyla gönderdiğiniz ad, e-posta ve telefon bilgileri</li>
<li>Teklif talebi formu aracılığıyla paylaştığınız proje bilgileri</li>
<li>Çerezler aracılığıyla toplanan anonim kullanım verileri</li>
</ul>

<h2>3. Bilgilerin Kullanımı</h2>
<p>Topladığımız bilgileri şu amaçlarla kullanmaktayız:</p>
<ul>
<li>Taleplerinize yanıt vermek</li>
<li>Hizmetlerimizi iyileştirmek</li>
<li>Size özel teklifler sunmak</li>
</ul>

<h2>4. Bilgi Güvenliği</h2>
<p>Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri uyguluyoruz. Verileriniz şifreli bağlantılar aracılığıyla iletilmekte ve güvenli sunucularda saklanmaktadır.</p>

<h2>5. İletişim</h2>
<p>Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.</p>`,
            en: `<h2>1. Introduction</h2>
<p>At Bağcılar Concrete Formwork, we value the privacy of your personal data. This Privacy Policy explains what information we collect when you visit our website, how we use and protect this information.</p>

<h2>2. Information Collected</h2>
<p>When you visit our website, we may collect the following information:</p>
<ul>
<li>Name, email and phone information you submit through the contact form</li>
<li>Project information you share through the quote request form</li>
<li>Anonymous usage data collected through cookies</li>
</ul>

<h2>3. Use of Information</h2>
<p>We use the information we collect for the following purposes:</p>
<ul>
<li>Responding to your requests</li>
<li>Improving our services</li>
<li>Providing you with customized offers</li>
</ul>

<h2>4. Information Security</h2>
<p>We implement industry-standard security measures to protect your personal data. Your data is transmitted through encrypted connections and stored on secure servers.</p>

<h2>5. Contact</h2>
<p>For questions about our privacy policy, please contact us.</p>`
        },
        seoTitle: 'Gizlilik Politikası | Bağcılar Beton Kalıp',
        seoDescription: 'Bağcılar Beton Kalıp gizlilik politikası. Kişisel verilerinizin nasıl toplandığı ve korunduğu hakkında bilgi.',
        isActive: true
    },
    {
        slug: 'terms-of-use',
        title: {
            tr: 'Kullanım Koşulları',
            en: 'Terms of Use'
        },
        content: {
            tr: `<h2>1. Kabul</h2>
<p>Bu web sitesini kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, lütfen sitemizi kullanmayınız.</p>

<h2>2. Hizmet Tanımı</h2>
<p>Bağcılar Beton Kalıp, beton kalıp sistemleri üretimi ve satışı konusunda hizmet vermektedir. Web sitemiz, ürünlerimiz ve hizmetlerimiz hakkında bilgi sunmaktadır.</p>

<h2>3. Fikri Mülkiyet</h2>
<p>Bu web sitesindeki tüm içerikler (metin, görseller, logolar, tasarım) Bağcılar Beton Kalıp'a aittir ve telif hakkı ile korunmaktadır. İzinsiz kopyalanması veya kullanılması yasaktır.</p>

<h2>4. Sorumluluk Sınırlaması</h2>
<p>Web sitemizdeki bilgilerin doğruluğunu sağlamak için azami özen gösterilmektedir. Ancak, bilgilerdeki olası hatalardan veya eksikliklerden şirketimiz sorumlu tutulamaz.</p>

<h2>5. Değişiklikler</h2>
<p>Bu kullanım koşullarını önceden haber vermeksizin değiştirme hakkını saklı tutarız.</p>`,
            en: `<h2>1. Acceptance</h2>
<p>By using this website, you agree to the following terms of use. If you do not accept these terms, please do not use our site.</p>

<h2>2. Service Description</h2>
<p>Bağcılar Concrete Formwork provides services in the production and sale of concrete formwork systems. Our website provides information about our products and services.</p>

<h2>3. Intellectual Property</h2>
<p>All content on this website (text, images, logos, design) belongs to Bağcılar Concrete Formwork and is protected by copyright. Unauthorized copying or use is prohibited.</p>

<h2>4. Limitation of Liability</h2>
<p>Maximum care is taken to ensure the accuracy of the information on our website. However, our company cannot be held responsible for possible errors or omissions in the information.</p>

<h2>5. Changes</h2>
<p>We reserve the right to change these terms of use without prior notice.</p>`
        },
        seoTitle: 'Kullanım Koşulları | Bağcılar Beton Kalıp',
        seoDescription: 'Bağcılar Beton Kalıp web sitesi kullanım koşulları ve şartları.',
        isActive: true
    },
    {
        slug: 'kvkk',
        title: {
            tr: 'KVKK Aydınlatma Metni',
            en: 'KVKK Information Text'
        },
        content: {
            tr: `<h2>Veri Sorumlusu</h2>
<p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Bağcılar Beton Kalıp olarak veri sorumlusu sıfatıyla kişisel verilerinizi işliyoruz.</p>

<h2>Kişisel Verilerin İşlenme Amaçları</h2>
<p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
<ul>
<li>Müşteri ilişkilerinin yönetimi</li>
<li>Ürün ve hizmet satış süreçlerinin yürütülmesi</li>
<li>Teklif hazırlanması ve iletilmesi</li>
<li>Yasal yükümlülüklerin yerine getirilmesi</li>
</ul>

<h2>Kişisel Verilerin Aktarılması</h2>
<p>Kişisel verileriniz, yasal zorunluluklar ve iş süreçlerinin gerektirdiği hallerde yetkili kamu kurum ve kuruluşlarına, iş ortaklarımıza ve hizmet sağlayıcılarımıza aktarılabilmektedir.</p>

<h2>Haklarınız</h2>
<p>KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
<ul>
<li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
<li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
<li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
<li>Kişisel verilerin düzeltilmesini veya silinmesini isteme</li>
</ul>

<h2>İletişim</h2>
<p>KVKK kapsamındaki talepleriniz için bizimle iletişime geçebilirsiniz.</p>`,
            en: `<h2>Data Controller</h2>
<p>In accordance with the Personal Data Protection Law No. 6698 ("KVKK"), we process your personal data as data controller at Bağcılar Concrete Formwork.</p>

<h2>Purposes of Processing Personal Data</h2>
<p>Your personal data is processed for the following purposes:</p>
<ul>
<li>Customer relationship management</li>
<li>Execution of product and service sales processes</li>
<li>Preparation and delivery of quotations</li>
<li>Fulfillment of legal obligations</li>
</ul>

<h2>Transfer of Personal Data</h2>
<p>Your personal data may be transferred to authorized public institutions and organizations, our business partners and service providers in cases required by legal obligations and business processes.</p>

<h2>Your Rights</h2>
<p>Within the scope of Article 11 of KVKK, you have the following rights:</p>
<ul>
<li>Learning whether your personal data is processed</li>
<li>Requesting information if your personal data has been processed</li>
<li>Learning the purpose of processing personal data and whether they are used in accordance with their purpose</li>
<li>Requesting correction or deletion of personal data</li>
</ul>

<h2>Contact</h2>
<p>For your requests within the scope of KVKK, you can contact us.</p>`
        },
        seoTitle: 'KVKK Aydınlatma Metni | Bağcılar Beton Kalıp',
        seoDescription: 'Bağcılar Beton Kalıp KVKK aydınlatma metni. Kişisel verilerinizin işlenmesi hakkında bilgilendirme.',
        isActive: true
    },
    {
        slug: 'cookie-policy',
        title: {
            tr: 'Çerez Politikası',
            en: 'Cookie Policy'
        },
        content: {
            tr: `<h2>Çerez Nedir?</h2>
<p>Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.</p>

<h2>Kullandığımız Çerezler</h2>
<p>Web sitemizde aşağıdaki çerez türlerini kullanmaktayız:</p>
<ul>
<li><strong>Zorunlu Çerezler:</strong> Web sitesinin düzgün çalışması için gerekli çerezlerdir.</li>
<li><strong>Performans Çerezleri:</strong> Ziyaretçi istatistiklerini toplamak için kullanılır.</li>
<li><strong>İşlevsellik Çerezleri:</strong> Dil tercihiniz gibi ayarları hatırlamak için kullanılır.</li>
</ul>

<h2>Çerezleri Yönetme</h2>
<p>Tarayıcı ayarlarınızdan çerezleri kabul etmeyi veya reddetmeyi seçebilirsiniz. Ancak bazı çerezleri devre dışı bırakmak, web sitesinin bazı özelliklerinin çalışmamasına neden olabilir.</p>

<h2>Değişiklikler</h2>
<p>Bu çerez politikasını zaman zaman güncelleyebiliriz. Güncellemeler web sitemizde yayınlandığı anda yürürlüğe girer.</p>`,
            en: `<h2>What are Cookies?</h2>
<p>Cookies are small text files that are stored on your device through your browser when you visit our website.</p>

<h2>Cookies We Use</h2>
<p>We use the following types of cookies on our website:</p>
<ul>
<li><strong>Essential Cookies:</strong> Cookies necessary for the proper functioning of the website.</li>
<li><strong>Performance Cookies:</strong> Used to collect visitor statistics.</li>
<li><strong>Functionality Cookies:</strong> Used to remember settings such as your language preference.</li>
</ul>

<h2>Managing Cookies</h2>
<p>You can choose to accept or reject cookies from your browser settings. However, disabling some cookies may cause some features of the website to not work.</p>

<h2>Changes</h2>
<p>We may update this cookie policy from time to time. Updates take effect as soon as they are published on our website.</p>`
        },
        seoTitle: 'Çerez Politikası | Bağcılar Beton Kalıp',
        seoDescription: 'Bağcılar Beton Kalıp çerez politikası. Web sitemizde kullanılan çerezler hakkında bilgi.',
        isActive: true
    },
    {
        slug: 'about-us',
        title: {
            tr: 'Hakkımızda',
            en: 'About Us'
        },
        content: {
            tr: `<h3>Hikayemiz</h3>
<p>Bağcılar Beton Kalıp, 2000 yılından bu yana Türkiye'nin önde gelen beton kalıp sistemleri üreticilerinden biri olarak hizmet vermektedir. İnşaat sektöründeki köklü geçmişimiz ve tecrübemizle, müşterilerimize en kaliteli çözümleri sunmayı ilke edindik. Modern üretim tesislerimizde, uluslararası standartlara uygun üretim yaparak, sektördeki öncü konumumuzu koruyoruz.</p>
<p>Her geçen gün büyüyen yapımızla, sadece Türkiye'de değil, uluslararası pazarda da güvenilen ve tercih edilen bir marka olma yolunda emin adımlarla ilerliyoruz.</p>`,
            en: `<h3>Our Story</h3>
<p>Bağcılar Concrete Formwork has been serving as one of Turkey's leading concrete formwork systems manufacturers since 2000. With our deep-rooted history and experience in the construction sector, we have adopted the principle of offering the highest quality solutions to our customers. We maintain our leading position in the sector by producing in accordance with international standards in our modern production facilities.</p>
<p>With our structure growing day by day, we are taking firm steps towards becoming a trusted and preferred brand not only in Turkey but also in the international market.</p>`
        },
        seoTitle: 'Hakkımızda | Bağcılar Beton Kalıp',
        seoDescription: 'Bağcılar Beton Kalıp hakkında. Misyonumuz, vizyonumuz ve değerlerimiz.',
        isActive: true
    }
];

async function main() {
    console.log('🌱 Yasal sayfalar oluşturuluyor...');

    for (const pageData of pages) {
        const existing = await prisma.page.findUnique({
            where: { slug: pageData.slug }
        });

        if (existing) {
            console.log(`⏭️  ${pageData.slug} zaten mevcut, güncelleniyor...`);
            await prisma.page.update({
                where: { slug: pageData.slug },
                data: pageData
            });
        } else {
            console.log(`✅ ${pageData.slug} oluşturuluyor...`);
            await prisma.page.create({
                data: pageData
            });
        }
    }

    console.log('🎉 Tüm yasal sayfalar oluşturuldu!');
}

main()
    .catch((e) => {
        console.error('Hata:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
