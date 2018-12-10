import { IPost } from '../model/post.model';

export enum ActionTypes {
    LoadPosts = 'LoadPosts',
    PostsLoaded = 'PostsLoaded',
    CreatePost = 'CreatePost',
    PostCreated = 'PostCreated',
    UpdatePost = 'UpdatePost',
    PostUpdated = 'PostUpdated'
}

export interface Action {
    type: ActionTypes;
}
export class LoadPosts implements Action {
    readonly type = ActionTypes.LoadPosts;
    constructor() {}
}
export class PostsLoaded implements Action {
    readonly type = ActionTypes.PostsLoaded;
    constructor(public payload: IPost[]) {}
}
export class CreatePost implements Action {
    readonly type = ActionTypes.CreatePost;
    constructor(public payload: IPost) {}
}
export class PostCreated implements Action {
    readonly type = ActionTypes.PostCreated;
    constructor(public payload: IPost) {}
}
export class UpdatePost implements Action {
    readonly type = ActionTypes.UpdatePost;
    constructor(public payload: IPost) {}
}
export class PostUpdated implements Action {
    readonly type = ActionTypes.PostUpdated;
    constructor(public payload: IPost) {}
}
