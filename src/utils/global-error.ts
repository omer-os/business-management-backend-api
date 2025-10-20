class ApiError extends Error {
  status = 418;

  constructor(public message: string) {
    super(message);
  }

  toResponse() {
    return Response.json(
      {
        error: this.message,
        code: this.status,
      },
      {
        status: 418,
      },
    );
  }
}

export default ApiError;
