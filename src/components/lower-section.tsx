import { CalendarDays, Check, Clock3, LockKeyhole, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import clinicMap from "../../public/images/clinic-map.webp";
import doctorProfile from "../../public/images/doctor-profile.webp";

const credentials = [
  "Diplômé en Médecine – Université d’Alger",
  "Spécialisation en Chirurgie Orthopédique",
  "Membre de la SAO et de la SOFCOT",
  "Formations continues internationales",
] as const;

export function LowerSection() {
  return (
    <section className="lower-section" id="rendez-vous">
      <article className="lower-card about-card">
        <h2>À propos du Dr Ali Ahmed A</h2>
        <div className="about-card__body">
          <Image src={doctorProfile} alt="" unoptimized />
          <div>
            <p>Chirurgien orthopédiste passionné, je mets mon expertise au service de votre mobilité et de votre bien-être.</p>
            <p>Mon objectif : vous permettre de retrouver une vie active sans douleur.</p>
            <ul>{credentials.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
            <a href="#">En savoir plus sur moi →</a>
          </div>
        </div>
      </article>
      <article className="lower-card appointment-card">
        <h2>Prendre rendez-vous</h2>
        <form>
          <label><User aria-hidden="true" /><input aria-label="Nom complet" placeholder="Nom complet" maxLength={80} autoComplete="name" required /></label>
          <label><Phone aria-hidden="true" /><input aria-label="Téléphone" type="tel" placeholder="Téléphone" maxLength={24} autoComplete="tel" required /></label>
          <label>
            <Mail aria-hidden="true" />
            <select aria-label="Motif de consultation" defaultValue="" required>
              <option value="" disabled>Motif de consultation</option>
              <option value="genou">Chirurgie du genou</option>
              <option value="hanche">Prothèse de hanche</option>
              <option value="traumatologie">Traumatologie</option>
              <option value="arthroscopie">Arthroscopie</option>
              <option value="colonne">Colonne vertébrale</option>
              <option value="sport">Médecine sportive</option>
            </select>
          </label>
          <label><CalendarDays aria-hidden="true" /><input aria-label="Choisir une date" type="date" required /></label>
          <label><Clock3 aria-hidden="true" /><input aria-label="Choisir une heure" type="time" required /></label>
          <button type="button"><CalendarDays aria-hidden="true" />Réserver mon rendez-vous</button>
          <small><LockKeyhole aria-hidden="true" />Vos données sont 100% sécurisées et confidentielles.</small>
        </form>
      </article>
      <article className="lower-card contact-card">
        <h2>Où nous trouver</h2>
        <address>
          <p><MapPin aria-hidden="true" /><span>98FJ+W5X,<br />Tiaret 14000, Algérie</span></p>
          <p><Phone aria-hidden="true" /><a href="tel:+213773222361"><strong>0773 22 23 61</strong></a></p>
          <p><Mail aria-hidden="true" /><a href="mailto:aliahmeda.ortho@gmail.com">aliahmeda.ortho@gmail.com</a></p>
          <p><Clock3 aria-hidden="true" /><span>Sam - Jeu : 08h00 - 16h00<br /><strong>Vendredi : Fermé</strong></span></p>
        </address>
        <a
          className="clinic-map-link"
          href="https://share.google/F2HxhOwhnBHCbQ2UA"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir le cabinet sur Google Maps"
        >
          <Image className="clinic-map" src={clinicMap} alt="" unoptimized />
        </a>
      </article>
    </section>
  );
}
