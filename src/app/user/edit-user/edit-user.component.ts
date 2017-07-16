import { Component, OnInit, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { UserService } from '../user.service';
import { User } from '../user-item/user';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { ListUserComponent } from '../list-user/list-user.component';
import { DialogService } from './dialog.service';



@Component({
    selector: 'pt-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],

})
export class EditUserComponent implements OnInit {


    public user: User;

    private changeAvatar: boolean = false;
    private editForm: FormGroup;

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
        public dialogRef: MdDialogRef<EditUserComponent>,
        private builder: FormBuilder,
        private userService: UserService,
        @Inject(forwardRef(() => DialogService)) private dialogService: DialogService
    ) { }

    ngOnInit() {

        this.createForm();

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

            let objectResponse = JSON.parse(response);

            let linkImages = objectResponse.data.link;

            this.editForm.controls['inputImages'].setValue(linkImages);
        };
    }
    private createForm() {
        this.editForm = this.builder.group({

            inputName: [this.user.name, Validators.compose(
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(20)
                ])],

            inputAge: [this.user.age, Validators.compose(
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(2),
                    Validators.pattern(/^\d+$/)
                ])],

            inputAddress: [this.user.address, Validators.compose(
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(30)
                ])],

            inputImages: []

        })

        this.inputAge = this.editForm.controls['inputAge'];
        this.inputName = this.editForm.controls['inputName'];
        this.inputAddress = this.editForm.controls['inputAddress'];

    }
    receivedValueForm(value: any) {
        let user: User;

        if (value.inputImages) {
            user = {
                _id: this.user._id,
                name: value.inputName,
                address: value.inputAddress,
                age: value.inputAge,
                images: value.inputImages
            }
        }
        else {
            if (this.user.images.length > 1) {
                user = {
                    _id: this.user._id,
                    name: value.inputName,
                    address: value.inputAddress,
                    age: value.inputAge,
                    images: this.user.images
                }

            }
            else {
                user = {
                    _id: this.user._id,
                    name: value.inputName,
                    address: value.inputAddress,
                    age: value.inputAge,
                    images: this.getLetterUserName(value.inputName)
                }

            }


        }

        this.userService.updateUserById(this.user._id, user).subscribe(
            response => {
                if (response.status === 200) {

                    this.dialogRef.close();
                    this.dialogService.emitStatus(true)

                }
            }
        )

    }
    removeImages() {
        this.user.images = this.getLetterUserName(this.user.name);
    }

    onChange() {

        // have change avatart
        this.changeAvatar = true;
        this.uploader.queue.forEach((itemFile: any) => {

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
