export type BlogPost = {
    id: string;
    slug: string;
    date: string;
    title: string;
    image?: string;
};

export const blogPosts: BlogPost[] = [
    {
        id: "post-1",
        slug: "dogru-beton-kalibi-secimi",
        date: "2024-03-15",
        title: "Doğru Beton Kalıbı Nasıl Seçilir?",
        image: "/images/blog/selection.jpg"
    },
    {
        id: "post-2",
        slug: "celik-kalip-avantajlari",
        date: "2024-03-20",
        title: "Çelik Kalıp Sistemlerinin Avantajları",
        image: "/images/blog/steel.jpg"
    },
    {
        id: "post-3",
        slug: "insaat-guvenligi-ve-kalip",
        date: "2024-03-25",
        title: "İnşaat Güvenliği ve Kalıp Kullanımı",
        image: "/images/blog/safety.jpg"
    }
];
