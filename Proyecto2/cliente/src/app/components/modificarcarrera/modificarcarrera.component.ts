import { Component, OnInit } from '@angular/core';
import { infoFacultad, infoCarrera, Carrera_G } from 'src/app/Facultad';
import { Router } from '@angular/router';
import { FacultadesService } from 'src/app/service/facultades.service';

@Component({
  selector: 'app-modificarcarrera',
  templateUrl: './modificarcarrera.component.html',
  styleUrls: ['./modificarcarrera.component.css']
})
export class ModificarcarreraComponent implements OnInit {

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
    this.facultadservice.getCarrera(param)
    .subscribe(carreras1 => {
      this.l_carreras = carreras1;
    })
  }

  async getdatos()
  {
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

  async setdatos()
  {
    if(this.registros && this.carreras && this.nombre && this.descripcion)
    {
      var carreran : Carrera_G = {
        nombre_carrera : this.nombre,
        descripcion : this.descripcion
      }
      await this.facultadservice.updateCarrera(this.registros, this.carreras, carreran).toPromise()
      this.route.navigate(['inicio']);
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
        alerta.innerHTML = "Debe tener todos los datos seleccionados para actualizar una carrera";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerta, document.getElementById('formulario1'));
      }
    }
  }
}
