import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPhoneAlt,
  FaRegClock,
} from "react-icons/fa";
import { IoMail, IoLocationSharp } from "react-icons/io5";

export default async function Footer() {
  const t = await getTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-reddmas-dark pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:flex md:justify-between gap-12">
        {/* CONNECT WITH US */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold uppercase mb-6 text-red-600">
            {t("header_footer")}
          </h3>
          <Image
            src="/Logo-icon.png"
            width={160}
            height={160}
            quality={75}
            sizes="160px"
            alt="Logo Reddmasgroup"
            className="object-contain mb-8"
            loading="eager"
            style={{ width: "160px", height: "auto" }}
          />
          <div className="flex items-center gap-5 text-3xl text-white/65">
            <a
              href="https://www.instagram.com/reddmas.group?igsh=MWFoeDhnejF4eGNi"
              aria-label="Instagram"
              className="hover:text-gray-400 transition-colors"
            >
              <FaInstagram size={40} />
            </a>
            <a
              href="https://www.linkedin.com/company/reddmas-group/"
              aria-label="LinkedIn"
              className="hover:text-gray-400 transition-colors"
            >
              <FaLinkedin size={40} />
            </a>
            <a
              href="https://www.youtube.com/@reddmasgroup"
              aria-label="YouTube"
              className="hover:text-gray-400 transition-colors"
            >
              <FaYoutube size={45} />
            </a>
          </div>
        </div>

        {/* HEAD OFFICE */}
        <div className="mt-12 md:mt-0 ">
          <h3 className="text-lg sm:text-xl font-bold mb-6 text-red-600">
            {t("header_footer_01")}
          </h3>
          <address className="not-italic space-y-6 text-base text-white/65">
            <p className="flex items-start gap-3">
              <IoLocationSharp
                className="text-xl mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>
                Ciputra International Tokopedia Care Tower, 20th <br />
                Floor, Unit 20.01
                <br />
                Jl. Lingkar Luar Barat No. 101 Jakarta 11740 indonesia
              </span>
            </p>

            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-xl shrink-0" aria-hidden="true" />
              <a
                href="tel:+622158351648"
                className="hover:text-gray-300 transition-colors"
              >
                +62 21 5835 1648
              </a>
            </p>

            <p className="flex items-center gap-3">
              <IoMail className="text-xl shrink-0" aria-hidden="true" />
              <a
                href="mailto:customersupport@reddmasgroup.com"
                className="hover:text-gray-300 transition-colors"
              >
                customersupport@reddmasgroup.com
              </a>
            </p>

            <p className="flex items-center gap-3">
              <FaRegClock className="text-xl shrink-0" aria-hidden="true" />
              <span>Senin–Jumat : 08.00 – 16.30 WIB</span>
            </p>
          </address>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10 mt-14 pt-5 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/65 text-xs">
        <span>© {currentYear} Reddmas Group. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white/65 transition-colors">
            Privacy Policy
          </a>
          <span className="text-white/65/30">|</span>
          <a href="#" className="hover:text-white/65 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
