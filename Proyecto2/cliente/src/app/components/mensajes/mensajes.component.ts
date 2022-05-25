import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service'
import { UsuarioService } from 'src/app/service/usuario.service';
import { UsuarioActivo, Conversacion, Mensaje } from 'src/app/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
  providers: [ChatService]
})
export class MensajesComponent implements OnInit {

  lusuariosactivos : UsuarioActivo[];
  estaenconversacion = false;
  mensajes : Mensaje[];
  message  = null;
  room : string;
  usuarior = null;
  rol = null;
  auxidconver = null;
  mensaje1 : Mensaje = {
    mensaje : "",
    usuario : "",
    rol   : ""
  }

  hayotrousuario = false;

  auxmessages:Array<{user:String, message:String}> = [];
  auxmensajes1:Array<{tipo : string, mensaje: string}> = [];
  constructor(private chatservice : ChatService, private usuarioservice : UsuarioService, private route : Router) {
    this.chatservice.newUserjoined()
    .subscribe(data => this.auxmessages.push(data))

    this.chatservice.userLeftRoom()
    .subscribe(data => this.auxmessages.push(data));

    this.chatservice.receivedMessage()
    .subscribe(data => this.auxmensajes1.push(data));

    console.log('constructor', this.auxmensajes1);
   }

  async ngOnInit() {
    //this.chatservice.conectar();
    if(sessionStorage.length > 0)
    {
      this.usuarioservice.obtenerUsuariosActivos(parseInt(sessionStorage.getItem('usuario')))
      .subscribe(usuarios => {
        this.lusuariosactivos = usuarios
      })
    }
    else
    {
      this.route.navigate(['acces_denied'])
    }
  }

  async verificarcon(event)
  {
    if(this.estaenconversacion && sessionStorage.getItem('tipo_user') == 'estudiante')
    {
      var auxalerta1 = document.getElementById('nohaydatos');
      if(!auxalerta1)
          {
            var alerta = document.createElement("div");
            alerta.setAttribute("class", "alert alert-warning alert-dismissible fade show");
            alerta.setAttribute("role", "alert");
            alerta.setAttribute("id", "estadocero");
            alerta.innerHTML = "Ya tiene una conversacion activa, por ser estudiante no puede iniciar mas.";
            alerta.innerHTML += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
            var formulario = document.getElementById("divformulario");
            formulario.insertBefore(alerta, document.getElementById("formulario"));
          }
    }
    else
    {
      await this.chatservice.leaveRoom({room : "room", user:this.usuarior[0].NOMBRE_USUARIO})
      this.estaenconversacion = true;
      var usuario = event.value
      var idrol = await this.usuarioservice.getID_ROL(sessionStorage.getItem('tipo_user')).toPromise();
      console.log(idrol);
      var raix = await this.usuarioservice.obtenerdocumento(parseInt(sessionStorage.getItem('usuario')), idrol[0].ID_ROL).toPromise();

      console.log(usuario, 'raiz', raix);
      var auxconversacion = await this.usuarioservice.obtenerConversacion(raix[0].DOCUMENTO_IDENTIFICACION, usuario['DOCUMENTO_IDENTIFICACION'], idrol[0].ID_ROL, usuario['ID_ROL']).toPromise();
      if(auxconversacion.length > 0)
      {
        console.log('entro');
        var id_conversacion = await this.usuarioservice.obtenerIDConversacion(raix[0].DOCUMENTO_IDENTIFICACION, usuario['DOCUMENTO_IDENTIFICACION'], idrol[0].ID_ROL, usuario['ID_ROL']).toPromise();
        console.log(id_conversacion)
        this.auxidconver = id_conversacion[0].ID_CONVERSACION;
        this.mensajes = await this.usuarioservice.obtenerMensajes(id_conversacion[0].ID_CONVERSACION).toPromise();  
        console.log('mensajes', this.mensajes);
        for(var i = 0; i < this.mensajes.length; i++)
        {
          var auxm = this.mensajes[i];
          if(auxm['DOCUMENTO_IDENTIFICACION'] == raix[0].DOCUMENTO_IDENTIFICACION)
          {
           var datos : {tipo:string, mensaje:string} = {
             tipo : 'e',
             mensaje : auxm['CONTENIDO_MENSAJE']
           }
           this.auxmensajes1.push(datos);
          }
          else
          {
            var datos : {tipo:string, mensaje:string} = {
              tipo : 'r',
              mensaje : auxm['CONTENIDO_MENSAJE']
            }
            this.auxmensajes1.push(datos);
          }
        }
      }
      else
      {
        var auxcon : Conversacion = {
          registro1 : raix[0].DOCUMENTO_IDENTIFICACION,
          registro2 : usuario['DOCUMENTO_IDENTIFICACION'],
          rol1 : idrol[0].ID_ROL,
          rol2 : usuario['ID_ROL']
        }
        await this.usuarioservice.crearConversacion(auxcon).toPromise();
        var id_conversacion = await this.usuarioservice.obtenerIDConversacion(raix[0].DOCUMENTO_IDENTIFICACION, usuario['DOCUMENTO_IDENTIFICACION'], idrol[0].ID_ROL, usuario['ID_ROL']).toPromise();
        console.log(id_conversacion)
        this.auxidconver = id_conversacion[0].ID_CONVERSACION;
      }
      var aux : Mensaje={
        usuario : raix[0].DOCUMENTO_IDENTIFICACION,
        mensaje : "",
        rol : idrol[0].ID_ROL
      }
      this.rol = idrol[0].ID_ROL;
      this.usuarior = await this.usuarioservice.obtenerUsuario(parseInt(sessionStorage.getItem('usuario')), idrol[0].ID_ROL).toPromise();
      console.log('usuario', this.usuarior)
      await this.chatservice.joinroom({room:"room", user:this.usuarior[0].NOMBRE_USUARIO});
    }
  }

  async dejarconversacion()
  {
    if(sessionStorage.getItem('tipo_user') == 'estudiante' || sessionStorage.getItem('tipo_user')=='catedratico')
    {
      await this.chatservice.leaveRoom({room:"room", user:this.usuarior[0].NOMBRE_USUARIO})
      this.estaenconversacion = false;
    }
    this.route.navigate(['mensaje'])
  }

  async send()
  {
    await this.chatservice.sendMessage({user:this.usuarior[0].NOMBRE_USUARIO, room : "room", message:this.message})
    var nuevo_mensaje : Mensaje = {
      usuario : this.usuarior[0].DOCUMENTO_IDENTIFICACION,
      mensaje : this.message,
      rol : this.rol
    }
    await this.usuarioservice.guardarMensaje(nuevo_mensaje, this.auxidconver).toPromise()
    var idultimo = await this.usuarioservice.obtenerUltimoidmensaje().toPromise();
    console.log(idultimo);
    await this.usuarioservice.creardetalleconversacion(idultimo[0].ID_MENSAJE, this.auxidconver).toPromise()
    var datos : {tipo:string, mensaje:string} = {
      tipo : 'e',
      mensaje : this.message
    }
    this.auxmensajes1.push(datos); 
    this.message = "";
  }
}
