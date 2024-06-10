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
}
