import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { SplatfestEtcParams, SplatfestFileModel, SplatfestNewsScript, SplatfestRotation, SplatfestTeams, SplatfestTime } from './models/splatfest-files-model';
import { ProjectsDBService } from '../db/db.service';
import { SplatfestFileService } from '../splatfest-file/splatfest-file.service';
import { ProjectModel } from '../db/db-tables';

export interface Project {
  id: number;
  name: string;
  splatfestModel: SplatfestFileModel;
}

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _projectsDbService = inject(ProjectsDBService);
  private _splatfestFileService = inject(SplatfestFileService);

  private _projectId = signal<number | null>(null);
  private _projectName = signal<string | null>(null);
  private _splatfestModel = computed<SplatfestFileModel | null>(() => this._makeSplatfestModel());

  private _currentProject = computed<Project | null>(() => {
    const id = this._projectId();
    const name = this._projectName();
    const splatfestModel = this._splatfestModel();

    if (id === null || name === null || splatfestModel === null) {
      return null;
    }

    return { id, name, splatfestModel };
  });

  private _isProjectLoaded = linkedSignal<Project | null, boolean>({
    source: this._currentProject,
    computation: (currentProject, _) => currentProject !== null
  });

  readonly isProjectLoaded = this._isProjectLoaded.asReadonly();
  readonly currentProject = this._currentProject;

  readonly festSections = {
    etcParams: signal<SplatfestEtcParams | null>(null),
    time: signal<SplatfestTime | null>(null),
    stageRotation: signal<SplatfestRotation | null>(null),
    teams: signal<SplatfestTeams | null>(null),
    newsScript: signal<SplatfestNewsScript | null>(null)
  }


  initializeProject(projectId: number, projectName: string, splatfestModel: SplatfestFileModel): void {
    this._projectId.set(projectId);
    this._projectName.set(projectName);
    this.festSections.etcParams.set({
      FestivalId: splatfestModel.FestivalId,
      BattleResultRate: splatfestModel.BattleResultRate,
      SeparateMatchingJP: splatfestModel.SeparateMatchingJP,
      LowPopulationNotJP: splatfestModel.LowPopulationNotJP,
      HideTeamNamesOnBoard: splatfestModel.HideTeamNamesOnBoard,
      Version: splatfestModel.Version
    });

    this.festSections.time.set({
      Time: splatfestModel.Time
    });

    this.festSections.stageRotation.set({
      Rule: splatfestModel.Rule,
      Stages: splatfestModel.Stages
    });

    this.festSections.teams.set({
      Teams: splatfestModel.Teams
    });

    this.festSections.newsScript.set({
      News: splatfestModel.News
    });
  }

  unloadProject(): void {
    this._projectId.set(null);
    this._projectName.set(null);
    this.festSections.etcParams.set(null);
    this.festSections.time.set(null);
    this.festSections.stageRotation.set(null);
    this.festSections.teams.set(null);
    this.festSections.newsScript.set(null);
  }

  saveCurrentProject(): void {
    const currentProject = this._currentProject();

    if (currentProject === null) {
      return;
    }

    const splatfestBytes = this._splatfestFileService.writeSplatfestFile(currentProject.splatfestModel);

    const saveData: ProjectModel = {
      name: currentProject.name,
      teamAlphaColor: currentProject.splatfestModel.Teams[0].Color,
      teamBravoColor: currentProject.splatfestModel.Teams[1].Color,
      teamNeutralColor: currentProject.splatfestModel.Teams[2].Color,
      data: splatfestBytes
    }

    this._projectsDbService.updateProject(currentProject.id, saveData);
  }


  private _makeSplatfestModel(): SplatfestFileModel | null {
    const etcParams = this.festSections.etcParams();
    const time = this.festSections.time();
    const stageRotation = this.festSections.stageRotation();
    const teams = this.festSections.teams();
    const newsScript = this.festSections.newsScript();

    if (etcParams === null || time === null || stageRotation === null || teams === null || newsScript === null) {
      return null;
    }

    return {
      ...etcParams,
      ...time,
      ...stageRotation,
      ...teams,
      ...newsScript
    }
  }
}
