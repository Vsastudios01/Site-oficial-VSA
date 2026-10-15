import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, RotateCcw } from "lucide-react";

export interface WizardConfig {
  steps: { id: string; question: string; options: string[]; allowText?: boolean }[];
  recommend: (answers: Record<string, string>) => { title: string; desc: string };
  buildWhatsapp: (message: string) => string;
}

export function SolutionWizard({ config }: { config: WizardConfig }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [custom, setCustom] = useState("");
  const total = config.steps.length;
  const done = step >= total;
  const current = config.steps[step];

  const choose = (value: string) => {
    if (!current) return;
    setAnswers((a) => ({ ...a, [current.id]: value }));
    setCustom("");
    setStep((s) => s + 1);
  };

  const rec = done ? config.recommend(answers) : null;
  const message = rec
    ? `Olá, VSA Studios! Fiz o diagnóstico no site:\n` +
      config.steps.map((s) => `• ${s.question} ${answers[s.id] ?? "-"}`).join("\n") +
      `\nSugestão inicial: ${rec.title}. Gostaria de conversar.`
    : "";

  return (
    <div className="rounded-3xl border border-border bg-card/70 backdrop-blur p-5 sm:p-8 md:p-10">
      {/* Progress */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {config.steps.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i < step ? "bg-neon" : "bg-muted"}`} />
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground" aria-live="polite">
        {done ? "Recomendação pronta" : `Etapa ${step + 1} de ${total}`}
      </p>

      {!done && current && (
        <fieldset key={current.id} className="mt-6 animate-fade-in">
          <legend className="text-xl sm:text-2xl font-bold">{current.question}</legend>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {current.options.map((opt) => {
              const selected = answers[current.id] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => choose(opt)}
                  aria-pressed={selected}
                  className={`group min-h-14 px-4 py-3 rounded-xl border text-left text-sm sm:text-base flex items-center justify-between gap-3 transition-all active:scale-[0.98] ${
                    selected ? "border-neon bg-neon/10" : "border-border bg-background/40 hover:border-neon/50 hover:bg-surface"
                  }`}
                >
                  {opt}
                  {selected ? <Check className="w-4 h-4 text-neon shrink-0" /> : <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />}
                </button>
              );
            })}
          </div>
          {current.allowText && (
            <form
              className="mt-4 flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (custom.trim()) choose(custom.trim());
              }}
            >
              <label htmlFor="wiz-other" className="sr-only">Outro segmento</label>
              <input
                id="wiz-other"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                maxLength={60}
                placeholder="Outro segmento (ex: advocacia)"
                className="flex-1 h-12 px-4 rounded-xl bg-background/60 border border-input text-sm focus:outline-none focus:border-neon"
              />
              <button type="submit" disabled={!custom.trim()} className="h-12 px-5 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold disabled:opacity-40 hover:bg-accent transition-colors">
                Continuar
              </button>
            </form>
          )}
          {step > 0 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          )}
        </fieldset>
      )}

      {done && rec && (
        <div className="mt-6 animate-fade-in">
          <span className="text-xs font-semibold uppercase tracking-wider text-neon">Sugestão inicial</span>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold">{rec.title}</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">{rec.desc}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {config.steps.map((s, i) => (
              <li key={s.id} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-muted-foreground">{s.question}</span>
                <strong>{answers[s.id]}</strong>
                <button type="button" onClick={() => setStep(i)} className="text-neon underline-offset-4 hover:underline text-xs">editar</button>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">Recomendação orientativa — a definição final acontece na conversa com nosso time.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={config.buildWhatsapp(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-neon text-neon-foreground font-semibold text-sm hover:shadow-glow active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Continuar pelo WhatsApp
            </a>
            <button
              type="button"
              onClick={() => { setAnswers({}); setStep(0); }}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-border text-sm hover:border-neon/50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Recomeçar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
