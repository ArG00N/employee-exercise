import { Route, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostLoadResolver } from './resolver.service';
import { PostFormComponent } from './post-form/post-form.component';

export const POSTS_ROUTES: Routes = [
    {
        path: '',
        component: PostListComponent,
        resolve: { data: PostLoadResolver }
    },
    {
        path: 'new',
        component: PostFormComponent
    },
    {
        path: ':id',
        component: PostFormComponent
    }
];
