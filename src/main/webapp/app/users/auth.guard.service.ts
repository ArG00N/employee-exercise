import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Principal } from 'app/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private principal: Principal) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.principal.isAuthenticated();
    }
}
