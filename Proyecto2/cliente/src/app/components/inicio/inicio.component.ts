import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { Temaobtenido } from 'src/app/Tema';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  user = null;
  tipo = null;

  temas : Temaobtenido[];

  constructor(private route : Router, private loginservice : LoginService, private temaservice : TemaService) { }

  async ngOnInit() {
    if(sessionStorage.length > 0)
    {
      for(var i = 0; i < sessionStorage.length; i++)
      {
        if(sessionStorage.key(i) == 'usuario')
        {
          this.user = sessionStorage.getItem('usuario');
        }
        else if(sessionStorage.key(i) == 'tipo_user')
        {
          this.tipo = sessionStorage.getItem('tipo_user');
        }
      }
      await this.loginservice.poneractivo(this.user, this.tipo).toPromise();
      if(sessionStorage.getItem('tipo_user') != 'administrador')
      {
        this.temaservice.obtenertemasactivos()
        .subscribe(temas1 => {
          this.temas = temas1;
          console.log(this.temas);
        })
      }
      else
      {
        this.temaservice.obtenertemasactivosadmin()
        .subscribe(temas1 => {
          this.temas = temas1;
        })
      }
    }
    else
    {
      this.route.navigate(['']);
    }
  }

  mostrar()
  {
    console.log(this.temas);
  }

  datostema(param)
  {
    console.log(param.value['ID_TEMA']);
    this.route.navigate(['mostrartema/' + param.value['ID_TEMA']]);
  }
}
