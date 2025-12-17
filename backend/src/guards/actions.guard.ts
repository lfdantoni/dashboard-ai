import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACTIONS_KEY } from '../decorators/require-actions.decorator';

@Injectable()
export class ActionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredActions = this.reflector.getAllAndOverride<string[]>(
      ACTIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no actions are required, allow access
    if (!requiredActions || requiredActions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const userActions: string[] = user.actions || [];

    // Check if user has 'all' action (grants access to everything)
    if (userActions.includes('all')) {
      return true;
    }

    // Check if user has all required actions
    const hasAllRequiredActions = requiredActions.every((action) =>
      userActions.includes(action),
    );

    if (!hasAllRequiredActions) {
      throw new ForbiddenException(
        `Insufficient permissions. Required actions: ${requiredActions.join(', ')}`,
      );
    }

    return true;
  }
}
