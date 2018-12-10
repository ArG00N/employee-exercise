import { Component, OnInit } from '@angular/core';
import { UsersService, UsersServiceEvents } from '../users.service';
import { IUser } from 'app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, tap, filter } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';
import { UserDeleteConfirmationComponent } from '../user-delete-confirmation/user-delete-confirmation.component';

function ShowUserModal(service: NgbModal) {
    return (source: Observable<IUser>) => {
        return source.pipe(
            switchMap(user => {
                const ngModalRef = service.open(UserDeleteConfirmationComponent, { centered: true });
                ngModalRef.componentInstance.user = user;
                ngModalRef.componentInstance.ngModalRef = ngModalRef;
                return ngModalRef.componentInstance.dismissed$ as Observable<{ user: IUser; reason: string }>;
            })
        );
    };
}

@Component({
    selector: 'jhi-users',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit {
    deleteUser$ = new BehaviorSubject<IUser>(null);
    users: IUser[] = [];
    deletionFlow$ = this.deleteUser$.pipe(
        filter(u => u !== null),
        ShowUserModal(this.modalService),
        switchMap(({ user, reason }) => {
            return reason === 'delete'
                ? this.userService.delete(user).pipe(tap(() => this.eventManager.broadcast({ name: UsersServiceEvents.userDeleted })))
                : of(null);
        })
    );
    constructor(public userService: UsersService, private eventManager: JhiEventManager, private modalService: NgbModal) {}
    ngOnInit() {
        this.userService.users$.subscribe(users => {
            this.users = users;
            console.log({ Users: users });
        });
        this.userService.init();
        this.deletionFlow$.subscribe();
    }
    track(item: IUser) {
        return item.id;
    }
}
