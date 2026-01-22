import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const posts = [
    {
        slug: 'insaat-sektorunde-tunel-kalip-sistemlerinin-onemi',
        title: {
            tr: 'İnşaat Sektöründe Tünel Kalıp Sistemlerinin Önemi',
            en: 'The Importance of Tunnel Formwork Systems in Construction'
        },
        content: {
            tr: `<p>Tünel kalıp sistemleri, modern inşaat sektöründe hız, güvenlik ve ekonomi sağlayan en önemli teknolojilerden biridir. Özellikle toplu konut projelerinde tercih edilen bu sistem, yapının taşıyıcı sistemini bir bütün olarak dökme imkanı sunar.</p>
            <h3>Tünel Kalıp Sisteminin Avantajları</h3>
            <ul>
                <li><strong>Hızlı Üretim:</strong> Günlük döküm çevrimi ile projelerin süresini kısaltır.</li>
                <li><strong>Depreme Dayanıklılık:</strong> Perde duvar sistemi sayesinde yapılar depreme karşı daha dirençli olur.</li>
                <li><strong>Pürüzsüz Yüzey:</strong> Sıva gerektirmeyen brüt beton yüzeyler elde edilir.</li>
            </ul>
            <p>Bağcılar Beton Kalıp olarak, projelerinize özel tünel kalıp çözümleri sunuyoruz.</p>`,
            en: `<p>Tunnel formwork systems are one of the most important technologies providing speed, safety, and economy in the modern construction sector. This system, especially preferred in mass housing projects, offers the opportunity to cast the structural system of the building as a whole.</p>
            <h3>Advantages of Tunnel Formwork System</h3>
            <ul>
                <li><strong>Fast Production:</strong> Shortens project duration with daily casting cycles.</li>
                <li><strong>Earthquake Resistance:</strong> Structures become more resistant to earthquakes thanks to the shear wall system.</li>
                <li><strong>Smooth Surface:</strong> Gross concrete surfaces requiring no plaster are obtained.</li>
            </ul>
            <p>As Bağcılar Concrete Formwork, we offer tunnel formwork solutions tailored to your projects.</p>`
        },
        excerpt: {
            tr: 'Tünel kalıp sistemleri, modern inşaat projelerinde hız ve güvenliği bir araya getiren yenilikçi bir çözümdür.',
            en: 'Tunnel formwork systems are an innovative solution combining speed and safety in modern construction projects.'
        },
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
        seoTitle: 'Tünel Kalıp Sistemlerinin Önemi | Bağcılar Beton Kalıp',
        seoDescription: 'İnşaat sektöründe tünel kalıp sistemlerinin avantajları, hızı ve deprem dayanıklılığı hakkında bilgi edinin.',
        published: true
    },
    {
        slug: 'perde-kolon-kaliplari-ile-guvenli-yapilar',
        title: {
            tr: 'Perde Kolon Kalıpları ile Güvenli Yapılar',
            en: 'Safe Structures with Shear Wall Column Formworks'
        },
        content: {
            tr: `<p>Perde ve kolon kalıpları, dikey betonarme elemanların inşasında kullanılan temel sistemlerdir. Doğru kalıp seçimi, yapının statik güvenliği ve beton kalitesi için kritiktir.</p>
            <h3>Neden Çelik Kalıp?</h3>
            <p>Ahşap kalıplara göre çok daha uzun ömürlü olan çelik kalıplar, yüksek basınç dayanımı sağlar ve defalarca kullanılabilir. Bu da uzun vadede maliyet avantajı yaratır.</p>
            <p>Firmamızın ürettiği ayarlanabilir perde kolon kalıpları, farklı ebatlardaki ihtiyaçlarınıza tek bir sistemle çözüm sunar.</p>`,
            en: `<p>Shear wall and column formworks are fundamental systems used in the construction of vertical reinforced concrete elements. Correct formwork selection is critical for the structural safety and concrete quality of the building.</p>
            <h3>Why Steel Formwork?</h3>
            <p>Steel formworks, which have a much longer life than wooden formworks, provide high pressure resistance and can be used repeatedly. This creates a cost advantage in the long run.</p>
            <p>The adjustable shear wall column formworks produced by our company offer a solution to your needs in different sizes with a single system.</p>`
        },
        excerpt: {
            tr: 'Perde ve kolon kalıplarının yapı güvenliğindeki rolü ve çelik kalıp sistemlerinin avantajları.',
            en: 'The role of shear wall and column formworks in structural safety and the advantages of steel formwork systems.'
        },
        image: 'https://images.unsplash.com/photo-1581094794329-cd1096a7a5ea?q=80&w=2068&auto=format&fit=crop',
        seoTitle: 'Perde Kolon Kalıpları | Bağcılar Beton Kalıp',
        seoDescription: 'Güvenli yapılar için perde ve kolon kalıbı seçimi, çelik kalıpların avantajları.',
        published: true
    }
];

async function main() {
    console.log('📝 Blog yazıları oluşturuluyor...');

    for (const post of posts) {
        const existing = await prisma.blogPost.findUnique({
            where: { slug: post.slug }
        });

        if (existing) {
            console.log(`🔄 Blog: ${post.slug} güncelleniyor...`);
            await prisma.blogPost.update({
                where: { slug: post.slug },
                data: post
            });
        } else {
            console.log(`✅ Blog: ${post.slug} oluşturuluyor...`);
            await prisma.blogPost.create({
                data: post
            });
        }
    }

    console.log('🎉 Blog yazıları eklendi!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
