/**
 * İletişim bilgileri tek kaynaktan yönetilir; numara değişirse yalnızca burası
 * güncellenir. Daha önce aynı numara beş ayrı dosya/satırda tekrar ediyordu.
 */

export const PHONE_NUMBER_E164 = "+905462396786";
export const PHONE_NUMBER_DISPLAY = "+90 546 239 67 86";
export const STUDENT_PANEL_URL = "https://panel.idilegitim.com";

const WHATSAPP_NUMBER = "905462396786";
const DEFAULT_WHATSAPP_MESSAGE =
  "Merhaba, hızlı okuma eğitimi hakkında bilgi almak istiyorum.";

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = whatsappUrl();
