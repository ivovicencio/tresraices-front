import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  scrolled = false;
  mobileOpen = false;

  constructor(
    protected auth: AuthService,
    private router: Router
  ) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled = window.scrollY > 60;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
    this.mobileOpen = false;
  }

  closeMobile(): void {
    this.mobileOpen = false;
  }
}
