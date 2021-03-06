import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { tmpdir } from 'os';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {
    // this.getTasks();
  }

  getTasks() {
    // let tempObservable = this._http.get('/tasks');
    // tempObservable.subscribe(data=>console.log("Got our tasks!",data));
    return this._http.get('/tasks');
  }
  addTask(newtask) {
    return this._http.post('/task', newtask)
  }
  deleteTask(id){
    return this._http.delete('tasks/'+id);
  }
  editTask(id, task){
    return this._http.put('tasks/'+id, task );
  }
}
