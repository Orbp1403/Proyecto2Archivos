import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/Tema';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-mostrarrespuesta',
  templateUrl: './mostrarrespuesta.component.html',
  styleUrls: ['./mostrarrespuesta.component.css']
})
export class MostrarrespuestaComponent implements OnInit {

  lista_respuestas : Respuesta[]
  hayrespuestas = false;

  constructor(private route : Router, private rutaactiva : ActivatedRoute, private temaservice : TemaService) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      console.log('mostrar respuesta ', this.rutaactiva.snapshot.params.idtema)
      this.temaservice.obtenerrespuesta(this.rutaactiva.snapshot.params.idtema)
      .subscribe(respuesta => {
        this.lista_respuestas = respuesta;
        if(this.lista_respuestas.length > 0)
        {
          this.hayrespuestas = true;
        }
        console.log('lista respuestas', this.lista_respuestas)
        this.lista_respuestas.forEach(respuesta => 
          //console.log('respuestas', respuesta['ID_RESPUESTA']))
          this.temaservice.getimagenesrespuesta(respuesta['ID_RESPUESTA'])
          .subscribe(imgenes => {
            respuesta['IMAGENES_RESPUESTA'] = imgenes;
          }))

        this.lista_respuestas.forEach(resp => {
          console.log('resp', resp);
        })
      });
    }
    else
    {
      this.route.navigate(['acces_denied'])
    }
  }

  mostrar(imagen)
  {
    console.log(imagen.value['FOTO_RESPUESTA']);
    var auxe = document.getElementById('exampleModal');
    if(auxe)
    {
      document.removeChild(auxe);
    }
    var aux = document.createElement('div');
    aux.setAttribute('class', 'modal fade');
    aux.setAttribute('id', 'exampleModal');
    aux.setAttribute('tabindex', '-1');
    aux.setAttribute('role', 'dialog');
    aux.setAttribute('aria-labelledby', 'exampleModalLabel');
    aux.setAttribute('aria-hidden','true');
    aux.innerHTML = "<div class=\"modal-dialog modal-xl\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div><div class=\"modal-body\"><img src=\"http:192.168.1.9:4200/assets/" + imagen.value['FOTO_RESPUESTA'] + "\" width= \"100% \" height=\"100%\"></div></div></div>"
    let id = document.getElementById('respuestas1');
    id.appendChild(aux);
  }
}
