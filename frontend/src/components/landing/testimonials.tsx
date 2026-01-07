import Image from "../ui/Image";
import TestimonialImg01 from "/images/testimonial-01.jpg";
import TestimonialImg02 from "/images/testimonial-02.jpg";
import TestimonialImg03 from "/images/testimonial-03.jpg";
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Consultante Juridique",
    company: "Legix Inc.",
    content:
      "VerifDoc a sauvé notre entreprise d'une situation de fraude potentielle. Nous avons vérifié un contrat critique et découvert qu'il avait été subtilement altéré. Le rapport d'analyse détaillé a mis en lumière chaque modification avec une précision chirurgicale.",
    img: TestimonialImg01,
  },
  {
    name: "Michael Rivera",
    role: "Agent Immobilier",
    company: "HomeQuest Realty",
    content:
      "Dans l'immobilier, la vitesse est cruciale. L'IA de VerifDoc est incroyablement rapide et d'une précision redoutable. Elle a détecté des anomalies invisibles dans un acte de propriété qui auraient pu causer des litiges majeurs lors de la signature.",
    img: TestimonialImg02,
  },
  {
    name: "Emily Chen",
    role: "Directrice RH",
    company: "TechGrowth Solutions",
    content:
      "Le plan Entreprise est un game-changer pour notre département RH. Nous traitons des centaines de documents chaque semaine. La vérification par lots de VerifDoc nous fait gagner des centaines d'heures tout en garantissant une conformité totale.",
    img: TestimonialImg03,
  }
];

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="mx-auto max-w-3xl pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Confiance & Sécurité
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Approuvé par des entreprises <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">du monde entier</span>
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            Écoutez ceux qui comptent sur VerifDoc au quotidien pour sécuriser leurs flux documentaires critiques.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col">

              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-slate-100 group-hover:text-blue-50 transition-colors duration-300">
                <Quote size={48} className="fill-current" />
              </div>

              {/* Content */}
              <div className="mb-6 relative z-10">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed italic relative z-10">"{item.content}"</p>
              </div>

              {/* Author */}
              <div className="mt-auto flex items-center gap-4 pt-6 border-t border-slate-50">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <Image
                    className="relative inline-flex shrink-0 rounded-full w-12 h-12 object-cover border-2 border-white shadow-sm"
                    src={item.img}
                    width={48}
                    height={48}
                    alt={item.name}
                  />
                </div>

                <div>
                  <div className="font-bold text-slate-900">{item.name}</div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{item.role}</div>
                  <div className="text-xs text-slate-400">{item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder Logic for Logos - using text with impactful fonts if images missing */}
            <span className="text-xl font-bold font-serif text-slate-800">Legix Inc.</span>
            <span className="text-xl font-extrabold tracking-tight text-slate-800">HomeQuest</span>
            <span className="text-xl font-semibold text-slate-800">TechGrowth</span>
            <span className="text-xl font-bold tracking-widest text-slate-800">SECURITAS</span>
            <span className="text-xl font-bold font-mono text-slate-800">GlobalAudit</span>
          </div>
        </div>

      </div>
    </section>
  );
}
