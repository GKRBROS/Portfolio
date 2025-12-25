"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track view on page load
    const trackView = async () => {
      try {
        // Map pathname to page name
        let pageName = "home";
        if (pathname === "/work") pageName = "work";
        else if (pathname === "/resume") pageName = "resume";
        else if (pathname === "/contact") pageName = "contact";
        else if (pathname === "/certificates") pageName = "certificates";

        // Don't track admin pages
        if (pathname.startsWith("/admin")) return;

        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: pageName }),
        });
      } catch (error) {
        console.error("Error tracking view:", error);
      }
    };

    trackView();
  }, [pathname]);

  return null;
}
