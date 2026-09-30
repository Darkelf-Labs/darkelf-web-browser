"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "darkelf_cutscene_seen";
const INTRO_DURATION_MS = 4000;
const FADE_START_MS = 3200;
const SKIP_FADE_MS = 220;

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
  const completedRef = useRef(false);

  const timers = useRef<{
    fade?: ReturnType<typeof setTimeout>;
    hide?: ReturnType<typeof setTimeout>;
    skip?: ReturnType<typeof setTimeout>;
  }>({});

  const clearTimers = useCallback(() => {
    if (timers.current.fade) {
      clearTimeout(timers.current.fade);
      timers.current.fade = undefined;
    }

    if (timers.current.hide) {
      clearTimeout(timers.current.hide);
      timers.current.hide = undefined;
    }

    if (timers.current.skip) {
      clearTimeout(timers.current.skip);
      timers.current.skip = undefined;
    }
  }, []);

  const complete = useCallback(() => {
    if (completedRef.current) {
      return;
    }

    completedRef.current = true;
    clearTimers();
    setVisible(false);
    onComplete?.();
  }, [clearTimers, onComplete]);

  useEffect(() => {
    if (getSessionFlag(SESSION_KEY)) {
      complete();
      return;
    }

    setSessionFlag(SESSION_KEY, "1");
    setVisible(true);

    timers.current.fade = setTimeout(() => {
      setFading(true);
    }, FADE_START_MS);

    timers.current.hide = setTimeout(() => {
      complete();
    }, INTRO_DURATION_MS);

    return clearTimers;
  }, [clearTimers, complete]);

  const skip = () => {
    if (!visible || completedRef.current) {
      return;
    }

    clearTimers();
    setFading(true);

    timers.current.skip = setTimeout(() => {
      complete();
    }, SKIP_FADE_MS);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`entry-cutscene entry-cutscene--dual${
        fading ? " entry-cutscene--fade" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Darkelf introduction"
    >
      <div className="entry-cutscene__environment" aria-hidden="true">
        <div className="entry-cutscene__aura entry-cutscene__aura--purple" />
        <div className="entry-cutscene__aura entry-cutscene__aura--green" />
        <div className="entry-cutscene__grid" />
        <div className="entry-cutscene__scan" />

        <div className="entry-cutscene__edge entry-cutscene__edge--tl" />
        <div className="entry-cutscene__edge entry-cutscene__edge--tr" />
        <div className="entry-cutscene__edge entry-cutscene__edge--bl" />
        <div className="entry-cutscene__edge entry-cutscene__edge--br" />
      </div>

      <div className="entry-cutscene__content">
        <div className="entry-cutscene__frame entry-cutscene__boot">
          <div className="entry-cutscene__boot-line" aria-hidden="true" />

          <h1 className="entry-cutscene__boot-brand">DARKELF</h1>

          <div className="entry-cutscene__boot-products">
            <span className="entry-cutscene__boot-shadow">SHADOW</span>
            <span className="entry-cutscene__boot-divider" aria-hidden="true">
              •
            </span>
            <span className="entry-cutscene__boot-cocoa">COCOA</span>
          </div>

          <p className="entry-cutscene__boot-tagline">
            PRIVACY • SECURITY • OPEN SOURCE
          </p>

          <div className="entry-cutscene__boot-status">
            <span className="entry-cutscene__boot-status-dot" aria-hidden="true" />
            SYSTEM READY
          </div>
        </div>
      </div>

      <div className="entry-cutscene__controls">
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
