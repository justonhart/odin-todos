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

/**
 * TaskList keeps an internal map of Ids (numbers) to Tasks, and simplifies filtering tasks by project while still keeping all tasks available in memory
 */
export class TaskList {
	private tasks: Map<number, Task>;

	constructor () {
		this.tasks = new Map<number, Task>();
	}

	/**
	 * Retrieve a task by its assigned id number
	 * @param id - id number of task to retrieve
	 * @returns the Task at the specified id number
	 */
	public getTask(id: number): Task {
		return this.tasks.get(id);
	}

	/**
	 * Retrieve all tasks assigned to a given project
	 * @param project - the project whose tasks we want to retrieve
	 * @returns a Task array containing only the tasks with the specified project
	 */
	public getTasks(project: string): Task[]{
		return Array.from(this.tasks.values()).filter((task: Task) => task.project === project);
	}

	/**
	 * Add a new task to the TaskList. Id is automatically determined by the TaskList, and any provided id will be discarded.
	 * @param task - the task to add to the TaskList
	 */
	public addTask(task: Task): void{
		let nextId = this.getNextId();
		task.id = nextId; 
		this.tasks.set(nextId, task);
	}

	/**
	 * Update task in TaskList with specified id
	 * @param id - id-numbered Task to update
	 * @param task - the task object with modified values
	 */
	public updateTask(id: number, task: Task): void {
		this.tasks.set(id, task);
	}

	/**
	 * Deletes a task from the TaskList, freeing up the id to be used again
	 * @param id - the id number of the task to delete
	 */
	public deleteTask(id: number): void{
		this.tasks.delete(id);
	}

	/**
	 * Gets the next available id number for assignment
	 * @returns nextId - the next available id number
	 */
	private getNextId(): number{
		let nextId = 1;
		const currentKeys = Array.from(this.tasks.keys());
		while(currentKeys.includes(nextId)){
			nextId += 1;
		}
		return nextId;
	}
}
