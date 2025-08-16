"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Append query parameter if in development
      const swUrl =
        process.env.NODE_ENV === "development"
          ? "/service-worker.js?dev=true"
          : "/service-worker.js";

      navigator.serviceWorker
        .register(swUrl)
        .then((reg) => console.log("Service Worker Registered!:", reg))
        .catch((err) =>
          console.error("Service Worker Registration Failed:", err)
        );
    }
  }, []);

  return null;
}