import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  whatsapp = environment.whatsappNumber;

  form = {
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
  };

  submitted = false;
  sent = false;
  sending = false;

  onSubmit(): void {
    this.submitted = true;
    if (!this.form.nombre || !this.form.telefono || !this.form.email) return;

    this.sending = true;

    const msg = encodeURIComponent(
      `Hola, soy ${this.form.nombre}.\n` +
      `Teléfono: ${this.form.telefono}\n` +
      `Email: ${this.form.email}\n` +
      (this.form.mensaje ? `Mensaje: ${this.form.mensaje}` : '')
    );

    window.open(`https://wa.me/${this.whatsapp}?text=${msg}`, '_blank');

    this.sent = true;
    this.form = { nombre: '', telefono: '', email: '', mensaje: '' };
    this.submitted = false;
    this.sending = false;
  }
}
