import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { Request } from 'express';
import { AppError } from 'src/util/error';
import { ResponseCode } from 'src/util/response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new AppError('Unauthorized Error', ResponseCode.UNAUTHORIZED);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'JWT_SECRET',
      });
      request['user'] = payload;

      if (!requiredRoles.includes(payload.role)) {
        throw new AppError('Unauthorized Error', ResponseCode.UNAUTHORIZED);
      }
    } catch {
      throw new AppError('Unauthorized Error', ResponseCode.UNAUTHORIZED);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
