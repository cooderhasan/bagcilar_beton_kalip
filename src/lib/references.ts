export interface Reference {
    id: string;
    name: string;
    sector: string;
    description: string;
    image?: string; // In a real app this would be a path, for now we will use placeholders or just text
}

export const references: Reference[] = [
    {
        id: '1',
        name: 'Mesa Mesken',
        sector: 'İnşaat / Konut',
        description: 'İstanbul Vadi Projesi için tünel kalıp sistemleri tedariği.',
    },
    {
        id: '2',
        name: 'Kalyon İnşaat',
        sector: 'Altyapı',
        description: 'Kuzey Marmara Otoyolu viyadük kalıpları projesi.',
    },
    {
        id: '3',
        name: 'Rönesans Holding',
        sector: 'Endüstriyel',
        description: 'Ankara Şehir Hastanesi kolon ve perde kalıpları çözümü.',
    },
    {
        id: '4',
        name: 'Limak İnşaat',
        sector: 'Havalimanı',
        description: 'İstanbul Havalimanı terminal binası iskele sistemleri.',
    },
    {
        id: '5',
        name: 'Tekfen İnşaat',
        sector: 'Enerji',
        description: 'Doğalgaz boru hattı projesi özel çelik kalıp imalatı.',
    },
    {
        id: '6',
        name: 'Yapi Merkezi',
        sector: 'Ulaşım',
        description: 'Hızlı tren hattı tünel kalıp iksa sistemleri.',
    }
];
