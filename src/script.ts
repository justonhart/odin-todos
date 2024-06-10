import './style.css';
import { Task } from './Task';
import DomManipulator from './domManipulator';

const formFields = Array.from(document.querySelectorAll('#entryForm *[id]')) as HTMLInputElement[];

const tasks: Task[] = [];
const dm = new DomManipulator();
dm.buildPriorityOptions();

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
		formFields[0].focus();
		formFields[0].select();
	}
});
