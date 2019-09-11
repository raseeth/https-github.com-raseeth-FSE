import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";

import { TaskFormModel } from "../models/form.model";
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";
import { ParentTask } from "../models/parent-task.model";

@Component({
    templateUrl: "./add-task.component.html"
})

export class AddTaskComponent implements OnInit {

    addForm: FormGroup;
    formSubmitted = false;

    parentTasks$: Observable<ParentTask[]>;

    constructor(
      private fb: FormBuilder,
      private taskService: TaskService) {
      this.addForm = this.fb.group({"task": this.fb.group(new TaskFormModel(new Task(undefined, undefined, undefined, undefined, undefined))) });
    }

    get taskForm(): FormGroup {
      return this.addForm.get("task") as FormGroup;
    }

    ngOnInit(): void {
      this.parentTasks$ = this.taskService.getParentTasks();
    }

    add(parentTasks: ParentTask[]): void {
      this.formSubmitted = true;

      if (!this.addForm.valid) {
        return;
      }

      const task = this.getTask(this.taskForm.value);

      this.taskService.post(task, parentTasks).subscribe(() => {
          this.parentTasks$ = this.taskService.getParentTasks();
          this.formSubmitted = false;
          this.reset();
        },
        (error) => {
      });
    }

    reset(): void {
      this.taskForm.reset();

      this.taskForm.controls["priority"].setValue(0);
    }

    private getTask(formValue: Task): Task {
      return new Task(
              undefined,
              formValue.name,
              formValue.parentTaskName,
              +formValue.priority,
              formValue.startDate ? new Date(formValue.startDate) : undefined,
              formValue.endDate ? new Date(formValue.endDate) : undefined);
    }
}
