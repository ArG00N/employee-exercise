import { Route } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from './auth.guard.service';
import { AdminResolver } from './admin.resolver.service';

export const USERS_ROUTE: Route = {
    path: '',
    component: UserListComponent,
    canActivate: [AuthGuard],
    resolve: {
        admin: AdminResolver
    },
    data: {
        authorities: ['ROLE_ADMIN']
    }
};
