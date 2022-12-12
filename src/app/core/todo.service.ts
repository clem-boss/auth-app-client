import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TodoModel } from './models/todos.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private TodosEndpoint: string = "http://localhost:3000/todos";

  constructor(private http: HttpClient) { }

  public GetTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.TodosEndpoint)
    .pipe(
      catchError(this.handleError)
    )
  }

  public PostTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(this.TodosEndpoint, todo)
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
