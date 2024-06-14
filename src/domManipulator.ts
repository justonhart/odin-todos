import { Task, TaskList, Priority } from "./Task";

/**
 * Module for handling all of the DOM manipulation required by the page
 */
export default class DomManipulator {
	private taskList: HTMLElement;
	private prioritySelects: NodeList;
	private projectSelect: HTMLElement;
	private projectNames: Set<string>;
	private selectedProject: string;
	constructor(taskList: TaskList) {
		const foundList = document.getElementById("taskList");
		if (foundList != null) {
			this.taskList = foundList;
		}

		const foundPrioritySelects = document.querySelectorAll(
			'select[id$="PrioritySelect"',
		);
		this.prioritySelects = foundPrioritySelects;

		const foundProjectSelect = document.getElementById("projectSelect");
		if (foundProjectSelect != null) {
			this.projectSelect = foundProjectSelect;
		}

		this.projectNames = new Set<string>();
		this.projectNames.add("Default");
		this.selectedProject = "Default";
		taskList
			.getAllProjectNames()
			.forEach((name: string) => this.projectNames.add(name));
	}

	/**
	 * Populates the "Priority" select list with each value defined in the Priority Enum
	 */
	buildPriorityOptions(): void {
		this.prioritySelects.forEach((node) => {
			Object.values(Priority)
				.filter((key) => typeof key === "number")
				.forEach((value: number) => {
					//create option element
					const option = document.createElement("option") as HTMLOptionElement;
					option.text = Priority[value];
					option.value = value.toString();
					node.appendChild(option);
				});
		});
	}

	/**
	 * Render a provided list of tasks to the taskList element
	 * @param tasks - List of tasks to be rendered in the DOM
	 */
	renderList(tasks: Task[]): void {
		this.taskList.innerHTML = "";

		// task order (in order of importance):
		// (1) completed tasks follow uncompleted tasks
		// (2) tasks due later follow tasks due earlier, and
		// (3) lower-priority tasks follow higher-priority tasks

		const sortByCompletion = (a: Task, b: Task): 1 | 0 | -1 => {
			return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
		};

		const sortByDate = (a: Task, b: Task): 1 | 0 | -1 => {
			return a.dueDate.getTime() === b.dueDate.getTime()
				? 0
				: a.dueDate > b.dueDate
					? 1
					: -1;
		};

		const sortByPriority = (a: Task, b: Task): 1 | 0 | -1 => {
			return a.priority === b.priority ? 0 : a.priority > b.priority ? -1 : 1;
		};

		tasks
			.sort((a: Task, b: Task) => {
				return (
					sortByCompletion(a, b) || sortByDate(a, b) || sortByPriority(a, b)
				);
			})
			.forEach((task) => {
				const taskCard = DomManipulator.createTaskElement(task);
				this.taskList.appendChild(taskCard);
			});
	}

	/**
	 * Generate a DOM element for one task
	 * @param task - The target task
	 * @returns taskRoot - the HTML element representing the supplied task
	 */
	private static createTaskElement(task: Task): HTMLElement {
		const taskRoot = document.createElement("li");

		const title = document.createElement("span");
		title.textContent = task.title;
		title.classList.add("title");
		taskRoot.appendChild(title);

		const description = document.createElement("span");
		description.textContent = task.description;
		description.classList.add("description");
		taskRoot.appendChild(description);

		const dueDate = document.createElement("span");
		dueDate.textContent = `Due date: ${task.dueDate.getUTCMonth() + 1}/${task.dueDate.getUTCDate()}/${task.dueDate.getUTCFullYear()}`;
		taskRoot.appendChild(dueDate);

		const priority = document.createElement("span");
		priority.textContent = "Priority: " + Priority[task.priority];
		taskRoot.appendChild(priority);

		const buttonPanel = document.createElement("div");
		buttonPanel.classList.add("buttonPanel");

		const completeButton = document.createElement("button");
		completeButton.textContent = "✔";
		completeButton.addEventListener("click", () => {
			dispatchEvent(new CustomEvent("taskComplete", { detail: task.id }));
		});
		buttonPanel.appendChild(completeButton);

		const editButton = document.createElement("button");
		editButton.textContent = "✏";

		const fireEditEvent = () => {
			const eventDetail = {
				task: task,
			};
			dispatchEvent(new CustomEvent("taskEdit", { detail: eventDetail }));
		};

		editButton.addEventListener("click", fireEditEvent);

		buttonPanel.appendChild(editButton);

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "✖";
		deleteButton.addEventListener("click", () => {
			dispatchEvent(new CustomEvent("taskDelete", { detail: task.id }));
		});
		buttonPanel.appendChild(deleteButton);

		taskRoot.appendChild(buttonPanel);

		if (task.completed) {
			taskRoot.classList.add("completed");
		}

		taskRoot.addEventListener("dblclick", fireEditEvent);

		if (task.priority === Priority.High) {
			taskRoot.classList.add("high");
		} else if (task.priority === Priority.Highest) {
			taskRoot.classList.add("highest");
		}

		return taskRoot;
	}

	/**
	 * Refreshes the project list element using existing project names
	 */
	public refreshProjectOptions(): void {
		this.projectSelect.innerHTML = "";
		this.projectNames.forEach((name: string) => {
			const option = document.createElement("option");
			option.value = name;
			option.textContent = name;
			if (name === this.selectedProject) {
				option.selected = true;
			}
			this.projectSelect.appendChild(option);
		});
	}

	/**
	 * Adds a new project to the internal set of project names
	 * @param name - the name of the new project
	 */
	public addProject(name: string): void {
		this.projectNames.add(name);
		this.refreshProjectOptions();
	}

	/**
	 * Updates the internal selectedTask value
	 * @param name - the name of the selected project
	 */
	public setSelectedProject(name: string): void {
		this.selectedProject = name;
	}
}
