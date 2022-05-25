import { Injectable } from '@angular/core';
import { Tema, Temaobtenido, Temaobtenido1, FotoTema, Respuesta, Respuestaenviada, nombretema, cluasurartema, idcatedraticosrespuesta, tematraido, respuestaporid } from '../Tema';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { infoCiencia, infoCarrera, infoFacultad } from '../Facultad';
import { ArchivoImagen } from '../Usuario';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  urlser = "http://192.168.1.9:8000";

  constructor(private http : HttpClient) { }

  creteTema(tema : Tema)
  {
    return this.http.post(this.urlser + "/creartema/", tema).pipe(map(res => res));
  }

  getId_tema()
  {
    return this.http.get<number>(this.urlser + "/getidtema/").pipe(map(res => res));
  }

  createrelaciontemaciencia(id_tema : string, ciencias : infoCiencia[])
  {
    ciencias.forEach(ciencia => 
      //console.log('ciencia', ciencia)
      this.http.post(this.urlser + "/createrelationtemaciencia/" + id_tema + "/" + ciencia[0].ID_CIENCIA, "").subscribe() 
    )
  }

  createrelaciontemacarrera(id_tema : string, carreras : infoCarrera[])
  {
    carreras.forEach(carrera => 
      this.http.post(this.urlser + "/createrelationtemacarrera/" + id_tema + "/" + carrera[0].ID_CARRERA, "").subscribe()
    )
  }

  createrelaciontemafacultad(id_tema : string, facultdes : infoFacultad[])
  {
    facultdes.forEach(facultad => 
      this.http.post(this.urlser + "/createrelationtemafacultad/" + id_tema + "/" + facultad[0].ID_FACULTAD, "").subscribe())
  }

  subirimagenestema(id_tema : string, imagenes : ArchivoImagen[])
  {
    imagenes.forEach(imagen => 
      this.http.post(this.urlser + "/subirimagenestema/" + id_tema, imagen).subscribe())
  }

  crearrelacionimagentema(id_tema : string, imagenes : string[])
  {
    imagenes.forEach(imagen => 
      this.http.post(this.urlser + "/subirimagenalabd/" + id_tema + "/" + imagen, "").subscribe()
    )
  }

  subirimagenesrespuesta(id_respuesta : string, imagenes : ArchivoImagen[])
  {
    imagenes.forEach(imagen => 
      this.http.post(this.urlser + "/subirimagenresp/" + id_respuesta, imagen).subscribe()
      )
  }

  crearrelacionimagenrespuesta(id_respuesta : string, imagenes : string[])
  {
    imagenes.forEach(imagen => 
      this.http.post(this.urlser + "/subirimagenresalabd/" + id_respuesta + "/" + imagen, "").subscribe()
      )
  }

  getidrespuesta()
  {
    return this.http.get<number>(this.urlser + "/getidres/").pipe(map(res => res));
  }
  obtenertemasactivos()
  {
    return this.http.get<Temaobtenido[]>(this.urlser + "/gettemasactivosmostrar/").pipe(map(res => res));
  }

  obtenertemasactivosadmin()
  {
    return this.http.get<Temaobtenido[]>(this.urlser + "/gettemasactivosadmin/").pipe(map(res => res));
  }
  
  obtenertema(id : string)
  {
    return this.http.get<Temaobtenido1>(this.urlser + "/gettemaid/" + id).pipe(map(res => res));
  }

  obtenerimagenes(id : string)
  {
    return this.http.get<FotoTema[]>(this.urlser + "/getfotostemaid/" + id).pipe(map(res => res));
  }

  obtenerrespuesta(id : string)
  {
    return this.http.get<Respuesta[]>(this.urlser + "/getrespuestasdeltema/" + id).pipe(map(res => res));
  }

  verificartema(id : string, id_rol : string)
  {
    return this.http.get<Tema>(this.urlser + "/getverificartema/" + id + "/" + id_rol).pipe(map(res => res));
  }

  getestadotema(id : string)
  {
    return this.http.get<number>(this.urlser + "/getestadotema/" + id).pipe(map(res => res));
  }

  responder(nuevarespuesta : Respuestaenviada)
  {
    return this.http.post(this.urlser + "/responder/", nuevarespuesta).pipe(map(res => res));
  }

  getimagenesrespuesta(id_respuesta : string)
  {
    return this.http.get<FotoTema[]>(this.urlser + "/getimagenres/" + id_respuesta).pipe(map(res => res));
  }

  cerrartema(id_tema : string)
  {
    return this.http.post(this.urlser + "/cerrartema/"+ id_tema, "").pipe(map(res => res));
  }

  obtenerNombretema(id_tema : string)
  {
    return this.http.get<nombretema>(this.urlser + "/obtenernombretem/" + id_tema).pipe(map(res => res));
  }

  clausurartema(clausura : cluasurartema)
  {
    return this.http.post(this.urlser + "/clausurartema/", clausura).pipe(map(res=>res));
  }

  actualizarclausuratema(id_tema : string)
  {
    return this.http.post(this.urlser + "/clausurarestadotema/" + id_tema, "").pipe(map(res => res));
  }

  actualizarnumerorespuestas(id_tema : string)
  {
    return this.http.post(this.urlser + "/actualizarrespuestas/" + id_tema, "").pipe(map(res => res));
  }

  obtenertemas()
  {
    return this.http.get<tematraido[]>(this.urlser + "/getnombreidtemas/").pipe(map(res => res));
  }

  obteneridcatedraticosrespuestas(id_tema : string)
  {
    return this.http.get<idcatedraticosrespuesta[]>(this.urlser + "/obteneridcatres/" + id_tema).pipe(map(res => res));
  }

  obteneridestudiatesrespuestas(id_tema : string)
  {
    return this.http.get<idcatedraticosrespuesta[]>(this.urlser + "/obteneridestres/" + id_tema).pipe(map(res => res));
  }

  obtenertotalrespuestasporid(id_rol : string)
  {
    return this.http.get<respuestaporid[]>(this.urlser + "/getrespuestastotal/" + id_rol).pipe(map(res => res));
  }
}
