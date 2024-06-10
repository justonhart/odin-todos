/**
 * Represents a task
 */
export class Task{
	public title: string;
	public description: string;
	public dueDate: Date;
	public priority: Priority;
	constructor(title: string, desc: string, dueDate: Date, priority: Priority) {
		this.title = title;
		this.description = desc;
		this.dueDate = dueDate;
		this.priority = priority;
	}
}

export enum Priority{
	Normal = 1,
	High,
	Highest
}
