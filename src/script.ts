import './style.css';
import { Task } from './Task';
import DomManipulator from './domManipulator';

const tasks: Task[] = [];
const EDIT_DIALOG = document.getElementById('taskEditDialog') as HTMLDialogElement;
const EDIT_TITLE_FIELD = document.getElementById('editTitle') as HTMLInputElement;
const EDIT_DESC_FIELD = document.getElementById('editDescription') as HTMLInputElement;
const EDIT_DUE_DATE_FIELD = document.getElementById('editDueDate') as HTMLInputElement;
const EDIT_PRIORITY_FIELD = document.getElementById('editPrioritySelect') as HTMLInputElement;
const EDIT_INDEX_FIELD = document.getElementById('editIndex') as HTMLInputElement;
const ENTRY_TITLE_FIELD = document.getElementById('entryTitle') as HTMLInputElement;
const ENTRY_DESC_FIELD = document.getElementById('entryDescription') as HTMLInputElement;
const ENTRY_DUE_DATE_FIELD = document.getElementById('entryDueDate') as HTMLInputElement;
const ENTRY_PRIORITY_FIELD = document.getElementById('entryPrioritySelect') as HTMLInputElement;

//create DomManipulator and run startup functions
const dm = new DomManipulator();
dm.buildPriorityOptions();

//assign event listener for form
addEventListener('submit', event => {
	event.preventDefault();
	if(event.target instanceof Element){
		if(event.target.id === 'entryForm'){
			const formFields = Array.from(document.querySelectorAll('#entryForm *[id]')) as HTMLInputElement[];
			if(formFields.every( field => field.nodeValue != "")){
				const newTask = new Task(
					ENTRY_TITLE_FIELD.value,
					ENTRY_DESC_FIELD.value,
					new Date(ENTRY_DUE_DATE_FIELD.value),
					Number.parseInt(ENTRY_PRIORITY_FIELD.value)
				);
				console.log(new Date(ENTRY_DUE_DATE_FIELD.value));
				tasks.push(newTask);
				dm.renderList(tasks);
				ENTRY_TITLE_FIELD.focus();
				ENTRY_TITLE_FIELD.select();
			}
		} else if(event.target.id === 'editForm'){
			tasks[Number.parseInt(EDIT_INDEX_FIELD.value)] = new Task(
				EDIT_TITLE_FIELD.value,
				EDIT_DESC_FIELD.value,
				new Date(EDIT_DUE_DATE_FIELD.value),
				Number.parseInt(EDIT_PRIORITY_FIELD.value)
			);
			dm.renderList(tasks);
			EDIT_DIALOG.close();
		}
	}
});

addEventListener('taskDelete', (event: CustomEvent) => {
	console.log(`Task deleted: index ${event.detail}`);
	tasks.splice(parseInt(event.detail), 1);
	dm.renderList(tasks);
});

addEventListener('taskEdit', (event: CustomEvent) => {
	console.log(`Task to edit: index ${event.detail}`);
	EDIT_INDEX_FIELD.value = event.detail.index;
	EDIT_TITLE_FIELD.value = event.detail.task.title;
	EDIT_DESC_FIELD.value = event.detail.task.description;
	EDIT_DUE_DATE_FIELD.value = event.detail.task.dueDate.toISOString().substring(0,10);
	EDIT_PRIORITY_FIELD.value = event.detail.task.priority;
	EDIT_DIALOG.showModal();
});
