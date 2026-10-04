import { Pipe, PipeTransform } from '@angular/core';
import { Conference } from '../../models/conference';

@Pipe({ name: 'placesRestantes' })
export class PlacesRestantesPipe implements PipeTransform {
  transform(conference: Conference): string {
    const restantes = conference.maxParticipants - conference.nbParticipants;
    if (restantes <= 0) return 'Complet';
    return restantes === 1 ? '1 place restante' : `${restantes} places restantes`;
  }
}
