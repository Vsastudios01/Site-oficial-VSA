import { Check, X, Flame, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  period: string;
  features: PricingFeature[];
  cta: string;
  ctaIcon?: React.ReactNode;
  badge?: string;
  highlight?: string;
  extraInfo?: string;
  featured?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Velocity Essential",
    subtitle: "Ideal para quem precisa apenas marcar presença online.",
    price: "R$ 39,90",
    period: "/mês",
    features: [
      { text: "Site institucional (1 página)", included: true },
      { text: "Hospedagem inclusa", included: true },
      { text: "Passe credibilidade (Site Seguro)", included: true },
      { text: "Botão direto para WhatsApp", included: true },
      { text: "Perfeito no celular", included: true },
      { text: "Suporte básico (48h)", included: true },
      { text: "Personalização avançada", included: false },
      { text: "Loja virtual", included: false },
      { text: "Pagamentos online", included: false },
    ],
    cta: "Começar Agora",
  },
  {
    name: "Velocity Full",
    subtitle: "O plano ideal para crescer.",
    price: "R$ 59,90",
    period: "/mês",
    badge: "MAIS ESCOLHIDO",
    highlight: "O plano escolhido por 8 em cada 10 clientes",
    features: [
      { text: "Página focada em conversão", included: true },
      { text: "Domínio personalizado (.com.br)", included: true },
      { text: "Apareça no Google", included: true },
      { text: "Receba mensagens no WhatsApp", included: true },
      { text: "Passe credibilidade (Site Seguro)", included: true },
      { text: "Atendimento automático (Botão)", included: true },
      { text: "Site rápido (não perde clientes)", included: true },
      { text: "Suporte especializado", included: true },
      { text: "Loja virtual (adicional)", included: true },
    ],
    cta: "Garantir Minha Vaga",
    ctaIcon: <Flame className="w-4 h-4" />,
    extraInfo: "Taxa única de ativação: R$ 200,00",
    featured: true,
  },
  {
    name: "Velocity Pro",
    subtitle: "Para escalar seu negócio.",
    price: "R$ 97,90",
    period: "/mês",
    features: [
      { text: "Tudo do Full +", included: true },
      { text: "Landing pages ilimitadas", included: true },
      { text: "Textos persuasivos (Copy)", included: true },
      { text: "Topo do Google (SEO)", included: true },
      { text: "Blog integrado", included: true },
      { text: "Suporte prioritário (24h)", included: true },
      { text: "1 alteração estratégica/mês", included: true },
      { text: "Loja virtual completa", included: true },
      { text: "Carrinho de compras", included: true },
      { text: "Receba no Pix e Cartão", included: true },
    ],
    cta: "Quero Escalar Meu Negócio",
  },
];

export function PricingSection() {
  return (
    <section
      id="precos"
      className="relative py-20 sm:py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#0B0B14" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{
                border: "1px solid rgba(124,58,237,0.35)",
                color: "#a78bfa",
                background: "rgba(124,58,237,0.08)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" /> Planos e Preços
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Escolha o plano ideal para{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #f97316)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                alavancar seu negócio
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              Todos os planos incluem hospedagem, SSL e suporte. Sem taxa de cancelamento.
            </p>
          </div>
        </Reveal>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 120}>
              <div
                className={`
                  relative rounded-2xl p-6 sm:p-7 transition-all duration-500
                  ${plan.featured
                    ? "md:-mt-4 md:mb-4"
                    : ""
                  }
                `}
                style={plan.featured
                  ? {
                      background: "rgba(255,255,255,0.04)",
                      border: "1.5px solid rgba(124,58,237,0.5)",
                      boxShadow: "0 0 40px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }
                  : {
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(124,58,237,0.18)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                    }
                }
              >
                {/* Featured badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #f97316)",
                      boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan name & subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{plan.subtitle}</p>

                {/* Highlight text */}
                {plan.highlight && (
                  <p className="mt-3 flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: "#fbbf24" }}
                  >
                    <span>⭐</span>
                    {plan.highlight}
                  </p>
                )}

                {/* Price */}
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-slate-400">{plan.period}</span>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  className={`
                    mt-5 w-full h-12 rounded-xl font-semibold text-sm
                    flex items-center justify-center gap-2
                    transition-all duration-300
                    ${plan.featured
                      ? "hover:scale-[1.02] hover:shadow-lg"
                      : "hover:scale-[1.02]"
                    }
                  `}
                  style={plan.featured
                    ? {
                        background: "linear-gradient(135deg, #7c3aed, #f97316)",
                        color: "#fff",
                        boxShadow: "0 8px 24px rgba(124,58,237,0.3)",
                      }
                    : {
                        background: "rgba(124,58,237,0.12)",
                        border: "1px solid rgba(124,58,237,0.35)",
                        color: "#c4b5fd",
                      }
                  }
                  onMouseEnter={(e) => {
                    if (!plan.featured) {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(124,58,237,0.22)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(124,58,237,0.55)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.featured) {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(124,58,237,0.12)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(124,58,237,0.35)";
                    }
                  }}
                >
                  {plan.ctaIcon}
                  {plan.cta}
                </button>

                {/* Extra info */}
                {plan.extraInfo && (
                  <p className="mt-3 text-center text-xs text-slate-500">{plan.extraInfo}</p>
                )}

                {/* Divider */}
                <div className="my-6 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25), transparent)" }}
                />

                {/* Features list */}
                <ul className="space-y-3" role="list" aria-label={`Benefícios do ${plan.name}`}>
                  {plan.features.map((f) => (
                    <li
                      key={f.text}
                      className={`flex items-start gap-3 text-sm ${f.included ? "text-slate-200" : "text-slate-600"}`}
                    >
                      {f.included ? (
                        <span
                          className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "rgba(124,58,237,0.15)" }}
                        >
                          <Check className="w-3 h-3" style={{ color: "#a78bfa" }} />
                        </span>
                      ) : (
                        <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-slate-800">
                          <X className="w-3 h-3 text-slate-600" />
                        </span>
                      )}
                      <span className="leading-relaxed">{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
