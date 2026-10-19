import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Zap, Rocket, Sparkles, Gauge, Check, ChevronDown, MessageCircle, ArrowRight,
  Smartphone, MessageSquareOff, MousePointerClick, ShieldAlert, LayoutTemplate,
  Building2, PackageSearch, Workflow, Bot, Search, Compass, Code2, Send, Menu, X,
  Layers, Target, Eye,
} from "lucide-react";
import vsaLogo from "@/assets/vsa-logo.png.asset.json";
import { Reveal } from "@/components/vsa/Reveal";
import { SolutionWizard } from "@/components/vsa/SolutionWizard";

// ============================================================
// SITE CONFIG — edite tudo daqui
// ============================================================
// Número oficial do WhatsApp (DDI + DDD + número, só dígitos)
const WHATSAPP_NUMBER = "5575998098817";
const wa = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const siteConfig = {
  brand: "VSA Studios",
  whatsapp: wa,
  defaultMessage: "Olá, VSA Studios! Quero conhecer suas soluções.",
  nav: [
    { label: "Serviços", id: "servicos" },
    { label: "Projetos", id: "projetos" },
    { label: "Método", id: "metodo" },
    { label: "Planos", id: "planos" },
    { label: "Diagnóstico", id: "diagnostico" },
    { label: "FAQ", id: "faq" },
  ],
  hero: {
    badge: "Agência de tecnologia e design",
    titleStart: "Transformamos sua presença digital em",
    titleHighlight: "oportunidades de negócio.",
    subtitle:
      "Sites, landing pages e soluções digitais criadas para apresentar melhor sua empresa, conquistar confiança e gerar mais oportunidades de venda.",
    ctaPrimary: "Quero impulsionar meu negócio",
    ctaSecondary: "Conhecer nossas soluções",
  },
  pillars: [
    { icon: Layers, title: "Soluções personalizadas", desc: "Nada de template genérico." },
    { icon: Smartphone, title: "Pensado para o celular", desc: "Mobile-first em cada tela." },
    { icon: Target, title: "Foco em conversão", desc: "Caminho claro até o contato." },
    { icon: Workflow, title: "Processo estruturado", desc: "Etapas claras do início ao fim." },
  ],
  pains: [
    { icon: Smartphone, title: "Lento ou difícil no celular", desc: "A maioria dos visitantes chega pelo celular. Se trava, eles saem." },
    { icon: MessageSquareOff, title: "Não explica o seu diferencial", desc: "O visitante não entende por que escolher você e não o concorrente." },
    { icon: MousePointerClick, title: "Sem caminho para o orçamento", desc: "Falta um próximo passo evidente para pedir contato ou comprar." },
    { icon: ShieldAlert, title: "Pouca confiança visual", desc: "Visual amador e informações faltando afastam quem ia comprar." },
  ],
  services: [
    { icon: LayoutTemplate, name: "Landing pages", benefit: "Mais contatos por campanha", desc: "Páginas focadas em uma oferta, com estrutura persuasiva e um único objetivo.", forWho: "Campanhas de tráfego, lançamentos e captação de leads." },
    { icon: Building2, name: "Sites institucionais", benefit: "Autoridade e credibilidade", desc: "Apresentação completa da sua empresa, serviços e diferenciais.", forWho: "Clínicas, escritórios, empresas locais e prestadores de serviço." },
    { icon: PackageSearch, name: "Páginas de produto/serviço", benefit: "Oferta clara e desejável", desc: "Destaque benefícios, detalhes e chamadas diretas para compra ou orçamento.", forWho: "Infoprodutores e negócios com ofertas específicas." },
    { icon: Workflow, name: "Automações e integrações", benefit: "Menos tarefas manuais", desc: "Conexão entre site, WhatsApp, formulários e ferramentas que você já usa.", forWho: "Empresas que querem ganhar tempo no atendimento." },
    { icon: Bot, name: "Chatbots e assistentes", benefit: "Atendimento mais rápido", desc: "Assistentes para responder dúvidas frequentes e direcionar o cliente. Escopo avaliado sob consulta.", forWho: "Negócios com alto volume de perguntas repetidas." },
  ],
  projects: [
    { name: "Clínica — conceito", category: "Site institucional", goal: "Gerar agendamentos pelo WhatsApp com visual de autoridade médica.", hue: 300 },
    { name: "Mentoria — conceito", category: "Landing page", goal: "Apresentar uma oferta de mentoria e captar interessados.", hue: 330 },
    { name: "Comércio local — conceito", category: "Página de serviços", goal: "Mostrar serviços e facilitar o pedido de orçamento.", hue: 270 },
  ],
  method: [
    { icon: Search, title: "Diagnóstico", desc: "Entendemos o negócio, o público e o objetivo da página." },
    { icon: Compass, title: "Estratégia", desc: "Definimos estrutura, mensagem e o caminho de conversão." },
    { icon: Code2, title: "Desenvolvimento", desc: "Construímos a solução, testamos e ajustamos com você." },
    { icon: Send, title: "Publicação", desc: "Colocamos no ar e orientamos os próximos passos." },
  ],
  methodIncludes: ["Design personalizado", "Versão para celular", "Botões de WhatsApp", "Hospedagem e SSL (nos planos mensais)", "Rodadas de ajustes"],
  plans: [
    {
      name: "Landing Page de Elite", tag: "Mais escolhido", setup: "R$ 2.997", monthly: "R$ 297/mês",
      features: ["Landing page de alta conversão", "Copy estratégica", "Design premium personalizado", "Otimizada para velocidade", "Integrações (WhatsApp, Pixel, GA4)", "Hospedagem e SSL inclusos", "Suporte e ajustes mensais"],
      highlight: true,
    },
    {
      name: "Ecossistema VSA", tag: "Para escalar", setup: "R$ 6.997", monthly: "R$ 597/mês",
      features: ["Site institucional completo", "Até 3 landing pages", "Funil + automação WhatsApp", "Blog otimizado para SEO", "Painel admin personalizado", "Otimização contínua", "Reuniões estratégicas mensais"],
      highlight: false,
    },
  ],
  wizardSteps: [
    { id: "goal", question: "Qual é o seu principal objetivo?", options: ["Apresentar minha empresa", "Conseguir mais contatos e orçamentos", "Divulgar um produto ou serviço", "Automatizar tarefas"] },
    { id: "site", question: "Você já possui um site?", options: ["Sim, quero melhorar", "Não, preciso criar um", "Tenho apenas redes sociais"] },
    { id: "segment", question: "Qual é o seu segmento?", options: ["Saúde", "Serviços locais", "Infoprodutos / educação", "Comércio / varejo"], allowText: true },
  ],
  faq: [
    { q: "Quais serviços a VSA oferece?", a: "Landing pages, sites institucionais, páginas de produtos e serviços, além de automações e integrações digitais. Chatbots e assistentes são avaliados caso a caso." },
    { q: "Como funciona o desenvolvimento de um site?", a: "Seguimos quatro etapas: diagnóstico, estratégia, desenvolvimento e publicação. Você acompanha e aprova cada fase antes de seguirmos." },
    { q: "O site funciona em celulares?", a: "Sim. Todos os projetos são pensados primeiro para o celular e depois adaptados para tablets e computadores." },
    { q: "Posso solicitar alterações?", a: "Sim. Há rodadas de ajustes durante o desenvolvimento e, nos planos mensais, ajustes contínuos conforme o escopo contratado." },
    { q: "Como funciona o orçamento?", a: "Conversamos pelo WhatsApp para entender sua necessidade e enviamos uma proposta com escopo, investimento e prazo estimado para o seu caso." },
    { q: "O que preciso fornecer para começar?", a: "Informações sobre o negócio, logotipo, fotos (se tiver) e acessos ao domínio, quando existir. Ajudamos a organizar o que faltar." },
    { q: "A VSA também trabalha com automações?", a: "Sim. Integramos o site a WhatsApp, formulários e outras ferramentas para reduzir tarefas manuais. O escopo é definido no diagnóstico." },
  ],
  footer: {
    tagline: "Tecnologia e design para negócios que querem crescer no digital.",
    rights: `© ${new Date().getFullYear()} VSA Studios. Todos os direitos reservados.`,
  },
};

