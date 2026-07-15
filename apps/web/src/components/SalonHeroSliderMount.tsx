import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { BusinessTemplateConfig } from "@fk-templates/shared";
import { SalonHeroSlider } from "./SalonHeroSlider";

type HiddenElement = {
  element: HTMLElement;
  display: string;
};

function findHeroHost() {
  return document.querySelector<HTMLElement>(
    ".heroWrap > .heroText, .splitHero > .splitHeroContent, .showcaseHero"
  );
}

function directChild(host: HTMLElement, selector: string) {
  return Array.from(host.children).find((child) => child.matches(selector)) as HTMLElement | undefined;
}

export function SalonHeroSliderMount({
  active,
  config
}: {
  active: boolean;
  config: BusinessTemplateConfig;
}) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active) {
      setTarget(null);
      return undefined;
    }

    let currentHost: HTMLElement | null = null;
    let mount: HTMLDivElement | null = null;
    let hiddenElements: HiddenElement[] = [];
    let scheduled = false;

    function cleanupCurrent() {
      hiddenElements.forEach(({ element, display }) => {
        element.style.display = display;
      });
      hiddenElements = [];
      mount?.remove();
      mount = null;
      currentHost?.classList.remove("salonHeroHost");
      currentHost = null;
      setTarget(null);
    }

    function attach() {
      scheduled = false;
      const nextHost = findHeroHost();
      if (!nextHost || nextHost === currentHost) return;

      cleanupCurrent();
      currentHost = nextHost;
      currentHost.classList.add("salonHeroHost");

      const candidates = [
        directChild(currentHost, ".eyebrow"),
        directChild(currentHost, ".heroTitle"),
        directChild(currentHost, ".heroDescription"),
        directChild(currentHost, "h1"),
        directChild(currentHost, "p"),
        directChild(currentHost, ".heroActions"),
        directChild(currentHost, ".variantControlDeck"),
        directChild(currentHost, ".statsGrid")
      ].filter((element): element is HTMLElement => Boolean(element));

      Array.from(new Set(candidates)).forEach((element) => {
        hiddenElements.push({ element, display: element.style.display });
        element.style.display = "none";
      });

      mount = document.createElement("div");
      mount.className = "salonHeroSliderMount";
      currentHost.insertBefore(mount, currentHost.firstChild);
      setTarget(mount);
    }

    function scheduleAttach() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(attach);
    }

    scheduleAttach();
    const observer = new MutationObserver(scheduleAttach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanupCurrent();
    };
  }, [active]);

  return target ? createPortal(<SalonHeroSlider config={config} />, target) : null;
}
