import { useRouter } from "next/router";
import type { LayoutVariant } from "@fk-templates/shared";

const allowedLayouts: LayoutVariant[] = ["modern", "split", "showcase", "flow"];

export function useLayoutVariantFromQuery(defaultLayout: LayoutVariant = "modern") {
  const router = useRouter();
  const rawLayout = Array.isArray(router.query.layout) ? router.query.layout[0] : router.query.layout;
  return allowedLayouts.includes(rawLayout as LayoutVariant) ? (rawLayout as LayoutVariant) : defaultLayout;
}
