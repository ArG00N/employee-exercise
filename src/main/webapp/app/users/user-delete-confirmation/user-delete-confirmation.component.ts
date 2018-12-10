import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'jhi-user-delete-confirmation',
    templateUrl: './user-delete-confirmation.component.html',
    styles: []
})
export class UserDeleteConfirmationComponent implements OnInit {
    @Input() user: IUser;
    private _ngModalRef: NgbModalRef;
    private _dismissed = new Subject<{ user: IUser; reason: string }>();

    @Input() dismissed$ = this._dismissed.asObservable().pipe(take(1));

    @Input()
    set ngModalRef(modal: NgbModalRef) {
        if (!this._ngModalRef) {
            this._ngModalRef = modal;
            this._ngModalRef.result.then(() => {}, reason => this._dismissed.next({ user: this.user, reason }));
        }
    }
    get ngModalRef() {
        return this._ngModalRef;
    }

    constructor() {}

    ngOnInit() {}
}
