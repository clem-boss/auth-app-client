import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoModel } from 'src/app/core/models/todos.model';
import { TodoService } from 'src/app/core/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  public Todos!: TodoModel[];
  public NewTodo!: string;
  public Error!: string;

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.FetchTodos();
  }

  public FetchTodos() {
    this.todoService
    .GetTodos()
    .subscribe(todos => {
      this.Todos = todos;
      console.log(todos);
    })
  }

  public AddNewTodo() {
    this.todoService
    .PostTodo({title: this.NewTodo})
    .subscribe(            
      res => this.FetchTodos(),
      err => this.Error = err,
    )    
  }
}
