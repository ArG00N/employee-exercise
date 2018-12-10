import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { PostStore } from '../store/post.store';
import { switchMap, map } from 'rxjs/operators';
import { IPost } from '../model/post.model';
import { of } from 'rxjs';
import { UpdatePost, CreatePost } from '../store/actions';

@Component({
    selector: 'jhi-post-form',
    templateUrl: './post-form.component.html',
    styles: []
})
export class PostFormComponent implements OnInit {
    isNew$ = this.route.params.pipe(map(({ id }) => !id));

    post$ = this.route.params.pipe(
        switchMap(
            ({ id }) =>
                id
                    ? this.store.select<IPost[]>(s => s.posts).pipe(map(posts => posts.find(p => p.id.toString() === id)))
                    : of({ title: '', text: '' })
        )
    );
    constructor(public router: Router, private route: ActivatedRoute, private store: PostStore) {}

    ngOnInit() {}
    update(post: IPost) {
        this.store.dispatch(new UpdatePost(post));
        this.router.navigate(['posts', 'all']);
    }
    create(post: IPost) {
        this.store.dispatch(new CreatePost({ ...post, creationDate: new Date() }));
        this.router.navigate(['posts', 'all']);
    }
}
