import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskDetails = {};
  tasks = {};
  newTask = {};
  task = {};
  taskUpdate = {};
  editedTask = {};

  constructor(private _httpService: HttpService) {

  }

  ngOnInit() {
    this.newTask = { title: '', description: '' };
  }

  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our data!!", data);
      this.tasks = data;

    });
  }

  onSubmit() {
    let observable = this._httpService.addTask(this.newTask)
    observable.subscribe(data => {
      this.task = data
    })
    this.newTask = { title: "", description: "" }
  }

  DeleteTask(id) {
    console.log(id);
    let observable = this._httpService.deleteTask(id)
    observable.subscribe(data => {
      console.log('deleted', data)
    })
    this.getTasksFromService()
  }

  showDetails(title: string, description: string, createdAt: string, completed: string): void {
    this.taskDetails = {
      title: title,
      description: description,
      createdAt: createdAt,
      completed: completed
    }
    console.log(`Click event is working with num param: ${this.taskDetails['title']}`);

  }

  showUpdateForm(title: string, description: string, completed: string, id:string): void {
    this.taskUpdate = {
      id: id,
      title: title,
      description: description,
      completed: completed
    }
    console.log(`Click event is working with num param: ${this.taskUpdate['title']}`);

  }
  editTask(){
    console.log("edit",this.editedTask)
    let observable = this._httpService.editTask(this.taskUpdate['id'], this.editedTask)
    observable.subscribe((data:any) => {
      this.editedTask = {title: data.title, description: data.description}
      console.log('after', this.editedTask);
      this.getTasksFromService();

    })
  }
}
