import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './Model/Task';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _http: HttpClient) {}
  createTask(_objTask: Task) {
    this._http
      .post(
        'https://driven-photon-393809-default-rtdb.firebaseio.com/task.json',
        _objTask
      )
      .subscribe({
        next: (val) => {
          console.log(val);
        },
        error: (err) => {
          console.log('Error-' + err);
        },
      });
  }
  getAllTasks() {
   
  return  this._http
      .get<Task[]>(
        'https://driven-photon-393809-default-rtdb.firebaseio.com/task.json'
      )
      .pipe(
        map((val) => {
          let tasks =[];
          for (let key in val){
           if (val.hasOwnProperty(key)){
            tasks.push({...val[key],id:key});
           }
          }
          return tasks;
        })
      );
  }
  updateTask(id:string | undefined,data:Task){
    this._http.put('https://driven-photon-393809-default-rtdb.firebaseio.com/task/'+id+'.json',data).subscribe({
      next:(resp)=>{
        console.log(resp);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  deleteTask(id:string|undefined){
    this._http.delete('https://driven-photon-393809-default-rtdb.firebaseio.com/task/'+id+'.json').subscribe({
      next:(resp)=>{
        console.log(resp);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
