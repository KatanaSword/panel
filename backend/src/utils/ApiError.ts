class ApiError {
  data: null;
  success: boolean;
  constructor(
    public statusCode: number,
    public message: string = "Something went wrong",
    public errors: [] = [],
    public stack: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = null;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
