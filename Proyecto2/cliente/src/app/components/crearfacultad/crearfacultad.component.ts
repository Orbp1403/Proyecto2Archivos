import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultadesService } from 'src/app/service/facultades.service';
import { Facultad_G } from 'src/app/Facultad';

@Component({
  selector: 'app-crearfacultad',
  templateUrl: './crearfacultad.component.html',
  styleUrls: ['./crearfacultad.component.css']
})
export class CrearfacultadComponent implements OnInit {

  facultad = null;
  descripcion = null;

  constructor(private route : Router, private facultadservice : FacultadesService) { }

  ngOnInit() {
    if(sessionStorage.length == 0)
    {
      this.route.navigate(['acces_denied'])
    }
  }

  async guardar(event)
  {
    if(this.facultad && this.descripcion)
    {
      var sepuede = await this.facultadservice.sepuedeinsertarf(this.facultad).toPromise();
      if(sepuede.length == 0)
      {
        var nfa : Facultad_G = {
          nombre_facultad : this.facultad,
          descripcion : this.descripcion
        }
        await this.facultadservice.insertarFacultad(nfa).toPromise();
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
          alerta.innerHTML = "Ya existe una facultad con ese nombre";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('divform');
          padre.insertBefore(alerta, document.getElementById('formulario1'));
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
        alerta.innerHTML = "Debe ingresar todos los datos para registrar una nueva facultad.";
        alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('divform');
        padre.insertBefore(alerta, document.getElementById('formulario1'));
      }
    }
  }
}
