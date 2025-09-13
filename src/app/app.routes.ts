import { Routes } from '@angular/router';
import { Editor } from './views/editor/editor';
import { Main } from './views/main/main';
import { isEditingGuard } from './common/guards/is-editing/is-editing-guard';
import { NewsScript } from './views/editor/sections/news-script/news-script';
import { Teams } from './views/editor/sections/teams/teams';
import { isNotEditingGuard } from './common/guards/is-not-editing/is-not-editing-guard';

export const routes: Routes = [
  { path: '', component: Main, canActivate: [isNotEditingGuard] }, 
  { path: 'editor', component: Editor, canActivateChild: [isEditingGuard], canActivate: [isEditingGuard], children: [
    { path: '', redirectTo: 'news-script', pathMatch: 'full' },
    { path: 'news-script', component: NewsScript },
    { path: 'teams', component: Teams },
  ] },
  { path: '**', redirectTo: '' }
];
