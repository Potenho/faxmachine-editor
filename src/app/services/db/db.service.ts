import { inject, Injectable } from '@angular/core';
import { Dexie, Table } from 'dexie';
import { ProjectModel, ProjectTable } from './db-tables';
import { TimeHandlerService } from '../time-handler/time-handler.service';
import { DBRowNotFoundError } from './db-errors';

@Injectable({
	providedIn: 'root'
})
export class ProjectsDBService {

	protected timeHandlerService = inject(TimeHandlerService)

	db: Dexie;
	projectTable: Table<ProjectTable, number>;

	constructor() {
		this.db = new Dexie('FaxMachineDB');
		this.db.version(1).stores({
			Projects: '++id, name'
		});

		this.projectTable = this.db.table('Projects');

		this.db.open();
	}


	/**
	 * Retrieves all projects from the project table.
	 *
	 * @returns {Promise<ProjectTable[]>} A promise that resolves to an array of ProjectTable objects.
	 */
	async getProjects(): Promise<ProjectTable[]> {
		return await this.projectTable.toArray();
	}


	/**
	 * Retrieves a project from the project table by its ID if its integraty is valid. If integraty is not 
	 * valid, the project gets deleted and the method returns undefined.
	 *
	 * @param id - The unique identifier of the project to retrieve.
	 * @returns A promise that resolves to the project with the specified ID, or undefined if no project is found or
	 *          the integraty of the project is bad.
	 */
	async getProject(id: number): Promise<ProjectTable | undefined> {
		const project = await this.projectTable.get(id);

		if (project && !this.checkProjectIntegraty(project, true)) {
			this.deleteProject(id);
			return;
		}

		return project;
	}


	/**
	 * Adds a new project to the project table.
	 *
	 * @param {ProjectModel} projectModel - The model of the project to be added.
	 * @returns {Promise<number>} A promise that resolves to the ID of the newly added project.
	 */
	async addProject(projectModel: ProjectModel): Promise<number> {
		const now = this.timeHandlerService.getNowAsTimestamp();

		const project: ProjectTable = {
			db_created_at: now,
			db_updated_at: now,
			...projectModel
		}

		if (!this.checkProjectIntegraty(project, false)) {
			console.error('[ ProjectsDBService ]: Could not add the new project with name ' + projectModel.name);
			return -1;
		}

		return this.projectTable.add(project);
	}


	/**
	 * Updates an existing project in the database with the provided project model.
	 * 
	 * @param id - The unique identifier of the project to update.
	 * @param projectModel - The new data to update the project with.
	 * @returns A promise that resolves when the project has been successfully updated.
	 * @throws An error if the project with the specified id is not found.
	 */
	async updateProject(id: number, projectModel: ProjectModel): Promise<void> {

		const currentProject = await this.getProject(id);

		if (!currentProject) {
			throw new DBRowNotFoundError('FaxMachineDB', id);
		}

		const now = this.timeHandlerService.getNowAsTimestamp();

		const project: ProjectTable = {
			...currentProject,
			...projectModel,
			db_updated_at: now
		}

		await this.projectTable.update(id, project);
	}


	/**
	 * Deletes a project from the database by its ID.
	 * 
	 * @param id - The ID of the project to be deleted.
	 * @returns A promise that resolves when the project is deleted.
	 * @throws {DBRowNotFoundError} If the project with the specified ID does not exist.
	 */
	async deleteProject(id: number): Promise<void> {
		const currentProject = await this.getProject(id);

		if (!currentProject) {
			throw new DBRowNotFoundError('FaxMachineDB', id);
		}

		return await this.projectTable.delete(id);
	}


	private checkProjectIntegraty(value: any, includesId = false): value is ProjectTable {
		const isObject = typeof value === 'object'

		const isProject = (
			isObject &&
			typeof value.name === 'string' &&
			typeof value.teamAlphaColor === 'string' &&
			typeof value.teamBravoColor === 'string' &&
			typeof value.teamNeutralColor === 'string' &&
			value.data instanceof Uint8Array && 
			typeof value.db_created_at === 'number' &&
			typeof value.db_updated_at === 'number'
		)

		if (includesId && isObject) {
			return isObject && value.id;
		}

		return isProject
	}
}

