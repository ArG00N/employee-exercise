import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { EmployeeExerciseSharedModule } from 'app/shared';
import { USERS_ROUTE } from './users.route';
import { UsersService } from './users.service';
import { AuthGuard } from './auth.guard.service';
import { UserComponent } from './user/user.component';
import { AdminResolver } from './admin.resolver.service';

@NgModule({
    imports: [CommonModule, EmployeeExerciseSharedModule, RouterModule.forChild([USERS_ROUTE])],
    declarations: [UsersComponent, UserComponent],
    providers: [UsersService, AuthGuard, AdminResolver]
})
export class EmployeeExerciseUsersModule {}
