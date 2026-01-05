import Image from "../ui/Image";
import TestimonialImg01 from "/images/testimonial-01.jpg";
import TestimonialImg02 from "/images/testimonial-02.jpg";
import TestimonialImg03 from "/images/testimonial-03.jpg";
import TestimonialImg04 from "/images/testimonial-04.jpg";

const testimonials = [
  {
    name: "Thomas D.",
    role: "Directeur Sécurité",
    company: "BNP Paribas",
    content:
      "VerifDoc a réduit notre taux de fraude documentaire de 85% en moins de 3 mois. L'API est incroyablement rapide et facile à intégrer.",
    img: TestimonialImg01,
  },
  {
    name: "Sarah L.",
    role: "Head of KYC",
    company: "Qonto",
    content:
      "Enfin un outil capable de détecter les montages Photoshop sophistiqués. Le rapport de preuve PDF est un vrai plus pour nos audits.",
    img: TestimonialImg02,
  },
  {
    name: "Marc B.",
    role: "CTO",
    company: "Lydia",
    content:
      "La détection des 'Template Farms' nous a permis de bloquer une attaque massive de faux documents le mois dernier. Indispensable.",
    img: TestimonialImg03,
  },
  {
    name: "Elodie R.",
    role: "Compliance Officer",
    company: "Axa Banque",
    content: "L'interface est intuitive et les résultats sont instantanés. C'est devenu notre standard pour la validation des justificatifs de domicile.",
    img: TestimonialImg04
  }
];

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-gray-900 border-t border-gray-800 overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900 -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl font-nacelle bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-400">
            Rejoignez les leaders de la Fintech et de la banque qui sécurisent leurs processus avec VerifDoc.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <div key={index} className="relative rounded-2xl bg-gray-950/50 p-6 border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  className="inline-flex shrink-0 rounded-full w-12 h-12 border border-gray-700"
                  src={item.img}
                  width={48}
                  height={48}
                  alt={item.name}
                />
                <div>
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-sm text-primary-400">{item.role} @ {item.company}</div>
                </div>
              </div>
              <p className="text-gray-400 italic">"{item.content}"</p>
            </div>
          ))}
        </div>

        {/* Logos Cloud (Simplified) */}
        <div className="mt-20 pt-10 border-t border-gray-800">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">
            Utilisé par les meilleures équipes compliance
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Replace with SVGs or simplified text logos if images missing */}
            <h3 className="text-2xl font-bold text-white">Qonto</h3>
            <h3 className="text-2xl font-bold text-white">BNP Paribas</h3>
            <h3 className="text-2xl font-bold text-white">Lydia</h3>
            <h3 className="text-2xl font-bold text-white">Revolut</h3>
            <h3 className="text-2xl font-bold text-white">Boursorama</h3>
          </div>
        </div>

      </div>
    </section>
  );
}
