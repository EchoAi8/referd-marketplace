import { Button } from "@/components/ui/button";
import referdLogomark from "@/assets/referd-logomark.png";
import referdWordmark from "@/assets/referd-wordmark-dark.png";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 lg:px-20">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={referdLogomark} alt="Refer'd" className="w-10 h-10" />
          <img src={referdWordmark} alt="Refer'd" className="h-6 hidden sm:block" />
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Button variant="nav" size="sm">
            About
          </Button>
          <Button variant="nav" size="sm">
            How It Works
          </Button>
          <Button variant="nav" size="sm">
            Login
          </Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-forest">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
