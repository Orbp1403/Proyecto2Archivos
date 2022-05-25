import { Component, OnInit } from '@angular/core';
import { infoFacultad, infoCarrera, infoCiencia } from 'src/app/Facultad';
import { Router } from '@angular/router';
import { FacultadesService } from 'src/app/service/facultades.service';

@Component({
  selector: 'app-mostrarciencia',
  templateUrl: './mostrarciencia.component.html',
  styleUrls: ['./mostrarciencia.component.css']
})
export class MostrarcienciaComponent implements OnInit {

  l_facultades : infoFacultad[];
  l_carreras  : infoCarrera[];
  l_ciencias : infoCiencia[];

  registros = null;
  carreras = null;
  ciencias = null;

  nombre = null;
  descripcion = null;

  constructor(private route : Router, private facultadservice : FacultadesService) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      this.facultadservice.getTodaslasciencias()
      .subscribe(facultades1 => {
        this.l_ciencias = facultades1;
      })
    }
    else{
      this.route.navigate(['acces_denied'])
    }
  }

  onchange(param)
  {
    this.facultadservice.getCarrera(param)
    .subscribe(carreras1 => {
      this.l_carreras = carreras1;
    })
  }

  onchange1(param)
  {
    this.facultadservice.getCiencias(param)
    .subscribe(ciencia1 => {
      this.l_ciencias = ciencia1;
    })
  }

  async getDatos(){
    if(this.ciencias)
    {
      var auxdatos = await this.facultadservice.getDatosCiencia(this.ciencias).toPromise();
      this.nombre = auxdatos[0].NOMBRE_CIENCIA;
      this.descripcion = auxdatos[0].DESCRIPCION_CIENCIA;
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
        alerta.innerHTML = "Debe seleccionar una ciencia para buscar.";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerta, document.getElementById('formulario1'));
      }
    }
  }
}
