import { Injectable } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { EditUserComponent } from './edit-user.component';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { User } from '../user-item/user';


@Injectable()
export class DialogService {

    constructor(private dialog: MdDialog) { }

    public confirm(user: User) {
        let dialogRef: MdDialogRef<EditUserComponent>;

        dialogRef = this.dialog.open(EditUserComponent);

        dialogRef.componentInstance.user = user;

        return dialogRef.afterClosed();
    }

    private _status = new BehaviorSubject<boolean>(null)

    public status = this._status.asObservable();

    public emitStatus(status: boolean) {
        this._status.next(status)
    }


}
