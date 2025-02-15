// role.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // If no token is available, you might want to redirect to login.
      this.router.navigate(['/login']);
      return false;
    }

    let decoded: any;
    try {
      decoded = jwt_decode.jwtDecode(token);
    } catch (e) {
      // If the token is invalid, redirect to login.
      this.router.navigate(['/login']);
      return false;
    }

    // Retrieve required roles from route data
    const requiredRoles: string[] = route.data['roles'];
    if (!requiredRoles || requiredRoles.length === 0) {
      // No role restrictions for this route.
      return true;
    }

    // Extract roles from both realms in the token.
    let tokenRoles: string[] = [];
    if (decoded.realm_access && decoded.realm_access.roles) {
      tokenRoles = tokenRoles.concat(decoded.realm_access.roles);
    }
    if (
      decoded.resource_access &&
      decoded.resource_access['pidev-client'] &&
      decoded.resource_access['pidev-client'].roles
    ) {
      tokenRoles = tokenRoles.concat(decoded.resource_access['pidev-client'].roles);
    }

    // Check if the user has at least one of the required roles.
    const hasRole = requiredRoles.some((role) => tokenRoles.includes(role));
    if (!hasRole) {
      // Instead of redirecting to login, navigate to a not found page.
      this.router.navigate(['/404']);
      return false;
    }
    return true;
  }
}
