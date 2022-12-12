import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, Observable, throwError } from 'rxjs';
import { UserModel } from './models/user.model';
import { IsLoggedGuard } from './is-logged.guard';

@Injectable()
export class AuthService {
  public User!: string;
  private UsersEndpoint: string = "http://localhost:3000/users";

  constructor(private http: HttpClient, private guard: IsLoggedGuard) { }

  public LogInUser(user: UserModel): Observable<UserModel | string> {
    return this.http.post<UserModel>(this.UsersEndpoint, user)
      .pipe(
        tap(user => {
          this.User = user.username;
          this.guard.IsLogged = true;
        }),
        catchError(this.handleError)
      )
  }
  
  public handleError(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage = '';
    if (error.error) {
      errorMessage = `Error: ${error.error}`;
    } 
    return throwError(() => {
      return errorMessage;
    });
  }
} 


