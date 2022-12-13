import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TodoModel } from './models/todos.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private TodosEndpoint: string = "http://localhost:3000/todos";
  public Token!: string | undefined;

  constructor(private http: HttpClient) { }

  public GetTodos() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.Token);

    return this.http.get<TodoModel[]>(this.TodosEndpoint, {headers: headers})
    .pipe(
      catchError(this.handleError)
    )
  }

  public PostTodo(todo: TodoModel): Observable<TodoModel> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.Token);

    return this.http.post<TodoModel>(this.TodosEndpoint, todo, {headers: headers})
    .pipe(
      catchError(this.handleError)
    )
  }
  
  public handleError(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage = '';
    if (error.error) {
      errorMessage = `Error: ${error.statusText}`;
    } 
    return throwError(() => {
      return errorMessage;
    });
  }
}
