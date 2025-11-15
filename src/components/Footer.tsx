import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">АвтоВышка Тамбов</h3>
            <p className="text-muted-foreground text-sm">
              Аренда автовышек для выполнения высотных работ любой сложности в Тамбове и Тамбовской области.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Навигация</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                Услуги
              </Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                Цены
              </Link>
              <Link to="/contacts" className="text-muted-foreground hover:text-primary transition-colors">
                Контакты
              </Link>
              <Link to="/request" className="text-muted-foreground hover:text-primary transition-colors">
                Заявка
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="flex flex-col space-y-3">
              <a href="tel:+79156746390" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span>+7 915 674 63 90</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Тамбов, Тамбовская область</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} АвтоВышка Тамбов. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
