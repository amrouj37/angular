import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly appName = 'ConfManager';
  readonly slogan = 'Gestion des conférences';
}
