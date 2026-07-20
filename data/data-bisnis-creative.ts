export interface CreativeBrand {
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

export const creativeBrands: CreativeBrand[] = [
  {
    id: "yosh-trimakmur-indonesia",
    slug: "yosh-trimakmur-indonesia",
    name: "PT Yosh Trimakmur Indonesia",
    logo: "/Logo-PT/Logo_Yosh.png",
    href: "https://yosh-id.com/",
    instagram:
      "https://www.instagram.com/yoshid_official?igsh=cnd6dGoyMng3bDBz",
    telp: "+62 877 0110 1997",
    email: "admin@yosh-id.com",
    web: "www.yosh-id.com",
    address: ["Ruko Bolsena Blok D No. 36", "Gading Serpong, Tangerang 15810 "],
    description: {
      id: [
        "Kami percaya bahwa imajinasi merupakan salah satu cara untuk membawa audiens kami ke dalam dimensi baru yang penuh kegembiraan dan keseruan. Dengan berfokus pada inovasi dan kreativitas, kami berupaya memberikan kesan mendalam bagi pelanggan, menjadikan pengalaman mereka bersama kami sungguh istimewa.",
      ],
      en: [
        "We believe imagination is one of the way to bring our audience into a new dimension of joy and excitement. With a focus on innovation and creativity, we strive to leave a lasting impression on our customers, making their memories with us truly exceptional.",
      ],
    },
  },
];

/** Find a single brand by its slug, used by the detail page. */
export function getCreativeBrandBySlug(
  slug: string,
): CreativeBrand | undefined {
  return creativeBrands.find((brand) => brand.slug === slug);
}

/** All available slugs, used by generateStaticParams. */
export function getCreativeBrandSlugs(): string[] {
  return creativeBrands.map((brand) => brand.slug);
}
