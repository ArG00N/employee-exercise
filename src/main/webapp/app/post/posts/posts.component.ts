import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { IUser } from 'app/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject, from, Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-posts',
    templateUrl: './posts.component.html',
    styles: []
})
export class PostsComponent implements OnInit {
    @ViewChild('confirmation') confirmation: TemplateRef<any>;
    deleteUser$ = new BehaviorSubject<IUser>(null);
    ngModalRef: NgbModalRef;
    users: IUser[] = [];

    constructor(private eventManager: JhiEventManager, private modalService: NgbModal) {}

    ngOnInit() {}

    track(index, item: IUser) {
        return item.id;
    }
}
