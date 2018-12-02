import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Principal } from 'app/core';
@Injectable()
export class AdminResolver implements Resolve<boolean> {
    constructor(private priciple: Principal) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const { authorities } = route.data;
        return this.priciple.hasAnyAuthority(authorities);
    }
}
