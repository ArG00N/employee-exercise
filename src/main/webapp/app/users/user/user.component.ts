import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from 'app/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tr[jhi-user]',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @Input() user: IUser;
    @Output() onDelete = new EventEmitter<IUser>();

    constructor() {}

    ngOnInit() {}
}
