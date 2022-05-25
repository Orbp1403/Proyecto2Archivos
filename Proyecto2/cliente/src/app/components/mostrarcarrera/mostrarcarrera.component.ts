import { Component, OnInit } from '@angular/core';
import { infoFacultad, infoCarrera } from 'src/app/Facultad';
import { Router } from '@angular/router';
import { FacultadesService } from 'src/app/service/facultades.service';

@Component({
  selector: 'app-mostrarcarrera',
  templateUrl: './mostrarcarrera.component.html',
  styleUrls: ['./mostrarcarrera.component.css']
})
export class MostrarcarreraComponent implements OnInit {

  l_facultades : infoFacultad[];
  l_carreras : infoCarrera[];  
  nombre = null;
  descripcion = null;
  registros = null;
  carreras = null;

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

  async onchange(param)
  {
    console.log(param);
    this.carreras = null;
    this.facultadservice.getCarrera(param)
    .subscribe(carreras1 => {
      this.l_carreras = carreras1;
    })
  }

  async getdatos()
  {
    console.log(this.registros, this.carreras)
    if(this.registros && this.carreras)
    {
      var carr = await this.facultadservice.getCarreraMF(this.registros, this.carreras).toPromise();
      this.nombre = carr[0].NOMBRE_CARRERA
      this.descripcion = carr[0].DESCRIPCION
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
        alerta.innerHTML = "Debe seleccionar todos los datos para buscar una carrera";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerta, document.getElementById('formulario1'));
      }
    }
  }
}
