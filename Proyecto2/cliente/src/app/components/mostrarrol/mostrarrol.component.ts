import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/Usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-mostrarrol',
  templateUrl: './mostrarrol.component.html',
  styleUrls: ['./mostrarrol.component.css']
})
export class MostrarrolComponent implements OnInit {

  l_registros : Roles[];

  registros = null;
  nombre = null;
  descripcion = null;

  constructor(private route : Router, private usuarioservice : UsuarioService) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      this.usuarioservice.obtenertodoslosroles()
      .subscribe(roles => {
        this.l_registros = roles;
      })
    }
    else
    {
      this.route.navigate(['acces_denied']);
    }
  }

  async getDatos()
  {
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

}
