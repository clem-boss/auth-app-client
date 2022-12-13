import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, Observable, throwError } from 'rxjs';
import { UserModel } from './models/user.model';
import { IsLoggedGuard } from './is-logged.guard';
import { TodoService } from './todo.service';

@Injectable()
export class AuthService {
  public User!: string;
  private UsersEndpoint: string = "http://localhost:3000/users";

  constructor(private http: HttpClient, private guard: IsLoggedGuard, private todoService: TodoService) { }

  public LogInUser(user: UserModel): Observable<UserModel | string> {
    return this.http.post<UserModel>(this.UsersEndpoint, user)
    .pipe(
      tap(user => {
          this.todoService.Token = user.accessToken;
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

  private createAuthorizationHeader(headers: Headers, token: string | undefined) {
    headers.append('Authorization', 'Bearer ' + token); 
  }
} 


