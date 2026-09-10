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
    const match = background.match(/url\([\"']?(.+?)[\"']?\)/i);
    const url = match?.[1];
    if (!url || !/\.(mp4|webm|ogg)(\?|#|$)/i.test(url)) return;

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
    <svg class="pk-doodle pk-doodle-sun" viewBox="0 0 100 100"><circle cx="50" cy="50" r="18"/><path d="M50 7v15M50 78v15M7 50h15M78 50h15M20 20l11 11M69 69l11 11M80 20L69 31M31 69L20 80"/><circle cx="44" cy="47" r="2.5"/><circle cx="56" cy="47" r="2.5"/><path d="M42 56q8 8 16 0"/></svg>
    <svg class="pk-doodle pk-doodle-rocket" viewBox="0 0 100 120"><path d="M50 7c20 13 27 37 21 63l-8 22H37l-8-22C23 44 30 20 50 7Z"/><circle cx="50" cy="42" r="9"/><path d="M37 70 22 84l12 1M63 70l15 14-12 1M42 92l-6 17 14-9 14 9-6-17"/></svg>
    <svg class="pk-doodle pk-doodle-ball" viewBox="0 0 100 100"><circle cx="50" cy="50" r="34"/><path d="M38 29q12 9 24 0M25 53q15-6 27 5t24 1M46 84q2-14-8-23M61 83q-5-13 1-25"/></svg>
    <svg class="pk-doodle pk-doodle-butterfly" viewBox="0 0 120 100"><path d="M58 50C25 13 3 27 18 51c8 13 24 12 40 4M62 50c33-37 55-23 40 1-8 13-24 12-40 4"/><path d="M58 48q-7 23 2 38M62 48q7 23-2 38"/><circle cx="60" cy="48" r="4"/></svg>
    <svg class="pk-doodle pk-doodle-teddy" viewBox="0 0 100 110"><circle cx="28" cy="27" r="11"/><circle cx="72" cy="27" r="11"/><circle cx="50" cy="50" r="29"/><circle cx="39" cy="47" r="3"/><circle cx="61" cy="47" r="3"/><path d="M43 61q7 7 14 0M50 52v7"/><path d="M25 84q25 13 50 0"/></svg>
    <svg class="pk-doodle pk-doodle-cloud" viewBox="0 0 140 80"><path d="M18 58q-9-20 13-28 7-24 31-15 17-23 39-2 29-4 27 22 16 8 1 23H27Q13 59 18 58Z"/></svg>
  `;
  hero.appendChild(decor);
}

function mountStoryScene() {
  const page = document.querySelector<HTMLElement>(".pageShell:has(.ageGroupsSection)");
  const hero = page?.querySelector<HTMLElement>(".corporateHeroSlider");
  if (!page || !hero || page.querySelector(".pk-storyScene")) return;

  const images = Array.from(page.querySelectorAll<HTMLImageElement>(".visualCard img")).slice(0, 2);
  if (!images.length) return;

  const scene = document.createElement("section");
  scene.className = "pk-storyScene";
  scene.id = "about-kindergarten";
  scene.innerHTML = `
    <div class="pk-storyOrbits" aria-hidden="true">
      <span class="pk-storyDoodle pk-story-heart">♡</span>
      <span class="pk-storyDoodle pk-story-bird">•ᴗ•</span>
      <span class="pk-storyDoodle pk-story-ball">◉</span>
      <span class="pk-storyDoodle pk-story-spark">✦</span>
    </div>
    <div class="pk-storyPhotos" aria-label="Kreşten fotoğraflar">
      <figure class="pk-polaroid pk-polaroid-a"></figure>
      <figure class="pk-polaroid pk-polaroid-b"></figure>
    </div>
    <div class="pk-storyCopy">
      <span class="pk-storyEyebrow">BİZİM İÇİN EN DEĞERLİSİ</span>
      <h2>Odağımız çocuklarımızın iyiliği</h2>
      <p>Çocukların güvenle keşfedebileceği, sevgi ve neşeyle büyüyebileceği bir okul öncesi deneyimi.</p>
      <div class="pk-storyFacts">
        <div><b>♡</b><span><strong>Güvenli Ortam</strong><small>Çocukların kendini güvende hissettiği sıcak bir ortam.</small></span></div>
        <div><b>✦</b><span><strong>Mutlu Öğrenme</strong><small>Oyun, keşif ve gelişimi destekleyen günlük deneyimler.</small></span></div>
      </div>
      <a class="pillButton navButtonLink" href="#services">Kreşimizi Daha Yakından Tanıyın →</a>
    </div>
  `;

  const photoA = scene.querySelector<HTMLElement>(".pk-polaroid-a");
  const photoB = scene.querySelector<HTMLElement>(".pk-polaroid-b");
  if (photoA && images[0]) photoA.style.backgroundImage = `url(${images[0].src})`;
  if (photoB && images[1]) photoB.style.backgroundImage = `url(${images[1].src})`;
  hero.insertAdjacentElement("afterend", scene);
}

function cleanupKindergartenEnhancements() {
  document.querySelectorAll(".pageShell:has(.ageGroupsSection) .pk-storyScene").forEach((node) => node.remove());
  document.querySelectorAll(".pageShell:has(.ageGroupsSection) .pk-heroDecor").forEach((node) => node.remove());
  document.querySelectorAll(".pageShell:has(.ageGroupsSection) .pk-heroVideo").forEach((node) => node.remove());
  document.querySelectorAll(".pageShell:has(.ageGroupsSection) .pk-motion-item").forEach((node) => {
    node.classList.remove("pk-motion-item", "pk-motion-visible");
    (node as HTMLElement).style.removeProperty("--pk-delay");
  });
}

export function KindergartenCorporateEnhancer({ active }: Props) {
  useEffect(() => {
    if (!active || typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("pk-kindergarten-premium-scroll");
    mountHeroVideo();
    mountHeroDecorations();
    mountStoryScene();

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));
    if (!nodes.length) return () => {
      cleanupKindergartenEnhancements();
      document.documentElement.classList.remove("pk-kindergarten-premium-scroll");
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("pk-motion-visible"));
      return () => {
        cleanupKindergartenEnhancements();
        document.documentElement.classList.remove("pk-kindergarten-premium-scroll");
      };
    }

    nodes.forEach((node, index) => {
      node.classList.add("pk-motion-item");
      node.style.setProperty("--pk-delay", `${Math.min(index % 4, 3) * 80}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("pk-motion-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -55px 0px" });

    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      cleanupKindergartenEnhancements();
      document.documentElement.classList.remove("pk-kindergarten-premium-scroll");
    };
  }, [active]);

  return null;
}
