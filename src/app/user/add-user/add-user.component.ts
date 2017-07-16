import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    FormControl,
    AbstractControl,
    Validators
} from '@angular/forms';
import { NgProgressService } from 'ngx-progressbar';
import { UserService } from '../user.service';
import { User } from '../user-item/user';
import { MdSnackBar } from '@angular/material';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
// import { Validators } from '@angular/forms';


@Component({
    selector: 'pt-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

    private addNewForm: FormGroup;
    private inputName: AbstractControl;
    private inputAge: AbstractControl;
    private inputAddress: AbstractControl;
    private inputImages: AbstractControl;

    private uploader: FileUploader = new FileUploader({
        itemAlias: 'image',
        url: 'https://api.imgur.com/3/image',
        headers: [
            {
                "name": "Authorization",
                "value": "Bearer eda01ece94541a01c10c2c18ae8e1b2dfeb43bd6"
            }
        ]
    });

    constructor(
        private progressService: NgProgressService,
        private builder: FormBuilder,
        private userService: UserService,
        private snackBar: MdSnackBar
    ) { }


    ngOnInit() {

        this.progressService.start();

        this.createForm();

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

            let objectResponse = JSON.parse(response);
            let linkImages = objectResponse.data.link;
            this.addNewForm.controls['inputImages'].setValue(linkImages);
        };
    }

    createForm() {
        this.addNewForm = this.builder.group({
            inputName: [null, Validators.compose(
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(20)
                ])],

            inputAge: [null, Validators.compose(
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(2),
                    Validators.pattern(/^\d+$/)
                ])],

            inputAddress: [null, Validators.compose(
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(30)
                ])],

            inputImages: []
        })

        this.inputAge = this.addNewForm.controls['inputAge'];
        this.inputName = this.addNewForm.controls['inputName'];
        this.inputAddress = this.addNewForm.controls['inputAddress'];
        this.progressService.done();
    }

    receivedValueForm(value: any) {

        let user: User;
        if (value.inputImages) {
            user = {
                name: value.inputName,
                address: value.inputAddress,
                age: value.inputAge,
                images: value.inputImages
            }
        }
        else {
            user = {
                name: value.inputName,
                address: value.inputAddress,
                age: value.inputAge,
                images: this.getLetterUserName(value.inputName)
            }

        }

        this.userService.inserUser(user).subscribe(response => {

            if (response.status === 200) {
                this.snackBar.openFromComponent(SnackBarComponent, {
                    duration: 10000
                })
            }
        })

    }

    onChange() {

        this.uploader.queue.forEach((itemFile: any) => {

            //call upload method
            itemFile.upload();

            let imagesLink = itemFile.some;

            let reader = new FileReader();

            reader.onload = (e: any) => {
                imagesLink = e.target.result;
                itemFile.images = imagesLink;
            }
            reader.readAsDataURL(imagesLink);

        });
    }

    getLetterUserName(username: string): string {
        let index = username.lastIndexOf(" ");
        return username.charAt(index + 1);
    }

}
