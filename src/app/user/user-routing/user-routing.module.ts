import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UserDetailsComponent } from '../user-details/user-details.component';
import { ListUserComponent } from '../list-user/list-user.component';
import { AddUserComponent } from '../add-user/add-user.component';

const userRoutes: Routes = [
    {
        path: '', component: ListUserComponent
    },
    {
        path: 'users', children: [
            {
                path: ':id', component: UserDetailsComponent
            },
            {
                path: '', redirectTo: '/', pathMatch: 'full'
            }
        ]

    },
    {
        path: 'add', component: AddUserComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(userRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class UserRoutingModule { }
