import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
};

export default function ScrollReveal({ children, className = '', stagger = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`${stagger ? 'pk-stagger' : 'pk-reveal'} ${className}`}>{children}</div>;
}
