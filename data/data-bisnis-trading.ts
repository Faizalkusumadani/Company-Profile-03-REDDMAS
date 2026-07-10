export interface TradingBrand {
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

export const tradingBrands: TradingBrand[] = [
  {
    id: "intisukses-mitra-sejati",
    slug: "intisukses-mitra-sejati",
    name: "PT Intisukses Mitra Sejati",
    logo: "/Logo-PT/Logo_IMS.png",
    href: "https://www.intisukses-ms.com",
    instagram: "https://www.instagram.com/intisuksesmitrasejati/",
    telp: "+62 21 300 678 68",
    email: "sales@intisukses-ms.com",
    web: "www.intisukses-ms.com",
    address: [
      "Business Park Kebon Jeruk Blok C-2 No. 8",
      "Jl. Meruya Ilir Raya No. 88",
      "Meruya Utara, Kembangan, Jakarta 11620",
    ],
    description: {
      id: [
        "Sebagai perusahaan yang bergerak di bidang penjualan dan distribusi produk Mechanical & Electrical serta Building Materials, kami berkomitmen untuk menjadi mitra terpercaya dalam memenuhi kebutuhan pelanggan di berbagai sektor. ",
        "Kami melayani segmen retail dan proyek konstruksi, mulai dari perumahan, bangunan bertingkat, pergudangan, hingga infrastruktur berskala besar. Didukung oleh tim berpengalaman dan jaringan distribusi yang andal, kami menghadirkan solusi yang tepat waktu, efisien, dan berkualitas.",
        "Portofolio produk kami mencakup Air Conditioner Daikin dan merek AC terkemuka lainnya, Japan Air Filter (JAF), Semen Merah Putih, Readymix, Mortar Mortindo, Bata Ringan Ziegel, Alat Pemadam Api Ringan (APAR) Servvo, Pipa Toro, Pipa Trilliun dan TrilliunWare serta produk material bangunan lainnya dari brand terkemuka.",
        " Kami percaya bahwa setiap proyek layak mendapatkan dukungan terbaik. Untuk itu, kami hadir bukan sekadar sebagai penyedia material, melainkan sebagai partner strategis dalam membangun masa depan.",
      ],
      en: [
        "As a company engaged in the sales and distribution of Mechanical & Electrical products and building materials, we are committed to being a trusted partner in meeting the needs of customers across various sectors.",
        "We serve both the retail segment and construction projects—ranging from residential housing, high-rise buildings, and warehouses to large-scale infrastructure. Backed by an experienced team and a reliable distribution network, we deliver solutions that are timely, efficient, and of high quality.",
        "Our product portfolio includes Daikin air conditioners and other leading AC brands, Japan Air Filter (JAF), Semen Merah Putih, Readymix, Mortindo mortar, Ziegel lightweight bricks, Servvo fire extinguishers, Toro and Trilliun/TrilliunWare piping, as well as other building materials from renowned brands.",
        "We believe that every project deserves the best support. Therefore, we position ourselves not merely as a material supplier, but as a strategic partner in building the future.",
      ],
    },
  },
  {
    id: "mega-adhitama-sejati",
    slug: "mega-adhitama-sejati",
    name: "PT Mega Adhitama Sejati",
    logo: "/Logo-PT/Logo_MAS.png",
    href: "https://www.megaadhitamasejati.id",
    instagram:
      "https://www.instagram.com/megaadhitamasejati?igsh=dXQyb3o3c25sM3Z4",
    telp: "+62 21 5835 1648",
    email: "sales@megaadhitamasejati.id",
    web: "www.megaadhitamasejati.id",
    address: [
      "Grand Puri Niaga Blok K6 No. 5S",
      "Jl. Puri Kencana, Kembangan, Jakarta 11610",
    ],
    description: {
      id: [
        "Mega Adhitama Sejati merupakan mitra terpercaya dalam penyediaan bahan bangunan berkualitas untuk segmen retail, dengan wilayah layanan utama di Provinsi Banten. Kami menghadirkan rangkaian produk unggulan dari merek-merek ternama seperti Semen Merah Putih, Cat Dulux & Catylac, Pipa Wavin, Alat Pemadam Api Ringan (APAR) Servvo dan bahan bangunan lainnya.",
        "Dengan mengutamakan pelayanan yang profesional, ketersediaan stok yang konsisten, dan komitmen jangka panjang, kami siap mendukung kebutuhan operasional pelanggan secara efisien, berkelanjutan, dan terpercaya. ",
      ],
      en: [
        "Mega Adhitama Sejati is a trusted partner in supplying quality building materials to the retail sector, primarily serving the Banten Province. We offer a range of premium products from renowned brands—such as Semen Merah Putih, Dulux & Catylac paints, Wavin pipes, Servvo fire extinguishers, and other construction materials.",
        "By prioritizing professional service, consistent stock availability, and long-term commitment, we are ready to support our customers' operational needs efficiently, sustainably, and reliably.",
      ],
    },
  },
  {
    id: "sinergi-mandiri-perkasa",
    slug: "sinergi-mandiri-perkasa",
    name: "PT Sinergi Mandiri Perkasa",
    logo: "/Logo-PT/Logo_SMP.png",
    href: "https://www.sinergimandiriperkasa.co.id",
    instagram: "https://www.instagram.com/sinergi.mp/",
    telp: "+62 21 550 3019",
    email: "sales@smp-merahputih.com",
    web: "www.sinergimandiriperkasa.co.id",
    address: ["Rukan CBD Blok M No. 51, Green Lake City, Tangerang 15147"],
    description: {
      id: [
        "Perusahan yang bergerak di bidang penjualan dan distribusi bahan bangunan berkualitas tinggi. Perusahaan berkomitmen untuk memberikan solusi terbaik bagi kebutuhan proyek kontruksi di berbagai sektor, seperti perumahan, pergudangan, bangunan bertingkat (Highrise Building), infrastruktur, dan berbagai proyek konstruksi lainnya. ",
        "Dengan fokus utama pada penyediaan bahan bangunan seperti Semen Merah Putih, Readymix Merah Putih, Mortar Mortindo, Bata Ringan Ziegel, Alat Pemadam Api Ringan (APAR) Servvo dan Pipa Wavin, kami siap mendukung para Pengembang (Developer) dan Kontraktor dalam mewujudkan pembangunan proyek konstruksinya.",
      ],
      en: [
        "A company engaged in the sales and distribution of high-quality building materials. We are committed to providing optimal solutions for construction project needs across various sectors, including residential, warehousing, high-rise buildings, infrastructure, and other construction projects.",
        "With a primary focus on supplying building materials—such as Semen Merah Putih, Readymix Merah Putih, Mortindo mortar, Ziegel lightweight bricks, Servvo portable fire extinguishers, and Wavin pipes—we are ready to support developers and contractors in bringing their construction projects to fruition.",
      ],
    },
  },
];

/** Find a single brand by its slug, used by the detail page. */
export function getTradingBrandBySlug(slug: string): TradingBrand | undefined {
  return tradingBrands.find((brand) => brand.slug === slug);
}

/** All available slugs, used by generateStaticParams. */
export function getTradingBrandSlugs(): string[] {
  return tradingBrands.map((brand) => brand.slug);
}