function recommend(a: Record<string, string>) {
  if (a.goal === "Automatizar tarefas")
    return { title: "Automações e integrações", desc: "Conectar seu atendimento, WhatsApp e ferramentas para ganhar tempo — com um site ou página de apoio, se fizer sentido." };
  if (a.goal === "Conseguir mais contatos e orçamentos" || a.goal === "Divulgar um produto ou serviço")
    return { title: "Landing page de conversão", desc: "Uma página focada em uma oferta, com chamada direta para o WhatsApp, ideal para campanhas e captação de contatos." };
  if (a.site === "Sim, quero melhorar")
    return { title: "Redesign do site institucional", desc: "Reorganizar mensagem, visual e navegação do seu site atual para passar mais confiança e facilitar o contato." };
  return { title: "Site institucional profissional", desc: "Uma presença digital completa para apresentar sua empresa, seus serviços e seus diferenciais com credibilidade." };
}

// ============================================================
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VSA Studios — Sites e Landing Pages para Negócios" },
      { name: "description", content: "Sites, landing pages e soluções digitais que apresentam melhor sua empresa, conquistam confiança e geram mais oportunidades de venda." },
      { property: "og:title", content: "VSA Studios — Presença digital que gera negócios" },
      { property: "og:description", content: "Sites profissionais, landing pages e automações pensadas para o celular e focadas em conversão." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-neon focus:text-neon-foreground">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Pillars />
        <Pains />
        <Services />
        <Projects />
        <Method />
        <Plans />
        <Diagnostic />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

// ============================================================
function SectionHeading({ eyebrow, title, highlight, desc, center }: { eyebrow: string; title: string; highlight?: string; desc?: string; center?: boolean }) {
  return (
    <Reveal>
      <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
        <span className="text-xs sm:text-sm font-semibold text-neon uppercase tracking-[0.18em]">{eyebrow}</span>
        <h2 className="mt-3 text-[clamp(1.75rem,4.5vw,3rem)] font-bold tracking-tight leading-[1.1] text-balance">
          {title} {highlight && <span className="text-gradient-neon">{highlight}</span>}
        </h2>
        {desc && <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{desc}</p>}
      </div>
    </Reveal>
  );
}

const btnPrimary = "group inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl bg-neon text-neon-foreground font-semibold text-sm sm:text-base shadow-glow-sm hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all";
const btnGhost = "inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl border border-border bg-surface/40 backdrop-blur font-medium text-sm sm:text-base hover:border-neon/60 hover:bg-surface active:scale-[0.98] transition-all";

// ============================================================
function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    siteConfig.nav.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled || open ? "bg-background/80 backdrop-blur-xl border-b border-border/60" : "bg-transparent border-b border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center shrink-0" aria-label="VSA Studios — início">
          <img src={vsaLogo.url} alt="VSA Studios" width={261} height={131} className="h-12 sm:h-14 w-auto object-contain" />
        </a>
        <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
          {siteConfig.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              className={`relative px-3 py-2 text-sm rounded-lg transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {n.label}
              <span className={`absolute left-3 right-3 -bottom-0.5 h-px bg-neon transition-transform origin-left ${active === n.id ? "scale-x-100" : "scale-x-0"}`} />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={wa(siteConfig.defaultMessage)} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-neon text-neon-foreground font-semibold text-sm hover:shadow-glow-sm active:scale-[0.98] transition-all">
            <MessageCircle className="w-4 h-4" /> Falar com um especialista
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-11 h-11 grid place-items-center rounded-lg hover:bg-surface"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-border/60 animate-fade-in">
          <nav aria-label="Menu móvel" className="px-5 py-3 flex flex-col">
            {siteConfig.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className={`py-3 text-base border-b border-border/40 last:border-0 ${active === n.id ? "text-neon" : ""}`}>
                {n.label}
              </a>
            ))}
            <a href={wa(siteConfig.defaultMessage)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={`${btnPrimary} mt-3 mb-2`}>
              <MessageCircle className="w-4 h-4" /> Falar com um especialista
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============================================================
function Hero() {
  const h = siteConfig.hero;
  return (
    <section id="top" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[480px] h-[480px] sm:w-[720px] sm:h-[720px] rounded-full bg-neon/15 blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-10 items-center">
        <div className="text-center lg:text-left">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-border text-[11px] sm:text-xs font-medium text-neon">
              <Zap className="w-3.5 h-3.5" /> {h.badge}
            </span>
          </div>
          <h1 className="mt-6 text-[clamp(2.1rem,6.2vw,4.4rem)] leading-[1.04] font-bold tracking-tight text-balance animate-fade-in-up [animation-delay:100ms]">
            {h.titleStart} <span className="text-gradient-neon">{h.titleHighlight}</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
            {h.subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in-up [animation-delay:300ms]">
            <a href={wa(siteConfig.defaultMessage)} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} h-14`}>
              {h.ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#servicos" className={`${btnGhost} h-14`}>{h.ctaSecondary}</a>
          </div>
        </div>
        <div className="animate-fade-in [animation-delay:350ms]">
          <DeviceMockup />
        </div>
      </div>

      <a href="#pilares" aria-label="Explorar a página" className="hidden md:grid mt-16 mx-auto w-10 h-10 place-items-center rounded-full border border-border text-muted-foreground hover:text-neon hover:border-neon/50 transition-colors relative">
        <ChevronDown className="w-4 h-4 animate-float" />
      </a>
    </section>
  );
}

/** CSS-only device composition — conceptual preview, no external images. */
function DeviceMockup() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none" aria-hidden="true">
      <div className="rounded-2xl border border-border bg-card shadow-glow-sm overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 h-9 border-b border-border bg-surface">
          <span className="w-2.5 h-2.5 rounded-full bg-muted" /><span className="w-2.5 h-2.5 rounded-full bg-muted" /><span className="w-2.5 h-2.5 rounded-full bg-muted" />
          <span className="ml-3 h-4 flex-1 max-w-[180px] rounded bg-muted/70" />
        </div>
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex justify-between items-center"><span className="h-3 w-16 rounded bg-neon/60" /><span className="h-6 w-20 rounded-md bg-neon/80" /></div>
          <div className="space-y-2 pt-3"><div className="h-5 w-4/5 rounded bg-foreground/80" /><div className="h-5 w-3/5 rounded bg-gradient-to-r from-neon to-primary" /></div>
          <div className="space-y-1.5"><div className="h-2.5 w-full rounded bg-muted" /><div className="h-2.5 w-11/12 rounded bg-muted" /></div>
          <div className="flex gap-2 pt-1"><span className="h-8 w-28 rounded-lg bg-neon" /><span className="h-8 w-24 rounded-lg border border-border" /></div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[0, 1, 2].map((i) => <div key={i} className="h-16 rounded-lg bg-surface border border-border" />)}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-8 -right-2 sm:-right-6 w-28 sm:w-32 rounded-[1.4rem] border-4 border-secondary bg-card shadow-glow-sm overflow-hidden animate-float">
        <div className="p-3 space-y-2">
          <div className="h-1.5 w-8 mx-auto rounded-full bg-muted" />
          <div className="h-3 w-full rounded bg-foreground/80" /><div className="h-3 w-3/4 rounded bg-neon/80" />
          <div className="h-1.5 w-full rounded bg-muted" /><div className="h-1.5 w-5/6 rounded bg-muted" />
          <div className="h-6 w-full rounded-md bg-neon mt-2" />
          <div className="h-10 w-full rounded-md bg-surface border border-border" />
        </div>
      </div>
      <div className="absolute -top-4 -left-3 sm:-left-6 px-3 py-2 rounded-xl glow-border bg-card/90 backdrop-blur text-xs flex items-center gap-2">
        <Gauge className="w-4 h-4 text-neon" /> Rápido e mobile-first
      </div>
    </div>
  );
}

