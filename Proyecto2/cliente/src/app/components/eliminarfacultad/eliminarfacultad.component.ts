import { Component, OnInit } from '@angular/core';
import { infoCarrera, infoFacultad } from 'src/app/Facultad';
import { Router } from '@angular/router';
import { FacultadesService } from 'src/app/service/facultades.service';

@Component({
  selector: 'app-eliminarfacultad',
  templateUrl: './eliminarfacultad.component.html',
  styleUrls: ['./eliminarfacultad.component.css']
})
export class EliminarfacultadComponent implements OnInit {

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

  async getDatos(event)
  {
    if(this.registros)
    {
      await this.facultadservice.eliminarfacultad(this.registros).toPromise();
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
          alerta.innerHTML = "Debe seleccionar una facultad para eliminar";
          alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
          var padre = document.getElementById('div1');
          padre.insertBefore(alerta, document.getElementById('formulario'));
        }
    }
  }

}
