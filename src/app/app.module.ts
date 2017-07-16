import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';

import { NgProgressModule } from 'ngx-progressbar';

import { AppComponent } from './app.component';


enableProdMode()


@NgModule({
    declarations: [
        AppComponent,
        
    ],
    imports: [
        BrowserModule,
        RouterModule,
        HttpModule,
        BrowserAnimationsModule,
        UserModule,
        NgProgressModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
