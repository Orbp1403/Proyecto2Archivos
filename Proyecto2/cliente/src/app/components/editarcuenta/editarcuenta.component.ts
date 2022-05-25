import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FacultadesService } from 'src/app/service/facultades.service';
import { ArchivoImagen, UsuarioActualizar } from 'src/app/Usuario';

@Component({
  selector: 'app-editarcuenta',
  templateUrl: './editarcuenta.component.html',
  styleUrls: ['./editarcuenta.component.css']
})
export class EditarcuentaComponent implements OnInit {

  registro_uni = null;
  rol = null; 

  documento = null;
  foto = null;
  registro = null;
  nombre = null;
  correo = null;
  telefono = null;
  ccarreras = null;
  cfacultades = null;
  pass = null;
  archivo = null;
  auxidrol = null;
  selectedfile : File = null;
  archivo1 = {
    nombre  : null,
    base64  : null
  }

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
      this.auxidrol = id_rol[0].ID_ROL;
      var auxcarreras = await this.facultadservice.getCarreraM(aux[0].DOCUMENTO_IDENTIFICACION, id_rol[0].ID_ROL).toPromise();

      this.foto = aux[0].FOTO
//      this.documento = aux[0].DOCUMENTO_IDENTIFICACION
      this.registro = aux[0].REGISTRO_UNIVERSITARIO
      this.nombre = aux[0].NOMBRE_USUARIO
      this.correo = aux[0].CORREO
      this.telefono = aux[0].TELEFONO
      this.pass = aux[0].CLAVE_ACCESO
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

  onFileSelected(event)
  {
    this.selectedfile = event.target.files[0];
    if(this.selectedfile)
    {
      var reader = new FileReader();
      reader.onload = this._handelReaderLoaded.bind(this);
      reader.readAsBinaryString(this.selectedfile);
      this.archivo1.nombre = this.selectedfile.name;
    }
  }

  _handelReaderLoaded(readerEvent){
    var binarString = readerEvent.target.result;
    this.archivo1.base64 = btoa(binarString);  
  }

  async getBase64(file){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
      console.log(reader.result);
      return reader.result;
    };
    reader.onerror = function(err){
      console.log('Error ', err);
    };
  }

  async actualizarcuenta()
  {
    var pathimagen = this.foto;
    if(this.archivo)
    {
      var nombrearchivo = this.archivo.replace(/^.*[\\\/]/, "");
      nombrearchivo = this.correo + "_" + nombrearchivo;
      var archivo2 : ArchivoImagen = {
        name : nombrearchivo,
        base64 : this.archivo1.base64
      }
      pathimagen = "images/users/" + nombrearchivo;
      await this.usuarioservice.uploadProfileImage(archivo2).toPromise();
    }
    var usuarioa : UsuarioActualizar = {
      nombre : this.nombre,
      pass : this.pass,
      correo : this.correo,
      telefono : parseInt(this.telefono),
      archivo : pathimagen
    }
    console.log(this.registro, this.auxidrol);
    await this.usuarioservice.actualizarUsuario(parseInt(this.registro), parseInt(this.auxidrol), usuarioa).toPromise();
    this.route.navigate(['cuenta'])
  }
}
