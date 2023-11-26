import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ActualizarFuncionarioComponent } from './components/actualizar-funcionario/actualizar-funcionario.component';
import { AgregarPeriodoActualizacionComponent } from './components/agregar-periodo-actualizacion/agregar-periodo-actualizacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/logIn', pathMatch: 'full'},
  { path: 'formulario', component: FormularioComponent },
  { path: 'logIn', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'actualizarDatos', component: ActualizarFuncionarioComponent },
  { path: 'agregarPeriodo', component: AgregarPeriodoActualizacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
