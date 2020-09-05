import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { apis } from './config';

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public errorRes : BehaviorSubject<any>;
    constructor(private http: HttpClient) {
        this.errorRes = new BehaviorSubject<any>("");
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${apis.login}`, { username : username, password : password})
            .pipe(map(user => {
              console.log(user)
                // login successful if there's a jwt token in the response
                if (user && user.message && user.message.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.message));
                    this.currentUserSubject.next(user.message);
                }
                
                return user;
            }));
    }

    refreshToken(){
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))
        const headers = { 'Authorization': `Bearer ${currentUser.referesh_token}`}
        console.log(headers)
        this.http.post<any> (apis.refresh,{},{
            headers
        }).pipe(map(user => {
            console.log(user, "User")
            debugger
            if (user && user.message && user.message.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.message));
                this.currentUserSubject.next(user.message);
            }
        })).subscribe(res => {
            console.log(res)
        })
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    error(error) {
        this.errorRes.next(error)
    }
}