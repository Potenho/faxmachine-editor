import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateChildFn, Router } from '@angular/router';
import { ProjectsDBService } from '../services/db/db.service';
import { EditorService } from '../services/editor/editor.service';
import { SplatfestFileService } from '../services/splatfest-file/splatfest-file.service';
import { SplatfestFileModel } from '../services/editor/models/splatfest-files-model';

export const projectGuard: CanActivateChildFn = async (childRoute, _) => {
  const router = inject(Router);
  const projectsDbService = inject(ProjectsDBService);
  const editorService = inject(EditorService);
  const splatfestFileService = inject(SplatfestFileService);


  const projectId = childRoute.parent?.paramMap.get('projectId');

  if (!projectId || isNaN(Number(projectId))) {
    router.navigate(['']);
    return false;
  }

  const project = await projectsDbService.getProject(Number(projectId));

  if (!project) {
    router.navigate(['']);
    return false;
  }

  if (!editorService.isProjectLoaded()) {
    let data: SplatfestFileModel;

    try {
      data = splatfestFileService.parseSplatfestFile(project.data);
    
    } catch(error) {
      router.navigate(['']);
      return false;
    
    }

    editorService.initializeProject(project.id!, project.name, data);
  }

  return true;
};
