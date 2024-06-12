/**
 * Represents a task
 */
export class Task{
	public title: string;
	public description: string;
	public dueDate: Date;
	public priority: Priority;
	public project: string;
	constructor(title: string, desc: string, dueDate: Date, priority: Priority, project: string) {
		this.title = title;
		this.description = desc;
		this.dueDate = dueDate;
		this.priority = priority;
		this.project = project;
	}
}

export enum Priority{
	Normal = 1,
	High,
	Highest
}
