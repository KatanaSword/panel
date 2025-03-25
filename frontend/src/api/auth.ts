import {
  AccountDetailUpdate,
  AssignRole,
  ChangePassword,
  Register,
  ResetPassword,
  Signin,
} from "@/type";
import config from "@/config/config";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class AuthService {
  private baseURL: string;
  public client: AxiosInstance;
  constructor() {
    this.baseURL = config.backendUserUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Register a new user
  async register(payload: Register): Promise<AxiosResponse> {
    try {
      const userAccount: AxiosResponse = await this.client.post(
        "/signup",
        payload
      );

      if (userAccount) {
        const signinPayload: Signin = {
          username: payload.username,
          email: payload.email,
          password: payload.password,
        };

        return this.signin(signinPayload);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // Sign in existing user
  async signin(payload: Signin): Promise<AxiosResponse> {
    try {
      return await this.client.post("/signin", payload);
    } catch (error) {
      throw error;
    }
  }

  // Sign out the current user
  async signout(): Promise<AxiosResponse> {
    try {
      return await this.client.post("/signout");
    } catch (error) {
      throw error;
    }
  }

  // Get the current authenticated user
  async currentUser(): Promise<AxiosResponse> {
    try {
      return await this.client.get("/current_user");
    } catch (error) {
      throw null;
    }
  }

  // Update user account detail
  async accountDetailUpdate(
    detail: AccountDetailUpdate
  ): Promise<AxiosResponse> {
    try {
      return await this.client.patch("/account_update", detail);
    } catch (error) {
      throw error;
    }
  }

  // Update user avatar
  async avatarUpdate(): Promise<AxiosResponse> {
    try {
      return await this.client.patch("/avatar");
    } catch (error) {
      throw error;
    }
  }

  // Access by refresh token (access and refresh token)
  async refreshToken(refreshToken: string): Promise<AxiosResponse> {
    try {
      return await this.client.post("/refresh_token", { refreshToken });
    } catch (error) {
      throw error;
    }
  }

  // Assign a role to a user (requires userId parameter)
  async assignRole(userRole: AssignRole): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/assign_role/:${userRole.userId}`, {
        role: userRole.role,
      });
    } catch (error) {
      throw error;
    }
  }

  // Change the current user password
  async changePassword(payload: ChangePassword): Promise<AxiosResponse> {
    try {
      return await this.client.patch("/change_password", payload);
    } catch (error) {
      throw error;
    }
  }

  // Request a forgot password email
  async forgotPassword(email: string): Promise<AxiosResponse> {
    try {
      return await this.client.post("/forgot_password", { email });
    } catch (error) {
      throw error;
    }
  }

  // Reset password using a token
  async resetPassword(payload: ResetPassword): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/reset_password/:${payload.token}`, {
        resetPassword: payload.resetPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  // Send an email verification request
  async sendVerifyEmailRequest(): Promise<AxiosResponse> {
    try {
      return await this.client.post("/send_email_verification");
    } catch (error) {
      throw error;
    }
  }

  // Verify email using token
  async verifyEmail(token: string): Promise<AxiosResponse> {
    try {
      return await this.client.post(`/verify_email/:${token}`);
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
