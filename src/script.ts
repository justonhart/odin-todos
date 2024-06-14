import './style.css';
import { Task, TaskList } from './Task';
import DomManipulator from './domManipulator';

const taskList = new TaskList();

//load from localStorage if available
if(localStorage.getItem('taskList')){
	taskList.rebuildFromJson(localStorage.getItem('taskList'));
}

const EDIT_DIALOG = document.getElementById('taskEditDialog') as HTMLDialogElement;
const EDIT_TITLE_FIELD = document.getElementById('editTitle') as HTMLInputElement;
const EDIT_DESC_FIELD = document.getElementById('editDescription') as HTMLTextAreaElement;
const EDIT_DUE_DATE_FIELD = document.getElementById('editDueDate') as HTMLInputElement;
const EDIT_PRIORITY_FIELD = document.getElementById('editPrioritySelect') as HTMLSelectElement;
const EDIT_ID_FIELD = document.getElementById('editId') as HTMLInputElement;
const ENTRY_TITLE_FIELD = document.getElementById('entryTitle') as HTMLInputElement;
const ENTRY_DESC_FIELD = document.getElementById('entryDescription') as HTMLTextAreaElement;
const ENTRY_DUE_DATE_FIELD = document.getElementById('entryDueDate') as HTMLInputElement;
const ENTRY_PRIORITY_FIELD = document.getElementById('entryPrioritySelect') as HTMLSelectElement;
const PROJECT_SELECT = document.getElementById('projectSelect') as HTMLSelectElement;
const ADD_PROJECT_DIALOG = document.getElementById('addProjectDialog') as HTMLDialogElement;
const OPEN_ADD_PROJECT_BUTTON = document.getElementById('openAddProject') as HTMLButtonElement;
const ADD_PROJECT_NAME = document.getElementById('addProjectName') as HTMLInputElement;

//create DomManipulator and run startup functions
const dm = new DomManipulator(taskList);
dm.buildPriorityOptions();
dm.refreshProjectOptions();
dm.renderList(taskList.getTasks(PROJECT_SELECT.value));

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
				taskList.addTask(newTask);
				updateLocalStorage();
				dm.renderList(taskList.getTasks(PROJECT_SELECT.value));
				ENTRY_TITLE_FIELD.focus();
				ENTRY_TITLE_FIELD.select();
			}
		} 

		//if the edit form was submitted, modify the task existing at the provided index
		else if(event.target.id === 'editForm'){
			let taskToEdit = taskList.getTask(Number.parseInt(EDIT_ID_FIELD.value));
			taskToEdit.title = EDIT_TITLE_FIELD.value;
			taskToEdit.description = EDIT_DESC_FIELD.value
			taskToEdit.dueDate = new Date(EDIT_DUE_DATE_FIELD.value);
			taskToEdit.priority = Number.parseInt(EDIT_PRIORITY_FIELD.value);

			taskList.updateTask(Number.parseInt(EDIT_ID_FIELD.value), taskToEdit);
			updateLocalStorage();
			dm.renderList(taskList.getTasks(PROJECT_SELECT.value));
			EDIT_DIALOG.close();
		}

		//if the add project form was submitted, add new value to project select
		else if(event.target.id === 'addProjectForm'){
			dm.addProject(ADD_PROJECT_NAME.value);
			dm.refreshProjectOptions();
			ADD_PROJECT_DIALOG.close();
		}
	}
});

//when a taskDelete event is fired, remove the task at the defined index
addEventListener('taskDelete', (event: CustomEvent) => {
	taskList.deleteTask(parseInt(event.detail));
	updateLocalStorage();
	dm.renderList(taskList.getTasks(PROJECT_SELECT.value));
});

//when a taskEdit event is fired, populate and show the taskEdit Dialog
addEventListener('taskEdit', (event: CustomEvent) => {
	EDIT_ID_FIELD.value = event.detail.task.id;
	EDIT_TITLE_FIELD.value = event.detail.task.title;
	EDIT_DESC_FIELD.value = event.detail.task.description;
	EDIT_DUE_DATE_FIELD.value = event.detail.task.dueDate.toISOString().substring(0,10);
	EDIT_PRIORITY_FIELD.value = event.detail.task.priority;
	EDIT_DIALOG.showModal();
});
//
//when a taskComplete event is fired, mark the target task as complete
addEventListener('taskComplete', (event: CustomEvent) => {
	taskList.completeTask(parseInt(event.detail));
	updateLocalStorage();
	dm.renderList(taskList.getTasks(PROJECT_SELECT.value));
});

//upon changing projects, filter the displayed tasks to show only those matching the chosen project
PROJECT_SELECT.onchange = () => {
	dm.setSelectedProject(PROJECT_SELECT.value);
	dm.renderList(taskList.getTasks(PROJECT_SELECT.value));
};

function updateLocalStorage() {
	localStorage.setItem('taskList', taskList.stringify());
}

