import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLog, ArchivoImagen, UsuarioR, UsuarioRAdmin, Registros_Uni, Roles, UsuarioActualizar, RoleN, RolG, UsuarioActivo, Conversacion, Mensaje, UsuarioCatedratico } from '../Usuario';
import { map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http : HttpClient) { }

  urlser = "http://192.168.1.9:8000"

  sePuedeInsertar(id_rol : number, registro : string)
  {
    return this.http.get<UserLog[]>(this.urlser + "/getVerificacionsepuedeinsertar/" + id_rol + "/" + registro).pipe(map(res => res));
  }

  uploadProfileImage(archivo : ArchivoImagen)
  {
    return this.http.post<number>(this.urlser + "/uploadprofileimage/", archivo).pipe(map(res => res));
  }

  insertarUsuario(usuario : UsuarioR)
  {
    return this.http.post<UsuarioR>(this.urlser + "/addUser/", usuario).pipe(map(res => res));
  }

  asignar_Carrera(usuario : UsuarioR)
  {
    return this.http.post<UsuarioR>(this.urlser + "/asignar_c/", usuario).pipe(map(res => res));
  }

  insertarUsuarioA(usuario : UsuarioRAdmin)
  {
    return this.http.post<UsuarioRAdmin>(this.urlser + "/addUserA/", usuario).pipe(map(res => res));
  }

  insertarUsuarioC(usuario : UsuarioCatedratico)
  {
    return this.http.post(this.urlser + "/addUserC/", usuario).pipe(map(res => res));
  }

  asignarCarreraC(usuario : UsuarioCatedratico)
  {
    return this.http.post(this.urlser + "/asignar_c/", usuario).pipe(map(res => res));
  }

  asignarCienciaC(usuario : UsuarioCatedratico)
  {
    return this.http.post(this.urlser + "/asignar_ci/", usuario).pipe(map(res => res));
  }

  obtenerRegistros()
  {
    return this.http.get<Registros_Uni[]>(this.urlser + "/getRegistrosU/").pipe(map(res => res));
  }

  obtenerRoles(registro : number)
  {
    return this.http.get<Roles[]>(this.urlser + "/getRoles/" + registro).pipe(map(res => res));
  }

  eliminarUsuario(registro : number, rol : number)
  {
    return this.http.post(this.urlser + "/eliminarU/" + registro + "/" + rol,"").pipe(map(res => res));
  }

  obtenerUsuario(registro : number, rol : number)
  {
    console.log(registro, ', ', rol)
    return this.http.get<UsuarioR>(this.urlser + "/getUsuario/" + registro + "/" + rol).pipe(map(res => res));
  }

  actualizarUsuario(registro: number, rol : number, usuario : UsuarioActualizar)
  {
    return this.http.post(this.urlser + "/updateUsuario/" + registro + "/" + rol, usuario).pipe(map(res => res));
  }

  obtenerdocumento(registro : number, rol : number)
  {
    return this.http.get<Registros_Uni>(this.urlser + "/getDocumentosI/" + registro + "/" + rol).pipe(map(res => res))
  }

  obtenerRol(id : number)
  {
    return this.http.get<Registros_Uni>(this.urlser + "/getRol/" + id).pipe(map(res=>res));
  }

  eliminarasignacionc(documento : number, rol : number, id_car : number)
  {
    return this.http.post(this.urlser + "/updateasignarc/"+ documento + "/" + rol + "/" + id_car, "").pipe(map(res => res));
  }

  eliminarasignacionci(documento : string, id_ci : string, rol : string)
  {
    return this.http.post(this.urlser + "/deleteasignarci/" + documento + "/" + rol + "/" + id_ci, "").pipe(map(res => res));
  }

  verificarasignacionact(documento : number, rol : number)
  {
    return this.http.get<Registros_Uni[]>(this.urlser + "/getAsignaciones/" + documento + "/" + rol).pipe(map(res => res));
  }

  verificarasignacioncie(documento : string, rol : number)
  {
    return this.http.get<Registros_Uni[]>(this.urlser + "/getAsignacionesCi/" + documento + "/" + rol).pipe(map(res => res));
  }

  verificarasignacionca(usuario : UsuarioR)
  {
    return this.http.post<Registros_Uni[]>(this.urlser + "/getAsignacionesFacultad/", usuario).pipe(map(res => res));
  }

  verificarasignacionci(usuario : UsuarioCatedratico)
  {
    return this.http.post<Registros_Uni[]>(this.urlser + "/getAsignacionesCiencia/", usuario).pipe(res => res);
  }

  asignarCiencia(usuario : UsuarioCatedratico)
  {
    return this.http.post(this.urlser + "/crearAsignacionciencia/", usuario).pipe(res => res);
  }

  verificarlogin(nombre_rol : string)
  {
    return this.http.get<RoleN[]>(this.urlser + "/verificarrol/" + nombre_rol).pipe(map(res => res));
  }

  crearrol(rol : RoleN)
  {
    return this.http.post(this.urlser + "/crearrol/", rol).pipe(map(res => res));
  }

  obtenerTodoslosroles()
  {
    return this.http.get<Roles[]>(this.urlser + "/obtenerrolesc/").pipe(map(res => res));
  }

  obtenerRole(id : number)
  {
    return this.http.get<RoleN>(this.urlser + "/obtenerrol/" + id).pipe(map(res => res));
  }

  verificarlogin1(nombre_rol : string, id_rol : number)
  {
    return this.http.get<RoleN[]>(this.urlser + "/verificarrol1/" + nombre_rol + "/" + id_rol).pipe(map(res => res));
  }

  updateRol(rol : RolG)
  {
    return this.http.post(this.urlser + "/updaterol", rol).pipe(map(res => res));
  }

  obtenertodoslosroles()
  {
    return this.http.get<Roles[]>(this.urlser + "/getRoles/").pipe(map(res => res));
  }

  deleterol(id : number)
  {
    return this.http.post(this.urlser + "/deleterol/" + id, "").pipe(map(res => res));
  }

  getDatosCuenta(nombre : string, rol : string)
  {
    return this.http.get<UsuarioRAdmin>(this.urlser + "/getDatosCuenta/" + nombre + "/" + rol).pipe(map(res => res));
  }

  getID_ROL(nombre_rol : string)
  {
    return this.http.get<number>(this.urlser + "/getId_rol/" + nombre_rol).pipe(map(res => res));
  }

  obtenerUsuariosActivos(registro : number)
  {
    return this.http.get<UsuarioActivo[]>(this.urlser + "/getusuariosactivos/" + registro).pipe(map(res => res));
  }

  ponerusuarioinactivo(registro : string, rol : string)
  {
    return this.http.post(this.urlser + "/cerrarcuentaactiva/" + registro + "/" + rol, "").pipe(map(res => res));
  }

  obtenerConversacion(registro1 : string, registro2 : string, rol1 : string, rol2 : string)
  {
    return this.http.get<Conversacion[]>(this.urlser + "/getConversaciones/" + registro1 + "/" + rol1 + "/" + registro2 + "/" + rol2).pipe(map(res => res));
  }

  crearConversacion(conversacion : Conversacion)
  {
    return this.http.post(this.urlser + "/createConversacion/", conversacion).pipe(map(res => res));
  }

  obtenerIDConversacion(registro1 : string, registro2 : string, rol1 : string, rol2 : string)
  {
    return this.http.get<number>(this.urlser + "/getConversacionId/" + registro1 + "/" + rol1 + "/" + registro2 + "/" + rol2).pipe(map(res => res));
  }

  obtenerMensajes(id_conversacion : string)
  {
    return this.http.get<Mensaje[]>(this.urlser + "/getMensajes/" + id_conversacion).pipe(map(res => res));
  }

  guardarMensaje(mensaje : Mensaje, id_conver : string)
  {
    return this.http.post<number>(this.urlser + "/insertarMensaje/" + id_conver, mensaje).pipe(map(res => res));
  }

  obtenerUltimoidmensaje()
  {
    return this.http.get<number>(this.urlser + "/getidultimomensaje/").pipe(map(res => res));
  }

  creardetalleconversacion(idmensaje : string, idconver : string)
  {
    return this.http.post(this.urlser + "/creardetallecon/" + idmensaje + "/" + idconver, "").pipe(map(res=>res));
  }
}
