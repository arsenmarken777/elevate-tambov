import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Главная" },
    { path: "/services", label: "Услуги" },
    { path: "/pricing", label: "Цены" },
    { path: "/contacts", label: "Контакты" },
    { path: "/request", label: "Заявка" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">АвтоВышка</span>
              <span className="text-xs text-muted-foreground">Тамбов</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  className="transition-all duration-300"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <div className="flex flex-col gap-2 bg-primary/10 p-3 rounded-lg animate-pulse-glow mt-8">
              <a href="tel:+79156746390">
                <Button variant="secondary" size="sm" className="gap-2 w-full">
                  <Phone className="h-4 w-4" />
                  +7 915 674 63 90
                </Button>
              </a>
              <a href="tel:+79156740282">
                <Button variant="secondary" size="sm" className="gap-2 w-full">
                  <Phone className="h-4 w-4" />
                  +7 915 674 02 82
                </Button>
              </a>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant={isActive(link.path) ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="bg-primary/10 p-3 rounded-lg animate-pulse-glow space-y-2">
                <a href="tel:+79156746390">
                  <Button variant="secondary" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    +7 915 674 63 90
                  </Button>
                </a>
                <a href="tel:+79156740282">
                  <Button variant="secondary" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    +7 915 674 02 82
                  </Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
