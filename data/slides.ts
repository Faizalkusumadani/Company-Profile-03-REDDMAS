export interface Slide {
  id: number;
  headlineKeys: string[];
  bodyKey: string;
  ctaKey: string;
  ctaHref: string;
  accentColor: string;
  accentColorRgb: string;
  headlineAccentIndices: number[];
  imageSrc: string;
}

export const slides: Slide[] = [
  {
    id: 0,
    headlineKeys: [
      "0.headline.0",
      "0.headline.1",
      "0.headline.2",
      "0.headline.3",
    ],
    bodyKey: "0.body",
    ctaKey: "0.cta",
    ctaHref: "/tentang-kami",
    accentColor: "#DCA64C",
    accentColorRgb: "210,52,57",
    headlineAccentIndices: [1],
    imageSrc: "/Banner/Carousel-01.png",
  },
  {
    id: 1,
    headlineKeys: [
      "1.headline.0",
      "1.headline.1",
      "1.headline.2",
      "1.headline.3",
      "1.headline.4",
    ],
    bodyKey: "1.body",
    ctaKey: "1.cta",
    ctaHref: "/bisnis-kami",
    accentColor: "#DCA64C",
    accentColorRgb: "210,52,57",
    headlineAccentIndices: [0],
    imageSrc: "/Banner/Carousel-02.png",
  },
  {
    id: 2,
    headlineKeys: [
      "2.headline.0",
      "2.headline.1",
      "2.headline.2",
      "2.headline.3",
    ],
    bodyKey: "2.body",
    ctaKey: "2.cta",
    ctaHref: "/ruang-informasi/kegiatan",
    accentColor: "#DCA64C",
    accentColorRgb: "210,52,57",
    headlineAccentIndices: [0, 3],
    imageSrc: "/Banner/Carousel-03.png",
  },
  {
    id: 3,
    headlineKeys: [
      "4.headline.0",
      "4.headline.1",
      "4.headline.2",
      "4.headline.3",
    ],
    bodyKey: "4.body",
    ctaKey: "4.cta",
    ctaHref: "/kontak",
    accentColor: "#DCA64C",
    accentColorRgb: "210,52,57",
    headlineAccentIndices: [3],
    imageSrc: "/Banner/Carousel-04.png",
  },
];
