import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { EmployeeExerciseSharedModule } from 'app/shared';

import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { POSTS_ROUTE } from './post.route';
import { PostsComponent } from './posts/posts.component';

@NgModule({
    imports: [CommonModule, EmployeeExerciseSharedModule, RouterModule.forChild([POSTS_ROUTE])],
    declarations: [PostsComponent],
    providers: []
})
export class EmployeeExercisePostsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
