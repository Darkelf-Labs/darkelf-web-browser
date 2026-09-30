"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

const frames = [
  {
    label: "WHO",
    index: "01",
    title: "We are Darkelf.",
    body:
      "Engineers building privacy-first systems for high-stakes security workflows.",
    tone: "shadow",
  },
  {
    label: "WHAT",
    index: "02",
    title: "Hardened. Ephemeral. Private.",
    body:
      "Non-persistent sessions, anti-fingerprinting controls, and strict operational discipline.",
    tone: "shadow",
  },
  {
    label: "WHY",
    index: "03",
    title: "Because exposure is a liability.",
    body:
      "We reduce traceability, strengthen confidentiality, and defend investigative integrity.",
    tone: "signal",
  },
  {
    label: "WHERE",
    index: "04",
    title: "Built for the real web.",
    body:
      "Privacy-first browser technology for lawful security work across macOS, Linux, and Windows.",
    tone: "dual",
  },
] as const;

const SESSION_KEY = "darkelf_cutscene_seen";

const FRAME_DURATION_MS = 5000;
const FADE_LEAD_MS = 900;
const MUSIC_DELAY_MS = 2500;
const MUSIC_FADE_MS = 1400;
const MUSIC_FADE_OUT_MS = 900;

function getSessionFlag(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function setSessionFlag(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    return;
  }
}

interface EntryCutsceneProps {
  onComplete?: () => void;
}

