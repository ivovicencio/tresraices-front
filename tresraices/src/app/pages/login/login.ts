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
  success = '';

  loginData = { email: '', password: '' };
  loginErrors = { email: '', password: '' };
  loginSubmitted = false;

  registerData = { username: '', nombre: '', apellido: '', telefono: '', email: '', password: '' };
  registerErrors = { username: '', nombre: '', apellido: '', telefono: '', email: '', password: '' };
  registerSubmitted = false;

  private readonly emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly phoneRe = /^(\+?\d{1,3})?[\s\-.]?\(?\d{2,4}\)?[\s\-.]?\d{2,4}[\s\-.]?\d{2,4}$/;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  toggleMode(): void {
    this.isRegister = !this.isRegister;
    this.error = '';
    this.success = '';
    this.loginSubmitted = false;
    this.registerSubmitted = false;
  }

  private validarLogin(): boolean {
    let ok = true;
    this.loginErrors = { email: '', password: '' };

    if (!this.loginData.email) {
      this.loginErrors.email = 'Requerido';
      ok = false;
    }

    if (!this.loginData.password) {
      this.loginErrors.password = 'Requerido';
      ok = false;
    } else if (this.loginData.password.length < 8) {
      this.loginErrors.password = 'Mínimo 8 caracteres';
      ok = false;
    }

    return ok;
  }

  private validarRegister(): boolean {
    let ok = true;
    this.registerErrors = { username: '', nombre: '', apellido: '', telefono: '', email: '', password: '' };

    if (!this.registerData.username || this.registerData.username.trim().length < 3) {
      this.registerErrors.username = this.registerData.username ? 'Mínimo 3 caracteres' : 'Requerido';
      ok = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(this.registerData.username)) {
      this.registerErrors.username = 'Solo letras, números y _';
      ok = false;
    }

    if (!this.registerData.nombre || this.registerData.nombre.trim().length < 2) {
      this.registerErrors.nombre = this.registerData.nombre ? 'Mínimo 2 caracteres' : 'Requerido';
      ok = false;
    }

    if (!this.registerData.apellido || this.registerData.apellido.trim().length < 2) {
      this.registerErrors.apellido = this.registerData.apellido ? 'Mínimo 2 caracteres' : 'Requerido';
      ok = false;
    }

    if (!this.registerData.telefono) {
      this.registerErrors.telefono = 'Requerido';
      ok = false;
    } else if (!this.phoneRe.test(this.registerData.telefono.trim())) {
      this.registerErrors.telefono = 'Formato inválido (ej: 3884465970)';
      ok = false;
    }

    if (!this.registerData.email) {
      this.registerErrors.email = 'Requerido';
      ok = false;
    } else if (!this.emailRe.test(this.registerData.email.trim())) {
      this.registerErrors.email = 'Email inválido';
      ok = false;
    }

    if (!this.registerData.password) {
      this.registerErrors.password = 'Requerido';
      ok = false;
    } else if (this.registerData.password.length < 8) {
      this.registerErrors.password = 'Mínimo 8 caracteres';
      ok = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.registerData.password)) {
      this.registerErrors.password = 'Debe tener mayúscula, minúscula y número';
      ok = false;
    }

    return ok;
  }

  onLogin(): void {
    this.loginSubmitted = true;
    if (!this.validarLogin()) return;

    this.loading = true;
    this.error = '';
    this.auth.login(this.loginData).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === '1') {
          this.router.navigate(['/']);
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
    this.registerSubmitted = true;
    if (!this.validarRegister()) return;

    this.loading = true;
    this.error = '';
    this.success = '';
    this.auth.register(this.registerData).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === '1') {
          this.success = '¡Registro exitoso! Bienvenido a Tres Raíces.';
          setTimeout(() => this.router.navigate(['/']), 1500);
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
