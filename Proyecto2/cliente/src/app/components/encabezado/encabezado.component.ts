import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  user = null;
  tipo = null;

  constructor(private route : Router, private usuarioservice : UsuarioService) { }

  ngOnInit() {
    if(sessionStorage.length > 0)
    {
      for(var i = 0; i < sessionStorage.length; i++)
      {
        if(sessionStorage.key(i) == 'usuario')
        {
          this.user = sessionStorage.getItem('usuario')
        }
        else if(sessionStorage.key(i) == 'tipo_user')
        {
          this.tipo = sessionStorage.getItem('tipo_user')
        }
      }
    }
  }

  mostrarcuenta()
  {
    this.route.navigate(['cuenta']);
  }

  async cerrarsesion()
  {
    await this.usuarioservice.ponerusuarioinactivo(sessionStorage.getItem('usuario'), sessionStorage.getItem('tipo_user')).toPromise();
    sessionStorage.clear();
    this.route.navigate(['']);

  }
}
