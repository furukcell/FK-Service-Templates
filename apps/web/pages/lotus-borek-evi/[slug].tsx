import { useRouter } from "next/router";
import type { ContentPageKey } from "@fk-templates/firebase";
import { demoLotusBorekConfig } from "../../../../configs/demo-lotus-borek";
import { ContentPage, FaqPage } from "../../src/components/ContentPage";

const pageBySlug: Record<string, ContentPageKey> = {
  hakkimizda: "about",
  iletisim: "contact",
  "gizlilik-politikasi": "privacy",
  "kvkk-aydinlatma-metni": "kvkk",
  "cerez-politikasi": "cookies",
  "kullanim-kosullari": "terms"
};

const homePath = "/lotus-borek-evi";
const contentBasePath = "/lotus-borek-evi";

export default function LotusBorekContentPage() {
  const router = useRouter();
  const slugValue = router.query.slug;
  const slug = Array.isArray(slugValue) ? slugValue[0] : slugValue;

  if (slug === "sss") {
    return <FaqPage staticConfig={demoLotusBorekConfig} homePath={homePath} contentBasePath={contentBasePath} />;
  }

  const pageKey = pageBySlug[slug || ""] || "about";
  return <ContentPage pageKey={pageKey} staticConfig={demoLotusBorekConfig} homePath={homePath} contentBasePath={contentBasePath} />;
}
