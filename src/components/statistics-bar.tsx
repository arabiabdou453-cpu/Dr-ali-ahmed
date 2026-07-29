import { Medal, Smile, Star, Users } from "lucide-react";

const statistics = [
  { value: "1500+", label: "Patients traités", Icon: Users },
  { value: "15+", label: "Années d’expérience", Icon: Medal },
  { value: "98%", label: "Satisfaction patient", Icon: Smile },
  { value: "5★", label: "Avis patients", Icon: Star },
] as const;

export function StatisticsBar() {
  return (
    <section className="statistics" aria-label="Chiffres clés">
      {statistics.map(({ value, label, Icon }) => (
        <div className="statistic" key={value}>
          <Icon aria-hidden="true" />
          <div><strong>{value}</strong><span>{label}</span></div>
        </div>
      ))}
    </section>
  );
}
