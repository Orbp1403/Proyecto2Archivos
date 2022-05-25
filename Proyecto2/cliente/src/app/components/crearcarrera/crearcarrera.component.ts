import { Component, OnInit } from '@angular/core';
import { infoFacultad, infoCarreraT, Carrera_N } from 'src/app/Facultad';
import { Router } from '@angular/router';
import { FacultadesService } from 'src/app/service/facultades.service';

@Component({
  selector: 'app-crearcarrera',
  templateUrl: './crearcarrera.component.html',
  styleUrls: ['./crearcarrera.component.css']
})
export class CrearcarreraComponent implements OnInit {
  l_facultades : infoFacultad[];  
  nombre = null;
  descripcion = null;
  registros = null;

  constructor(private route : Router, private facultadservice : FacultadesService) { }

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
      this.route.navigate(['acces_denied']);
    }
  }

  async selectdatos(event)
  {
    if(this.nombre && this.descripcion && this.registros)
    {
      var carreran : Carrera_N = {
        nombre_carrera : this.nombre,
        id_facultad : this.registros,
        descripcion : this.descripcion
      }
      var sepuede = await this.facultadservice.sepuedeinsertarCarrera(this.registros, this.nombre).toPromise();
      if(sepuede.length == 0)
      {
        await this.facultadservice.insertarCarrera(carreran).toPromise();
        this.route.navigate(['inicio']);
      }
      else
      {
        var auxalerta = document.getElementById('datosrepetidos');
        if(!auxalerta)
        {
          var alerta = document.createElement('div');
          alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
          alerta.setAttribute("role", "alert");
          alerta.setAttribute("id", "datosrepetidos");
          alerta.innerHTML = "Ya existe una carrera con ese nombre asignada a esa facultad";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('div1');
          padre.insertBefore(alerta, document.getElementById('formulario1'));
        }  
      }
    }
    else
    {
      var auxalerta = document.getElementById('datosrepetidos1');
      if(!auxalerta)
      {
        var alerta = document.createElement('div');
        alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
        alerta.setAttribute("role", "alert");
        alerta.setAttribute("id", "datosrepetidos1");
        alerta.innerHTML = "Debe seleccionar una facultad para buscar";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerta, document.getElementById('formulario1'));
      }
    }
  }
}
