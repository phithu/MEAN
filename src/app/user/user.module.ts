import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

import { ListUserComponent } from './list-user/list-user.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { DialogService } from './edit-user/dialog.service';
import { UserService } from './user.service';

import { RandomColorDirective } from './random-color.directive';
import { UserRoutingModule } from './user-routing/user-routing.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        FileUploadModule,
        UserRoutingModule
    ],
    exports: [
        UserDetailsComponent,
        ListUserComponent,
        UserItemComponent,
        AddUserComponent,
        UserDetailsComponent,
        MaterialModule
    ],

    declarations: [
        ListUserComponent,
        UserItemComponent,
        SnackBarComponent,
        UserDetailsComponent,
        AddUserComponent,
        EditUserComponent,

        RandomColorDirective
    ],
    entryComponents: [
        SnackBarComponent,
        EditUserComponent
        ,
    ],
    providers: [
        UserService,
        DialogService
    ]
})
export class UserModule { }
