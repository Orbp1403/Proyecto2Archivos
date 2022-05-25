import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/Usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-eliminarrol',
  templateUrl: './eliminarrol.component.html',
  styleUrls: ['./eliminarrol.component.css']
})
export class EliminarrolComponent implements OnInit {

  l_registros : Roles[];

  registros = null;

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

  async getDatos()
  {
    if(this.registros)
    {
      await this.usuarioservice.deleterol(this.registros).toPromise();
      this.route.navigate(['inicio']);
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
        alerta.innerHTML = "Debe seleccionar un rol para eliminarlo.";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerta, document.getElementById('formulario1'));
      }
    }
  }
}
