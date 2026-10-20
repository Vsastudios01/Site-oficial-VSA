import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import poster from "@/assets/video-mockup-poster.jpg.asset.json";
import clip from "@/assets/video_mockup_vsa_1.mp4.asset.json";

/**
 * Minimalist video preview that opens the clip in fullscreen.
 * Clicking the preview opens a fullscreen overlay (native fullscreen when the
 * browser allows it) with the video playing and its own controls.
 */
export function VideoPreview({ duration = "0:29" }: { duration?: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const usedNative = useRef(false);

  // Fullscreen overlay: lock scroll, try native fullscreen, wire ESC.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    usedNative.current = false;

    const box = boxRef.current;
    if (box?.requestFullscreen) {
      box
        .requestFullscreen()
        .then(() => {
          usedNative.current = true;
        })
        .catch(() => {
          /* overlay fallback is already full screen */
        });
    }

    const onFsChange = () => {
      if (usedNative.current && !document.fullscreenElement) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("fullscreenchange", onFsChange);
      window.removeEventListener("keydown", onKey);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      triggerRef.current?.focus();
    };
  }, [open]);

  // Play after the overlay mounts; fall back to muted if the browser blocks sound.
  useEffect(() => {
    if (!open) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Assistir à demonstração em tela cheia"
        className="group/vid relative block w-full aspect-video overflow-hidden rounded-xl border border-border bg-background text-left transition-colors duration-300 hover:border-neon/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon"
      >
        <img
          src={poster.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 ease-out group-hover/vid:scale-[1.04]"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/10"
          aria-hidden="true"
        />
        <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-neon/50 bg-background/70 backdrop-blur-sm transition-all duration-300 group-hover/vid:scale-110 group-hover/vid:border-neon group-hover/vid:shadow-glow">
            <Play className="h-5 w-5 translate-x-px fill-neon text-neon" />
          </span>
        </span>
        <span className="absolute bottom-2.5 left-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Prévia
        </span>
        <span className="absolute bottom-2.5 right-3 rounded bg-background/85 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          {duration}
        </span>
      </button>

      {open && (
        <div
          ref={boxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo de demonstração em tela cheia"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-8"
        >
          <video
            ref={videoRef}
            src={clip.url}
            poster={poster.url}
            controls
            playsInline
            className="h-auto max-h-full w-auto max-w-full rounded-lg bg-black"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar vídeo"
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/85 text-foreground backdrop-blur transition-colors hover:border-neon/60 hover:text-neon"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
