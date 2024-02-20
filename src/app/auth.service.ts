import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthResponse } from './Model/AuthResponse';
import { User } from './Model/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenexpiretimer: any;
  user = new BehaviorSubject<User>(null);
  constructor(private _http: HttpClient, private _router: Router) {}
  signUp(emailid: string, password: string) {
    const data = {
      email: emailid,
      password: password,
      returnSecureToken: true,
    };
    return this._http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiCRCLhsCcJNvgU-9wwfZe5ECUatpm07o',
        data
      )
      .pipe(catchError(this.handleError));
  }

  signIn(emailid: string, password: string) {
    const data = {
      email: emailid,
      password: password,
      returnSecureToken: true,
    };
    return this._http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiCRCLhsCcJNvgU-9wwfZe5ECUatpm07o',
        data
      )
      .pipe(
        catchError(this.handleError),
        tap((resp: AuthResponse) => this.handleCreateUser(resp))
      );
  }
  private autoLogin() {
    const usr = JSON.parse(localStorage.getItem('user'));
    if (!usr) {
      return;
    }
    const loggedInUser = new User(
      usr.email,
      usr.id,
      usr._token,
      usr._expiresIn
    );
    if (loggedInUser.token) {
      this.user.next(loggedInUser);
      let dat = new Date(usr._expiresIn);
      const timerValue = dat.getTime() - new Date().getTime();
      this.autoLogout(timerValue);
    }
  }
  private autoLogout(expires: number) {
    setTimeout(() => {
      this.Logout();
    }, expires);
  }
  private Logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this._router.navigate(['']);
    if (this.tokenexpiretimer) {
      clearTimeout(this.tokenexpiretimer);
    }
  }
  private handleCreateUser(resp: AuthResponse) {
    const expiresInTs = new Date().getTime() + +resp.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const usr = new User(resp.email, resp.localId, resp.idToken, expiresIn);
    this.user.next(usr);
    this.autoLogout(+resp.expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(usr));
  }
  private handleError(err: any) {
    let errorMessage = 'An unknown error has occured';
    console.log(err);
    if (!err.error || !err.error.error) {
      return throwError(() => errorMessage);
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'This operation is not allowed.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'The email ID or Password is not correct.';
        break;
    }
    return throwError(() => errorMessage);
  }
}
