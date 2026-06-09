import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import emailjs from '@emailjs/browser';

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

  constructor() {
    emailjs.init(environment.emailjs.publicKey);
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (!this.form.nombre || !this.form.telefono || !this.form.email) return;

    this.sending = true;
    try {
      await emailjs.send(environment.emailjs.serviceId, environment.emailjs.templateId, {
        from_name: this.form.nombre,
        from_email: this.form.email,
        telefono: this.form.telefono,
        mensaje: this.form.mensaje || 'Sin mensaje',
        to_email: 'tresraices.87@gmail.com',
      });
      this.sent = true;
      this.form = { nombre: '', telefono: '', email: '', mensaje: '' };
      this.submitted = false;
    } catch {
      alert('Hubo un error al enviar el mensaje. Intentalo de nuevo.');
    } finally {
      this.sending = false;
    }
  }
}
