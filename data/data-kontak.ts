export type LocationIcon = "office" | "email" | "phone" | "download";

export interface ContactLocation {
  key: string;
  icon: LocationIcon;
  value: string;
  href?: string;
}

export const locations: ContactLocation[] = [
  {
    key: "kantor-utama",
    icon: "office",
    value:
      "Grand Puri Niaga Blok K6 No. 5S Jl. Puri Kencana, Kembangan, Jakarta 11610",
  },
  {
    key: "email",
    icon: "email",
    value: "customersupport@reddmasgroup.com",
    href: "mailto:customersupport@reddmasgroup.com",
  },
  {
    key: "telepon",
    icon: "phone",
    value: "+62 21 5830 5555",
    href: "tel:+622158305555",
  },
  {
    key: "company-profile",
    icon: "download",
    value: "klik here",
    href: "/files/Compro Reddmas-Group.pdf",
  },
];
