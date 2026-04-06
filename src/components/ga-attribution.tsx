"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

type Attribution = {
  traffic_type: "utm" | "referral" | "direct";
  source_hint: string;
  referrer_host: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

function getAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source") || undefined;
  const utm_medium = params.get("utm_medium") || undefined;
  const utm_campaign = params.get("utm_campaign") || undefined;
  const utm_content = params.get("utm_content") || undefined;
  const utm_term = params.get("utm_term") || undefined;

  const referrer = document.referrer;
  const currentHost = window.location.hostname;
  let referrer_host = "";

  if (referrer) {
    try {
      referrer_host = new URL(referrer).hostname;
    } catch {
      referrer_host = "";
    }
  }

  if (utm_source || utm_medium || utm_campaign) {
    return {
      traffic_type: "utm",
      source_hint: utm_source || utm_medium || "utm",
      referrer_host,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    };
  }

  if (referrer_host && referrer_host !== currentHost) {
    return {
      traffic_type: "referral",
      source_hint: referrer_host,
      referrer_host,
    };
  }

  return {
    traffic_type: "direct",
    source_hint: "direct",
    referrer_host,
  };
}

export default function GAAttribution() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;

    trackEvent("page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    const attr = getAttribution();

    if (typeof window.gtag === "function") {
      window.gtag("set", "user_properties", {
        first_touch_type: attr.traffic_type,
        first_touch_source: attr.source_hint,
        first_touch_referrer: attr.referrer_host || "none",
      });
    }

    const key = "ar_first_touch_tracked";
    if (!sessionStorage.getItem(key)) {
      trackEvent("first_touch_attribution", {
        ...attr,
        landing_page: window.location.pathname,
      });
      sessionStorage.setItem(key, "1");
    }
  }, []);

  return null;
}
