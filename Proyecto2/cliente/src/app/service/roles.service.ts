import { Injectable } from '@angular/core';
import { Roles } from '../Usuario';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  urlser = "http://192.168.1.9:8000";

  constructor(private http : HttpClient) { }

  getRoles()
  {
    return this.http.get<Roles[]>(this.urlser + "/getRoles/").pipe(map(res => res));
  }
}
