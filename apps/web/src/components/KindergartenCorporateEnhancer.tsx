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

function mountHeroVideo() {
  const slides = Array.from(document.querySelectorAll<HTMLElement>(
    ".pageShell:has(.ageGroupsSection) .corporateHeroSlide"
  ));

  slides.forEach((slide) => {
    if (slide.querySelector(".pk-heroVideo")) return;

    const background = slide.style.backgroundImage;
    const match = background.match(/url\\([\"']?(.+?)[\"']?\\)/i);
    const url = match?.[1];
    if (!url || !/\\.(mp4|webm|ogg)(\\?|#|$)/i.test(url)) return;

    slide.style.backgroundImage = "none";
    const video = document.createElement("video");
    video.className = "pk-heroVideo";
    video.src = url;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("aria-hidden", "true");
    video.preload = "metadata";
    slide.prepend(video);
    void video.play().catch(() => undefined);
  });
}

function mountHeroDecorations() {
  const hero = document.querySelector<HTMLElement>(
    ".pageShell:has(.ageGroupsSection) .corporateHeroSlider"
  );
  if (!hero || hero.querySelector(".pk-heroDecor")) return;

  const decor = document.createElement("div");
  decor.className = "pk-heroDecor";
  decor.setAttribute("aria-hidden", "true");
  decor.innerHTML = `
    <span class="pk-heroDoodle pk-doodle-sun">☀</span>
    <span class="pk-heroDoodle pk-doodle-cloud">☁</span>
    <span class="pk-heroDoodle pk-doodle-bear">🧸</span>
    <span class="pk-heroDoodle pk-doodle-rocket">🚀</span>
    <span class="pk-heroDoodle pk-doodle-ball">⚽</span>
    <span class="pk-heroDoodle pk-doodle-butterfly">🦋</span>
  `;
  hero.appendChild(decor);
}

export function KindergartenCorporateEnhancer({ active }: Props) {
  useEffect(() => {
    if (!active || typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("pk-kindergarten-premium-scroll");
    mountHeroVideo();
    mountHeroDecorations();

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
