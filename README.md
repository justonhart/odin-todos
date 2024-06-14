# Odin To-dos
This project is part of the Odin Project, a self-driven web development training program. Learn more at [the Odin Project](https://theodinproject.com).

You can view this project [here](https://github.justonh.art/odin-todos).

## Project summary
The assignment for this project was to create a to-do list management tool using HTML, CSS, and JavaScript. There should be a focus on separation of concerns; i.e., don't include dom manipulation logic in data models, etc. 

The to-do records are to contain the following properties: 
1. Title
2. Description
3. Due Date
4. Priority

Additionally, allow the user to define "Projects", which are groupings of to-do tasks. 

Finally, add some data persistence using the localStorage API.

## Implementation details

## Technologies used
* HTML5
* CSS
* NPM
* TypeScript
* Webpack

## Approach
I had previously created a user interface I liked in my [Odin Library project](https://github.com/justonhart/odin-library), so I used it as a starting point for this project. Since separation of concerns was listed as a priority for this project, I defined a domManager class that contains all of the code that creates or modifies DOM elements, and reference that class in my main script.ts file. I defined a few different custom objects, listed below:

### Task
The Task class is just the model for properties tracked on individual to-do items. It contains no custom logic of its own.

### TaskList
The TaskList class was my solution to handle more complex interactions for tasks and projects. I didn't actually implement a "Project" class in this project, instead I just conceptualized "projects" as groupings of tasks. The TaskList provides helper methods to simplify gathering collections of tasks based on project name, so they can be provided to the DomManipulator.

## Page functionality
When the page is initally loaded up, there are no tasks, and one pre-defined "Default" Project. The user can create new tasks using the Task Entry form contained within the left sidebar. When the task entry form is submitted, a new task is created and assigned the currently-selected project in the Project menu. The user can create more projects using the simple AddProject dialog form accessible via the "Add project" button.

Tasks are displayed inside the large component in the bottom-right of the screen. Each task is displayed as a card, and the color of the task card varies depending on the selected priority. The selected project determines which tasks are displayed. Tasks are displayed in a pre-defined order: (1) completed tasks are always after incomplete tasks, (2) tasks due earlier are displayed before tasks due later, and (3) higher priority tasks are displayed before lower-priority tasks. This was implemented using JavaScript's array.sort() method inside of the domManipulator class. Tasks can be interacted with via the three buttons on each task card, or by double-clicking the desired task.

Each time a task is created or modified, the data is stored in localStorage. If the user leave and returns to the page, localStorage is read and all tasks and projects are reloaded.
