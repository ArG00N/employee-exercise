import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { PostStore } from '../store/post.store';
import { switchMap, map } from 'rxjs/operators';
import { IPost } from '../model/post.model';
import { of } from 'rxjs';
import { UpdatePost, CreatePost } from '../store/actions';
import { StoreFacadeService } from '../store-facade.service';

@Component({
    selector: 'jhi-post-form',
    templateUrl: './post-form.component.html',
    styles: []
})
export class PostFormComponent implements OnInit {
    isNew$ = this.route.params.pipe(map(({ id }) => !id));
    post$ = this.route.params.pipe(
        switchMap(
            ({ id }) => (id ? this.facade.posts$.pipe(map(posts => posts.find(p => p.id.toString() === id))) : of({ title: '', text: '' }))
        )
    );
    constructor(public router: Router, private route: ActivatedRoute, public facade: StoreFacadeService) {}

    ngOnInit() {}

    update(post: IPost) {
        this.facade.update(post);
        this.goBack();
    }
    create(post: IPost) {
        this.facade.create({ ...post, creationDate: new Date() });
        this.goBack();
    }
    goBack() {
        this.router.navigate(['posts', { fromForm: true }]);
    }
}
