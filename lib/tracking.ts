/**
 * GA4 / Google Ads / Meta Pixel olay gönderimleri.
 * Yalnızca istemci bileşenlerinden çağrılır.
 */

const GOOGLE_ADS_WHATSAPP_CONVERSION_ID = "AW-18332625430/QHarCN2ro9McEJbU1qVE";
const GOOGLE_ADS_CONTACT_FORM_CONVERSION_ID = "AW-18332625430/jjbDCNru5-wcEJbUlqVE";

type TrackingWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

type InitiateCheckoutPayload = {
  contentName: string;
  price: string;
};

/** "1.999 TL" gibi arayüz fiyatlarını Meta'nın beklediği sayısal değere çevirir. */
export const parsePriceForTracking = (price: string) =>
  Number(price.replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, ""));

export const trackInitiateCheckout = ({ contentName, price }: InitiateCheckoutPayload) => {
  if (typeof window === "undefined") {
    return;
  }

  const value = parsePriceForTracking(price);
  const fbq = (window as TrackingWindow).fbq;

  if (typeof fbq === "function" && Number.isFinite(value)) {
    fbq("track", "InitiateCheckout", {
      value,
      currency: "TRY",
      content_name: contentName,
    });
  }
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

export const trackReadingTestStart = (grade: string) => {
  if (typeof window === "undefined") return;
  const gtag = (window as TrackingWindow).gtag;
  if (typeof gtag === "function") {
    gtag("event", "okuma_testi_basladi", { student_grade: grade });
  }
};

export const trackReadingTestComplete = (payload: {
  grade: string;
  wpm: number;
  comprehension: number;
  effectiveWpm: number;
}) => {
  if (typeof window === "undefined") return;
  const gtag = (window as TrackingWindow).gtag;
  if (typeof gtag === "function") {
    gtag("event", "okuma_testi_tamamlandi", {
      student_grade: payload.grade,
      wpm: payload.wpm,
      comprehension_percent: payload.comprehension,
      effective_wpm: payload.effectiveWpm,
    });
  }
};

export const trackContactFormSuccess = () => {
  if (typeof window === "undefined") {
    return;
  }

  const gtag = (window as TrackingWindow).gtag;
  if (typeof gtag === "function") {
    gtag("event", "generate_lead", { form_name: "contact_form" });
    gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CONTACT_FORM_CONVERSION_ID,
    });
  }

  trackMetaLead();
};
