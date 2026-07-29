import { ArthroscopyIcon, HipIcon, KneeIcon, SpineIcon, SportsIcon, TraumaIcon } from "@/components/medical-icons";

const specialties = [
  { title: "Chirurgie du genou", copy: <>Ligaments, ménisques,<br />prothèse totale et partielle.</>, Icon: KneeIcon },
  { title: "Prothèse de hanche", copy: <>Remplacement prothétique<br />mini-invasif.</>, Icon: HipIcon },
  { title: "Traumatologie", copy: <>Fractures, luxations et<br />traumatismes sportifs.</>, Icon: TraumaIcon },
  { title: "Arthroscopie", copy: <>Techniques mini-invasives<br />pour articulations.</>, Icon: ArthroscopyIcon },
  { title: "Colonne vertébrale", copy: <>Hernies discales, scoliose<br />et douleurs chroniques.</>, Icon: SpineIcon },
  { title: "Médecine sportive", copy: <>Prévention, traitement et<br />rééducation sportive.</>, Icon: SportsIcon },
] as const;

export function Specialties() {
  return (
    <section className="specialties" id="specialites">
      <h2><span />Nos spécialités<span /></h2>
      <div className="specialties__grid">
        {specialties.map(({ title, copy, Icon }) => (
          <article className="specialty-card" key={title}>
            <Icon aria-hidden="true" />
            <h3>{title}</h3>
            <p>{copy}</p>
            <a href="#">En savoir plus →</a>
          </article>
        ))}
      </div>
    </section>
  );
}
