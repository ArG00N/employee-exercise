import { Component, OnInit } from '@angular/core';
import { PostStore } from '../store/post.store';
import { Router } from '@angular/router';
import { LoadPosts, ActionTypes, PostsLoaded } from '../store/actions';
import { map } from 'rxjs/operators';
import { log } from 'app/users/utils/operators';
import { PostService } from '../post.service';

@Component({
    selector: 'jhi-posts',
    templateUrl: './post-list.component.html',
    styles: []
})
export class PostListComponent implements OnInit {
    posts$ = this.store.select(PostStore.PostsSelector);
    p = [
        {
            id: 1,
            creationDate: new Date(Date.now()),
            title: 'title1',
            text: 'text1'
        },
        {
            id: 2,
            creationDate: new Date(Date.now()),
            title: 'title2',
            text: 'text2'
        },
        {
            id: 3,
            creationDate: new Date(Date.now()),
            title: 'title3',
            text: 'text3'
        }
    ];
    constructor(private store: PostStore, public router: Router, private service: PostService) {}

    ngOnInit() {}

    edit(id: number) {
        this.router.navigate(['posts', `${id}`]);
    }
}
