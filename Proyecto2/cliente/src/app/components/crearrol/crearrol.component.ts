import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleN } from 'src/app/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-crearrol',
  templateUrl: './crearrol.component.html',
  styleUrls: ['./crearrol.component.css']
})
export class CrearrolComponent implements OnInit {

  nombre = null;
  descripcion = null;

  constructor(private route : Router, private usuarioservice : UsuarioService) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {

    }
    else
    {
      this.route.navigate(['inicio']);
    }
  }

  async guardarrol()
  {
    if(this.descripcion && this.nombre)
    {
      var auxr = await this.usuarioservice.verificarlogin(this.nombre).toPromise();
      if(auxr.length > 0)
      {
        var auxalerta = document.getElementById('nohaydatos1');
        if(!auxalerta)
        {
          var alerta = document.createElement('div');
          alerta.setAttribute('class', 'alert alert-warning alert-dismissible fade show')
          alerta.setAttribute('role', 'alert')
          alerta.setAttribute('id', 'nohaydatos1')
          alerta.innerHTML = "Ya existe un rol con ese nombre.";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('div1');
          padre.insertBefore(alerta, document.getElementById('formulario1'));
        }
      }
      else
      {
        var aux : RoleN = {
          nombre_rol : this.nombre,
          descripcion : this.descripcion
        }
        await this.usuarioservice.crearrol(aux).toPromise();
        this.route.navigate(['inicio']);
      }
    }
    else
    {
      var auxalerta = document.getElementById('nohaydatos');
      if(!auxalerta)
      {
        var alerta = document.createElement('div');
        alerta.setAttribute('class', 'alert alert-warning alert-dismissible fade show')
        alerta.setAttribute('role', 'alert')
        alerta.setAttribute('id', 'nohaydatos')
        alerta.innerHTML = "Debe ingresar todos los datos para crear un nuevo rol.";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerta, document.getElementById('formulario1'));
      }
    }
  }
}
