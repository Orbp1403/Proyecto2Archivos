import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { infoFacultad, infoCarrera, infoCiencia } from 'src/app/Facultad';
import { FacultadesService } from 'src/app/service/facultades.service';
import { Roles, UsuarioR, ArchivoImagen, UsuarioRAdmin, UserLog, UsuarioCatedratico } from 'src/app/Usuario';
import { RolesService } from 'src/app/service/roles.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent implements OnInit {

  c_facultades : infoFacultad[];
  l_tipo : Roles[];
  l_carreras : infoCarrera[];
  l_ciencias : infoCiencia[];

  selectedfile : File = null;

  //datos
  personal    : number;
  registro    : number;
  nombre      : string;
  pass        : string;
  correo      : string;
  tele        : number;
  facultades  : string;
  carreras    : string;
  archivo     : string;
  tipou       : string;
  ciencias    : number;
  auxtipo = null;

  archivo1 = {
    nombre : null,
    base64 : null
  }

  constructor(private route : Router, private facultadservice : FacultadesService, private rolservice : RolesService, private usuarioservice : UsuarioService) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      this.facultadservice.getFacultades()
      .subscribe(facultades1 => {
        console.log(facultades1);
        this.c_facultades = facultades1;
      })

      this.rolservice.getRoles()
      .subscribe(roles1 => {
        this.l_tipo = roles1;
      });
    }
    else
    {
      this.route.navigate(['acces_denied']);
    }
  }

  async onchange(param)
  {
    console.log(param);
    this.facultadservice.getCarrera(param)
    .subscribe(carreras1 => {
      console.log(carreras1);
      this.l_carreras = carreras1;
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

  async Obtenerdatos(event)
  {
    console.log('documento personal ', this.personal);
    console.log('registro ', this.registro);
    console.log('nombre ', this.nombre);
    console.log('password ', this.pass);
    console.log('correo ', this.correo);
    console.log('telefono ', this.tele);
    console.log('facultad ', this.facultades);
    console.log('carrera ', this.carreras);
    console.log('archivo ', this.archivo);
    console.log('tipo usuario ', this.tipou);
    var sepuede = await this.usuarioservice.sePuedeInsertar(parseInt(this.tipou, 10), this.registro.toString()).toPromise();
    await console.log("sepuede", sepuede.length);
    if(this.auxtipo && this.auxtipo != 2 && this.auxtipo != 3 && this.auxtipo != 7 && sepuede.length == 0)
    {
      if(this.personal && this.registro && this.nombre && this.pass && this.correo && this.tele && this.tipou)
      {
        var direccionimagen = "images/users/";
        var nombrearchivo = "usuario.png";
        var pathimagen = "";
        if(this.archivo)
        {
          nombrearchivo = this.archivo.replace(/^.*[\\\/]/, "");
          nombrearchivo = this.correo + nombrearchivo;
          var archivo2 : ArchivoImagen = {
            name : nombrearchivo,
            base64 : this.archivo1.base64
          }
          pathimagen = direccionimagen + nombrearchivo;
          await this.usuarioservice.uploadProfileImage(archivo2).toPromise();
        }
        else
        {
          pathimagen = direccionimagen + nombrearchivo;
        }
        const nuevousuario : UsuarioRAdmin = {
          documento_personal : this.personal,
          registro : this.registro,
          nombre : this.nombre,
          password : this.pass,
          correo : this.correo,
          telefono : this.tele,
          archivo : pathimagen,
          tipo : parseInt(this.tipou)
        }
        await this.usuarioservice.insertarUsuarioA(nuevousuario).toPromise();
        this.route.navigate(['inicio']);
      }
      else
      {
        var auxalerta = document.getElementById('nohaydatos');
        if(!auxalerta)
        {
          var alerta = document.createElement('div');
          alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
          alerta.setAttribute("role", "alert");
          alerta.setAttribute("id", "nohaydatos");
          alerta.innerHTML = "Debe ingresar todos los datos para registrar una nueva cuenta.";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('formulario1');
          padre.insertBefore(alerta, document.getElementById('div2'));
        }
      }
    }
    else if(this.auxtipo && (this.auxtipo == 2 || this.auxtipo == 7) && sepuede.length == 0)
    {
      if(this.personal && this.registro && this.registro && this.pass && this.correo && this.tele && this.tipou && this.facultades && this.carreras)
      {
        var direccionimagen = "images/users/";
        var nombrearchivo = "usuario.png";
        var pathimagen = "";
        if(this.archivo)
        {
          nombrearchivo = this.archivo.replace(/^.*[\\\/]/, "");
          nombrearchivo = this.correo + "_" + nombrearchivo;
          var archivo2 : ArchivoImagen = {
            name : nombrearchivo,
            base64 : this.archivo1.base64
          }
          pathimagen = direccionimagen + nombrearchivo;
          await this.usuarioservice.uploadProfileImage(archivo2).toPromise();

        }
        else
        {
          pathimagen = direccionimagen + nombrearchivo;
        }

        const nuevousuario : UsuarioR = {
          documento_personal : this.personal,
          registro : this.registro,
          nombre : this.nombre,
          password : this.pass,
          correo : this.correo,
          telefono : this.tele,
          facultad : parseInt(this.facultades),
          carrera : parseInt(this.carreras),
          archivo : pathimagen,
          tipo : parseInt(this.tipou)
        }

        await this.usuarioservice.insertarUsuario(nuevousuario).toPromise();
        await this.usuarioservice.asignar_Carrera(nuevousuario).toPromise();
        this.route.navigate(['inicio']);
      }
      else
      {
        var auxalerta = document.getElementById('nohaydatos');
        if(!auxalerta)
        {
          var alerta = document.createElement('div');
          alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
          alerta.setAttribute("role", "alert");
          alerta.setAttribute("id", "nohaydatos");
          alerta.innerHTML = "Debe ingresar todos los datos para registrar una nueva cuenta.";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('formulario1');
          padre.insertBefore(alerta, document.getElementById('div2'));
        }
      }
    }
    else if(this.auxtipo && this.auxtipo == 3 && sepuede.length == 0)
    {
      if(this.personal && this.registro && this.registro && this.pass && this.correo && this.tele && this.tipou && this.facultades && this.carreras && this.ciencias)
      {
        var direccionimagen = "images/users/";
        var nombrearchivo = "usuario.png";
        var pathimagen = "";
        if(this.archivo)
        {
          nombrearchivo = this.archivo.replace(/^.*[\\\/]/, "");
          nombrearchivo = this.correo + "_" + nombrearchivo;
          var archivo2 : ArchivoImagen = {
            name : nombrearchivo,
            base64 : this.archivo1.base64
          }
          pathimagen = direccionimagen + nombrearchivo;
          await this.usuarioservice.uploadProfileImage(archivo2).toPromise();

        }
        else
        {
          pathimagen = direccionimagen + nombrearchivo;
        }

        const nuevousuario : UsuarioCatedratico = {
          documento_personal : this.personal,
          registro : this.registro,
          nombre : this.nombre,
          password : this.pass,
          correo : this.correo,
          telefono : this.tele,
          facultad : parseInt(this.facultades),
          carrera : parseInt(this.carreras),
          archivo : pathimagen,
          tipo : parseInt(this.tipou),
          ciencia : this.ciencias
        }

        await this.usuarioservice.insertarUsuarioC(nuevousuario).toPromise();
        await this.usuarioservice.asignarCarreraC(nuevousuario).toPromise();
        await this.usuarioservice.asignarCienciaC(nuevousuario).toPromise();
        this.route.navigate(['inicio']);
      }
      else
      {
        var auxalerta = document.getElementById('nohaydatos');
        if(!auxalerta)
        {
          var alerta = document.createElement('div');
          alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
          alerta.setAttribute("role", "alert");
          alerta.setAttribute("id", "nohaydatos");
          alerta.innerHTML = "Debe ingresar todos los datos para registrar una nueva cuenta.";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('formulario1');
          padre.insertBefore(alerta, document.getElementById('div2'));
        }
      }
    }
    else if(this.auxtipo && (this.auxtipo == 2 || this.auxtipo == 7) && sepuede.length > 0)
    {
      if(this.personal && this.registro && this.registro && this.pass && this.correo && this.tele && this.tipou && this.facultades && this.carreras)
      {
        const nuevousuario : UsuarioR = {
          documento_personal : this.personal,
          registro : this.registro,
          nombre : this.nombre,
          password : this.pass,
          correo : this.correo,
          telefono : this.tele,
          facultad : parseInt(this.facultades),
          carrera : parseInt(this.carreras),
          archivo : pathimagen,
          tipo : parseInt(this.tipou)
        }

        var sepuedecarrera = await this.usuarioservice.verificarasignacionca(nuevousuario).toPromise()
        if(sepuedecarrera.length == 0)
        {
          await this.usuarioservice.asignar_Carrera(nuevousuario).toPromise();
          this.route.navigate(['inicio']);
        }
        else
        {
          var auxalerta = document.getElementById('nohaydatos1');
          if(!auxalerta)
          {
            var alerta = document.createElement('div');
            alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
            alerta.setAttribute("role", "alert");
            alerta.setAttribute("id", "nohaydatos1");
            alerta.innerHTML = "Ya existe una cuenta de ese tipo de usuario asignada a esa carrera.";
            alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
            var padre = document.getElementById('formulario1');
            padre.insertBefore(alerta, document.getElementById('div2'));
          }
        }
      }
      else
      {
        var auxalerta = document.getElementById('nohaydatos');
        if(!auxalerta)
        {
          var alerta = document.createElement('div');
          alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
          alerta.setAttribute("role", "alert");
          alerta.setAttribute("id", "nohaydatos");
          alerta.innerHTML = "Debe ingresar todos los datos para registrar una nueva cuenta.";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('formulario1');
          padre.insertBefore(alerta, document.getElementById('div2'));
        }
      }
    }
    else if(this.auxtipo && this.auxtipo == 3 && sepuede.length > 0)
    {
      if(this.personal && this.registro && this.registro && this.pass && this.correo && this.tele && this.tipou && this.facultades && this.carreras && this.ciencias)
      {
        const nuevousuario : UsuarioCatedratico = {
          documento_personal : this.personal,
          registro : this.registro,
          nombre : this.nombre,
          password : this.pass,
          correo : this.correo,
          telefono : this.tele,
          facultad : parseInt(this.facultades),
          carrera : parseInt(this.carreras),
          archivo : pathimagen,
          tipo : parseInt(this.tipou),
          ciencia : this.ciencias
        }

        const nuevousuario1 : UsuarioR = {
          documento_personal : this.personal,
          registro : this.registro,
          nombre : this.nombre,
          password : this.pass,
          correo : this.correo,
          telefono : this.tele,
          facultad : parseInt(this.facultades),
          carrera : parseInt(this.carreras),
          archivo : pathimagen,
          tipo : parseInt(this.tipou)
        }

        var sepuedecarrera = await this.usuarioservice.verificarasignacionca(nuevousuario1).toPromise()
        if(sepuedecarrera.length == 0)
        {
          await this.usuarioservice.asignar_Carrera(nuevousuario1).toPromise();
          //this.route.navigate(['inicio']);
        }

        var sepuedeciencia = await this.usuarioservice.verificarasignacionci(nuevousuario).toPromise()
        if(sepuedeciencia.length == 0)
        {
          await this.usuarioservice.asignarCiencia(nuevousuario).toPromise()
          this.route.navigate(['inicio']);
        }
        else
        {
          var auxalerta = document.getElementById('nohaydatos1');
          if(!auxalerta)
          {
            var alerta = document.createElement('div');
            alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
            alerta.setAttribute("role", "alert");
            alerta.setAttribute("id", "nohaydatos1");
            alerta.innerHTML = "Ya existe una cuenta de ese tipo de usuario asignada a esa ciencia.";
            alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
            var padre = document.getElementById('formulario1');
            padre.insertBefore(alerta, document.getElementById('div2'));
          }
        }
      }
      else
      {
        var auxalerta = document.getElementById('nohaydatos');
        if(!auxalerta)
        {
          var alerta = document.createElement('div');
          alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
          alerta.setAttribute("role", "alert");
          alerta.setAttribute("id", "nohaydatos");
          alerta.innerHTML = "Debe ingresar todos los datos para registrar una nueva cuenta.";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('formulario1');
          padre.insertBefore(alerta, document.getElementById('div2'));
        }
      }
    }
    else
    {
      var auxalerta = document.getElementById('nohaydatos1');
        if(!auxalerta)
        {
          var alerta = document.createElement('div');
          alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
          alerta.setAttribute("role", "alert");
          alerta.setAttribute("id", "nohaydatos1");
          alerta.innerHTML = "Ya existe una cuenta con esos datos creada.";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('formulario1');
          padre.insertBefore(alerta, document.getElementById('div2'));
        }
    }
  }

  async tipochange(evento)
  {
    this.auxtipo = evento;
  }

  async seleccionarcarr(evento)
  {
    this.facultadservice.getCiencias(evento)
    .subscribe(ciencias1 => {
      this.l_ciencias = ciencias1;
    })
  }
}
