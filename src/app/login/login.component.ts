import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  observ!:Subscription
  constructor(private _authserv: AuthService) {}
  onFormSubmitted(ngfrm: NgForm) {
    //console.log(ngfrm.value);
    if (!this.isLoginMode) {
      this.observ = this._authserv.signUp(ngfrm.value.email, ngfrm.value.password).subscribe({
        next: (resp) => {
          console.log('response:' + resp);
        },
        error: (err) => {
          console.log('response error:' + err);
        },
      });
    }
  else{
    this.observ = this._authserv.signIn(ngfrm.value.email, ngfrm.value.password).subscribe({
      next: (resp) => {
        console.log('response:' + JSON.stringify(resp) );
      },
      error: (err) => {
        console.log('response error:' + JSON.stringify(err));
      },
    });
  }
  }
  onSwitchMode() {
    this.isLoginMode = false;
  }
}
