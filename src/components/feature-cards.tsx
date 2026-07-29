import { Heart, MonitorSmartphone, Shield, Users } from "lucide-react";

const features = [
  { title: "Expertise", description: <>Plus de 15 ans d’expérience<br />en chirurgie orthopédique</>, Icon: Shield },
  { title: "Technologie", description: <>Équipements modernes<br />et techniques avancées</>, Icon: MonitorSmartphone },
  { title: "Accompagnement", description: <>Prise en charge personnalisée<br />à chaque étape</>, Icon: Users },
  { title: "Suivi personnalisé", description: <>Un suivi attentif pour des<br />résultats durables</>, Icon: Heart },
] as const;

export function FeatureCards() {
  return (
    <section className="feature-cards" aria-label="Nos engagements">
      {features.map(({ title, description, Icon }) => (
        <article className="feature-card" key={title}>
          <span className="feature-card__icon"><Icon aria-hidden="true" /></span>
          <div><h2>{title}</h2><p>{description}</p></div>
        </article>
      ))}
    </section>
  );
}
