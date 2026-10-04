import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './prosit1/header/header';
import { Navbar } from './prosit1/navbar/navbar';
import { Footer } from './prosit1/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
