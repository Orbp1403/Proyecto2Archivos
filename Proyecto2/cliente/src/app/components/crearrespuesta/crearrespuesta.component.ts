import { Component, OnInit } from '@angular/core';
import { ArchivoImagen } from 'src/app/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TemaService } from 'src/app/service/tema.service';
import { Respuestaenviada } from 'src/app/Tema';

@Component({
  selector: 'app-crearrespuesta',
  templateUrl: './crearrespuesta.component.html',
  styleUrls: ['./crearrespuesta.component.css']
})
export class CrearrespuestaComponent implements OnInit {


  listaimagenes : ArchivoImagen[] = [];
  imagenese = null;
  l_imagenes : string[] = [];
  selectedfile : File = null;
  archivo1 = {
    nombre : null,
    base64 : null
  }
  esusuario = false;
  temaabierto = true;

  documento_id = null;
  rol_id = null
  respuesta = null;
  tipou = null;
  temaclausurado = false;

  constructor(private route : Router, private usuarioservice : UsuarioService, private temaservice : TemaService, private rutaactiva : ActivatedRoute) { }

  async ngOnInit() {
    if(sessionStorage.length > 0)
    {
      this.tipou = sessionStorage.getItem('tipo_user');
      console.log(sessionStorage.getItem('usuario'))
      let idrol = await this.usuarioservice.getID_ROL(sessionStorage.getItem('tipo_user')).toPromise();
      console.log('ROL', idrol[0].ID_ROL);
      this.rol_id = idrol[0].ID_ROL
      let documentoid = await this.usuarioservice.obtenerdocumento(parseInt(sessionStorage.getItem('usuario')), parseInt(idrol[0].ID_ROL)).toPromise();
      console.log('documento ', documentoid[0].DOCUMENTO_IDENTIFICACION)
      this.documento_id = documentoid[0].DOCUMENTO_IDENTIFICACION
      let verificartema = await this.temaservice.verificartema(this.rutaactiva.snapshot.params.idtema, idrol[0].ID_ROL).toPromise();
      console.log('verificar', verificartema);
      if(documentoid[0].DOCUMENTO_IDENTIFICACION == verificartema[0].DOCUMENTO_IDENTIFICACION)
      {
        this.esusuario = true;
      }
      let estadotema = await this.temaservice.getestadotema(this.rutaactiva.snapshot.params.idtema).toPromise();
      console.log('estado', estadotema);
      if(estadotema[0].ESTADO == '1')
      {
        this.temaabierto = false;
      }

      if(estadotema[0].ESTADO == '2')
      {
        this.temaclausurado = true;
      }
    }
    else
    {
      this.route.navigate(['acces_denied'])
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

  async Responder()
  {
    let respuesta : Respuestaenviada = {
      id_tema : this.rutaactiva.snapshot.params.idtema,
      documento_identificacion : this.documento_id,
      id_rol : this.rol_id,
      contenido : this.respuesta
    }

    await this.temaservice.responder(respuesta).toPromise();
    let idres = await this.temaservice.getidrespuesta().toPromise()
    console.log(idres);
    await this.temaservice.subirimagenesrespuesta(idres[0].ID_RESPUESTA, this.listaimagenes);
    await this.temaservice.crearrelacionimagenrespuesta(idres[0].ID_RESPUESTA, this.l_imagenes);
    await this.temaservice.actualizarnumerorespuestas(this.rutaactiva.snapshot.params.idtema);
    //window.location.href = window.location.href;
    //location.assign('mostrartema/' + this.rutaactiva.snapshot.params.idtema);
    this.route.navigate(['inicio']);
  }

  async CerrarTema(){
    await this.temaservice.cerrartema(this.rutaactiva.snapshot.params.idtema).toPromise()
    this.route.navigate(['inicio']);
  }

  async Clausurar(){
    this.route.navigate(['clausurartema/' + this.rutaactiva.snapshot.params.idtema]);
  }
}