// ============================================================
function Pillars() {
  return (
    <section id="pilares" aria-label="Nossos compromissos" className="relative py-10 sm:py-12 border-y border-border/60 bg-surface/30">
      <ul className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {siteConfig.pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <li className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left list-none">
              <span className="w-10 h-10 shrink-0 rounded-xl bg-neon/10 border border-neon/30 grid place-items-center"><p.icon className="w-5 h-5 text-neon" /></span>
              <div>
                <p className="font-semibold text-sm sm:text-base">{p.title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

// ============================================================
function Pains() {
  return (
    <section id="problema" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading eyebrow="O problema" title="Seu site pode estar" highlight="afastando clientes." desc="Muitos negócios perdem oportunidades todos os dias por detalhes que passam despercebidos. Veja se algum destes parece familiar:" />
          <Reveal delay={150}>
            <a href="#servicos" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neon hover:gap-3 transition-all">
              Veja como resolvemos <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {siteConfig.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className={i % 2 === 1 ? "sm:translate-y-8" : ""}>
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-destructive/40 transition-colors">
                <p.icon className="w-6 h-6 text-destructive" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
function Services() {
  return (
    <section id="servicos" className="relative py-20 sm:py-28 scroll-mt-16">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] rounded-full bg-neon/8 blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading eyebrow="Serviços" title="Soluções digitais para cada" highlight="etapa do seu negócio." desc="Escolha um serviço para conversar com nosso time já sabendo do que você precisa." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {siteConfig.services.map((s, i) => (
            <Reveal key={s.name} delay={i * 80} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <article className="group h-full flex flex-col p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-neon/50 hover:-translate-y-1 hover:shadow-glow-sm focus-within:border-neon/60 transition-all duration-300">
                <span className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/30 grid place-items-center group-hover:bg-neon/20 transition-colors">
                  <s.icon className="w-6 h-6 text-neon" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{s.name}</h3>
                <p className="mt-1 text-sm font-medium text-neon">{s.benefit}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <p className="mt-4 text-xs text-muted-foreground"><span className="text-foreground font-medium">Recomendado para:</span> {s.forWho}</p>
                <a
                  href={wa(siteConfig.defaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Quero saber mais sobre ${s.name}`}
                  className="mt-6 pt-5 border-t border-border/60 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-neon transition-colors"
                >
                  Quero saber mais <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
function Projects() {
  return (
    <section id="projetos" className="relative py-20 sm:py-28 bg-surface/30 border-y border-border/60 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading eyebrow="Demonstrações" title="Como pensamos" highlight="cada projeto." desc="Demonstrações conceituais do nosso estilo de trabalho. Em breve, cases reais publicados aqui." />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {siteConfig.projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <article className="group h-full rounded-2xl bg-card border border-border overflow-hidden hover:border-neon/50 transition-colors">
                <div className="relative aspect-[4/3] overflow-hidden" style={{ background: `radial-gradient(circle at 30% 20%, oklch(0.55 0.2 ${p.hue} / 0.5), transparent 60%), var(--surface)` }} aria-hidden="true">
                  <div className="absolute inset-6 rounded-xl border border-border bg-background/70 p-4 space-y-2 transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-1">
                    <div className="h-2.5 w-12 rounded bg-neon/70" />
                    <div className="h-4 w-3/4 rounded bg-foreground/70 mt-3" />
                    <div className="h-4 w-1/2 rounded bg-foreground/40" />
                    <div className="h-2 w-full rounded bg-muted mt-2" />
                    <div className="h-6 w-24 rounded-md bg-neon mt-3" />
                  </div>
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-background/80 backdrop-blur text-[10px] font-semibold uppercase tracking-wider">Conceito</span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neon">{p.category}</p>
                  <h3 className="mt-2 text-lg font-bold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.goal}</p>
                  <a href={wa(siteConfig.defaultMessage)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-neon transition-colors">
                    <Eye className="w-4 h-4" /> Quero algo assim
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
function Method() {
  return (
    <section id="metodo" className="relative py-20 sm:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading center eyebrow="Método" title="Um processo claro, do" highlight="diagnóstico à publicação." />
        <ol className="relative mt-14 grid gap-8 lg:grid-cols-4 lg:gap-6">
          <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" aria-hidden="true" />
          <div className="lg:hidden absolute top-2 bottom-2 left-7 w-px bg-gradient-to-b from-neon/50 via-neon/20 to-transparent" aria-hidden="true" />
          {siteConfig.method.map((m, i) => (
            <Reveal key={m.title} delay={i * 120}>
              <li className="relative flex lg:flex-col lg:items-center lg:text-center gap-5 list-none">
                <span className="relative z-10 w-14 h-14 shrink-0 rounded-2xl bg-card border border-neon/40 grid place-items-center shadow-glow-sm">
                  <m.icon className="w-6 h-6 text-neon" aria-hidden="true" />
                </span>
                <div>
                  <span className="text-xs font-mono text-neon">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-bold">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-xs lg:mx-auto">{m.desc}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <div className="mt-14 max-w-3xl mx-auto rounded-2xl border border-border bg-card/60 p-6">
            <p className="text-sm font-semibold">O que está incluído:</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {siteConfig.methodIncludes.map((x) => (
                <li key={x} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-xs sm:text-sm">
                  <Check className="w-3.5 h-3.5 text-neon" /> {x}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">Prazos são definidos na proposta, de acordo com o escopo de cada projeto.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
function Plans() {
  return (
    <section id="planos" className="relative py-20 sm:py-28 bg-surface/30 border-y border-border/60 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading center eyebrow="Modelo de contratação" title="Setup único + mensalidade que" highlight="cabe no seu caixa." desc="Você paga uma vez para criar e uma mensalidade leve para manter, ajustar e evoluir." />
        <div className="mt-12 grid md:grid-cols-2 gap-8 sm:gap-6 max-w-5xl mx-auto">
          {siteConfig.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 150}>
              <div className={`relative h-full p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col transition-transform duration-300 hover:-translate-y-1 ${plan.highlight ? "bg-gradient-to-br from-card to-surface border-2 border-neon/60 shadow-glow-sm mt-4 md:mt-0" : "bg-card border border-border"}`}>
                {plan.highlight ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neon text-neon-foreground text-xs font-bold uppercase tracking-wider whitespace-nowrap">{plan.tag}</span>
                ) : (
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{plan.tag}</span>
                )}
                <h3 className="mt-3 text-2xl font-bold">{plan.name}</h3>
                <div className="mt-6 flex items-baseline gap-2"><span className="text-sm text-muted-foreground">Setup</span><span className="text-3xl font-bold">{plan.setup}</span></div>
                <div className="mt-1 flex items-baseline gap-2"><span className="text-sm text-muted-foreground">+</span><span className="text-2xl font-bold text-gradient-neon">{plan.monthly}</span></div>
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center shrink-0 ${plan.highlight ? "bg-neon/20 text-neon" : "bg-muted text-muted-foreground"}`}><Check className="w-3 h-3" /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={wa(siteConfig.defaultMessage)} target="_blank" rel="noopener noreferrer" className={plan.highlight ? `${btnPrimary} mt-8` : `${btnGhost} mt-8`}>
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
function Diagnostic() {
  return (
    <section id="diagnostico" className="relative py-20 sm:py-28 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <SectionHeading center eyebrow="Diagnóstico rápido" title="Descubra a solução ideal para" highlight="seu negócio." desc="Três perguntas, sem cadastro. No final você recebe uma sugestão inicial e pode continuar pelo WhatsApp." />
        <Reveal delay={120}>
          <div className="mt-10">
            <SolutionWizard config={{ steps: siteConfig.wizardSteps, recommend, buildWhatsapp: wa }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-surface/30 border-y border-border/60 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <SectionHeading center eyebrow="Perguntas frequentes" title="Tirando suas" highlight="dúvidas." />
        <div className="mt-10 space-y-3">
          {siteConfig.faq.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={item.q} className={`rounded-2xl border transition-colors ${open ? "border-neon/50 bg-card" : "border-border bg-card/60 hover:border-neon/30"}`}>
                <h3>
                  <button
                    id={`faq-btn-${i}`}
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                  >
                    <span className="font-semibold text-sm sm:text-base md:text-lg">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-neon transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
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
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-border text-[11px] sm:text-xs font-medium text-neon mb-6">
            <Rocket className="w-3.5 h-3.5" /> Vamos conversar
          </div>
          <h2 className="text-[clamp(1.9rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] text-balance">
            Pronto para dar o próximo passo <span className="text-gradient-neon">no digital?</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Conte sobre o seu negócio e receba uma orientação inicial sobre a melhor solução para o seu momento.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={wa(siteConfig.defaultMessage)} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} h-14`}>
              <MessageCircle className="w-5 h-5" /> Falar com um especialista
            </a>
            <a href="#diagnostico" className={`${btnGhost} h-14`}><Sparkles className="w-4 h-4" /> Fazer o diagnóstico</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/30 pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12 grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <img src={vsaLogo.url} alt="VSA Studios" width={261} height={131} loading="lazy" className="h-16 sm:h-20 w-auto object-contain" />
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">{siteConfig.footer.tagline}</p>
        </div>
        <nav aria-label="Rodapé">
          <p className="text-sm font-semibold">Navegação</p>
          <ul className="mt-3 grid grid-cols-2 md:grid-cols-1 gap-2 text-sm text-muted-foreground">
            {siteConfig.nav.map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-foreground">{n.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold">Contato</p>
          <a href={wa(siteConfig.defaultMessage)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="max-w-7xl mx-auto px-5 sm:px-6 py-5 text-xs text-muted-foreground">{siteConfig.footer.rights}</p>
      </div>
    </footer>
  );
}

// ============================================================
function FloatingCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={wa(siteConfig.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      title="Conversar no WhatsApp"
      className={`group fixed right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neon text-neon-foreground grid place-items-center shadow-glow-sm hover:shadow-glow hover:scale-105 transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      tabIndex={show ? 0 : -1}
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="hidden md:block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-card border border-border text-foreground text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Conversar no WhatsApp
      </span>
    </a>
  );
}
