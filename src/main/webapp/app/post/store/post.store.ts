import { Injectable, Inject } from '@angular/core';
import { IPost } from '../model/post.model';
import { Observable, BehaviorSubject, of, Subject, ReplaySubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { reducerToken, IPostReducer } from './reducter';
import { Action } from './actions';

export interface PostState {
    posts: IPost[];
}
export const initialState: PostState = {
    posts: []
};

@Injectable()
export class PostStore {
    private _state = new BehaviorSubject<PostState>(initialState);
    private _actions$ = new ReplaySubject<Action>();

    static PostsSelector = (state: PostState) => state.posts;
    constructor(@Inject(reducerToken) private reducer: IPostReducer[]) {}

    ofActionType<T extends Action>(type: string) {
        return this._actions$.pipe(filter(a => a.type === type), map(action => action as T));
    }
    select<T>(projection: (s: PostState) => T): Observable<T> {
        return this._state.pipe(map(state => projection(state)));
    }
    dispatch(action: Action): Observable<any> {
        const state = this.reducer.reduce((p, r) => r.reduce(p, action), this._state.value);
        this._state.next(state);
        this._actions$.next(action);
        return of(this._state.value);
    }
}
