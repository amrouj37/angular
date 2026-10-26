import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConferenceApiService } from '../../services/conference-api.service';

@Component({
  selector: 'app-p5-conference-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList implements OnInit {
  readonly service = inject(ConferenceApiService);

  ngOnInit(): void {
    this.service.load();
  }

  supprimer(id: number | undefined): void {
    if (id !== undefined && confirm('Supprimer cette conférence ?')) {
      this.service.remove(id);
    }
  }
}
