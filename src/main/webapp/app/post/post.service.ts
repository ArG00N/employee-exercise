import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, ReplaySubject, merge, of } from 'rxjs';
import { IUser, UserService, Principal } from 'app/core';
import { SERVER_API_URL } from 'app/app.constants';
import { shareReplay, map, switchMap, startWith, filter } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

@Injectable()
export class PostService {
    constructor(private eventManager: JhiEventManager) {}
}
