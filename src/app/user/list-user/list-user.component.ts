import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user-item/user';
import { NgProgressService } from 'ngx-progressbar';
import { MdSnackBar, MdDialogRef } from '@angular/material';
import { DialogService } from '../edit-user/dialog.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
    selector: 'pt-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, AfterViewInit {

    constructor(
        private userService: UserService,
        private snackBar: MdSnackBar,
        private dialogService: DialogService,
        private progressService: NgProgressService) { }

    public listUser: Array<User>;
    private listUserMock: Array<User>;

    public dialog: any;

    ngOnInit() {
        this.getListUser();

        this.dialogService.status.subscribe(value => {

            if (value && value === true) {
                this.getListUser();
            }
        })

    }
    ngAfterViewInit() {

        this.snackBar.dismiss();
    }

    public getListUser() {
        this.progressService.start();
        this.userService.getUser().subscribe(listUser => {
            this.listUser = listUser;
            this.listUserMock = listUser;
            this.progressService.done();
        })
    }
    removeUserById(id: string) {
        this.userService.deleteUser(id).subscribe(
            () => {
                 this.getListUser();
            }
        )
    }
    updateUserById(user: User) {

        this.dialogService.confirm(user).subscribe(
            resDialog => this.dialog = resDialog)
    }
    filterUser(e: any) {
        
        let keyword = e.target.value.toLocaleLowerCase();
        if (keyword !== '') {

            let userFilter = this.listUserMock;
            this.listUser = userFilter.filter(item => {
                return item.name.toLocaleLowerCase().includes(keyword)
            })
        }
        else {
            this.listUser = this.listUserMock;
        }
    }



}
