import inquirer from "inquirer";
import color from "colors";

// menu options
const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create task`,
      },
      {
        value: "2",
        name: `${"2.".green} List tasks`,
      },
      {
        value: "3",
        name: `${"3.".green} List completed tasks`,
      },
      {
        value: "4",
        name: `${"4.".green} List pending tasks`,
      },
      {
        value: "5",
        name: `${"5.".green} Complete task(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Delete task`,
      },
      {
        value: "0",
        name: `${"0.".green} Exit`,
      },
    ],
  },
];

// show menu and get option
export const inquirerMenu = async () => {
  console.clear();
  console.log("============================".green);
  console.log("    Select an option".white);
  console.log("============================\n".green);

  const { option } = await inquirer.prompt(menuOptions);
  return option;
};

// stop inquirer before continue
export const stopInquirer = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"ENTER".green} to continue`,
    },
  ];

  await inquirer.prompt(question);
};

// read input with dinamic message
export const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
};

// show checklist to all tasks
export const showChecklist = async (tasks = []) => {
  console.clear();

  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.completed,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
}

// show list of tasks to delete
export const deleteTaskList = async (tasks = []) => {
  console.clear();

  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Cancel",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

// confirm action
export const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
}

