import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { ConferenceApi } from '../../models/conference-api';

@Component({
  selector: 'app-p5-conference-detail',
  imports: [DatePipe, RouterLink],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css',
})
export class ConferenceDetail {
  // :id de la route (withComponentInputBinding)
  readonly id = input.required<string>();

  // la requete se relance toute seule quand id() change
  readonly conference = httpResource<ConferenceApi>(
    () => `http://localhost:3000/conferences/${this.id()}`,
  );
}
