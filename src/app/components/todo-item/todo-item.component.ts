import { Component, Input } from '@angular/core';
import { TodoModel } from 'src/app/core/models/todos.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() public Item!: TodoModel;

}
