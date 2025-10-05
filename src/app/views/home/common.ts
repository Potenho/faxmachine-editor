import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '@env/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-common',
  imports: [RouterOutlet, RouterLink, FontAwesomeModule],
  templateUrl: './common.html',
  styleUrl: './common.scss'
})
export class Common {
  fasCoffee = faCoffee
  appVersion = environment.version;
  githubRepo = environment.githubRepo;
}
