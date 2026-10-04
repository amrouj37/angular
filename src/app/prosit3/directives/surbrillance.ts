import { Directive, input, signal } from '@angular/core';

@Directive({
  selector: '[appSurbrillance]',
  host: {
    '(mouseenter)': 'survol.set(true)',
    '(mouseleave)': 'survol.set(false)',
    '[style.backgroundColor]': 'survol() ? couleur() : null',
    '[style.transition]': '"background-color .2s"',
  },
})
export class Surbrillance {
  readonly couleur = input('#eef0fb');
  protected readonly survol = signal(false);
}
