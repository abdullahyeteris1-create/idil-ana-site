import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

const description =
  "İlkokul ve ortaokul öğrencileri için online hızlı okuma, okuduğunu anlama, dikkat ve odaklanma eğitimlerinin içeriğini ve paketlerini keşfedin.";

export const metadata: Metadata = createPageMetadata({
  title: "Online Hızlı Okuma Eğitimi",
  description,
  path: "/hizli-okuma-egitimi",
});

export default function HizliOkumaEgitimiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
