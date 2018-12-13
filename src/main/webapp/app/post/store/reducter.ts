import { InjectionToken } from '@angular/core';
import { Action, Actions, ActionTypes } from './actions';
import { PostState, initialState } from './post.store';

export interface IPostReducer {
    reduce: (state: PostState, action: Action) => PostState;
}
export const reducerToken = new InjectionToken<IPostReducer>('PostReducer');

export class DefaultPostreducer implements IPostReducer {
    reduce(state: PostState = initialState, action: Actions): PostState {
        switch (action.type) {
            case ActionTypes.PostsLoaded:
                return {
                    posts: [...action.payload]
                };
            default:
                return { ...state };
        }
    }
}
