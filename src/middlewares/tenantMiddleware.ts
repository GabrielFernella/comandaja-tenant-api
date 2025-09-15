import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'

export const tenantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const tenantId = (req as any).user?.tenantId ?? req.headers['x-tenant-id']

  if (!tenantId || typeof tenantId !== 'string') {
    return next(new AppError('Tenant ID é obrigatório', 400))
  }

  // Anexa o tenantId à requisição para uso posterior nos controllers
  ;(req as any).tenantId = tenantId

  next()
}
