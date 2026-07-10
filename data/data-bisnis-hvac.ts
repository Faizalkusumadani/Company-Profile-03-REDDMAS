export interface HvacBrand {
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

export const hvacBrands: HvacBrand[] = [
  {
    id: "intisukses-mitratama-mandiri",
    slug: "intisukses-mitratama-mandiri",
    name: "PT Intisukses Mitratama Mandiri",
    logo: "/Logo-PT/Logo_IMM.png",
    href: "https://www.intisukses-mm.com",
    instagram: "https://www.instagram.com/intisukses.mm?igsh=a3kwcXpnbzVtc3Nx",
    telp: "+62 21 300 678 68",
    email: "project@intisukses-mm.com",
    web: "www.intisukses-mm.com",
    address: [
      "Business Park Kebon Jeruk Blok C-2 No. 8",
      "Jl. Meruya Ilir Raya No. 88",
      "Meruya Utara, Kembangan, Jakarta 11620",
    ],
    description: {
      id: [
        "Berpegang teguh pada prinsip mengutamakan kepuasan pelanggan dengan cara respon cepat serta didukung oleh tenaga kerja, Supporting tools, Supporting teknologi serta dukungan dari principle PT Intisukses Mitratama Mandiri berkembang dengan cepat.",
        "Hal ini dibuktikan dengan dipercayanya perusahaan kami ( yang sering disebut dengan nama IM2) sebagai subcont atau engineering dealer beberapa principal seperti Daikin, McQuay, Mitsubishi, Panasonic, Samsung, Wika dan lain-lain.",
        "IM2 juga dipercaya oleh banyak customer mulai dari office building, pabrik dan rumah tinggal mewah serta serta costumer-costumer yang memang membutuhkan layanan berkualitas dari kami.",
      ],
      en: [
        "By steadfastly adhering to the principle of prioritizing customer satisfaction through rapid response—backed by a skilled workforce, supporting tools and technology, and support from principals—PT Intisukses Mitratama Mandiri has grown rapidly.",
        "This is evidenced by the trust placed in our company (often referred to as IM2) to serve as a subcontractor or engineering dealer for various principals, such as Daikin, McQuay, Mitsubishi, Panasonic, Samsung, Wika, and others.",
        "IM2 has also earned the trust of a wide range of clients—including office buildings, factories, and luxury residences—who require our high-quality services.",
      ],
    },
  },
];

export function getHvacBrandBySlug(slug: string): HvacBrand | undefined {
  return hvacBrands.find((brand) => brand.slug === slug);
}

/** All available slugs, used by generateStaticParams. */
export function getHvacBrandSlugs(): string[] {
  return hvacBrands.map((brand) => brand.slug);
}
