import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, ReplaySubject, merge, of } from 'rxjs';
import { IUser, UserService, Principal } from 'app/core';
import { SERVER_API_URL } from 'app/app.constants';
import { shareReplay, map, switchMap, startWith, filter } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';
import { log } from './utils/operators';

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
        return this.loadUsers$.pipe(switchMap(evt => this.coreUserService.query()), map(response => response.body));
    }
}
