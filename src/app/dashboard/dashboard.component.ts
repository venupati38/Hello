import { Component, OnInit } from '@angular/core';
import { Task } from '../Model/Task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasks!: Task[];
  isShow: boolean = false;
  isEditCreate: boolean = false;
  task!: Task;
  constructor(private taskserv: TaskService) {}
  ngOnInit(): void {
    this.taskserv.getAllTasks().subscribe({
      next: (val) => {
        this.tasks = val;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  viewclick(tsk: Task) {
    this.task = tsk;
    this.isShow = true;
    this.isEditCreate = false;
  }
  EditViewClick(tsk: Task) {
    this.isEditCreate = true;
    this.isShow = false;
    this.task = tsk;
  }
  DeleteClick(id: string|undefined) {
    this.taskserv.deleteTask(id);
  }
}
