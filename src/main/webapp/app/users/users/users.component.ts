import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UsersService, UsersServiceEvents } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'app/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject, from, Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { JhiEventManager } from 'ng-jhipster';
import { log } from '../utils/operators';

function fromModalRef(ref: NgbModalRef, user: IUser): Observable<{ user: IUser; reason: string }> {
    return new Observable(obs => {
        ref.result.then(
            () => {},
            reason => {
                obs.next({ user, reason });
                obs.complete();
            }
        );
    });
}
function ShowUserModal() {
    return (source: Observable<any>) => {
        return source.pipe(switchMap(({ ref, user }) => fromModalRef(ref, user)));
    };
}

@Component({
    selector: 'jhi-users',
    templateUrl: './users.component.html',
    styles: []
})
export class UsersComponent implements OnInit {
    @ViewChild('confirmation') confirmation: TemplateRef<any>;
    deleteUser$ = new BehaviorSubject<IUser>(null);
    ngModalRef: NgbModalRef;
    users: IUser[] = [];

    deletionFlow = this.deleteUser$.pipe(
        filter(u => u !== null),
        map(u => {
            this.ngModalRef = this.modalService.open(this.confirmation, { centered: true });
            return { ref: this.ngModalRef, user: u };
        }),
        ShowUserModal(),
        switchMap(({ user, reason }) => {
            return reason === 'delete'
                ? this.userService.delete(user).pipe(tap(() => this.eventManager.broadcast({ name: UsersServiceEvents.userDeleted })))
                : of(null);
        })
    );

    constructor(public userService: UsersService, private eventManager: JhiEventManager, private modalService: NgbModal) {}

    ngOnInit() {
        this.userService.users$.subscribe(users => (this.users = users));
        this.userService.init();
        this.deletionFlow.subscribe();
    }
}
