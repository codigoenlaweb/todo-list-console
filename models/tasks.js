import { v4 as uuidv4 } from "uuid";

export class Task {
  constructor(description, completed) {
    this.id = uuidv4();
    this.description = description;
    this.completed = completed;
    this.createdAt = new Date().toISOString();
  }
}

export class Tasks {
  constructor() {
    this.tasksList = {};
  }

  // getters
  get tasksArray() {
    const tasks = [];
    Object.keys(this.tasksList).forEach((key) => {
      const task = this.tasksList[key];
      tasks.push(task);
    });
    return tasks;
  }

  // methods
  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this.tasksList[task.id] = task;
    });
  }

  createTask(description) {
    const task = new Task(description, false);
    this.tasksList[task.id] = task;
  }

  allListTasks() {
    this.tasksArray.forEach((task, index) => {
      const idx = `${index + 1}.`.green;
      const { description, completed } = task;
      const status = completed ? "Completed".green : "Pending".red;
      console.log(`${idx} ${description} :: ${status}`);
    });
  }

  listCompletedTasks(completed = true) {
    this.tasksArray
      .filter((task) => task.completed === completed)
      .forEach((task, index) => {
        const idx = `${index + 1}.`.green;
        const { description, completed } = task;
        const status = completed ? "Completed".green : "Pending".red;
        console.log(`${idx} ${description} :: ${status}`);
      });
  }

  deleteTask(id) {
    if (this.tasksList[id]) {
      delete this.tasksList[id];
    }
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this.tasksList[id];
      if (!task.completed) {
        task.completed = true;
      }
    });

    this.tasksArray.forEach((task) => {
        if (!ids.includes(task.id)) {
            this.tasksList[task.id].completed = false;
        }
    });
  }
}
