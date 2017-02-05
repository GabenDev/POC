import { Component } from '@angular/core';
import {TodoService} from '../../providers/todo-service';
import { NavController } from 'ionic-angular';
import {Todo} from '../../domain/todo';
import { TodoEditPage } from '../todo-edit/todo-edit';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
  providers: [TodoService]
})
export class ItemsPage {

  public todos: Observable<Todo[]>;

  constructor(public nav: NavController, public todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.load()
      .subscribe(data => {
        this.todos = data;
      })
  }

  addTodo(todo:string) {
    if(todo === "") {
      return;
    }
    this.todoService.add(todo)
      .subscribe(data  => {
        this.todos.push(data)
      });
  }

  toggleComplete(todo: Todo) {
    todo.isComplete = !todo.isComplete;
    this.todoService.update(todo)
      .subscribe(data => {
        todo = data;
      })
  }

  deleteTodo(todo: Todo, index:number) {
    console.log('index: ' + index);
    this.todoService.delete(todo)
      .subscribe(response => {
        this.todos.splice(index, 1);
        //this.loadTodos();
      });
  }

  navToEdit(todo: Todo, index: number) {
    console.log('index: ' + index);
    this.nav.push(TodoEditPage, {
      todo: todo,
      todos: this.todos,
      index: index
    });
  }

}
