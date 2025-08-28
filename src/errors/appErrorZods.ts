class AppErrorsZod {
  public readonly statusCode: number;
  public readonly message: Record<string, string[]>;

  constructor(message: Record<string, string[]>, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppErrorsZod };