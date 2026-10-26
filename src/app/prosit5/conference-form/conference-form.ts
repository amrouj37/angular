import { Component, OnInit, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConferenceApiService } from '../../services/conference-api.service';

// meme formulaire pour l'ajout et la modification :
// /api-conferences/ajout          -> pas d'id -> POST
// /api-conferences/:id/modifier   -> id       -> GET pour pré-remplir puis PUT
@Component({
  selector: 'app-p5-conference-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './conference-form.html',
  styleUrl: './conference-form.css',
})
export class ConferenceForm implements OnInit {
  readonly id = input<string>();

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ConferenceApiService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    date: ['', Validators.required],
    place: ['', Validators.required],
    maxParticipants: [50, [Validators.required, Validators.min(1)]],
    nbParticipants: [0, [Validators.required, Validators.min(0)]],
  });

  get modeEdition(): boolean {
    return !!this.id();
  }

  ngOnInit(): void {
    if (this.modeEdition) {
      this.service.getById(Number(this.id())).subscribe((c) => this.form.patchValue(c));
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const retour = () => this.router.navigate(['/api-conferences']);
    if (this.modeEdition) {
      this.service.edit({ id: Number(this.id()), ...this.form.getRawValue() }, retour);
    } else {
      this.service.create(this.form.getRawValue(), retour);
    }
  }
}
