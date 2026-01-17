export type ProductItem = {
    id: string;
    slug: string;
    image?: string;
};

export type ProductCategory = {
    id: string;
    slug: string;
    items: ProductItem[];
};

export const productCategories: ProductCategory[] = [
    {
        id: "special-design",
        slug: "ozel-tasarim-kaliplar",
        items: [
            { id: "custom-mold-1", slug: "ozel-kalip-ornek" }
        ]
    },
    {
        id: "column",
        slug: "kolon-kaliplari",
        items: [
            { id: "circular-column", slug: "dairesel-kolon-kalibi" },
            { id: "square-column", slug: "kare-kolon-kalibi" }
        ]
    },
    {
        id: "railing",
        slug: "korkuluk-kaliplari",
        items: [
            { id: "classic-railing", slug: "klasik-korkuluk-kalibi" }
        ]
    },
    {
        id: "door-arch",
        slug: "kapi-kemer-kaliplari",
        items: [
            { id: "decorative-arch", slug: "dekoratif-kemer-kalibi" }
        ]
    },
    {
        id: "barrier",
        slug: "bariyer-kaliplari",
        items: [
            { id: "highway-barrier", slug: "otoyol-bariyer-kalibi" }
        ]
    },
    {
        id: "garden-wall",
        slug: "bahce-duvar-kaliplari",
        items: [
            { id: "stone-pattern", slug: "tas-desenli-duvar-kalibi" },
            { id: "brick-pattern", slug: "tugla-desenli-duvar-kalibi" }
        ]
    },
    {
        id: "concrete-fence",
        slug: "beton-cit-kaliplari",
        items: [
            { id: "panel-fence", slug: "panel-cit-kalibi" }
        ]
    },
    {
        id: "plywood",
        slug: "plywood-yuzeyli-kaliplar",
        items: [
            { id: "film-faced", slug: "film-kapli-plywood-kalip" }
        ]
    },
    {
        id: "beam",
        slug: "hatil-kaliplari",
        items: [
            { id: "standard-beam", slug: "standart-hatil-kalibi" }
        ]
    },
    {
        id: "auxiliary",
        slug: "beton-kalip-yardimci-urunleri",
        items: [
            { id: "mold-oil", slug: "kalip-yagi" },
            { id: "tie-rod", slug: "tie-rod-mili" }
        ]
    }
];
