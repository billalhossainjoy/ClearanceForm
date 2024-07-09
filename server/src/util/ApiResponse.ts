class ApiResponse {
  statusCode: number;
  data: object | null;
  message: string;
  constructor(statusCode: number, data: object | null, message: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export default ApiResponse;
