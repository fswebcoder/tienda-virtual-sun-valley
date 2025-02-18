import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler()) || 'ADMIN';
    console.log("requiredRole", requiredRole);
    if (!requiredRole) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== requiredRole) {
      throw new ForbiddenException('No tienes permisos para realizar esta acción');
    }
    return true;
  }
}
