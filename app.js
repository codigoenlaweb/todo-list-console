// third party modules
import color from "colors";

// my modules
import {
  inquirerMenu,
  stopInquirer,
  readInput,
  deleteTaskList,
  confirm,
  showChecklist,
} from "./src/inquirer.js";
import { Task, Tasks } from "./models/tasks.js";
import { readData, saveData } from "./src/saveData.js";

// code
console.clear();

const main = async () => {
  // options
  let opt = "";
  // instance of Tasks
  const tasks = new Tasks();

  // read data in db
  const data = readData();

  if (data) {
    // load tasks
    tasks.loadTasksFromArray(data);
  }

  // main loop if opt is not 0
  do {
    // show menu and get option
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // create task
        const description = await readInput("Description:");
        tasks.createTask(description);
        break;
      case "2":
        // list tasks
        tasks.allListTasks();
        break;
      case "3":
        // list completed tasks
        tasks.listCompletedTasks(true);
        break;
      case "4":
        // list pending tasks
        tasks.listCompletedTasks(false);
        break;
      case "5":
        // complete task(s)
        const ids = await showChecklist(tasks.tasksArray);
        tasks.toggleCompleted(ids);
        break;
      case "6":
        // delete task
        const id = await deleteTaskList(tasks.tasksArray);
        if (id !== "0") {
          const ok = await confirm("Are you sure?");
          if (ok) {
            tasks.deleteTask(id);
            console.log("Task deleted".green);
          }
        }
        break;
      case "0":
        break;
      default:
        break;
    }

    // save data
    saveData(tasks.tasksArray);

    // stop inquirer
    await stopInquirer();
  } while (opt !== "0");
};

main();
