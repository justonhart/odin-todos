/**
 * Represents a task
 */
export class Task{
	public title: string;
	public description: string;
	public dueDate: Date;
	public priority: Priority;
	public project: string;
	public id: number;
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

export class TaskList {
	private tasks: Map<number, Task>;

	constructor () {
		this.tasks = new Map<number, Task>();
	}

	public getTask(id: number): Task {
		return this.tasks.get(id);
	}

	public getTasks(project: string): Task[]{
		return Array.from(this.tasks.values()).filter((task: Task) => task.project === project);
	}

	public addTask(task: Task): void{
		let nextId = this.getNextId();
		task.id = nextId; 
		this.tasks.set(nextId, task);
	}

	public updateTask(id: number, task: Task): void {
		this.tasks.set(id, task);
	}

	public deleteTask(id: number): void{
		this.tasks.delete(id);
	}

	private getNextId(): number{
		let nextId = 1;
		const currentKeys = Array.from(this.tasks.keys());
		while(currentKeys.includes(nextId)){
			nextId += 1;
		}
		return nextId;
	}
}