export function EntryCutscene({ onComplete }: EntryCutsceneProps) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [needsUserAudio, setNeedsUserAudio] = useState(false);

  const timers = useRef<{
    cycle?: ReturnType<typeof setInterval>;
    fade?: ReturnType<typeof setTimeout>;
    hide?: ReturnType<typeof setTimeout>;
    music?: ReturnType<typeof setTimeout>;
    fadeIn?: ReturnType<typeof setInterval>;
    fadeOut?: ReturnType<typeof setInterval>;
  }>({});

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const clearFadeIn = () => {
    if (timers.current.fadeIn) {
      clearInterval(timers.current.fadeIn);
      timers.current.fadeIn = undefined;
    }
  };

  const clearFadeOut = () => {
    if (timers.current.fadeOut) {
      clearInterval(timers.current.fadeOut);
      timers.current.fadeOut = undefined;
    }
  };

  const startAudioWithFade = () => {
    const audio = audioRef.current;

    if (!audio) {
      return Promise.reject(new Error("Intro audio is unavailable."));
    }

    clearFadeIn();
    clearFadeOut();

    audio.muted = false;
    audio.volume = 0;

    const steps = Math.max(
      1,
      Math.floor(MUSIC_FADE_MS / 100)
    );

    const delta = 0.55 / steps;
    let volume = 0;

    return audio
      .play()
      .then(() => {
        setNeedsUserAudio(false);

        timers.current.fadeIn = setInterval(() => {
          volume = Math.min(0.55, volume + delta);
          audio.volume = volume;

          if (volume >= 0.55) {
            clearFadeIn();
          }
        }, 100);
      })
      .catch((error) => {
        setNeedsUserAudio(true);
        throw error;
      });
  };

  const fadeOutAndStop = (): Promise<void> => {
    const audio = audioRef.current;

    if (!audio) {
      return Promise.resolve();
    }

    clearFadeIn();
    clearFadeOut();

    if (audio.paused || audio.volume <= 0) {
      audio.pause();
      audio.currentTime = 0;
      return Promise.resolve();
    }

    const steps = Math.max(
      1,
      Math.floor(MUSIC_FADE_OUT_MS / 100)
    );

    const delta = audio.volume / steps;
    let volume = audio.volume;

    return new Promise((resolve) => {
      timers.current.fadeOut = setInterval(() => {
        volume = Math.max(0, volume - delta);
        audio.volume = volume;

        if (volume <= 0) {
          clearFadeOut();
          audio.pause();
          audio.currentTime = 0;
          resolve();
        }
      }, 100);
    });
  };

  const clearSequenceTimers = () => {
    if (timers.current.cycle) {
      clearInterval(timers.current.cycle);
      timers.current.cycle = undefined;
    }

    if (timers.current.fade) {
      clearTimeout(timers.current.fade);
      timers.current.fade = undefined;
    }

    if (timers.current.hide) {
      clearTimeout(timers.current.hide);
      timers.current.hide = undefined;
    }

    if (timers.current.music) {
      clearTimeout(timers.current.music);
      timers.current.music = undefined;
    }

    clearFadeIn();
  };

  useEffect(() => {
    if (getSessionFlag(SESSION_KEY)) {
      onComplete?.();
      return;
    }

    setSessionFlag(SESSION_KEY, "1");
    setVisible(true);

    const audio = new Audio(asset("/intro-music.mp3"));

    audioRef.current = audio;
    audio.loop = true;
    audio.preload = "metadata";
    audio.muted = true;
    audio.volume = 0;

    audio
      .play()
      .then(() => setNeedsUserAudio(false))
      .catch(() => setNeedsUserAudio(true));

    const totalDuration =
      FRAME_DURATION_MS * frames.length;

    timers.current.cycle = setInterval(() => {
      setFrameIndex((previous) => {
        if (previous + 1 < frames.length) {
          return previous + 1;
        }

        return previous;
      });
    }, FRAME_DURATION_MS);

    timers.current.music = setTimeout(() => {
      startAudioWithFade().catch(() => {
        setNeedsUserAudio(true);
      });
    }, MUSIC_DELAY_MS);

    timers.current.fade = setTimeout(() => {
      setFading(true);
    }, totalDuration - FADE_LEAD_MS);

    timers.current.hide = setTimeout(() => {
      fadeOutAndStop().finally(() => {
        setVisible(false);
        onComplete?.();
      });
    }, totalDuration);

    return () => {
      clearSequenceTimers();
      clearFadeOut();

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [onComplete]);

  const skip = () => {
    if (!visible) {
      return;
    }

    clearSequenceTimers();

    fadeOutAndStop().finally(() => {
      setFading(true);

      window.setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 250);
    });
  };

  const enableAudioNow = () => {
    if (!audioRef.current) {
      return;
    }

    if (timers.current.music) {
      clearTimeout(timers.current.music);
      timers.current.music = undefined;
    }

    startAudioWithFade().catch(() => {
      setNeedsUserAudio(true);
    });
  };

  if (!visible) {
    return null;
  }

  const frame = frames[frameIndex];

  return (
    <div
      className={`entry-cutscene entry-cutscene--${frame.tone}${
        fading ? " entry-cutscene--fade" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Darkelf introduction"
    >
      <div
        className="entry-cutscene__environment"
        aria-hidden="true"
      >
        <div className="entry-cutscene__aura entry-cutscene__aura--purple" />
        <div className="entry-cutscene__aura entry-cutscene__aura--green" />

        <div className="entry-cutscene__grid" />
        <div className="entry-cutscene__scan" />

        <div className="entry-cutscene__crosshair entry-cutscene__crosshair--one">
          <span />
        </div>

        <div className="entry-cutscene__crosshair entry-cutscene__crosshair--two">
          <span />
        </div>

        <div className="entry-cutscene__edge entry-cutscene__edge--tl" />
        <div className="entry-cutscene__edge entry-cutscene__edge--tr" />
        <div className="entry-cutscene__edge entry-cutscene__edge--bl" />
        <div className="entry-cutscene__edge entry-cutscene__edge--br" />

        <div className="entry-cutscene__noise" />
      </div>

      <div className="entry-cutscene__brand" aria-hidden="true">
        <span className="entry-cutscene__brand-mark">
          DARKELF
        </span>

        <span className="entry-cutscene__brand-line" />

        <span className="entry-cutscene__brand-status">
          SYSTEM ONLINE
        </span>
      </div>

      <div className="entry-cutscene__content">
        <div
          className="entry-cutscene__frame"
          key={frameIndex}
        >
          <div className="entry-cutscene__frame-meta">
            <span className="entry-cutscene__index">
              {frame.index}
            </span>

            <span className="entry-cutscene__label">
              {frame.label}
            </span>
          </div>

          <h2>{frame.title}</h2>

          <p>{frame.body}</p>

          <div
            className="entry-cutscene__signal"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div
        className="entry-cutscene__progress"
        aria-hidden="true"
      >
        {frames.map((item, index) => (
          <span
            key={item.index}
            className={
              index <= frameIndex
                ? "entry-cutscene__progress-item entry-cutscene__progress-item--active"
                : "entry-cutscene__progress-item"
            }
          />
        ))}
      </div>

      <div className="entry-cutscene__controls">
        {needsUserAudio && (
          <button
            type="button"
            className="entry-cutscene__audio"
            onClick={enableAudioNow}
            aria-label="Enable intro audio"
          >
            <i
              className="bi bi-volume-up"
              aria-hidden="true"
            />
            Enable sound
          </button>
        )}

        <button
          type="button"
          className="entry-cutscene__skip"
          onClick={skip}
        >
          Skip intro
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
