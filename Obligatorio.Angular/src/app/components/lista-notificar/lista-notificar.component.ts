import { Component } from '@angular/core';
import { ListaNotificarService } from '../../services/lista-notificar.service';

@Component({
  selector: 'app-lista-notificar',
  templateUrl: './lista-notificar.component.html',
  styleUrls: ['./lista-notificar.component.css']
})
export class ListaNotificarComponent {
  personas: any[] = [];

  constructor(private servicio: ListaNotificarService) {}

  ngOnInit() {
    this.obtenerPersonas();
  }

  obtenerPersonas() {
    this.servicio.obtenerPersonasANotificar().subscribe(
      (data) => {
        this.personas = data;
      },
      (error) => {
        console.error('Error al obtener personas:', error);
      }
    );
  }

}
