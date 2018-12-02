import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Principal } from 'app/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private principal: Principal, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const isAuthenticated = this.principal.isAuthenticated();
        if (!isAuthenticated) {
            this.router.navigate(['']);
        }

        return isAuthenticated;
    }
}
