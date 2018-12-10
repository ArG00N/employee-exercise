import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { EmployeeExerciseSharedModule } from 'app/shared';
import { USERS_ROUTE } from './users.route';
import { UsersService } from './users.service';
import { AuthGuard } from './auth.guard.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AdminResolver } from './admin.resolver.service';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { UserDeleteConfirmationComponent } from './user-delete-confirmation/user-delete-confirmation.component';

@NgModule({
    imports: [CommonModule, EmployeeExerciseSharedModule, RouterModule.forChild([USERS_ROUTE])],
    declarations: [UserListComponent, UserDetailComponent, UserDeleteConfirmationComponent],
    providers: [UsersService, AuthGuard, AdminResolver],
    entryComponents: [UserDeleteConfirmationComponent]
})
export class EmployeeExerciseUsersModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
