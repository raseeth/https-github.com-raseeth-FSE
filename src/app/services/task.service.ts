import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay, take } from "rxjs/operators";

import {
  Task as TaskApi,
  ParentTask as ParentTaskApi,
  TaskService as TaskApiService,
  ParentTaskService as ParentTaskApiService,
  ICreateTask,
  CreateTask,
  CreateParentTask,
  ICreateParentTask,
  UpdateParentTask,
  UpdateTask,
  IUpdateParentTask,
  IUpdateTask
} from "./nswag.service";

import { Task } from "../models/task.model";
import { ParentTask } from "../models/parent-task.model";

@Injectable()
export class TaskService {

    constructor(private taskApiService: TaskApiService, private parentTaskApiService: ParentTaskApiService) {
    }

    getTasks(): Observable<Task[]> {
      return this.taskApiService.query().pipe(map(response => this.mapToTasks(response)), shareReplay());
    }

    getParentTasks(): Observable<ParentTask[]> {
      return this.parentTaskApiService.query().pipe(map(parentTasks => this.mapToParentTasks(parentTasks)), shareReplay());
    }

    get(id: number): Observable<Task> {
      return this.taskApiService.get(id).pipe(map(response => this.mapToTask(response)), shareReplay());
    }

    post(task: Task, parentTasks: ParentTask[]): Observable<any> {
      return this.taskApiService.post(this.getCreateTaskRequest(task, parentTasks));
    }

    updateTask(task: Task, parentTasks: ParentTask[]): Observable<any> {
      return this.taskApiService.put(task.id, this.getUpdateTaskRequest(task, parentTasks));
    }

    endTask(id: number): Observable<any> {
      return this.taskApiService.end(id);
    }

    private mapToTasks(response: TaskApi[]): Task[] {
      if (!response) {
        return;
      }

      const tasks: Task[] = [];

      response.forEach(task => {
        tasks.push(this.getTask(task));
      });

      return tasks;
    }

    private mapToTask(response: TaskApi): Task {
      if (!response) {
        return;
      }

      return this.getTask(response);
    }

    private mapToParentTasks(response: ParentTaskApi[]): ParentTask[] {
      if (!response) {
        return;
      }

      const parentTasks: ParentTask[] = [];

      response.forEach(parentTask => {
        parentTasks.push(new ParentTask(
          parentTask.id,
          parentTask.name,
        ));
      });

      return parentTasks;
    }

    private getTask(task: TaskApi): Task {
      return new Task(
          task.id,
          task.name,
          task.parentTask ? task.parentTask.name : undefined,
          task.priority,
          new Date(task.startDate),
          task.endDate ? new Date(task.endDate) : undefined,
          task.isComplete);
    }

    private getCreateTaskRequest(task: Task, parentTasks: ParentTask[]): CreateTask {

      let createParentTask: CreateParentTask;

      if (task.parentTaskName) {
        createParentTask = new CreateParentTask({
          name: task.parentTaskName
        } as ICreateParentTask);

        if (parentTasks) {
          const parentTask = parentTasks.find(x => x.name.toLowerCase() === task.parentTaskName.toLowerCase());

          if (parentTask) {
            createParentTask.id = parentTask.id;
          }
        }
      }

      return new CreateTask({
        name: task.name,
        parentTask: createParentTask,
        priority: task.priority,
        startDate: task.startDate,
        endDate: task.endDate
      } as ICreateTask);
    }

    private getUpdateTaskRequest(task: Task, parentTasks: ParentTask[]): UpdateTask {

      let updateParentTask: UpdateParentTask;

      if (task.parentTaskName) {
        updateParentTask = new UpdateParentTask({
          name: task.parentTaskName
        } as IUpdateParentTask);

        if (parentTasks) {
          const parentTask = parentTasks.find(x => x.name.toLowerCase() === task.parentTaskName.toLowerCase());

          if (parentTask) {
            updateParentTask.id = parentTask.id;
          }
        }
      }

      return new UpdateTask({
        id: task.id,
        name: task.name,
        parentTask: updateParentTask,
        priority: task.priority,
        startDate: task.startDate,
        endDate: task.endDate
      } as IUpdateTask);
    }
}
