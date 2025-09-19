import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-common',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './common.html',
  styleUrl: './common.scss'
})
export class Common {
  appVersion = environment.version;
  githubRepo = environment.githubRepo;
}
