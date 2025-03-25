import config from "@/config/config";
import { UpdateCompanyRole } from "@/type";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class CompanyRoleService {
  private baseURL: string;
  public client: AxiosInstance;
  constructor() {
    this.baseURL = config.backendCompanyRoleUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

    // Create a new Company Role for Testimonial
    async createCompanyRole(name: string): Promise<AxiosResponse> {
        try {
            const companyRole = await this.client.post("/", {name})
            if (companyRole) {
                return this.getCompanyRoleId(companyRoleId: string)
            }
            return companyRole
        } catch (error) {
            throw error
        }
    }

    // Get a Single Company Role using id
    async getCompanyRoleId(companyRoleId: string): Promise<AxiosResponse> {
        try {
            return this.client.get(`/:${companyRoleId}`)            
        } catch (error) {
            throw null
        }
    }

    // Get all Company Role
    async allCompanyRole(): Promise<AxiosResponse> {
        try {
            return this.client.get("/")
        } catch (error) {
            throw error
        }
    }

    // Update a Company Role using id
    async updateCompanyRole(detail: UpdateCompanyRole): Promise<AxiosResponse> {
        try {
            return await this.client.patch(`/:${detail.companyRoleId}`, {name: detail.name})
        } catch (error) {
            throw error
        }
    }

    // Delete a Company Role using id
    async deleteCompanyRole(companyRoleId: string): Promise<AxiosResponse> {
        try {
            return await this.client.delete(`/:${companyRoleId}`)
        } catch (error) {
            throw error
        }
    }
} 

const companyRoleService = new CompanyRoleService();

export default companyRoleService;
