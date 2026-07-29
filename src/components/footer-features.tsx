import { CalendarCheck, CreditCard, ShieldCheck, Stethoscope, Users } from "lucide-react";

const items = [
  { title: "Soins de qualité", copy: <>Des soins orthopédiques<br />de haute qualité.</>, Icon: Stethoscope },
  { title: "Rendez-vous rapides", copy: <>Créneaux flexibles et<br />prise en charge rapide.</>, Icon: CalendarCheck },
  { title: "Accompagnement", copy: <>Un accompagnement humain<br />et personnalisé.</>, Icon: Users },
  { title: "Sécurité & Hygiène", copy: <>Normes d’hygiène strictes<br />et sécurité optimale.</>, Icon: ShieldCheck },
  { title: "Facilités de paiement", copy: <>Plusieurs moyens de paiement<br />disponibles.</>, Icon: CreditCard },
] as const;

export function FooterFeatures() {
  return (
    <footer className="footer-features">
      {items.map(({ title, copy, Icon }) => (
        <div className="footer-feature" key={title}>
          <span><Icon aria-hidden="true" /></span>
          <div><strong>{title}</strong><p>{copy}</p></div>
        </div>
      ))}
    </footer>
  );
}
