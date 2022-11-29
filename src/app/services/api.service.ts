//librerias para realizar peticiones del tipo http
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  //metodo para crear una peticion.

  async get() {
    return await this.http.get('https://rickandmortyapi.com/api/character');
}

}