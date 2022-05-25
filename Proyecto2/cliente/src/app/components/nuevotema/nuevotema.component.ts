import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { infoCiencia, infoFacultad, infoCarrera } from 'src/app/Facultad';
import { FacultadesService } from 'src/app/service/facultades.service';
import { UserLog, ArchivoImagen } from 'src/app/Usuario';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TemaService } from 'src/app/service/tema.service';
import { Tema } from 'src/app/Tema';
import { UsuarioService } from 'src/app/service/usuario.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-nuevotema',
  templateUrl: './nuevotema.component.html',
  styleUrls: ['./nuevotema.component.css']
})
export class NuevotemaComponent implements OnInit {

  l_ciencias : infoCiencia[];
  l_facultades : infoFacultad[];
  l_carreras  : infoCarrera[];
  l_imagenes : string[] = [];

  listaciencia : infoCiencia[] = [];
  listafacultad : infoFacultad[] = [];
  listacarrera : infoCarrera[] = [];
  listaimagenes : ArchivoImagen[] = [];

  ciencias = null;
  carreras = null;
  facultades = null;
  cienciase = null;
  carrerase = null;
  facultadese = null;
  imagenese = null;

  nombre = null;
  descripcion = null;
  archivo = null;

  selectedfile : File = null;
  archivo1 = {
    nombre : null,
    base64 : null
  }

  constructor(private route : Router, private facultadservice : FacultadesService, private temaservice : TemaService, private usuarioservice : UsuarioService) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      this.facultadservice.getTodaslasciencias()
      .subscribe(ciencias1 => {
        this.l_ciencias = ciencias1;
      })

      this.facultadservice.getFacultades()
      .subscribe(facultades1 => {
        this.l_facultades = facultades1;
      })

