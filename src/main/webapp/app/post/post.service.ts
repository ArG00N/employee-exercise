import { Injectable } from '@angular/core';
import { PostStore } from './store/post.store';
import { LoadPosts, ActionTypes, PostsLoaded, CreatePost, PostCreated, UpdatePost, PostUpdated } from './store/actions';
import { map, switchMap } from 'rxjs/operators';
import { IPost } from './model/post.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {
    private resourceUrl = SERVER_API_URL + 'api/posts';
    constructor(private store: PostStore, private http: HttpClient) {
        this.registerActions();
    }

    registerActions() {
        merge(
            this.store.ofActionType<LoadPosts>(ActionTypes.LoadPosts),
            this.store.ofActionType<PostCreated>(ActionTypes.PostCreated),
            this.store.ofActionType<PostUpdated>(ActionTypes.PostUpdated)
        )
            .pipe(switchMap(() => this.getAllPosts()), map(posts => this.store.dispatch(new PostsLoaded(posts))))
            .subscribe();

        this.store
            .ofActionType<CreatePost>(ActionTypes.CreatePost)
            .pipe(switchMap(action => this.create(action.payload)), switchMap(post => this.store.dispatch(new PostCreated(post))))
            .subscribe();

        this.store
            .ofActionType<UpdatePost>(ActionTypes.UpdatePost)
            .pipe(switchMap(action => this.update(action.payload)), switchMap(post => this.store.dispatch(new PostUpdated(post))))
            .subscribe();
    }

    create(post: IPost): Observable<IPost> {
        return this.http.post<IPost>(this.resourceUrl, post);
    }

    update(post: IPost): Observable<IPost> {
        return this.http.put<IPost>(this.resourceUrl, post);
    }

    getAllPosts(): Observable<IPost[]> {
        return this.http.get<IPost[]>(`${this.resourceUrl}`);
    }
}
