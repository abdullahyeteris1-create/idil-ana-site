/**
 * GA4 / Google Ads / Meta Pixel olay gönderimleri.
 * Yalnızca istemci bileşenlerinden çağrılır.
 */

const GOOGLE_ADS_WHATSAPP_CONVERSION_ID = "AW-18332625430/QHarCN2ro9McEJbU1qVE";

type TrackingWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export const trackMetaLead = () => {
  if (typeof window === "undefined") {
    return;
  }

  const fbq = (window as TrackingWindow).fbq;

  if (typeof fbq === "function") {
    fbq("track", "Lead", { content_name: "WhatsApp Bilgi Al" });
  }
};

export const trackWhatsAppClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  if (typeof window !== "undefined") {
    const gtag = (window as TrackingWindow).gtag;

    if (typeof gtag === "function") {
      const link = event.currentTarget;
      const linkText = link.getAttribute("aria-label") ?? link.textContent?.trim() ?? "WhatsApp";

      gtag("event", "whatsapp_click", {
        link_url: link.href,
        link_text: linkText,
        page_location: window.location.href,
      });

      gtag("event", "conversion", {
        send_to: GOOGLE_ADS_WHATSAPP_CONVERSION_ID,
      });
    }
  }

  trackMetaLead();
};

export const trackContactFormSuccess = () => {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (window as TrackingWindow).gtag;
  if (typeof gtag === "function") {
    gtag("event", "generate_lead", { form_name: "contact_form" });
  }

  trackMetaLead();
};
