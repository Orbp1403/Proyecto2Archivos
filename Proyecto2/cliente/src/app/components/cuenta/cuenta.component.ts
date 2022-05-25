import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { infoCarreraT } from 'src/app/Facultad';
import { FacultadesService } from 'src/app/service/facultades.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  registro_uni = null;
  rol = null; 

  documento = null;
  foto = null;
  registro = null;
  nombre = null;
  correo = null;
  telefono = null;
  carreras : infoCarreraT[];
  ccarreras = null;
  cfacultades = null;

  constructor(private route : Router, private usuarioservice : UsuarioService, private facultadservice : FacultadesService) { }

  async ngOnInit() {
    if(sessionStorage.length > 0)
    {
      for(var i = 0; i < sessionStorage.length; i++)
      {
        if(sessionStorage.key(i) == 'usuario')
        {
          console.log(sessionStorage.getItem('usuario'))
          this.registro_uni = sessionStorage.getItem('usuario');
        }
        else if(sessionStorage.key(i) == 'tipo_user')
        {
          console.log(sessionStorage.getItem('tipo_user'))
          this.rol = sessionStorage.getItem('tipo_user');
        }
      }

      var aux = await this.usuarioservice.getDatosCuenta(this.registro_uni, this.rol).toPromise();
      var id_rol = await this.usuarioservice.getID_ROL(this.rol).toPromise();
      console.log(aux, id_rol);
      var auxcarreras = await this.facultadservice.getCarreraM(aux[0].DOCUMENTO_IDENTIFICACION, id_rol[0].ID_ROL).toPromise();

      this.foto = aux[0].FOTO
      this.documento = aux[0].DOCUMENTO_IDENTIFICACION
      this.registro = aux[0].REGISTRO_UNIVERSITARIO
      this.nombre = aux[0].NOMBRE_USUARIO
      this.correo = aux[0].CORREO
      this.telefono = aux[0].TELEFONO
      for(var i = 0; i < auxcarreras.length; i++)
      {
        var auxcarrera = auxcarreras[i];
        console.log(auxcarrera);
        if(this.ccarreras == null)
        {
          this.ccarreras = auxcarrera['NOMBRE_CARRERA'];
          var auxf = await this.facultadservice.getFacultadM(auxcarrera['ID_FACULTAD']).toPromise();
          console.log(auxf);
          this.cfacultades = auxf[0].NOMBRE_FACULTAD;
        }
        else
        {
          this.ccarreras += auxcarrera['NOMBRE_CARRERA'];
          var auxf = await this.facultadservice.getFacultadM(auxcarrera['ID_FACULTAD']).toPromise();
          console.log(auxf);
          var contenidofac = this.cfacultades;
          if(!contenidofac.includes(auxf[0].NOMBRE_FACULTAD)){
            this.cfacultades += ", " + auxf[0].NOMBRE_FACULTAD
          }
        }
        if(i != auxcarreras.length -1)
        {
          this.ccarreras += ", ";
        }
      }
    }
    else
    {
      this.route.navigate(['acces_denied']);
    }
  }

}
