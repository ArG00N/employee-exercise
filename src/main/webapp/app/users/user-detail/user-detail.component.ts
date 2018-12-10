import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from 'app/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tr[jhi-user]',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
    @Input() user: IUser;
    @Output() onDelete = new EventEmitter<IUser>();

    constructor() {}

    ngOnInit() {}
}
