import { Component, OnInit, ɵConsole } from '@angular/core';
import { Registros_Uni, Roles } from 'src/app/Usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FacultadesService } from 'src/app/service/facultades.service';

@Component({
  selector: 'app-mostrarusuario',
  templateUrl: './mostrarusuario.component.html',
  styleUrls: ['./mostrarusuario.component.css']
})
export class MostrarusuarioComponent implements OnInit {

  l_registros : Registros_Uni[];
  l_roles : Roles[];
  registros : number;
  roles : number;

  foto = null;
  nombre = null;
  pass = null;
  correo = null;
  tele = null;
  facultad = null;
  carrera = null;
  tipo = null;

  constructor(private route : Router, private userservice : UsuarioService, private facultadesservice : FacultadesService) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      this.userservice.obtenerRegistros()
      .subscribe(registros1 => {
        this.l_registros = registros1;
      })
    }
    else
    {
      this.route.navigate(['acces_denied']);
    }
  }

  onchange(param)
  {
    this.userservice.obtenerRoles(param)
    .subscribe(roles1 => {
      this.l_roles = roles1;
    })
  }

  async getDatos(event)
  {
    if(this.registros && this.roles)
    {
      var usuario1 = await this.userservice.obtenerUsuario(this.registros, this.roles).toPromise();
      var tipousuario = await this.userservice.obtenerRol(this.roles).toPromise();
      var documento = await this.userservice.obtenerdocumento(this.registros, this.roles).toPromise();
      var carrera = await this.facultadesservice.getCarreraM(parseInt(documento[0].DOCUMENTO_IDENTIFICACION), this.roles).toPromise();
      var facultad = null;
      if(carrera)
      {
        var aux = carrera[0];
        facultad = await this.facultadesservice.getFacultadM(parseInt(aux["ID_FACULTAD"])).toPromise();
      }
      
      console.log(usuario1);
      console.log(documento);
      console.log(carrera);
      console.log(facultad);
      this.nombre = usuario1[0].NOMBRE_USUARIO;
      this.foto = usuario1[0].FOTO;
      this.pass = usuario1[0].CLAVE_ACCESO;
      this.correo = usuario1[0].CORREO;
      this.tele = usuario1[0].TELEFONO;
      if(facultad)
      {
        this.facultad = facultad[0].NOMBRE_FACULTAD;
      }
      if(carrera)
      {
        var auc = carrera[0];
        this.carrera = auc["NOMBRE_CARRERA"];
      }
      this.tipo = tipousuario[0].NOMBRE_ROL;
    }
    else
    {
      var auxalerta = document.getElementById('nohaydatos');
      if(!auxalerta)
      {
        var alerte = document.createElement('div');
        alerte.setAttribute('class', 'alert alert-warning alert-dismissible fade show');
        alerte.setAttribute('role', 'alert');
        alerte.setAttribute('id', 'nohaydatos');
        alerte.innerHTML = "Debe seleccionar los dos datos par mostrar una cuenta."
        alerte.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('divformuario');
        padre.insertBefore(alerte, document.getElementById('formulario'));
      }
    }
  }
}
