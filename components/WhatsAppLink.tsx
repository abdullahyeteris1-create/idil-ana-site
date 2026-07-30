"use client";

import { WHATSAPP_URL } from "@/lib/contact";
import { trackWhatsAppClick } from "@/lib/tracking";

type WhatsAppLinkProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  "aria-label"?: string;
};

/**
 * Sunucu bileşenlerinden (blog, KVKK) tıklama ölçümlü WhatsApp bağlantısı
 * verebilmek için küçük bir istemci adası.
 */
export function WhatsAppLink({
  children,
  className,
  href = WHATSAPP_URL,
  "aria-label": ariaLabel,
}: WhatsAppLinkProps) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={trackWhatsAppClick}
    >
      {children}
    </a>
  );
}
