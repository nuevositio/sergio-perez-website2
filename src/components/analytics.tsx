"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function getCookie(name: string) {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return value ? decodeURIComponent(value) : undefined;
}

function createEventId(source: string) {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  return `${source}_${Date.now()}_${random}`;
}

export function trackLead(source: string) {
  if (typeof window === "undefined") return;

  const eventId = createEventId(source);

  window.gtag?.("event", "generate_lead", {
    event_category: "conversion",
    method: source,
    event_id: eventId,
  });

  window.fbq?.(
    "track",
    "Lead",
    {
      content_name: source,
    },
    { eventID: eventId },
  );

  const payload = JSON.stringify({
    eventName: "Lead",
    eventId,
    source,
    eventSourceUrl: window.location.href,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/meta/conversions", new Blob([payload], { type: "application/json" }));
    return;
  }

  fetch("/api/meta/conversions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (GA_ID && window.gtag) {
      window.gtag("config", GA_ID, {
        page_path: pathname,
        page_location: window.location.href,
      });
    }

    if (META_PIXEL_ID && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      const href = link?.getAttribute("href") ?? "";

      if (href.startsWith("mailto:yosoy@sergioperez.uy")) {
        trackLead("email_click");
      }

      if (href.includes("wa.me/59895342022")) {
        trackLead("whatsapp_click");
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname, page_location: window.location.href });
            `}
          </Script>
        </>
      ) : null}

      {META_PIXEL_ID ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              alt=""
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}
    </>
  );
}
