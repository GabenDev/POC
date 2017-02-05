import { Component } from '@angular/core';
import {TodoService} from '../../providers/todo-service';
import { NavController } from 'ionic-angular';
import {Todo} from '../../domain/todo';
import { TodoEditPage } from '../todo-edit/todo-edit';

import { AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
  providers: [TodoService]
})
export class ItemsPage {

  public todos: Todo[];
  public songs: FirebaseListObservable<any>;

  constructor(public nav: NavController, public todoService: TodoService
    , af: AngularFire
  ) {
    this.songs = af.database.list('/songs');
    console.log("Songs: ");

    this.songs.forEach(song => {
      song.forEach(item => {
        console.log('Song:', item.title);
      });
    });

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
    this.songs.push({
      title: todo
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
      });
      //alert(todo.description);
      //this.songs.remove(todo.description);
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
