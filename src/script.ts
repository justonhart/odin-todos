import './style.css';
import { Task } from './Task';
import DomManipulator from './domManipulator';

const tasks: Task[] = [];
const EDIT_DIALOG = document.getElementById('taskEditDialog') as HTMLDialogElement;
const EDIT_TITLE_FIELD = document.getElementById('editTitle') as HTMLInputElement;
const EDIT_DESC_FIELD = document.getElementById('editDescription') as HTMLInputElement;
const EDIT_DUE_DATE_FIELD = document.getElementById('editDueDate') as HTMLInputElement;
const EDIT_PRIORITY_FIELD = document.getElementById('editPrioritySelect') as HTMLSelectElement;
const EDIT_INDEX_FIELD = document.getElementById('editIndex') as HTMLInputElement;
const ENTRY_TITLE_FIELD = document.getElementById('entryTitle') as HTMLInputElement;
const ENTRY_DESC_FIELD = document.getElementById('entryDescription') as HTMLInputElement;
const ENTRY_DUE_DATE_FIELD = document.getElementById('entryDueDate') as HTMLInputElement;
const ENTRY_PRIORITY_FIELD = document.getElementById('entryPrioritySelect') as HTMLSelectElement;
const PROJECT_SELECT = document.getElementById('projectSelect') as HTMLSelectElement;
const ADD_PROJECT_DIALOG = document.getElementById('addProjectDialog') as HTMLDialogElement;
const OPEN_ADD_PROJECT_BUTTON = document.getElementById('openAddProject') as HTMLButtonElement;
const ADD_PROJECT_NAME = document.getElementById('addProjectName') as HTMLInputElement;

//create DomManipulator and run startup functions
const dm = new DomManipulator();
dm.buildPriorityOptions();

OPEN_ADD_PROJECT_BUTTON.onclick = () => {ADD_PROJECT_DIALOG.showModal()};

//assign event listener for form submissions
addEventListener('submit', event => {
	event.preventDefault();
	if(event.target instanceof Element){

		//if the entry form was submitted, create a new form using those values
		if(event.target.id === 'entryForm'){
			const formFields = Array.from(document.querySelectorAll('#entryForm *[id]')) as HTMLInputElement[];
			if(formFields.every( field => field.nodeValue != "")){
				const newTask = new Task(
					ENTRY_TITLE_FIELD.value,
					ENTRY_DESC_FIELD.value,
					new Date(ENTRY_DUE_DATE_FIELD.value),
					Number.parseInt(ENTRY_PRIORITY_FIELD.value),
					PROJECT_SELECT.value
				);
				console.log(new Date(ENTRY_DUE_DATE_FIELD.value));
				tasks.push(newTask);
				dm.renderList(tasks);
				ENTRY_TITLE_FIELD.focus();
				ENTRY_TITLE_FIELD.select();
			}
		} 

		//if the edit form was submitted, modify the task existing at the provided index
		else if(event.target.id === 'editForm'){
			tasks[Number.parseInt(EDIT_INDEX_FIELD.value)] = new Task(
				EDIT_TITLE_FIELD.value,
				EDIT_DESC_FIELD.value,
				new Date(EDIT_DUE_DATE_FIELD.value),
				Number.parseInt(EDIT_PRIORITY_FIELD.value),
				''//EDIT AFTER ADDING PROJECT TO EDIT MODAL
			);
			dm.renderList(tasks);
			EDIT_DIALOG.close();
		}

		//if the add project form was submitted, add new value to project select
		else if(event.target.id === 'addProjectForm'){
			const newProjectOption = document.createElement('option');
			newProjectOption.value = ADD_PROJECT_NAME.value;
			newProjectOption.textContent = ADD_PROJECT_NAME.value;
			PROJECT_SELECT.appendChild(newProjectOption);
			ADD_PROJECT_DIALOG.close();
		}
	}
});

//when a taskDelete event is fired, remove the task at the defined index
addEventListener('taskDelete', (event: CustomEvent) => {
	tasks.splice(parseInt(event.detail), 1);
	dm.renderList(tasks);
});

//when a taskEdit event is fired, populate and show the taskEdit Dialog
addEventListener('taskEdit', (event: CustomEvent) => {
	EDIT_INDEX_FIELD.value = event.detail.index;
	EDIT_TITLE_FIELD.value = event.detail.task.title;
	EDIT_DESC_FIELD.value = event.detail.task.description;
	EDIT_DUE_DATE_FIELD.value = event.detail.task.dueDate.toISOString().substring(0,10);
	EDIT_PRIORITY_FIELD.value = event.detail.task.priority;
	EDIT_DIALOG.showModal();
});

PROJECT_SELECT.onchange = () => {
	 console.log(PROJECT_SELECT.value);
};

