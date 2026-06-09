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
    tipo: '',
    lote: '',
    mensaje: '',
  };

  submitted = false;
  sent = false;
  sending = false;

  onSubmit(): void {
    this.submitted = true;
    if (!this.form.nombre || !this.form.telefono || !this.form.email) return;

    this.sending = true;

    const tipoTexto = this.form.tipo === 'lotes' ? 'Lotes' : this.form.tipo === 'construccion' ? 'Construcción' : '';

    const parts = [
      `Hola, soy ${this.form.nombre}.`,
      `Teléfono: ${this.form.telefono}`,
      `Email: ${this.form.email}`,
    ];
    if (tipoTexto) parts.push(`Consulta sobre: ${tipoTexto}`);
    if (this.form.lote) parts.push(`Lote de interés: ${this.form.lote}`);
    if (this.form.mensaje) parts.push(`Mensaje: ${this.form.mensaje}`);

    const msg = encodeURIComponent(parts.join('\n'));

    window.open(`https://wa.me/${this.whatsapp}?text=${msg}`, '_blank');

    this.sent = true;
    this.form = { nombre: '', telefono: '', email: '', tipo: '', lote: '', mensaje: '' };
    this.submitted = false;
    this.sending = false;
  }
}
