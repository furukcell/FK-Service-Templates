import { useEffect } from "react";

type Props = { active: boolean };

const SELECTORS = [
  ".pageShell:has(.ageGroupsSection) .sectionHead",
  ".pageShell:has(.ageGroupsSection) .whyUsCard",
  ".pageShell:has(.ageGroupsSection) .statCard",
  ".pageShell:has(.ageGroupsSection) .ageGroupItem",
  ".pageShell:has(.ageGroupsSection) .workshopCard",
  ".pageShell:has(.ageGroupsSection) .branchCard",
  ".pageShell:has(.ageGroupsSection) .staffCard",
  ".pageShell:has(.ageGroupsSection) .testimonialCard",
  ".pageShell:has(.ageGroupsSection) .campaignCard",
  ".pageShell:has(.ageGroupsSection) .visualCard",
  ".pageShell:has(.ageGroupsSection) .formPanel"
].join(",");

export function KindergartenCorporateEnhancer({ active }: Props) {
  useEffect(() => {
    if (!active || typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));
    if (!nodes.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("pk-motion-visible"));
      return;
    }

    nodes.forEach((node, index) => {
      node.classList.add("pk-motion-item");
      node.style.setProperty("--pk-delay", `${Math.min(index % 4, 3) * 80}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pk-motion-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -55px 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [active]);

  return null;
}
