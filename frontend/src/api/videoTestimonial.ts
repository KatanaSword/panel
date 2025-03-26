import config from "@/config/config";
import { CreateVideoTestimonial, UpdateAvatar, UpdateVideo, UpdateVideoTestimonial } from "@/type";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class VideoTestimonialService {
  private baseURL: string;
  public client: AxiosInstance;
  constructor() {
    this.baseURL = config.backendVideoTestimonialUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Create a new Video Testimonial
  async createVideoTestimonial(payload: CreateVideoTestimonial): Promise<AxiosResponse> {
    try {
        const videoTestimonial = await this.client.post("/", payload)
        if(videoTestimonial) {
            return this.getVideoTestimonialId(videoTestimonialId: string)
        }
        return videoTestimonial
    } catch (error) {
        throw error
    }
  }

  // Get a Single Video Testimonial using id
  async getVideoTestimonialId(videoTestimonialId: string): Promise<AxiosResponse> {
    try {
        return await this.client.get(`/:${videoTestimonialId}`)
    } catch (error) {
        throw error
    }
  }

  // Get all Video Testimonial
  async allVideoTestimonial(): Promise<AxiosResponse> {
    try {
        return await this.client.get("/")
    } catch (error) {
        throw error
    }
  }

  // Get a Video Testimonial using Company Role id
  async videoTestimonialByCampanyRole(companyRoleId: string): Promise<AxiosResponse> {
      try {
          return await this.client.get(`/company_role/:${companyRoleId}`)
      } catch (error) {
          throw error
      }
  }

  // Update a Video Testimonial Avatar using id
  async updateAvatar(detail: UpdateAvatar): Promise<AxiosResponse> {
      try {
          return await this.client.patch(`/update_avatar/:${detail.videoTestimonialId}`, {avatar: detail.avatar})
      } catch (error) {
          throw error
      }
  }

  // Update a Video Testimonial Video using id
  async updateVideo(detail: UpdateVideo): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/update_video/:${detail.videoTestimonialId}`, {video: detail.video})
    } catch (error) {
      throw error
    }
  }

  // Update existing Video Testimonial using id
  async updateVideoTestimonial(videoTestimonialId: string, detail: UpdateVideoTestimonial): Promise<AxiosResponse> {
    try {
        return await this.client.patch(`/:${videoTestimonialId}`, detail)
    } catch (error) {
        throw error
    }
  }

  // Delete existing Video Testimonial using id
  async deleteVideoTestimonial(videoTestimonialId: string): Promise<AxiosResponse> {
    try {
        return await this.client.delete(`/:${videoTestimonialId}`)
    } catch (error) {
        throw error
    }
  }
}

const videoTestimonialService = new VideoTestimonialService()

export default videoTestimonialService