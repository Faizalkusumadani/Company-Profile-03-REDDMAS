export interface FoodBrand {
  id: string;
  slug: string;
  name: string;
  logo: string;
  href: string;
  instagram?: string;
  telp: string;
  email: string;
  web: string;
  address: string[];
  description: {
    id: string[];
    en: string[];
  };
}
export const foodBrands: FoodBrand[] = [
  {
    id: "indorasa-berkat-melimpah",
    slug: "indorasa-berkat-melimpah",
    name: "PT Indorasa Berkat Melimpah",
    logo: "/Logo-PT/Logo_IBM.png",
    href: "www.indorasaberkat.com",
    instagram:
      "https://www.instagram.com/indorasa.bm?igsh=MXhwb3d0bmdyazI5bA%3D%3D",
    telp: "+62 811 1887 775",
    email: "sales@indorasaberkat.com",
    web: "www.indorasaberkat.com",
    address: ["Ruko Bolsena Blok D No. 36", "Gading Serpong, Tangerang 15810"],
    description: {
      id: [
        "PT Indorasa Berkat Melimpah (IBM) adalah solusi kuliner berbasis teknologi yang dirancang untuk mendukung bisnis di sektor FnB, didirikan untuk menjawab tantangan dalam pengelolaan stok, Effisien waktu, dan konsistensi kualitas makanan, Kami menghadirkan produk siap makan dan siap disajikan.",
      ],
      en: [
        "PT Indorasa Berkat Melimpah (IBM) is a technology-driven culinary solution designed to support businesses in the F&B sector. Established to address challenges regarding inventory management, time efficiency, and food quality consistency, we provide ready-to-eat and ready-to-serve products.",
      ],
    },
  },
];

export function getFoodBrandBySlug(slug: string): FoodBrand | undefined {
  return foodBrands.find((brand) => brand.slug === slug);
}

/** All available slugs, used by generateStaticParams. */
export function getFoodBrandSlugs(): string[] {
  return foodBrands.map((brand) => brand.slug);
}
