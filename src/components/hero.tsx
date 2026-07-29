import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import heroDoctor from "../../public/images/hero-doctor.webp";

export function Hero() {
  return (
    <section className="hero" data-section="hero">
      <div className="hero__media">
        <Image src={heroDoctor} alt="" fill priority unoptimized sizes="(min-width: 900px) 60vw, 100vw" />
      </div>
      <div className="hero__content">
        <p className="hero__badge">EXPERTISE ORTHOPÉDIQUE</p>
        <h1>Votre mobilité,<br />notre <span>priorité</span></h1>
        <p className="hero__description">Soins orthopédiques avancés pour<br />retrouver une vie active sans douleur.</p>
        <div className="hero__actions">
          <a className="primary-button" href="#rendez-vous"><CalendarDays aria-hidden="true" />Prendre rendez-vous</a>
          <a className="secondary-button" href="#specialites">En savoir plus <ArrowRight aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
