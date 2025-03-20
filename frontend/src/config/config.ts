import { Config } from "@/type";

const config: Config = {
  backendUserUrl: import.meta.env.BACKEND_USER_URL,
  backendCompanyRoleUrl: import.meta.env.BACKEND_CR_URL,
  backendTextTestimonialUrl: import.meta.env.BACKEND_TT_URL,
  backendVideoTestimonialUrl: import.meta.env.BACKEND_VT_URL,
};

export default config;
