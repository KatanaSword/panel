import config from "@/config/config";
import { CreateTextTestimonial, UpdateAvatar, UpdateTextTestimonial } from "@/type";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class TextTestimonialService {
  private baseURL: string;
  public client: AxiosInstance;
  constructor() {
    this.baseURL = config.backendTextTestimonialUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Create a new Text Testimonial
  async createTextTestimonial(payload: CreateTextTestimonial): Promise<AxiosResponse> {
    try {
        const textTestimonial = await this.client.post("/", payload)
        if(textTestimonial) {
            return this.getTextTestimonialId(textTestimonialId: string)
        }
        return textTestimonial
    } catch (error) {
        throw error
    }
  }

  // Get a Single Text Testimonial using id
  async getTextTestimonialId(textTestimonialId: string): Promise<AxiosResponse> {
    try {
        return await this.client.get(`/:${textTestimonialId}`)
    } catch (error) {
        throw error
    }
  }

  // Get all Text Testimonial
  async allTextTestimonial(): Promise<AxiosResponse> {
    try {
        return await this.client.get("/")
    } catch (error) {
        throw error
    }
  }

    // Get a Text Testimonial using Company Role id
    async textTestimonialByCampanyRole(companyRoleId: string): Promise<AxiosResponse> {
        try {
            return await this.client.get(`/company_role/:${companyRoleId}`)
        } catch (error) {
            throw error
        }
    }

    // Update a Text Testimonial Avatar using id
    async updateAvatar(detail: UpdateAvatar): Promise<AxiosResponse> {
        try {
            return await this.client.patch(`/update_avatar/:${detail.textTestimonialId}`, {avatar: detail.avatar})
        } catch (error) {
            throw error
        }
    }

  // Update existing Text Testimonial using id
  async updateTextTestimonial(textTestimonialId: string, detail: UpdateTextTestimonial): Promise<AxiosResponse> {
    try {
        return await this.client.patch(`/:${textTestimonialId}`, detail)
    } catch (error) {
        throw error
    }
  }

  // Delete existing Text Testimonial using id
  async deleteTextTestimonial(textTestimonialId: string): Promise<AxiosResponse> {
    try {
        return await this.client.delete(`/:${textTestimonialId}`)
    } catch (error) {
        throw error
    }
  }
}

const textTestimonialService = new TextTestimonialService()

export default textTestimonialService