import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultadesService } from 'src/app/service/facultades.service';
import { isRegExp } from 'util';
import { infoFacultad, infoCarrera, Ciencia_N, infoCiencia } from 'src/app/Facultad';

@Component({
  selector: 'app-crearciencia',
  templateUrl: './crearciencia.component.html',
  styleUrls: ['./crearciencia.component.css']
})
export class CrearcienciaComponent implements OnInit {

  constructor(private route : Router, private facultadservice : FacultadesService) { }

  l_facultades : infoFacultad[];
  l_carreras : infoCarrera[];
  registros = null;
  carreras = null;
  nombre = null;
  descripcion = null;

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      this.facultadservice.getFacultades()
      .subscribe(facultades1 => {
        this.l_facultades = facultades1;
      })
    }
    else
    {
      this.route.navigate(['inicio']);
    }
  }

  onchange(param)
  {
    console.log(param);
    this.facultadservice.getCarrera(param)
    .subscribe(carreras1 => {
      this.l_carreras = carreras1;
    })
  }

  async getDatos()
  {
    if(this.registros && this.carreras && this.nombre && this.descripcion)
    {
      var aux = await this.facultadservice.sepuedeinsertarciencia(this.nombre, this.carreras).toPromise();
      console.log("aux", aux);
      if(aux.length == 0)
      {
        var nuevacienca : Ciencia_N = {
          nombre_ciencia : this.nombre,
          descripcion_ciencia : this.descripcion,
          id_carrera : this.carreras
        }
        await this.facultadservice.createciencia(nuevacienca).toPromise();
        var idciencia = this.facultadservice.getIdciencia(nuevacienca).toPromise();
        await this.facultadservice.createrelationcienciacarrea(idciencia[0].ID_CIENCIA, this.carreras).toPromise();
        this.route.navigate(['inicio']);
      }
      else
      {
        var nuevacienca : Ciencia_N = {
          nombre_ciencia : this.nombre,
          descripcion_ciencia : this.descripcion,
          id_carrera : this.carreras
        }
        const aux = await this.facultadservice.getIdciencia(nuevacienca).toPromise()
        console.log(aux[0].ID_CIENCIA);
        var existeasig = await this.facultadservice.verificarasignacion(aux[0].ID_CIENCIA, this.carreras).toPromise();
        if(existeasig.length == 0)
        {
          await this.facultadservice.createrelationcienciacarrea(aux[0].ID_CIENCIA, this.carreras).toPromise();
          this.route.navigate(['inicio']);
        }
        else
        {
          var auxalerta = document.getElementById('nohaydatos1');
          if(!auxalerta)
          {
            var alerta = document.createElement('div');
            alerta.setAttribute("class", "alert alert-danger alert-dismissible fade show");
            alerta.setAttribute("role", "alert");
            alerta.setAttribute("id", "nohaydatos1");
            alerta.innerHTML = "Ya existe una ciencia en esa carrera con ese nombre.";
            alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
            var padre = document.getElementById("div1");
            padre.insertBefore(alerta, document.getElementById('formulario1'))
          }
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
        alerta.innerHTML = "Debe seleccionar todos los datos para crear una ciencia.";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById("div1");
        padre.insertBefore(alerta, document.getElementById('formulario1'))
      }
    }
  }

}
