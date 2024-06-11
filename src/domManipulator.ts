import {Task, Priority} from "./Task";

/**
 * Module for handling all of the DOM manipulation required by the page
 */
export default class DomManipulator {
	private entryForm: HTMLElement;
	private taskList: HTMLElement;
	private prioritySelect: HTMLElement;
	constructor() {
		let foundForm = document.getElementById('entryForm');
		if(foundForm != null){
			this.entryForm = foundForm;
		}

		let foundList = document.getElementById('taskList');
		if(foundList != null){
			this.taskList = foundList;
		}

		let foundPrioritySelect = document.getElementById('priority');
		if(foundPrioritySelect != null){
			this.prioritySelect = foundPrioritySelect;
		}
	}

	/**
	 * Populates the "Priority" select list with each value defined in the Priority Enum
	 */
	buildPriorityOptions():void {
		this.prioritySelect.innerHTML = '';
		Object.values(Priority).filter(key => typeof key === 'number').forEach((value: number) => {
			//create option element
			const option = document.createElement('option') as HTMLOptionElement;
			option.text = Priority[value];
			option.value = value.toString();
			this.prioritySelect.appendChild(option);	
		});
	}

	/**
	 * Render a provided list of tasks to the taskList element
	 * @param tasks - List of tasks to be rendered in the DOM
	 */
	renderList(tasks: Task[]): void {
		this.taskList.innerHTML = '';
		tasks.forEach(task => {
			this.taskList.appendChild(DomManipulator.createTaskElement(task));
		});
	}

	/**
	 * Generate a DOM element for one task
	 * @param task - The target task
	 */
	private static createTaskElement(task: Task): HTMLElement {
		const taskRoot = document.createElement('li');

		const title = document.createElement('span');
		title.textContent = task.title;
		title.classList.add('title');
		taskRoot.appendChild(title);

		const description = document.createElement('span');
		description.textContent = task.description;
		description.classList.add('description');
		taskRoot.appendChild(description);

		const dueDate = document.createElement('span');
		dueDate.textContent = 'Due date: ' + task.dueDate.toLocaleDateString();
		taskRoot.appendChild(dueDate);

		const priority = document.createElement('span');
		priority.textContent = 'Priority: ' + Priority[task.priority]; 
		taskRoot.appendChild(priority);

		return taskRoot;
	}
}
