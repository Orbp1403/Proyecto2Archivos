import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles, RolG } from 'src/app/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-modificarrol',
  templateUrl: './modificarrol.component.html',
  styleUrls: ['./modificarrol.component.css']
})
export class ModificarrolComponent implements OnInit {

  l_registros : Roles[];

  registros = null;
  nombre = null;
  descripcion = null;
  constructor(private route : Router, private usuarioservice : UsuarioService) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      this.usuarioservice.obtenerTodoslosroles()
      .subscribe(roles => {
        this.l_registros = roles;
      })
    }
    else
    {
      this.route.navigate(['acces_denied']);
    }
  }

  async getDatos(){
    if(this.registros)
    {
      var auxrol = await this.usuarioservice.obtenerRole(this.registros).toPromise();
      this.nombre = auxrol[0].NOMBRE_ROL;
      this.descripcion = auxrol[0].DESCRIPCION;
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
        alerta.innerHTML = "Debe seleccionar un rol para modificarlo.";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerta, document.getElementById('formulario1'));
      }
    }
  }

  async setDatos()
  {
    if(this.registros, this.nombre, this.descripcion)
    {
      var auxrol = await this.usuarioservice.verificarlogin1(this.nombre, this.registros).toPromise();
      if(auxrol.length > 0)
      {
        var auxalerta = document.getElementById('nohaydatos2');
        if(!auxalerta)
        {
          var alerta = document.createElement('div');
          alerta.setAttribute('class', 'alert alert-warning alert-dismissible fade show')
          alerta.setAttribute('role', 'alert')
          alerta.setAttribute('id', 'nohaydatos2')
          alerta.innerHTML = "Ya existe un rol con ese nombre creado.";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('div1');
          padre.insertBefore(alerta, document.getElementById('formulario1'));
        }
      }
      else
      {
        var rol : RolG = {
          id_rol : this.registros,
          nombre_rol : this.nombre,
          descripcion : this.descripcion
        }
        await this.usuarioservice.updateRol(rol).toPromise();
        this.route.navigate(['inicio']);
      }
    }
    else
    {
      var auxalerta = document.getElementById('nohaydatos1');
      if(!auxalerta)
      {
        var alerta = document.createElement('div');
        alerta.setAttribute('class', 'alert alert-warning alert-dismissible fade show')
        alerta.setAttribute('role', 'alert')
        alerta.setAttribute('id', 'nohaydatos1')
        alerta.innerHTML = "No hay datos suficientes para modificar el rol.";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerta, document.getElementById('formulario1'));
      }
    }
  }
}
