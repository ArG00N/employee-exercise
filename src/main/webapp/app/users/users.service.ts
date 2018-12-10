import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IUser, UserService } from 'app/core';
import { map, switchMap } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

export enum UsersServiceEvents {
    loadUser = 'Load User',
    userDeleted = 'User Deleted'
}

@Injectable()
export class UsersService {
    private loadUsers$ = new ReplaySubject();

    constructor(private coreUserService: UserService, private eventManager: JhiEventManager) {}

    init() {
        [UsersServiceEvents.loadUser, UsersServiceEvents.userDeleted].forEach(evt => {
            this.eventManager.subscribe(evt, () => {
                this.loadUsers$.next();
            });
        });
        this.eventManager.broadcast({ name: UsersServiceEvents.loadUser, content: null });
    }

    delete(user: IUser) {
        return this.coreUserService.delete(user.login);
    }
    get users$() {
        return this.loadUsers$.pipe(switchMap(() => this.coreUserService.query()), map(response => response.body));
    }
}
