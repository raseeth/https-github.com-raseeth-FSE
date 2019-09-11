import { FormControl, Validators } from "@angular/forms";

import { Task } from "./task.model";

export class TaskFormModel {
    public name = new FormControl();
    public priority = new FormControl();
    public parentTaskName = new FormControl();
    public startDate = new FormControl();
    public endDate = new FormControl();

    constructor(task: Task) {
      this.name.setValue(task.name);
      this.name.valueChanges.subscribe(x => task.name = x);
      this.name.setValidators([Validators.required]);

      this.priority.setValue(task.priority);
      this.priority.valueChanges.subscribe(x => task.priority = x);
      //this.priority.setValidators([Validators.required, this.rangeValidator]);

      this.parentTaskName.setValue(task.parentTaskName);
      this.parentTaskName.valueChanges.subscribe(x => task.parentTaskName = x);

      this.setStartDate(task.startDate);
      this.startDate.valueChanges.subscribe(x => task.startDate = x);
      this.startDate.setValidators([Validators.required, this.dateValidator]);

      this.setEndDate(task.endDate);
      this.endDate.valueChanges.subscribe(x => task.endDate = x);
      this.endDate.setValidators([this.dateValidator]);
    }

    private setStartDate(date: Date): void {
      const startDate = date ? this.getDate(date) : undefined;
      this.startDate.setValue(startDate);
    }

    private setEndDate(date: Date): void {
      const endDate = date ? this.getDate(date) : undefined;
      this.endDate.setValue(endDate);
    }

    private getDate(date: Date): string {
      if (date) {
      const day = ("0" + date.getDate()).slice(-2);
      const  month = ("0" + (date.getMonth() + 1)).slice(-2);

      return date.getFullYear() + "-" + month + "-" + day;
      }
    }

    private dateValidator(control: FormControl): any {
    if (control.value) {
      const dateSplit = control.value.split("-");

      if (dateSplit.length !== 3) {
        return { invalidDate: true };
      }

      const year = dateSplit[0];
      const month = dateSplit[1];
      const date = dateSplit[2];

      if (+year < 0 || +month < 0 || +date[2] < 0) {
        return { invalidDate: true };
      }

      //const value = moment(`${+year}-${month}-${date}`, "YYYY-MM-DD", true);

      //if (!value.isValid()) {
        return { invalidDate: true };
      //}
    }

    return null;
  }

  static whiteSpace(control: FormControl): any {
    if (control.value) {
      const isWhitespace = control.value.trim().length === 0;
      const isValid = !isWhitespace;

      return isValid ? null : { whitespace: true };
    }
  }

  static rangeValidator(control: FormControl): any {
    if (control.value > 0) {
      return null;
    }

    return { range: true };
  }
}
