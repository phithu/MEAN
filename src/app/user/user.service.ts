import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { User } from './user-item/user';

const linkHost = "http://localhost:3000/"

@Injectable()
export class UserService {

    constructor(private http: Http) { }


    getUser(): Observable<[any]> {
        return this.http.get(linkHost + 'api/users')
            .map(response => response.json().data)
            .catch(this.handleError)

    }

    getUserById(idUser): Observable<any> {
        return this.http.get(linkHost + `api/users/${idUser}`)
            .map(response => response.json().data)
            .catch(this.handleError)
    }

    inserUser(user: User): Observable<any> {
        return this.http.post(linkHost + 'api/users', user)
            .map(response => response.json())
            .catch(this.handleError)
    }
    deleteUser(id: string): Observable<any> {
        return this.http.delete(linkHost + `api/delete/${id}`)
            .map(response => response.json())
            .catch(this.handleError)
    }
    updateUserById(id, dataUpdate): Observable<any> {
        return this.http.put(linkHost + `api/update/${id}`,
            dataUpdate)
            .map(response => response.json())
            .catch(this.handleError)
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

}
