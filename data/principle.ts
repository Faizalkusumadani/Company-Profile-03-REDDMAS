export type PartnerCategory =
  | "building_materials"
  | "mep"
  | "ev_charger"
  | "sanitary"
  | "computer";

export interface Partner {
  name: string;
  logo: string;
  href?: string;
  category: PartnerCategory;
}

const partners: Partner[] = [
  { name: "Daikin", logo: "/Principle-Logo/01.png", category: "mep" },
  { name: "Panasonic", logo: "/Principle-Logo/02.jpeg", category: "mep" },
  { name: "Tica", logo: "/Principle-Logo/03.png", category: "mep" },
  { name: "Hitachi", logo: "/Principle-Logo/04.png", category: "mep" },
  { name: "Gree", logo: "/Principle-Logo/05.png", category: "mep" },
  { name: "Midea", logo: "/Principle-Logo/06.png", category: "mep" },
  { name: "JAF", logo: "/Principle-Logo/07.png", category: "mep" },
  { name: "Ariston", logo: "/Principle-Logo/08.png", category: "mep" },
  {
    name: "Wika",
    logo: "/Principle-Logo/09.png",
    category: "mep",
  },
  {
    name: "shimizu",
    logo: "/Principle-Logo/010.png",
    category: "mep",
  },

  { name: "multi kabel", logo: "/Principle-Logo/011.png", category: "mep" },
  { name: "supreme", logo: "/Principle-Logo/012.png", category: "mep" },
  { name: "servvo", logo: "/Principle-Logo/013.png", category: "mep" },
  { name: "trilliun", logo: "/Principle-Logo/014.png", category: "mep" },
  { name: "wavin", logo: "/Principle-Logo/015.png", category: "mep" },
  { name: "toro", logo: "/Principle-Logo/016.png", category: "mep" },
  { name: "spindo", logo: "/Principle-Logo/017.png", category: "mep" },
  { name: "gala", logo: "/Principle-Logo/018.png", category: "mep" },
  { name: "tozen", logo: "/Principle-Logo/019.png", category: "mep" },
  { name: "dsp", logo: "/Principle-Logo/020.png", category: "mep" },
  {
    name: "magno",
    logo: "/Principle-Logo/021.png",
    category: "mep",
  },
  {
    name: "unnu",
    logo: "/Principle-Logo/022.png",
    category: "sanitary",
  },
  {
    name: "trilliunware",
    logo: "/Principle-Logo/023.png",
    category: "sanitary",
  },
  {
    name: "aer",
    logo: "/Principle-Logo/024.png",
    category: "sanitary",
  },
  {
    name: "air",
    logo: "/Principle-Logo/025.png",
    category: "sanitary",
  },
  {
    name: "ava",
    logo: "/Principle-Logo/026.png",
    category: "sanitary",
  },
  {
    name: "semen merah putih",
    logo: "/Principle-Logo/027.png",
    category: "building_materials",
  },
  {
    name: "semen watershield",
    logo: "/Principle-Logo/028.png",
    category: "building_materials",
  },
  {
    name: "semen patriot",
    logo: "/Principle-Logo/029.png",
    category: "building_materials",
  },
  {
    name: "drymix",
    logo: "/Principle-Logo/030.png",
    category: "building_materials",
  },
  {
    name: "mortindo",
    logo: "/Principle-Logo/031.png",
    category: "building_materials",
  },
  {
    name: "catylac",
    logo: "/Principle-Logo/032.png",
    category: "building_materials",
  },
  {
    name: "dulux",
    logo: "/Principle-Logo/033.png",
    category: "building_materials",
  },
  {
    name: "ziegel",
    logo: "/Principle-Logo/034.png",
    category: "building_materials",
  },
  {
    name: "m1",
    logo: "/Principle-Logo/035.png",
    category: "building_materials",
  },
  {
    name: "roket",
    logo: "/Principle-Logo/036.png",
    category: "building_materials",
  },
  {
    name: "ostra",
    logo: "/Principle-Logo/037.png",
    category: "ev_charger",
  },
  {
    name: "zora",
    logo: "/Principle-Logo/038.png",
    category: "ev_charger",
  },
  {
    name: "kecilin",
    logo: "/Principle-Logo/039.png",
    category: "computer",
  },
  {
    name: "kaseya",
    logo: "/Principle-Logo/040.png",
    category: "computer",
  },
  {
    name: "invgate",
    logo: "/Principle-Logo/041.png",
    category: "computer",
  },
  {
    name: "barracuda",
    logo: "/Principle-Logo/042.png",
    category: "computer",
  },
  {
    name: "soti",
    logo: "/Principle-Logo/043.png",
    category: "computer",
  },
  {
    name: "dataapp",
    logo: "/Principle-Logo/044.png",
    category: "computer",
  },
  {
    name: "stealien",
    logo: "/Principle-Logo/045.png",
    category: "computer",
  },
  {
    name: "benq",
    logo: "/Principle-Logo/046.png",
    category: "computer",
  },
  {
    name: "msi",
    logo: "/Principle-Logo/047.png",
    category: "computer",
  },
  {
    name: "dell",
    logo: "/Principle-Logo/048.png",
    category: "computer",
  },
  {
    name: "asrock",
    logo: "/Principle-Logo/049.png",
    category: "computer",
  },
  {
    name: "asus",
    logo: "/Principle-Logo/050.png",
    category: "computer",
  },
  {
    name: "uniview",
    logo: "/Principle-Logo/051.png",
    category: "computer",
  },
  {
    name: "apc",
    logo: "/Principle-Logo/052.png",
    category: "computer",
  },
  {
    name: "cisco",
    logo: "/Principle-Logo/053.png",
    category: "computer",
  },
  {
    name: "qsan",
    logo: "/Principle-Logo/054.png",
    category: "computer",
  },
  {
    name: "zoan",
    logo: "/Principle-Logo/055.png",
    category: "computer",
  },
];

export default partners;
