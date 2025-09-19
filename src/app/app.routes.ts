import { Routes } from '@angular/router';
import { Editor } from './views/editor/editor';
import { isEditingGuard } from './common/guards/is-editing/is-editing-guard';
import { NewsScript } from './views/editor/sections/news-script/news-script';
import { Teams } from './views/editor/sections/teams/teams';
import { Common } from './views/home/common';
import { Home } from './views/home/home/home';
import { About } from './views/home/about/about';

export const routes: Routes = [
  { path: '', component: Common, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'about', component: About },
  ] }, 
  { path: 'editor', component: Editor, canActivateChild: [isEditingGuard], canActivate: [isEditingGuard], children: [
    { path: '', redirectTo: 'news-script', pathMatch: 'full' },
    { path: 'news-script', component: NewsScript },
    { path: 'teams', component: Teams },
  ] },
  { path: '**', redirectTo: '' }
];
