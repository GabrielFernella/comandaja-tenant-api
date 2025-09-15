export class AppError extends Error {
  public readonly statusCode: number
  public readonly errors?: any

  constructor(message: string, statusCode = 400, errors?: any) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} não encontrado`, 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Não autorizado') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acesso negado') {
    super(message, 403)
  }
}
