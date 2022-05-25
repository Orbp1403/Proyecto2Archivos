import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { idcatedraticosrespuesta, tematraido, Temaobtenido1, respuestaporid } from 'src/app/Tema';
import { TemaService } from 'src/app/service/tema.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  tiporeporte = null;
  id_catedraticos : idcatedraticosrespuesta[];
  id_usuarios : idcatedraticosrespuesta[];
  listamostrar : respuestaporid[];

  temas : tematraido[];
  tema = null;

  constructor(private route : Router, private rutaactiva : ActivatedRoute, private temaservice : TemaService) { }

  ngOnInit() {
    if(sessionStorage.length > 0 && sessionStorage.getItem('tipo_user')=='administrador')
    {
      this.tiporeporte = this.rutaactiva.snapshot.params.tipo_re;
      this.temaservice.obtenertemas()
      .subscribe(tema1 => {
        this.temas = tema1;
      })
    }
    else
    {
      this.route.navigate(['acces_denied']);
    }
  }

  async obtenerretemas()
  {
    if(this.tema)
    {
      this.temaservice.obtenertotalrespuestasporid('3')
      .subscribe(ids => {
        this.listamostrar = ids;
      }
      )
    }
    else
    {
      var auxalerta = document.getElementById('nohaydatosuficientes');
      if(!auxalerta)
      {
        var alerte = document.createElement('div');
        alerte.setAttribute('class', 'alert alert-warning alert-dismissible fade show');
        alerte.setAttribute('role', 'alert');
        alerte.setAttribute('id', 'nohaydatosuficientes');
        alerte.innerHTML = "Debe seleccionar un tema para ver el reporte."
        alerte.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerte, document.getElementById('formulario1'));
      }
    }
  }

  async obtenerresus()
  {
    if(this.tema)
    {
      this.temaservice.obtenertotalrespuestasporid('2')
      .subscribe(ids => {
        this.listamostrar = ids;
        console.log('mostrar', this.listamostrar);
      })
    }
    else
    {
      var auxalerta = document.getElementById('nohaydatosuficientes');
      if(!auxalerta)
      {
        var alerte = document.createElement('div');
        alerte.setAttribute('class', 'alert alert-warning alert-dismissible fade show');
        alerte.setAttribute('role', 'alert');
        alerte.setAttribute('id', 'nohaydatosuficientes');
        alerte.innerHTML = "Debe seleccionar un tema para ver el reporte."
        alerte.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerte, document.getElementById('formulario1'));
      }
    }
  }

  generarPDF()
  {
    /*if(this.listamostrar)
    {

      html2canvas(document.getElementById('reporte'), {
        allowTaint: true,
        useCORS : false,
        scale: 1,
        
      }).then(function(canvas){
        var img = canvas.toDataURL("image/png");
        //console.log(img);
        var doc1 = new jsPDF();
        doc1.addImage(img, 'PNG', 5, 25, 200, 100);
        doc1.save('reporteusac-comunity.pdf');
      })
    }
    else
    {
      var auxalerta = document.getElementById('nopdf');
      if(!auxalerta)
      {
        var alerte = document.createElement('div');
        alerte.setAttribute('class', 'alert alert-warning alert-dismissible fade show');
        alerte.setAttribute('role', 'alert');
        alerte.setAttribute('id', 'nohaydatosuficientes');
        alerte.innerHTML = "Debe crear un reporte para descargalo en pdf."
        alerte.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
        var padre = document.getElementById('div1');
        padre.insertBefore(alerte, document.getElementById('div2'));
      }
    }*/
  }
}
