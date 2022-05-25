import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Tema, FotoTema } from 'src/app/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { ArchivoImagen } from 'src/app/Usuario';

@Component({
  selector: 'app-mostrartema',
  templateUrl: './mostrartema.component.html',
  styleUrls: ['./mostrartema.component.css']
})
export class MostrartemaComponent implements OnInit {

  obtenertema : Tema;
  foto = null;
  nombre_usuario = null;
  nombre_tema = null;
  descripcion = null;
  imagenestema : FotoTema[];
  temaabierto = true;
  temaclausurado = false;

  constructor(private route : Router, private rutaactiva : ActivatedRoute, private temaservice : TemaService) { }

  async ngOnInit() {
    if(sessionStorage.length > 0)
    {
      console.log(this.rutaactiva.snapshot.params.idtema)
      let obtenertema = await this.temaservice.obtenertema(this.rutaactiva.snapshot.params.idtema).toPromise();
      //console.log(tema);
      console.log(obtenertema);
      this.foto = obtenertema[0].FOTO;
      this.nombre_usuario = obtenertema[0].NOMBRE_USUARIO
      this.nombre_tema = obtenertema[0].NOMBRE_TEMA
      this.descripcion = obtenertema[0].DESCRIPCION
      this.temaservice.obtenerimagenes(this.rutaactiva.snapshot.params.idtema)
      .subscribe(imagen => {
        console.log(imagen);
        this.imagenestema = imagen;
        var index = 0;
        this.imagenestema.forEach(imagen => {
          let auxdiv = document.getElementById('inner');
          console.log('foreach', imagen, 'index', index, 'auxforeach', imagen['FOTO_TEMA']);
          let auxcarouselitem = document.createElement('div');
          if(index == 0)
          {
            auxcarouselitem.setAttribute('class', 'carousel-item active');
          }
          else
          {
            auxcarouselitem.setAttribute('class', 'carousel-item')
          }
          auxcarouselitem.setAttribute('id', 'listimages')
          auxcarouselitem.setAttribute('align', 'center');
          auxcarouselitem.innerHTML = '<img src="http://192.168.1.9:4200/assets/' + imagen['FOTO_TEMA'] + '" class=d-block w-100 zoom" height="400px" width="100%">';
          auxdiv.insertBefore(auxcarouselitem, document.getElementById('prev'));
          index++;
        })
      })

      let estadotema = await this.temaservice.getestadotema(this.rutaactiva.snapshot.params.idtema).toPromise();
      console.log('estado', estadotema);
      if(estadotema[0].ESTADO != '1')
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
      this.route.navigate(['acces_denied']);
    }
  }

}
