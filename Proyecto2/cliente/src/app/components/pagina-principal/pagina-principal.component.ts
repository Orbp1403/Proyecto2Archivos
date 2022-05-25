import { Component, OnInit } from '@angular/core';
import { Login } from '../../Usuario';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
  nickname : string;
  pass : string;
  tipo : number;
  constructor(private loginser : LoginService, private route : Router) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      this.route.navigate(['inicio']);
    }
  }

  async log(event)
  {
    var usuario : Login = {
      user : this.nickname,
      pass : this.pass,
      tipo : this.tipo
    }

    if(this.nickname && this.pass && this.tipo)
    {
      var estado = await this.loginser.VerificarEstado(usuario).toPromise();
      console.log(estado);
      if(Object.keys(estado).length != 0)
      {
        var auxalerta = document.getElementById("idalertanohaycuenta");
        if(auxalerta)
        {
          var padre = auxalerta.parentNode;
          padre.removeChild(auxalerta);
        }
        if(estado[0].ESTADO == 0)
        {
          var auxalerta1 = document.getElementById("estadocero");
          if(!auxalerta1)
          {
            var alerta = document.createElement("div");
            alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
            alerta.setAttribute("role", "alert");
            alerta.setAttribute("id", "estadocero");
            alerta.innerHTML = "La cuenta se encuentra inactiva";
            alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
            var formulario = document.getElementById("divformulario");
            formulario.insertBefore(alerta, document.getElementById("formulario"));
          }
        }
        else
        {
          sessionStorage.setItem('usuario', estado[0].REGISTRO_UNIVERSITARIO);
          sessionStorage.setItem('tipo_user', estado[0].NOMBRE_ROL);
          console.log('entro');
          if(estado[0].NOMBRE_ROL == 'estudiante' || estado[0].NOMBRE_ROL == 'catedratico')
          {
            this.loginser.poneractivo(estado[0].REGISTRO_UNIVERSITARIO, estado[0].NOMBRE_ROL)
          }
          console.log('paso');
          this.route.navigate(['inicio']);
        }
      }
      else
      {
        var auxalerta = document.getElementById("idalertanohaycuenta");
        if(!auxalerta)
        {
          var alerta = document.createElement("div");
          alerta.setAttribute("class", "alert alert-danger alert-dismissible fade show");
          alerta.setAttribute("role", "alert");
          alerta.setAttribute("id", "idalertanohaycuenta");
          alerta.innerHTML = "No existe ninguna cuenta vinculada a ese usuario"
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
          var formulario = document.getElementById("divformulario");
          formulario.insertBefore(alerta, document.getElementById("formulario"));
        }
      }
    }
    else
    {
      var auxalerta = document.getElementById("nohaydatos");
      if(!auxalerta)
      {
        var alerta = document.createElement("div");
        alerta.setAttribute("class", "alert alert-danger alert-dismissible fade show");
        alerta.setAttribute("role", "alert");
        alerta.setAttribute("id", "nohaydatos");
        alerta.innerHTML = "Debe llenar todos los campos para iniciar sesion."
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
        var formulario = document.getElementById("divformulario");
        formulario.insertBefore(alerta, document.getElementById("formulario"));
      }
    }
  }
  
}
