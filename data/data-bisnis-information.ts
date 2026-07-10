export interface InformationBrand {
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
export const informationBrands: InformationBrand[] = [
  {
    id: "mega-globalindo-sinergi",
    slug: "mega-globalindo-sinergi",
    name: "PT Mega Globalindo Sinergi",
    logo: "/Logo-PT/Logo_MGS.png",
    href: "https://www.megaglobalindosinergi.com/",
    instagram: "https://www.instagram.com/intisukses.mm?igsh=a3kwcXpnbzVtc3Nx",
    telp: "+62 877 0110 1997",
    email: "Megaglobalindosinergi@gmail.com",
    web: "www.megaglobalindosinergi.com",
    address: ["Ruko Bolsena Blok D No. 36", "Gading Serpong, Tangerang 15810"],
    description: {
      id: [
        "PT Mega Globalindo Sinergi (MGS) adalah perusahaan yang bergerak di bidang penjualan dan distribusi berbagai produk teknologi informasi (TI) terdepan. Didirikan oleh para profesional berpengalaman dalam menangani proyek-proyek besar di industri TI, Kami berkomitmen untuk memberikan solusi teknologi yang komprehensif dan handal kepada client kami.",
      ],
      en: [
        "PT Mega Globalindo Sinergi (MGS) adalah perusahaan yang bergerak di bidang penjualan dan distribusi berbagai produk teknologi informasi (TI) terdepan. Didirikan oleh para profesional berpengalaman dalam menangani proyek-proyek besar di industri TI, Kami berkomitmen untuk memberikan solusi teknologi yang komprehensif dan handal kepada klien kami.",
      ],
    },
  },
  {
    id: "rootindo-global-teknologi",
    slug: "rootindo-global-teknologi",
    name: "PT Rootindo Global Teknologi",
    logo: "/Logo-PT/Logo_Root.png",
    href: "https://www.techbyroot.com/",
    instagram: "https://www.instagram.com/techbyroot?igsh=Mjg4c3c4a2tvZzVi",
    telp: "+62 821 1006 6008",
    email: "sales@techbyroot.com",
    web: "www.techbyroot.com",
    address: ["Ruko Bolsena Blok D No. 36", "Gading Serpong, Tangerang 15810"],
    description: {
      id: [
        "Dengan semakin tingginya permintaan akan layanan berbasis digital, Rootindo Global Teknologi hadir untuk menjawab tantangan tersebut melalui pengembangan perangkat lunak, konsultasi IT, keamanan siber, asset management, smart monitoring system, HRIS dan solusi berbasis cloud. Kami percaya bahwa teknologi yang tepat dapat meningkatkan efisiensi, produktifitas, dan daya saing di pasar global. ",
      ],
      en: [
        "Amidst the rising demand for digital-based services, Rootindo Global Teknologi addresses these challenges through software development, IT consulting, cybersecurity, asset management, smart monitoring systems, HRIS, and cloud-based solutions. We believe that the right technology can enhance efficiency, productivity, and competitiveness in the global market.",
      ],
    },
  },
];

export function getInformationBrandBySlug(
  slug: string,
): InformationBrand | undefined {
  return informationBrands.find((brand) => brand.slug === slug);
}

/** All available slugs, used by generateStaticParams. */
export function getInformationBrandSlugs(): string[] {
  return informationBrands.map((brand) => brand.slug);
}
