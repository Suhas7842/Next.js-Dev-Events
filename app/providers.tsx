"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
  !posthog.__loaded
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true,
    autocapture: true,
    debug: false,
    loaded: () => {
      if (process.env.NODE_ENV === "development") {
        console.log("PostHog loaded");
      }
    },
  });
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function PostHogPageView(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
