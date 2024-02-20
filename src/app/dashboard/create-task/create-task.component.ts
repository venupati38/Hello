import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/Task';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  @Input('SelTask') task!: Task;
  @ViewChild('frmTask')
  frmTask!: NgForm;
  taskobj!: Task;
  isEdit: boolean = false;
  constructor(private taskserv: TaskService) {}
  ngOnInit(): void {
    this.isEdit = this.task == undefined ? false : true;
    this.taskobj =
      this.task == undefined
        ? {
            title: '',
            desc: '',
            assignedTo: '',
            createdAt: '',
            priority: '',
            status: '',
            id: '',
          }
        : this.task;
  }
  CreateEditTask() {
    //console.log(this.frmTask);
    //console.log(this.frmTask.form.controls['title']?.errors?.['required']);
    if (this.isEdit) {
      this.taskserv.updateTask(this.taskobj.id, this.frmTask.value);
    } else {
      this.taskserv.createTask(this.frmTask.value);
    }
  }
  getAll() {
    this.taskserv.getAllTasks();
  }
  reset() {
    this.frmTask.reset(this.taskobj);
  }
}
