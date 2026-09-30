"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { EntryCutscene } from "@/components/EntryCutscene";

export default function SplashPage() {
  const router = useRouter();

  const goHome = () => router.replace("/home");

  // Fallback: if the intro stalls, redirect shortly after the 4-second sequence
  useEffect(() => {
    const fallback = setTimeout(goHome, 5000);
    return () => clearTimeout(fallback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <EntryCutscene onComplete={goHome} />;
}

