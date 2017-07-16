import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from './user';


@Component({
    selector: 'pt-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

    @Input('user') user: User;

    @Output('idUserDelete') idUserDelete = new EventEmitter<string>();

    @Output('idUserUpdate') idUserUpdate = new EventEmitter<User>()

    constructor() { }


    ngOnInit() {
    }
    deleteUser(idUser: string) {

        this.idUserDelete.emit(idUser);
    }
    updateUser(user: User) {

        this.idUserUpdate.emit(user);
    }

}
