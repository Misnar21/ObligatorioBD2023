import { Component } from '@angular/core';
import { LogInService } from '../../services/log-in.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private loginService: LogInService, private router: Router) {}

  user = "";
  password = "";

  userExist = true

  login() {
    const userCredentials = { id: this.user, password: this.password };
    this.loginService.login(userCredentials).subscribe(
      (data) => {
        if (data && data.token) {
        
          this.loginService.setToken(data.token);
          this.loginService.setUserData(this.user);

          if(data.rol != undefined && data.rol == "Administrador"){
            this.router.navigateByUrl('/agregarPeriodo');
          }

          if(data.rol != undefined && data.rol == "Usuario"){
            this.router.navigateByUrl('/actualizarDatos');
          }
        }
      },
      (error) => {
        if (error.status === 401) {
          this.userExist = false
          this.user = ""
          this.password = ""
          alert("Error: contraseña o usario incorrecto");
        }
        console.log(error);
      }
    );
  }

  logout() {
    this.loginService.logOut();
  }

}
