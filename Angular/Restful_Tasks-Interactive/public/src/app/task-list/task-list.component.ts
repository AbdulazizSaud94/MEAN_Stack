import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskDetails = {};
  tasks: any;

  constructor(private _httpService: HttpService) {

  }

  ngOnInit() {
  }

  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our data!!", data);
      this.tasks = data;

    });
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
}
