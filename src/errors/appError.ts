class AppErrosCustom {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, statusCode: number) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export { AppErrosCustom };