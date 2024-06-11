import './style.css';
import { Task } from './Task';
import DomManipulator from './domManipulator';

const tasks: Task[] = [];

//create DomManipulator and run startup functions
const dm = new DomManipulator();
dm.buildPriorityOptions();

//assign event listener for form
const formFields = Array.from(document.querySelectorAll('#entryForm *[id]')) as HTMLInputElement[];
addEventListener('submit', event => {
	event.preventDefault();
	if(formFields.every( field => field.nodeValue != "")){
		const newTask = new Task(
			formFields[0].value,
			formFields[1].value,
			new Date(formFields[2].value),
			Number.parseInt(formFields[3].value)
		);
		tasks.push(newTask);
		dm.renderList(tasks);
		formFields[0].focus();
		formFields[0].select();
	}
});
