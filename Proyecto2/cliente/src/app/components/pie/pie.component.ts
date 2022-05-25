import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  user = null;
  tipo = null;

  constructor(private route : Router) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      for(var i = 0; i < sessionStorage.length; i++)
      {
        if(sessionStorage.key(i) == 'usuario')
        {
          console.log('onInit ', sessionStorage.getItem('usuario'))
          this.user = sessionStorage.getItem('usuario');
        }
        else if(sessionStorage.key(i) == 'tipo_user')
        {
          this.tipo = sessionStorage.getItem('tipo_user');
        }
      }
     // window.location.reload();
    }
  }

  cerrarsesion(event){
    sessionStorage.clear();
    this.route.navigate(['']);
  }

}
