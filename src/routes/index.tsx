import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Zap, Target, Rocket, ShieldCheck, Sparkles, TrendingDown, Frown, Clock,
  Gauge, Crown, Brain, Check, ChevronDown, MessageCircle, ArrowRight, Star,
} from "lucide-react";
import heroOrb from "@/assets/hero-orb.jpg";
import vsaLogo from "@/assets/vsa-logo.jpeg";
import { Reveal } from "@/components/vsa/Reveal";
import { CountUp } from "@/components/vsa/CountUp";

// ============================================================
// SITE CONFIG — edite tudo daqui
// ============================================================
const siteConfig = {
  brand: "VSA Studios",
  whatsappUrl: "https://wa.me/5500000000000?text=Quero%20alavancar%20meu%20neg%C3%B3cio%20com%20a%20VSA%20Studios",
  ctaPrimary: "Quero Alavancar Meu Negócio",
  ctaSecondary: "Falar com Especialista",
  nav: [
    { label: "Problema", href: "#problema" },
    { label: "Solução", href: "#solucao" },
    { label: "Método", href: "#metodo" },
    { label: "Resultados", href: "#resultados" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    badge: "Agência de Performance Digital",
    title: "Transformamos visitantes em clientes com Landing Pages de",
    titleHighlight: "Elite",
    subtitle:
      "Sites profissionais e ecossistemas digitais de altíssima conversão para empresários, médicos, infoprodutores e empresas locais que querem faturar mais pela internet.",
  },
  stats: [
    { value: 312, suffix: "%", label: "ROI médio dos clientes" },
    { value: 180, suffix: "+", label: "Projetos entregues" },
    { value: 7, suffix: " dias", label: "Entrega média" },
    { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  ],
  pains: [
    {
      icon: TrendingDown,
      title: "Site que não vende",
      desc: "Você investe em tráfego, mas o site não converte. Visitantes entram, olham e saem sem virar cliente.",
    },
    {
      icon: Frown,
      title: "Visual amador",
      desc: "Design genérico passa imagem de empresa pequena. Você perde autoridade e o cliente vai para o concorrente.",
    },
    {
      icon: Clock,
      title: "Lentidão que afasta",
      desc: "Sites pesados, mal otimizados e sem mobile-first matam sua taxa de conversão antes mesmo de carregar.",
    },
  ],
  solutions: [
    {
      icon: Gauge,
      title: "Velocidade extrema",
      desc: "Performance 95+ no PageSpeed. Stack moderno, código limpo e otimização real para Core Web Vitals.",
    },
    {
      icon: Crown,
      title: "Design de autoridade",
      desc: "Interface premium que comunica confiança no primeiro segundo. Seu negócio finalmente parece grande.",
    },
    {
      icon: Brain,
      title: "Copy com gatilhos mentais",
      desc: "Estrutura PAS/AIDA, prova social, urgência e ancoragem aplicadas em cada seção da página.",
    },
    {
      icon: Target,
      title: "Foco total em conversão",
      desc: "Cada pixel, botão e palavra existe por um único motivo: levar o visitante a clicar e comprar.",
    },
  ],
  plans: [
    {
      name: "Landing Page de Elite",
      tag: "Mais escolhido",
      setup: "R$ 2.997",
      monthly: "R$ 297/mês",
      features: [
        "Landing Page de alta conversão",
        "Copy estratégica PAS/AIDA",
        "Design premium personalizado",
        "Performance 95+ PageSpeed",
        "Integrações (WhatsApp, Pixel, GA4)",
        "Hospedagem e SSL inclusos",
        "Suporte e ajustes mensais",
      ],
      highlight: true,
    },
    {
      name: "Ecossistema VSA",
      tag: "Para escalar",
      setup: "R$ 6.997",
      monthly: "R$ 597/mês",
      features: [
        "Site institucional completo",
        "Até 3 Landing Pages de conversão",
        "Funil + automação WhatsApp",
        "Blog otimizado para SEO",
        "Painel admin personalizado",
        "Otimização contínua (CRO)",
        "Reuniões estratégicas mensais",
      ],
      highlight: false,
    },
  ],
  testimonials: [
    {
      name: "Dr. Rafael Lemos",
      role: "Clínica de Ortopedia",
      quote: "Triplicamos os agendamentos no primeiro mês. A página passa autoridade médica de verdade.",
      rating: 5,
    },
    {
      name: "Marina Costa",
      role: "Infoprodutora — Mentoria",
      quote: "Saí de 2 vendas/semana para 11. A copy e o design fazem o cliente sentir que precisa comprar.",
      rating: 5,
    },
    {
      name: "Lucas Andrade",
      role: "Construtora Andrade",
      quote: "O site novo posicionou a empresa em outro nível. Clientes maiores começaram a procurar a gente.",
      rating: 5,
    },
    {
      name: "Patrícia Souza",
      role: "Estética Premium",
      quote: "Em 14 dias estava no ar e em 30 já tinha pago o investimento. Recomendo demais.",
      rating: 5,
    },
  ],
  faq: [
    {
      q: "Em quanto tempo minha página fica pronta?",
      a: "Entregamos a primeira versão funcional entre 5 e 10 dias úteis. Projetos completos (Ecossistema VSA) levam de 15 a 25 dias, sempre com acompanhamento semanal.",
    },
    {
      q: "Como funciona o suporte e os ajustes mensais?",
      a: "Você tem canal direto com nosso time pelo WhatsApp. A mensalidade inclui ajustes de copy, troca de imagens, novas seções, manutenção, hospedagem e otimizações de CRO contínuas.",
    },
    {
      q: "Preciso ter algum conhecimento técnico?",
      a: "Zero. Cuidamos de tudo: design, copy, código, hospedagem, domínio, integrações com WhatsApp, pixels e Google Analytics. Você foca em vender.",
    },
    {
      q: "E se eu não gostar do resultado?",
      a: "Trabalhamos com rodadas de revisão até você aprovar. Nossa metodologia já validou mais de 180 projetos — sabemos exatamente como entregar algo que você vai amar.",
    },
    {
      q: "Vocês garantem aumento de vendas?",
      a: "Não vendemos promessa mágica. Garantimos: performance técnica de alto nível, design premium e estrutura de copy comprovada. O resultado em vendas vem da combinação disso com a sua oferta e tráfego.",
    },
    {
      q: "Posso cancelar quando quiser?",
      a: "Sim. Não trabalhamos com fidelidade. Se a parceria não fizer sentido, basta avisar com 30 dias de antecedência.",
    },
  ],
  footer: {
    tagline: "Ecossistemas digitais de alta conversão.",
    rights: `© ${new Date().getFullYear()} VSA Studios. Todos os direitos reservados.`,
  },
};

// ============================================================
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VSA Studios — Landing Pages de Elite que Convertem" },
      { name: "description", content: "Agência premium especializada em landing pages e ecossistemas digitais de altíssima conversão para empresários, médicos, infoprodutores e empresas locais." },
      { property: "og:title", content: "VSA Studios — Landing Pages de Elite" },
      { property: "og:description", content: "Transformamos visitantes em clientes com sites de altíssima conversão." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Pains />
        <Solutions />
        <Plans />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

// ============================================================
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group" aria-label={siteConfig.brand}>
          <img src={vsaLogo} alt="VSA Studios" width={140} height={40} className="h-9 w-auto object-contain transition-transform group-hover:scale-105" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-neon text-neon-foreground font-semibold text-sm hover:scale-[1.03] hover:shadow-glow transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          Falar agora
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="menu">
          <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-3">
            {siteConfig.nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-sm py-2">
                {n.label}
              </a>
            ))}
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-neon text-neon-foreground font-semibold">
              <MessageCircle className="w-4 h-4" /> Falar agora
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ============================================================
function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-border text-xs font-medium text-neon">
              <Zap className="w-3.5 h-3.5" /> {siteConfig.hero.badge}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              {siteConfig.hero.title}{" "}
              <span className="text-gradient-neon">{siteConfig.hero.titleHighlight}</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {siteConfig.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-neon text-neon-foreground font-semibold text-base shadow-glow hover:scale-[1.03] hover:shadow-glow transition-all animate-pulse-glow"
              >
                {siteConfig.ctaPrimary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#metodo"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl border border-border bg-surface/40 backdrop-blur font-medium hover:border-neon/60 hover:bg-surface transition-colors"
              >
                Ver método
              </a>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-neon/70 to-primary/70 border-2 border-background" />
                ))}
              </div>
              <span><strong className="text-foreground">+180</strong> negócios já escalaram com a VSA</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} className="relative">
          <div className="relative aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-full bg-neon/20 blur-3xl animate-pulse-glow" />
            <img
              src={heroOrb}
              alt="Esfera de energia VSA Studios"
              width={1024}
              height={1024}
              className="relative w-full h-full object-cover rounded-3xl animate-float"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
