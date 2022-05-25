import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoFacultad, infoCarrera, infoCarreraT, Facultad_G, Carrera_N, Carrera_G, Ciencia_N, infoCiencia, infoasignarcienciacarrera } from '../Facultad';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacultadesService {

  constructor(private http : HttpClient) { }
  urlser = "http://192.168.1.9:8000";

  getFacultades()
  {
    return this.http.get<infoFacultad[]>(this.urlser + "/getFacultades/").pipe(map(res => res));
  }

  getCarreras()
  {
    return this.http.get<infoCarrera[]>(this.urlser + "/getCarreras/").pipe(map(res => res));
  }

  getCarrera(id : number)
  {
    return this.http.get<infoCarrera[]>(this.urlser + "/getCarrera/" + id).pipe(map(res => res));
  }

  getCarreraC(id : number)
  {
    return this.http.get<infoCarrera[]>(this.urlser + "/getCarreraC/" + id).pipe(map(res => res));
  }

  getCarreraM(regi : number, rol : number)
  {
    return this.http.get<infoCarreraT[]>(this.urlser + "/getCarreraM/" + regi + "/" + rol).pipe(map(res=>res));
  }

  getFacultadM(id : number)
  {
    return this.http.get<infoFacultad>(this.urlser + "/getFacultad/" + id).pipe(map(res => res));
  }

  sepuedeinsertarf(nombre : string)
  {
    return this.http.get<infoFacultad[]>(this.urlser + "/getFacultadN/" + nombre).pipe(map(res => res));
  }

  insertarFacultad(facultad : Facultad_G)
  {
    return this.http.post(this.urlser + "/insertFa", facultad).pipe(map(res => res));
  }

  getFacultad(id : number)
  {
    return this.http.get<Facultad_G>(this.urlser + "/getFacultadD/" + id).pipe(map(res => res));
  }

  updateFacultad(facultad : Facultad_G, id : number)
  {
    return this.http.post(this.urlser + "/updateFacultad/" + id, facultad).pipe(map(res => res));
  }

  eliminarfacultad(id: number)
  {
    return this.http.post(this.urlser + "/deleteFacultad/" + id, "").pipe(map(res => res));
  }

  insertarCarrera(carrera : Carrera_N)
  {
    return this.http.post(this.urlser + "/insertarCarrera/", carrera).pipe(map(res => res));
  }

  sepuedeinsertarCarrera(id_fac : number, nombre : string)
  {
    return this.http.get<Carrera_N[]>(this.urlser + "/sepuedeinsertarcarrera/" + id_fac + "/" + nombre).pipe(map(res => res));
  }

  getCarreraMF(id_fac : number, id_carrera : number)
  {
    return this.http.get<Carrera_G>(this.urlser + "/getCarreraMF/" + id_fac + "/" + id_carrera).pipe(map(res=>res));
  }

  updateCarrera(id_fac : number, id_carrera : number, carrera : Carrera_G)
  {
    return this.http.post(this.urlser + "/updateCarrera/" + id_fac + "/" + id_carrera, carrera).pipe(map(res=>res));
  }

  deleteCarerra(id_fac : number, id_carrera : number)
  {
    return this.http.post(this.urlser + "/deleteCarrera/" + id_fac + "/" + id_carrera, "").pipe(map(res => res));
  }

  deleteasignacionc(id_carrera : number)
  {
    return this.http.post(this.urlser + "/deletetodaasignacion/" + id_carrera, "").pipe(map(res=>res));
  }

  deleteasignarcienciacarr(id_carrera : number)
  {
    return this.http.post(this.urlser + "/deleteasigcienciacar/" + id_carrera, "").pipe(map(res => res));
  }

  sepuedeinsertarciencia(nombre_ciencia : string, id_carrera : number)
  {
    return this.http.get<infoCiencia[]>(this.urlser + "/verificarciencia/"+ nombre_ciencia + "/" + id_carrera).pipe(map(res=>res));
  }

  createciencia(ciencia : Ciencia_N)
  {
    return this.http.post(this.urlser + "/createciencia/", ciencia).pipe(map(res => res));
  }

  getIdciencia(ciencia : Ciencia_N)
  {
    return this.http.post<infoCiencia>(this.urlser + "/getidciencia/", ciencia).pipe(map(res=>res));
  }

  verificarasignacion(id_ciencia : string, id_carrera : string)
  {
    return this.http.get<infoasignarcienciacarrera[]>(this.urlser + "/verificarasignacionciencia/" + id_ciencia + "/" + id_carrera).pipe(map(res => res));
  }

  createrelationcienciacarrea(id_ciencia : string, id_carrera)
  {
    return this.http.post(this.urlser + "/createrelacion/" + id_ciencia+ "/" + id_carrera, "").pipe(map(res => res));
  }

  getCiencias(id : number)
  {
    return this.http.get<infoCiencia[]>(this.urlser + "/getcienciacar/" + id).pipe(map(res => res));
  }

  getDatosCiencia(id_ciencia : number)
  {
    return this.http.get<Ciencia_N>(this.urlser + "/getdatosciencia/" + id_ciencia).pipe(map(res => res));
  }

  getDatoCiencia(id_ciencia : string)
  {
    return this.http.get<infoCiencia>(this.urlser + "/getdatociencia/"+id_ciencia).pipe(map(res => res));
  }

  updateCiencia(id_ciencia : number, ciencia : Ciencia_N)
  {
    return this.http.post(this.urlser + "/updateciencia/" + id_ciencia, ciencia).pipe(map(res => res));
  }

  deleteciencia(id_ciencia : number)
  {
    return this.http.post(this.urlser + "/deleteciencia/" + id_ciencia, "").pipe(map(res => res));
  }

  deleterelcienciacarrera(id_ciencia : number)
  {
    return this.http.post(this.urlser + "/deleteciencia_ca/" + id_ciencia, "").pipe(map(res => res));
  }

  deleterelcienciausuario(id_ciencia : number)
  {
    return this.http.post(this.urlser + "/deleteciencia_us/" + id_ciencia, "").pipe(map(res => res));
  }

  getCienciasM(id : string, id_documento : string)
  {
    return this.http.get<infoCiencia[]>(this.urlser + "/getcienciasm/" + id + "/" + id_documento);
  }
  
  getTodaslasciencias()
  {
    return this.http.get<infoCiencia[]>(this.urlser + "/gettodaslasciencias/").pipe(map(res => res));
  }

  getdatocarrera(id : string)
  {
    return this.http.get<infoCarrera>(this.urlser + "/getdatocarrrera/" + id).pipe(map(res => res));
  }

  getdatofaculta(id : string)
  {
    return this.http.get<infoFacultad>(this.urlser + "/getdatofacultad/" + id).pipe(map(res => res));
  }
}
