import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Registros_Uni, Roles, UsuarioActualizar, ArchivoImagen } from 'src/app/Usuario';

@Component({
  selector: 'app-modificarusuario',
  templateUrl: './modificarusuario.component.html',
  styleUrls: ['./modificarusuario.component.css']
})
export class ModificarusuarioComponent implements OnInit {

  l_registros : Registros_Uni[];
  l_roles : Roles[];

  nombre : string;
  pass : string;
  correo : string;
  tele  : string;
  facultada : string;
  facultades : number;
  carreraa : string;
  carreras : number;
  archivo : string;
  foto : string;
  archivo1 = {
    nombre : null,
    base64 : null
  }
  selectedfile : File = null;

  datosobtenidos = false;

  roles = null;
  registros = null;
  constructor(private route : Router, private usuarioservice : UsuarioService) { }

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
    this.usuarioservice.obtenerRoles(param)
    .subscribe(roles1 => {
      this.l_roles = roles1;
    })
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

  async getDatos(event)
  {
    if(this.roles && this.registros)
    {
      var usuario = await this.usuarioservice.obtenerUsuario(this.registros, this.roles).toPromise();
      console.log(usuario);
      this.nombre = usuario[0].NOMBRE_USUARIO;   
      this.pass = usuario[0].CLAVE_ACCESO;
      this.correo = usuario[0].CORREO;
      this.tele = usuario[0].TELEFONO;
      this.foto = usuario[0].FOTO;
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

  async setDatos(event)
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
      telefono : parseInt(this.tele),
      archivo : pathimagen
    }

    await this.usuarioservice.actualizarUsuario(this.registros, this.roles, usuarioa).toPromise();
    this.route.navigate(['inicio'])
  }
}
