import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Principal } from 'app/core';
import { PostService } from './post.service';
import { IPost } from './model/post.model';
import { PostStore } from './store/post.store';
import { LoadPosts } from './store/actions';
import { stat } from 'fs';

@Injectable()
export class PostLoadResolver implements Resolve<IPost[]> {
    constructor(private store: PostStore) {}
    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const { fromForm = false } = route.data;
        if (!fromForm) {
            await this.store.dispatch(new LoadPosts()).toPromise();
        }
        return [];
    }
}
