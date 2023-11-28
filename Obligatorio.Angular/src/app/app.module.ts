import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { ActualizarFuncionarioComponent } from './components/actualizar-funcionario/actualizar-funcionario.component';
import { AgendarFechaComponent } from './components/agendar-fecha/agendar-fecha.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AgregarPeriodoActualizacionComponent } from './components/agregar-periodo-actualizacion/agregar-periodo-actualizacion.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ListaNotificarComponent } from './components/lista-notificar/lista-notificar.component';
import { ListaNotificarService } from './services/lista-notificar.service';
import { PeriodoActualizacionService } from './services/periodo-actualizacion.service';


@NgModule({
  declarations: [
    AppComponent,
    ActualizarFuncionarioComponent,
    AgendarFechaComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AgregarPeriodoActualizacionComponent,
    FormularioComponent,
    SignUpComponent, 
    ListaNotificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [ListaNotificarService, PeriodoActualizacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
