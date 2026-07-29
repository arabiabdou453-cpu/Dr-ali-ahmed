import { CalendarDays } from "lucide-react";
import { OrthopedicLogo, WhatsappIcon } from "@/components/medical-icons";

const navigation = ["Accueil", "À propos", "Spécialités", "Services", "Galerie", "Contact"] as const;

export function SiteHeader() {
  return (
    <header className="site-header" data-section="navbar">
      <div className="site-header__inner">
        <a className="brand" href="#" aria-label="Dr Ali Ahmed A, accueil">
          <span className="brand__mark"><OrthopedicLogo /></span>
          <span><strong>Dr Ali Ahmed A</strong><small>Chirurgien Orthopédiste</small></span>
        </a>
        <nav aria-label="Navigation principale">
          <ul className="navigation">
            {navigation.map((label, index) => (
              <li key={label}><a className={index === 0 ? "is-active" : ""} href="#">{label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <a className="whatsapp" href="#" aria-label="WhatsApp"><WhatsappIcon /></a>
          <a className="header-cta" href="#rendez-vous"><CalendarDays aria-hidden="true" />Prendre rendez-vous</a>
        </div>
      </div>
    </header>
  );
}