function Stats() {
  return (
    <section className="relative py-16 border-y border-border/60 bg-surface/30 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {siteConfig.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient-neon tabular-nums">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ============================================================
function Pains() {
  return (
    <section id="problema" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-neon uppercase tracking-wider">O problema</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Seu site está <span className="text-gradient-neon">queimando dinheiro</span> todos os dias
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Estes 3 erros silenciosos estão impedindo o seu negócio de crescer na internet:
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {siteConfig.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="group h-full p-8 rounded-2xl bg-card border border-border hover:border-neon/50 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 border border-destructive/30 grid place-items-center mb-6 group-hover:scale-110 transition-transform">
                  <p.icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
function Solutions() {
  return (
    <section id="solucao" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-neon/10 blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-neon uppercase tracking-wider">A solução VSA</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              O método que transforma seu site em uma <span className="text-gradient-neon">máquina de vendas</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Combinamos engenharia de alta performance, design premium e copy estratégica em um único entregável.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {siteConfig.solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="group relative h-full p-8 rounded-2xl bg-card glow-border overflow-hidden hover:shadow-glow transition-all duration-500">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-neon/20 blur-3xl group-hover:bg-neon/40 transition-colors" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon/30 to-primary/20 border border-neon/40 grid place-items-center mb-6 group-hover:scale-110 transition-transform">
                    <s.icon className="w-7 h-7 text-neon" />
                  </div>
                  <h3 className="text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
function Plans() {
  return (
    <section id="metodo" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm font-semibold text-neon uppercase tracking-wider">Modelo de contratação</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Setup único + Mensalidade que <span className="text-gradient-neon">cabe no seu caixa</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Você paga uma vez para criar e uma mensalidade leve para manter, otimizar e crescer.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {siteConfig.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 150}>
              <div
                className={`relative h-full p-8 md:p-10 rounded-3xl flex flex-col ${
                  plan.highlight
                    ? "bg-gradient-to-br from-card to-surface border-2 border-neon/60 shadow-glow"
                    : "bg-card border border-border"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neon text-neon-foreground text-xs font-bold uppercase tracking-wider shadow-glow-sm">
                    {plan.tag}
                  </span>
                )}
                {!plan.highlight && (
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{plan.tag}</span>
                )}
                <h3 className="mt-3 text-2xl font-bold">{plan.name}</h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">Setup</span>
                  <span className="text-3xl font-bold">{plan.setup}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">+</span>
                  <span className="text-2xl font-bold text-gradient-neon">{plan.monthly}</span>
                </div>
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center shrink-0 ${plan.highlight ? "bg-neon/20 text-neon" : "bg-muted text-muted-foreground"}`}>
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center justify-center gap-2 h-12 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? "bg-neon text-neon-foreground hover:scale-[1.03] hover:shadow-glow"
                      : "border border-border hover:border-neon/60 hover:bg-surface"
                  }`}
                >
                  Contratar este plano <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
function Testimonials() {
  return (
    <section id="resultados" className="relative py-24 md:py-32 bg-surface/30 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-neon uppercase tracking-wider">Resultados reais</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Negócios que <span className="text-gradient-neon">escalaram</span> com a VSA
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="h-full p-6 rounded-2xl bg-card border border-border hover:border-neon/50 hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-neon text-neon" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-foreground/90">“{t.quote}”</blockquote>
                <figcaption className="mt-6 pt-4 border-t border-border/60">
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold text-neon uppercase tracking-wider">Perguntas frequentes</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">Tirando suas dúvidas</h2>
          </div>
        </Reveal>

        <div className="mt-14 space-y-3">
          {siteConfig.faq.map((item, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div className={`rounded-2xl border transition-all ${open ? "border-neon/60 bg-card shadow-glow-sm" : "border-border bg-card/60 hover:border-neon/40"}`}>
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                    aria-expanded={open}
                  >
                    <span className="font-semibold text-base md:text-lg">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-neon transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/5 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-border text-xs font-medium text-neon mb-6">
            <Rocket className="w-3.5 h-3.5" /> Vagas limitadas por mês
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Pronto para ter um site que <span className="text-gradient-neon">realmente vende?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Fale agora com um especialista da VSA Studios e receba um diagnóstico estratégico gratuito do seu negócio digital.
          </p>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl bg-neon text-neon-foreground font-semibold text-base shadow-glow hover:scale-[1.03] transition-all animate-pulse-glow"
          >
            <MessageCircle className="w-5 h-5" />
            {siteConfig.ctaPrimary}
          </a>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-neon" />
            Resposta em até 1 hora útil
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/30 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-md bg-gradient-to-br from-neon to-primary grid place-items-center">
            <Sparkles className="w-4 h-4 text-neon-foreground" />
          </span>
          <div>
            <div className="font-bold">{siteConfig.brand}</div>
            <div className="text-xs text-muted-foreground">{siteConfig.footer.tagline}</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{siteConfig.footer.rights}</p>
      </div>
    </footer>
  );
}

// ============================================================
function FloatingCTA() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-neon text-neon-foreground grid place-items-center shadow-glow hover:scale-110 transition-transform animate-pulse-glow"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
