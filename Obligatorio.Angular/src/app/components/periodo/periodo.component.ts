import { Component } from '@angular/core';
import { PeriodoActualizacionService } from '../periodo-actualizacion.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent {

  constructor (private servicio: PeriodoActualizacionService) {}

  fechaInicio: string = '';
  fechaFin: string = '';

  guardar() {
    if (this.fechaInicio && this.fechaFin) {
      this.servicio.modificarPeriodo(this.fechaInicio, this.fechaFin).subscribe(
        (respuesta) => {
          console.log('Datos guardados exitosamente:', respuesta);
        },
        (error) => {
          console.error('Error al guardar datos:', error);
        }
      );
    } else {
      console.error('Fechas no definidas.');
    }
  }
}