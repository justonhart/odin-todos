import {Task, Priority} from "./Task";

/**
 * Module for handling all of the DOM manipulation required by the page
 */
export default class DomManipulator {
	private taskList: HTMLElement;
	private prioritySelects: NodeList;
	constructor() {
		let foundList = document.getElementById('taskList');
		if(foundList != null){
			this.taskList = foundList;
		}

		let foundPrioritySelects = document.querySelectorAll('select[id$="PrioritySelect"');
		this.prioritySelects = foundPrioritySelects;
	}

	/**
	 * Populates the "Priority" select list with each value defined in the Priority Enum
	 */
	buildPriorityOptions():void {
		this.prioritySelects.forEach(node => {
			Object.values(Priority).filter(key => typeof key === 'number').forEach((value: number) => {
				//create option element
				const option = document.createElement('option') as HTMLOptionElement;
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
		this.taskList.innerHTML = '';
		tasks.forEach((task, index) => {
			const taskCard = DomManipulator.createTaskElement(task);
			taskCard.dataset.index = index.toString();
			this.taskList.appendChild(taskCard);
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
		dueDate.textContent = `Due date: ${task.dueDate.getUTCMonth()+1}/${task.dueDate.getUTCDate()}/${task.dueDate.getUTCFullYear()}`;
		taskRoot.appendChild(dueDate);

		const priority = document.createElement('span');
		priority.textContent = 'Priority: ' + Priority[task.priority]; 
		taskRoot.appendChild(priority);

		const buttonPanel = document.createElement('div');
		buttonPanel.classList.add('buttonPanel');

		const editButton = document.createElement('button');
		editButton.textContent = '✏';
		editButton.addEventListener('click', () => {
			const eventDetail = {
				index: taskRoot.dataset.index,
				task: task
			};
			dispatchEvent(new CustomEvent('taskEdit', {detail: eventDetail}));
		});
		buttonPanel.appendChild(editButton);

		const deleteButton = document.createElement('button');
		deleteButton.textContent = '✖';
		deleteButton.addEventListener('click', () => {
			dispatchEvent(new CustomEvent('taskDelete', {detail: taskRoot.dataset.index}));
		});
		buttonPanel.appendChild(deleteButton);

		taskRoot.appendChild(buttonPanel);

		return taskRoot;
	}
}
