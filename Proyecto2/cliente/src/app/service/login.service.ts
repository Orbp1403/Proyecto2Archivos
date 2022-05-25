import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, UserLog } from '../Usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }
  
  urlser = "http://192.168.1.9:8000";

  VerificarEstado(user : Login)
  {
    return this.http.post<UserLog>(this.urlser + "/verificarestadologin/", user).pipe(map(res => res));
  }
  
  poneractivo(reg : number, rol : string)
  {
    return this.http.post(this.urlser + "/activarcuenta/" + reg + "/" + rol, "").pipe(map(res => res));
  }
}
