import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  form = {
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
  };

  submitted = false;
  sent = false;

  onSubmit(): void {
    this.submitted = true;
    if (!this.form.nombre || !this.form.telefono || !this.form.email) return;

    const msg = `Hola! Soy ${this.form.nombre}. ${this.form.mensaje}`;
    window.open(`https://wa.me/5493512345678?text=${encodeURIComponent(msg)}`, '_blank');
    this.sent = true;
    this.form = { nombre: '', telefono: '', email: '', mensaje: '' };
    this.submitted = false;
  }
}
