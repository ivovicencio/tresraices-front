import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isRegister = false;
  loading = false;
  error = '';

  loginData = { email: '', password: '' };
  registerData = { nombre: '', telefono: '', email: '', password: '' };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  toggleMode(): void {
    this.isRegister = !this.isRegister;
    this.error = '';
  }

  onLogin(): void {
    this.loading = true;
    this.error = '';
    this.auth.login(this.loginData).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === '1') {
          this.router.navigate(['/admin/lotes']);
        } else {
          this.error = res.msg;
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.msg || 'Error al iniciar sesión';
      },
    });
  }

  onRegister(): void {
    this.loading = true;
    this.error = '';
    this.auth.register(this.registerData).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === '1') {
          this.router.navigate(['/admin/lotes']);
        } else {
          this.error = res.msg;
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.msg || 'Error al registrar';
      },
    });
  }
}
