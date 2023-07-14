import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../../helpers/jwtHelpers'

const verifyAuth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      let verifiedUser = null

      verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.access_secret as Secret
      )

      req.user = verifiedUser

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Access Forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default verifyAuth
