import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      const shell = document.getElementById('app-shell');
      if (shell) {
        shell.classList.add('hide');
        setTimeout(() => shell.remove(), 500);
      }
    });
  }
}
