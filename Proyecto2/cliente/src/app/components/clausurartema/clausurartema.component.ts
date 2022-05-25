import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TemaService } from 'src/app/service/tema.service';
import { cluasurartema } from 'src/app/Tema';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-clausurartema',
  templateUrl: './clausurartema.component.html',
  styleUrls: ['./clausurartema.component.css']
})
export class ClausurartemaComponent implements OnInit {

  nombre = null;
  descripcion = null;

  constructor(private route : Router, private rutaactiva : ActivatedRoute, private temaservice : TemaService, private usuarioservice : UsuarioService) { }

  async ngOnInit() {
    if(sessionStorage.length > 0 && sessionStorage.getItem('tipo_user') == 'administrador')
    {
      let auxnombre = await this.temaservice.obtenerNombretema(this.rutaactiva.snapshot.params.idtema).toPromise();
      console.log(auxnombre[0].NOMBRE_TEMA);
      this.nombre = auxnombre[0].NOMBRE_TEMA;
    }
    else
    {
      this.route.navigate(['acces_denied']);
    }
  }

  async Clausurar()
  {
    if(this.descripcion)
    {
      let id = await this.usuarioservice.getID_ROL(sessionStorage.getItem('tipo_user')).toPromise();
      let doc = await this.usuarioservice.obtenerdocumento(parseInt(sessionStorage.getItem('usuario')), parseInt(id[0].ID_ROL)).toPromise()
      let clasutema : cluasurartema = {
        id_tema : this.rutaactiva.snapshot.params.idtema,
        descripcion : this.descripcion,
        idrol : id[0].ID_ROL,
        documento : doc[0].DOCUMENTO_IDENTIFICACION
      }
      await this.temaservice.clausurartema(clasutema).toPromise();
      await this.temaservice.actualizarclausuratema(this.rutaactiva.snapshot.params.idtema).toPromise()
      this.route.navigate(['inicio']);
    }
    else{
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
        padre.append(alerte);
      }
    }
  }
}
