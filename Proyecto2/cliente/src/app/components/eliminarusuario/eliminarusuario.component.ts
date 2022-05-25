import { Component, OnInit } from '@angular/core';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { Registros_Uni, Roles } from 'src/app/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { RolesService } from 'src/app/service/roles.service';
import { FacultadesService } from 'src/app/service/facultades.service';
import { infoCarreraT, infoCiencia } from 'src/app/Facultad';

@Component({
  selector: 'app-eliminarusuario',
  templateUrl: './eliminarusuario.component.html',
  styleUrls: ['./eliminarusuario.component.css']
})
export class EliminarusuarioComponent implements OnInit {

  l_registros : Registros_Uni[];
  l_roles : Roles[];
  l_carreras : infoCarreraT[];
  l_ciencias : infoCiencia[];

  registros = null;
  roles = null;
  carreras = null;
  esestudiante = false
  escatedratico = false;
  ciencias = null;

  constructor(private route : Router, private usuarioservice : UsuarioService, private facultadservice : FacultadesService) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      this.usuarioservice.obtenerRegistros()
      .subscribe(registros1 => {
        this.l_registros = registros1;
      })
    }
    else
    {
      this.route.navigate(['acces_denied']);
    }
  }


  async onchange(param)
  {
    this.escatedratico = false;
    this.esestudiante = false;
    this.roles = null;
    this.usuarioservice.obtenerRoles(param)
    .subscribe(roles1 => {
      this.l_roles = roles1;
    })
  }

  async ActualizarCuenta(event)
  {
    if(this.registros && this.roles)
    {
      if(this.roles == 2)
      {
        var docu = await this.usuarioservice.obtenerdocumento(this.registros, this.roles).toPromise();
        await this.usuarioservice.eliminarasignacionc(parseInt(docu[0].DOCUMENTO_IDENTIFICACION), this.roles, this.carreras).toPromise();
        var verificarasig = await this.usuarioservice.verificarasignacionact(parseInt(docu[0].DOCUMENTO_IDENTIFICACION), this.roles).toPromise();
        if(verificarasig.length == 0)
        {
          await this.usuarioservice.eliminarUsuario(this.registros, this.roles).toPromise();
        }
      }
      else if(this.roles == 3)
      {
        var docu = await this.usuarioservice.obtenerdocumento(this.registros, this.roles).toPromise();
        await this.usuarioservice.eliminarasignacionci(docu[0].DOCUMENTO_IDENTIFICACION, this.ciencias, this.roles).toPromise();
        await this.usuarioservice.eliminarasignacionc(parseInt(docu[0].DOCUMENTO_IDENTIFICACION),this.roles, this.carreras).toPromise();
        var verificarasigcar = await this.usuarioservice.verificarasignacionact(parseInt(docu[0].DOCUMENTO_IDENTIFICACION), this.roles).toPromise();
        var verificarasigci = await this.usuarioservice.verificarasignacioncie(docu[0].DOCUMENTO_IDENTIFICACION, this.roles).toPromise();
        if(verificarasigcar.length == 0 && verificarasigci.length == 0)
        {
          await this.usuarioservice.eliminarUsuario(this.registros, this.roles).toPromise();
        }
      }
      else
      {
        await this.usuarioservice.eliminarUsuario(this.registros, this.roles).toPromise();
      }
      this.route.navigate(['inicio']);
    }
    else
    {
      var auxalerta = document.getElementById('nohaydatos')
      if(!auxalerta){
        var alerta = document.createElement('div');
        alerta.setAttribute("class", "alert alert-danger alert-dismissible fade show");
        alerta.setAttribute("role", "alert");
        alerta.setAttribute("id", "nohaydatos");
        alerta.innerHTML = "Debe seleccionar los dos datos para eliminar una cuenta.";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('divformulario');
        padre.insertBefore(alerta, document.getElementById('formulario'));
      }
    }
  }

  async onchange2(param)
  {
    var docu = await this.usuarioservice.obtenerdocumento(this.registros, this.roles).toPromise();
      console.log("docu", docu[0].DOCUMENTO_IDENTIFICACION)
    this.facultadservice.getCienciasM(param, docu[0].DOCUMENTO_IDENTIFICACION)
    .subscribe(ciencias1 => {
      this.l_ciencias = ciencias1;
    })
  }

  async onchange1(param)
  {
    this.carreras = null;
    console.log(param);
    if(param == 2)
    {
      this.esestudiante = true;
      this.escatedratico = false;
      var docu = await this.usuarioservice.obtenerdocumento(this.registros, this.roles).toPromise();
      console.log("docu", docu[0].DOCUMENTO_IDENTIFICACION)
      this.facultadservice.getCarreraM(parseInt(docu[0].DOCUMENTO_IDENTIFICACION), this.roles)
      .subscribe(carreras1 => {
        this.l_carreras = carreras1
        console.log(carreras1);
      })
      console.log(docu);
    }
    else if(param == 3)
    {
      this.escatedratico = true;
      this.esestudiante = false;
      var docu = await this.usuarioservice.obtenerdocumento(this.registros, this.roles).toPromise();
      this.facultadservice.getCarreraM(parseInt(docu[0].DOCUMENTO_IDENTIFICACION), this.roles)
      .subscribe(carreras1 => {
        this.l_carreras = carreras1
      })
    }
    else{
      this.esestudiante = false;
      this.escatedratico = false;
    }
  }
}
