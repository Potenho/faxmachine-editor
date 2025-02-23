import { Routes } from '@angular/router';
import { EditorComponent } from './view/editor/editor.component';
import { projectGuard } from './guards/project.guard';
import { MyProjectsComponent } from './view/my-projects/my-projects.component';

export const routes: Routes = [
    { path: '', redirectTo: 'my-projects', pathMatch: 'full' },
    { path: 'my-projects', component: MyProjectsComponent },
    { path: 'project/:projectId', component: EditorComponent, canActivateChild: [projectGuard], children: [
        { path: '', redirectTo: 'general-settings', pathMatch: 'full' },
        { path: 'general-settings', component: EditorComponent },
        { path: 'news-script', component: EditorComponent },
        { path: 'teams', component: EditorComponent },
    ]},
];
