import { Linkedin, Twitter, Instagram } from "lucide-react";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Blog", href: "#blog" },
      { label: "Help Center", href: "#help" },
      { label: "API Docs", href: "#api-docs" },
      { label: "Brand Assets", href: "#brand" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
      { label: "Contact", href: "#contact" },
    ],
  },
};

// TikTok icon component since lucide-react doesn't have it
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-forest text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1 - Brand */}
          <div>
            <div className="w-[100px] h-[40px] bg-white/10 rounded-md flex items-center justify-center mb-4">
              <span className="text-white font-heading font-bold text-lg">
                referd
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              People-powered recruitment. Built with AI & integrity.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h4 className="text-white font-heading font-semibold mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/70 text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 3 - Newsletter & Social */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4">
              Stay Updated
            </h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 py-3 px-4 rounded-lg focus:outline-none focus:border-sage transition-colors duration-200"
              />
              <button
                type="submit"
                className="btn-primary w-full text-sm py-3"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="#linkedin"
                className="text-white/70 hover:text-sage transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#twitter"
                className="text-white/70 hover:text-sage transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#instagram"
                className="text-white/70 hover:text-sage transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#tiktok"
                className="text-white/70 hover:text-sage transition-colors duration-200"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/50 text-sm">
              © 2025 Referd. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-2 text-sm">
              <a
                href="#privacy"
                className="text-white/50 hover:text-white transition-colors duration-200"
              >
                Privacy
              </a>
              <span className="text-white/30">•</span>
              <a
                href="#terms"
                className="text-white/50 hover:text-white transition-colors duration-200"
              >
                Terms
              </a>
              <span className="text-white/30">•</span>
              <a
                href="#cookies"
                className="text-white/50 hover:text-white transition-colors duration-200"
              >
                Cookies
              </a>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-sage rounded-full animate-pulse" />
              <span className="text-white/70 text-sm">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
