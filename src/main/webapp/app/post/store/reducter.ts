import { InjectionToken } from '@angular/core';
import { Action, PostsLoaded } from './actions';
import { PostState, initialState } from './post.store';

export interface IPostReducer {
    reduce: (state: PostState, action: Action) => PostState;
}
export const reducerToken = new InjectionToken<IPostReducer>('PostReducer');

export class DefaultPostreducer implements IPostReducer {
    reduce(state: PostState = initialState, action: Action): PostState {
        if (action instanceof PostsLoaded) {
            return {
                posts: [...action.payload]
            };
        }
        return { ...state };
    }
}
