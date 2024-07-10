class CustomError extends Error {
    statusCode?: number;
  
    constructor(message?: string, statusCode?: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export const errorHandler = (statusCode: number, message: string) => {
    return new CustomError(message, statusCode);
  };
  