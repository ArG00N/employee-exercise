import { Route } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth.guard.service';
import { AdminResolver } from './admin.resolver.service';

export const USERS_ROUTE: Route = {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard],
    resolve: {
        admin: AdminResolver
    },
    data: {
        authorities: ['ROLE_ADMIN']
    }
};
