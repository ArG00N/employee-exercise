import { Injectable } from '@angular/core';
import { PostStore } from './store/post.store';
import { merge } from 'rxjs';
import { LoadPosts, ActionTypes, PostCreated, PostUpdated, PostsLoaded, CreatePost, UpdatePost } from './store/actions';
import { switchMap, map } from 'rxjs/operators';
import { PostService } from './post.service';
import { IPost } from './model/post.model';

@Injectable({
    providedIn: 'root'
})
export class StoreFacadeService {
    posts$ = this.store.select(PostStore.PostsSelector);
    constructor(private store: PostStore, private postService: PostService) {
        this.registerActions();
    }

    registerActions() {
        merge(
            this.store.ofActionType<LoadPosts>(ActionTypes.LoadPosts),
            this.store.ofActionType<PostCreated>(ActionTypes.PostCreated),
            this.store.ofActionType<PostUpdated>(ActionTypes.PostUpdated)
        )
            .pipe(switchMap(() => this.postService.getAllPosts()), map(posts => this.store.dispatch(new PostsLoaded(posts))))
            .subscribe();

        this.store
            .ofActionType<CreatePost>(ActionTypes.CreatePost)
            .pipe(
                switchMap(action => this.postService.create(action.payload)),
                switchMap(post => this.store.dispatch(new PostCreated(post)))
            )
            .subscribe();

        this.store
            .ofActionType<UpdatePost>(ActionTypes.UpdatePost)
            .pipe(
                switchMap(action => this.postService.update(action.payload)),
                switchMap(post => this.store.dispatch(new PostUpdated(post)))
            )
            .subscribe();
    }

    update(post: IPost) {
        this.store.dispatch(new UpdatePost(post));
    }
    create(post: IPost) {
        this.store.dispatch(new CreatePost(post));
    }
    loadAll() {
        this.store.dispatch(new LoadPosts());
    }
}
