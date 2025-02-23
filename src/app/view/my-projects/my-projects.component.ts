import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { SizeProp } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-my-projects',
  imports: [FontAwesomeModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent {
  faFile = faFile
}
