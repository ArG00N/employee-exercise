import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeExerciseSharedModule } from 'app/shared';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { POSTS_ROUTES } from './post.route';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { reducerToken, DefaultPostreducer } from './store/reducter';
import { PostStore } from './store/post.store';
import { PostLoadResolver } from './resolver.service';
import { FormsModule } from '@angular/forms';
import { PostService } from './post.service';

@NgModule({
    imports: [CommonModule, FormsModule, EmployeeExerciseSharedModule, RouterModule.forChild(POSTS_ROUTES)],
    declarations: [PostListComponent, PostFormComponent],
    providers: [PostService, PostLoadResolver, PostStore, { provide: reducerToken, multi: true, useClass: DefaultPostreducer }]
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
