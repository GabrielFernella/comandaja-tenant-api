import { Request, Response, NextFunction } from 'express'
import { ZodObject } from 'zod'
import { AppError } from '../errors/AppError'

export const validateRequest = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync(req.body)

      if (!result.success) {
        // Extrai os erros de forma segura e serializável do Zod.
        const formattedErrors = result.error.flatten().fieldErrors
        return next(new AppError('Erro de validação', 400, formattedErrors))
      }

      req.body = result.data // garante dados validados/normalizados
      return next()
    } catch (error) {
      // Captura qualquer erro inesperado e o passa para o errorHandler
      return next(error)
    }
  }
}
