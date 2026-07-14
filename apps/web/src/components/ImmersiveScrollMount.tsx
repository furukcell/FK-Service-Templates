import { useEffect } from "react";

export function ImmersiveScrollMount({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return undefined;

    const root = document.documentElement;
    const shell = document.querySelector<HTMLElement>(".pageShell");
    if (!shell) return undefined;

    root.classList.add("immersiveFlowRoot");
    shell.classList.add("immersiveFlowPage");

    const observed = new Set<HTMLElement>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    function registerSections() {
      const sections = shell.querySelectorAll<HTMLElement>(
        ":scope > section, :scope > .salonBookingPortal > section, :scope > .immersiveSection"
      );
      sections.forEach((section, index) => {
        if (observed.has(section)) return;
        section.classList.add("immersiveFlowSection", "immersiveReveal");
        section.style.setProperty("--flow-index", String(index));
        observed.add(section);
        observer.observe(section);
      });
    }

    registerSections();
    const mutationObserver = new MutationObserver(registerSections);
    mutationObserver.observe(shell, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      observed.forEach((section) => {
        section.classList.remove("immersiveFlowSection", "immersiveReveal", "is-visible");
        section.style.removeProperty("--flow-index");
      });
      shell.classList.remove("immersiveFlowPage");
      root.classList.remove("immersiveFlowRoot");
    };
  }, [active]);

  return null;
}
