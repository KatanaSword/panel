// React Component Type

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

// Auth Slice Type

export type InitialState = {
  status: boolean;
  userData: null;
};

// ENV Config Type

export type Config = {
  backendUserUrl: string;
  backendCompanyRoleUrl: string;
  backendTextTestimonialUrl: string;
  backendVideoTestimonialUrl: string;
};

// Auth Type

export interface Register {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface Signin {
  username?: string;
  email?: string;
  password: string;
}

export interface AccountDetailUpdate {
  phoneNumber?: number;
  countryCode?: string;
  fullName?: string;
}

export interface AssignRole {
  userId: string;
  role: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPassword {
  token: string;
  resetPassword: string;
}

// Company Role Type

export interface UpdateCompanyRole {
  name?: string;
  companyRoleId: string;
}

// Text Testimonial Type

export interface CreateTextTestimonial {
  fullName: string;
  email: string;
  company: string;
  title: string;
  review: string;
  companyRole: string;
  socialLink?: string;
}

export interface UpdateTextTestimonial {
  fullName?: string;
  email?: string;
  company?: string;
  title?: string;
  review?: string;
  socialLink?: string;
  companyRole?: string;
}

export interface UpdateAvatar {
  textTestimonialId: string;
  avatar: string;
}

// Video Testimonial Type

export interface CreateVideoTestimonial {
  fullName: string;
  email: string;
  company: string;
  companyRole: string;
  avatar: string;
  video: string;
  socialLink?: string;
}

export interface UpdateVideoTestimonial {
  fullName?: string;
  email?: string;
  company?: string;
  socialLink?: string;
  companyRole?: string;
}

export interface UpdateAvatar {
  videoTestimonialId: string;
  avatar: string;
}

export interface UpdateVideo {
  videoTestimonialId: string;
  video: string;
}
