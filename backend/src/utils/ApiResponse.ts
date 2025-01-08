class ApiResponse {
    success: boolean;
    constructor(
      public statusCode: number,
      public data: {},
      public message: string = "Success"
    ) {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400;
    }
  }

export { ApiResponse };