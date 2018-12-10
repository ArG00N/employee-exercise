import { Component, OnInit } from '@angular/core';
import { PostStore } from '../store/post.store';
import { Router } from '@angular/router';
import { LoadPosts, ActionTypes, PostsLoaded } from '../store/actions';
import { map } from 'rxjs/operators';
import { log } from 'app/users/utils/operators';
import { PostService } from '../post.service';
import { StoreFacadeService } from '../store-facade.service';

@Component({
    selector: 'jhi-posts',
    templateUrl: './post-list.component.html',
    styles: []
})
export class PostListComponent implements OnInit {
    constructor(public facade: StoreFacadeService, public router: Router) {}
    ngOnInit() {}

    edit(id: number) {
        this.router.navigate(['posts', `${id}`]);
    }
    refresh() {
        this.facade.loadAll();
    }
}
