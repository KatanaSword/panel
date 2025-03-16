export const handleSectionNavigation = (id: string) => {
  const element: HTMLElement | null = document.getElementById(id);
  const offset: number = 45;
  const bodyRect: number = document.body.getBoundingClientRect().top;
  const elementRect: number = element?.getBoundingClientRect().top ?? 0;
  const elementPosition: number = elementRect - bodyRect;
  const offsetPosition: number = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
