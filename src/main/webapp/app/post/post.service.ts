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
    constructor(private http: HttpClient) {}

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
