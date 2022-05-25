import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { infoFacultad, Facultad_G } from 'src/app/Facultad';
import { FacultadesService } from 'src/app/service/facultades.service';

@Component({
  selector: 'app-mostrarfacultad',
  templateUrl: './mostrarfacultad.component.html',
  styleUrls: ['./mostrarfacultad.component.css']
})
export class MostrarfacultadComponent implements OnInit {

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
      this.route.navigate(['access_denied']);
    }
  }

  async getDatos(event)
  {
    if(this.registros)
    {
      var fac = await this.facultadservice.getFacultad(this.registros).toPromise();
      this.nombre = fac[0].NOMBRE_FACULTAD;
      this.descripcion = fac[0].DESCRIPCION;
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
          padre.insertBefore(alerta, document.getElementById('formulario'));
        }
    }
  }

  async setDatos(event)
  {
    console.log(this.nombre);
    console.log(this.descripcion);
    if(this.nombre && this.descripcion)
    {
      console.log("entro");
      var facultadn : Facultad_G = {
        nombre_facultad : this.nombre,
        descripcion : this.descripcion
      }
      await this.facultadservice.updateFacultad(facultadn, this.registros).toPromise();
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
          alerta.innerHTML = "Ya existe una facultad con ese nombre";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('div1');
          padre.insertBefore(alerta, document.getElementById('formulario'));
        }  
    }
  }
}
