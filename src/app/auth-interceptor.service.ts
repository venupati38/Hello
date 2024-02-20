import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "./Model/User";

export class AuthInterceptorService implements HttpInterceptor{
    authService: AuthService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const usr = JSON.parse(localStorage.getItem('user'));
    
    const loggedInUser = new User(
      usr.email,
      usr.id,
      usr._token,
      usr._expiresIn
    );

    if(!loggedInUser){
        return next.handle(req);
    }
    const modifiedReq = req.clone({
        params: new HttpParams().set('auth', loggedInUser.token
    )})
    return next.handle(modifiedReq);

        // return this.authService.user.pipe(take(1), exhaustMap(user => {
        //     console.log(JSON.stringify(user));
        //     if(!user){
        //         return next.handle(req);
        //     }
        //     const modifiedReq = req.clone({
        //         params: new HttpParams().set('auth', user.token
        //     )})
        //     return next.handle(modifiedReq)
        // }));
    }

}