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

function enhanceHeroMedia() {
  const slides = Array.from(document.querySelectorAll<HTMLElement>(
    ".pageShell:has(.ageGroupsSection) .corporateHeroSlide"
  ));

  slides.forEach((slide) => {
    if (slide.querySelector(".pk-hero-video")) return;

    const background = window.getComputedStyle(slide).backgroundImage;
    const match = background.match(/url\\(["']?(.*?)["']?\\)/i);
    const source = match?.[1];
    if (!source || !/\\.(mp4|webm|ogg)(?:[?#]|$)/i.test(source)) return;

    const video = document.createElement("video");
    video.className = "pk-hero-video";
    video.src = source;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("aria-hidden", "true");
    video.preload = "metadata";
    slide.style.backgroundImage = "none";
    slide.prepend(video);
    void video.play().catch(() => undefined);
  });
}

export function KindergartenCorporateEnhancer({ active }: Props) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    document.documentElement.classList.toggle("pk-kindergarten-premium-scroll", active);

    if (!active || typeof window === "undefined") return;

    enhanceHeroMedia();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));
    if (!nodes.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("pk-motion-visible"));
      return () => document.documentElement.classList.remove("pk-kindergarten-premium-scroll");
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
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("pk-kindergarten-premium-scroll");
    };
  }, [active]);

  return null;
}
