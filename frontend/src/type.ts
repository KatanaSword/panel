export type ErrorMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  errors: string | string[];
};

export type FooterProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

export type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  src: string;
  alt: string;
  height?: string | number;
  width?: string | number;
};

export type TextProps = {
  children: React.ReactNode;
  className?: string;
  size?: string | number;
  as?: "span" | "p" | "h1" | "h2" | "h3";
};

export type SVGProps = React.SVGProps<SVGSVGElement> & {
  fillColor?: string;
  className?: string;
  height: number | string;
  width: number | string;
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export type PricingPoint = {
  id: number;
  point: string;
};

export type Testimonials = {
  logo: string;
  company: string;
  review: string;
  star: React.ReactNode;
  name: string;
  occupation: string;
};

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