      this.facultadservice.getCarreras()
      .subscribe(carreras1 => {
        this.l_carreras = carreras1;
      })
    }
    else
    {
      this.route.navigate(['acces_denied']);
    }
  }

  async AgregarCiencia()
  {
    if(this.ciencias)
    {
      var aux = await this.facultadservice.getDatoCiencia(this.ciencias).toPromise();
      var existe = false;
      for(var i = 0; i < this.listaciencia.length; i++)
      {
        var auxciencia = this.listaciencia[i];
        if(auxciencia[0].ID_CIENCIA == this.ciencias)
        {
          existe = true;
          break;
        }
      }
      if(!existe)
      {
        this.listaciencia.push(aux);
        var divciencia = document.getElementById('listaciencias');
        var liciencia = document.createElement('li');
        liciencia.setAttribute('class', "list-group-item");
        liciencia.setAttribute('id', aux[0].NOMBRE_CIENCIA);
        liciencia.innerHTML = aux[0].NOMBRE_CIENCIA
        //liciencia.innerHTML += '<button class="btn btn-danger" (click)="AgregarCiencia()">Eliminar</button>'
        divciencia.append(liciencia);
        console.log(aux[0].ID_CIENCIA);
        this.ciencias = null;
      }
      else
      {this.ciencias = null}
    }
    else
    {
      var auxalerta = document.getElementById('nohayciencia');
      if(!auxalerta)
      {
        var alerte = document.createElement('div');
        alerte.setAttribute('class', 'alert alert-warning alert-dismissible fade show');
        alerte.setAttribute('role', 'alert');
        alerte.setAttribute('id', 'nohayciencia');
        alerte.innerHTML = "Debe seleccionar una ciencia para agregarla."
        alerte.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('formulario1');
        padre.insertBefore(alerte, document.getElementById('ciencias'));
      }
    }
  }

  async EliminarCiencia()
  {
    if(this.cienciase)
    {
      var aux = await this.facultadservice.getDatoCiencia(this.ciencias).toPromise();
      var existe = false;
      var pos;
      for(var i =0; i < this.listaciencia.length; i++)
      {
        var auxciencia = this.listaciencia[i];
        if(auxciencia[0].ID_CIENCIA == this.cienciase)
        {
          pos = i;
          existe = true;
        }
      }

      var auxciencia = this.listaciencia[pos];
      var divciencia = document.getElementById('listaciencias');
      divciencia.removeChild(document.getElementById(auxciencia[0].NOMBRE_CIENCIA))
      this.listaciencia.splice(pos, 1);
      console.log('listaciencia', this.listaciencia);
      this.cienciase = null;
    }
  }

  async EliminarCarrera()
  {
    if(this.carrerase)
    {
      var pos;
      for(var i = 0; i < this.listacarrera.length; i++)
      {
        var auxcarrera = this.listacarrera[i];
        if(auxcarrera[0].ID_CARRERA == this.carrerase)
        {
          pos = i
          break;
        }
      }

      var auxcarrera = this.listacarrera[pos];
      var divcarrera = document.getElementById('listacarreras');
      divcarrera.removeChild(document.getElementById(auxcarrera[0].NOMBRE_CARRERA));
      this.listacarrera.splice(pos, 1);
      this.carrerase = null;
    }
  }

  async EliminarFacultad()
  {
    if(this.facultadese)
    {
      var pos
      for(var i = 0; i < this.listafacultad.length; i++)
      {
        var auxfacultad = this.listafacultad[i];
        if(auxfacultad[0].ID_FACULTAD == this.facultadese)
        {
          pos = i;
          break;
        }
      }

      var auxfacultad = this.listafacultad[pos];
      var divfacultad = document.getElementById('listafacultades')
      divfacultad.removeChild(document.getElementById(auxfacultad[0].NOMBRE_FACULTAD))
      this.listafacultad.splice(pos, 1);
      this.facultadese = null;
    }
  }
  async AgregarCarrera()
  {
    if(this.carreras)
    {
      var auxdato = await this.facultadservice.getdatocarrera(this.carreras).toPromise();
      var existe = false;
      for(var i = 0; i < this.listacarrera.length; i++)
      {
        var auxcarrera = this.listacarrera[i];
        if(auxcarrera[0].ID_CARRERA == this.carreras){
          existe = true;
          break;
        }
      }
      if(!existe)
      {
        this.listacarrera.push(auxdato);
        var divciencia = document.getElementById('listacarreras');
        var liciencia = document.createElement('li');
        liciencia.setAttribute('class', "list-group-item");
        liciencia.setAttribute('id', auxdato[0].NOMBRE_CARRERA);
        liciencia.innerHTML = auxdato[0].NOMBRE_CARRERA
        //liciencia.innerHTML += '<button class="btn btn-danger" (click)="AgregarCiencia()">Eliminar</button>'
        divciencia.append(liciencia);
//        console.log(aux[0].ID_CIENCIA);
        this.carreras = null;
      }else{this.carreras = null}
    }
    else
    {
      var auxalerta = document.getElementById('nohaycarrera');
      if(!auxalerta)
      {
        var alerte = document.createElement('div');
        alerte.setAttribute('class', 'alert alert-warning alert-dismissible fade show');
        alerte.setAttribute('role', 'alert');
        alerte.setAttribute('id', 'nohaycarrera');
        alerte.innerHTML = "Debe seleccionar una carrera para agregarla."
        alerte.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('formulario1');
        padre.insertBefore(alerte, document.getElementById('carreras'));
      }
    }
  }

  async AgregarFacultad(){
    if(this.facultades){
      var aux = await this.facultadservice.getdatofaculta(this.facultades).toPromise();
      var existe = false;
      for(var i = 0; i < this.listafacultad.length; i++)
      {
        var auxfacultad = this.listafacultad[i];
        if(auxfacultad[0].ID_FACULTAD == this.facultades)
        {
          existe = true;
          break;
        }
      }
      if(!existe)
      {
        this.listafacultad.push(aux);
        var divciencia = document.getElementById('listafacultades');
        var liciencia = document.createElement('li');
        liciencia.setAttribute('class', "list-group-item");
        liciencia.setAttribute('id', aux[0].NOMBRE_FACULTAD);
        liciencia.innerHTML = aux[0].NOMBRE_FACULTAD
        //liciencia.innerHTML += '<button class="btn btn-danger" (click)="AgregarCiencia()">Eliminar</button>'
        divciencia.append(liciencia);
//        console.log(aux[0].ID_CIENCIA);
        this.facultades = null;
      }
    }
    else
    {
      var auxalerta = document.getElementById('nohayfacultad');
      if(!auxalerta)
      {
        var alerte = document.createElement('div');
        alerte.setAttribute('class', 'alert alert-warning alert-dismissible fade show');
        alerte.setAttribute('role', 'alert');
        alerte.setAttribute('id', 'nohayfacultad');
        alerte.innerHTML = "Debe seleccionar una facultad para agregarla."
        alerte.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('formulario1');
        padre.insertBefore(alerte, document.getElementById('facultades'));
      }
    }
  }

  async guardarimagen()
  {
    var existe = false;
      for(var i = 0; i < this.l_imagenes.length; i++)
      {
        var auximagen = this.l_imagenes[i];
        if(auximagen == this.archivo1.nombre)
        {
          existe = true;
          break;
        }
      }
      if(!existe)
      {
        console.log(this.archivo1.base64);
        let archivo2 : ArchivoImagen = {
          name : this.archivo1.nombre,
          base64 : this.archivo1.base64
        }
        this.l_imagenes.push(this.archivo1.nombre);
        this.listaimagenes.push(archivo2);
        console.log('l_imagenes', this.l_imagenes);
        console.log('listaimagenes', this.listaimagenes);
        var divciencia = document.getElementById('listaimagenes');
        var liciencia = document.createElement('li');
        liciencia.setAttribute('class', "list-group-item");
        liciencia.setAttribute('id', this.archivo1.nombre);
        liciencia.innerHTML = this.archivo1.nombre
        //liciencia.innerHTML += '<button class="btn btn-danger" (click)="AgregarCiencia()">Eliminar</button>'
        divciencia.append(liciencia);
//        console.log(aux[0].ID_CIENCIA);
      }
  }
  async creartema()
  {
    if(this.nombre && this.descripcion && (this.listacarrera.length > 0 || this.listaciencia.length > 0 || this.listafacultad.length > 0))
    {
      var idrol = await this.usuarioservice.getID_ROL(sessionStorage.getItem('tipo_user')).toPromise();
      console.log(idrol[0].ID_ROL);
      var documentoid = await this.usuarioservice.obtenerdocumento(parseInt(sessionStorage.getItem('usuario')), parseInt(idrol[0].ID_ROL)).toPromise();
      console.log(documentoid)
      var temanuevo : Tema = {
        nombre_tema : this.nombre,
        descripcion_tema : this.descripcion,
        documento_identi : documentoid[0].DOCUMENTO_IDENTIFICACION,
        rolusuario : idrol[0].ID_ROL
      }
      await this.temaservice.creteTema(temanuevo).toPromise();
      console.log('paso0');
      var id_tema = await this.temaservice.getId_tema().toPromise();
      console.log('id_tema', id_tema);
      await this.temaservice.createrelaciontemaciencia(id_tema[0].ID_TEMA, this.listaciencia);
      await this.temaservice.createrelaciontemacarrera(id_tema[0].ID_TEMA, this.listacarrera);
      await this.temaservice.createrelaciontemafacultad(id_tema[0].ID_TEMA, this.listafacultad);
      await this.temaservice.subirimagenestema(id_tema[0].ID_TEMA, this.listaimagenes);
      await this.temaservice.crearrelacionimagentema(id_tema[0].ID_TEMA, this.l_imagenes);
      this.route.navigate(['inicio']);
    }
    else
    {
      var auxalerta = document.getElementById('nohaydatosuficientes');
      if(!auxalerta)
      {
        var alerte = document.createElement('div');
        alerte.setAttribute('class', 'alert alert-warning alert-dismissible fade show');
        alerte.setAttribute('role', 'alert');
        alerte.setAttribute('id', 'nohaydatosuficientes');
        alerte.innerHTML = "Debe llenar todos los datos para poder crear un tema."
        alerte.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerte, document.getElementById('formulario1'));
      }
    }
  }

  async onFileSelected(event)
  {
    this.selectedfile = event.target.files[0];
    if(this.selectedfile)
    {
      var reader = new FileReader();
      reader.onload = await this._handelReaderLoaded.bind(this);
      await reader.readAsBinaryString(this.selectedfile);
      //var binarString = this.target.result
//      console.log(reader.readAsBinaryString(this.selectedfile));
      this.archivo1.nombre = this.selectedfile.name;
      console.log('base', this.archivo1.base64);
      
      
    }
  }

  async _handelReaderLoaded(readerEvent){
    var binarString = readerEvent.target.result;
    this.archivo1.base64 = await btoa(binarString);  
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

  EliminarImagen(){
    if(this.imagenese)
    {
      var pos
      for(var i = 0; i < this.l_imagenes.length; i++)
      {
        if(this.imagenese == this.l_imagenes[i])
        {
          pos = i;  
        }
      }
      var auxfacultad = this.l_imagenes[pos];
      var divfacultad = document.getElementById('listaimagenes')
      divfacultad.removeChild(document.getElementById(auxfacultad))
      this.l_imagenes.splice(pos, 1);
      this.listaimagenes.splice(pos, 1);
    }
  }
}
