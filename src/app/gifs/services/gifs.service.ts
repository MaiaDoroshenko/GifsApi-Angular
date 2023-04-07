import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'imZxDadq7nkpSVHsFGqz14gRAAcrAnGD';

  private _historial: string[] = [];

  public resultados: Gif [] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string) {
    query = query.trim().toLowerCase(); //borro loe espacios y lo paso todo a minuscula

    if (!this._historial.includes(query)) {
      //si el historial no tiene el personaje solo ahi lo incluyo

      this._historial.unshift(query); //primero inserto el personaje
      this._historial = this._historial.splice(0, 10); //luego lo corto para que no sean mas de 10
    }

    this.http
      .get<SearchGifsResponse>(
        `http://api.giphy.com/v1/gifs/search?api_key=imZxDadq7nkpSVHsFGqz14gRAAcrAnGD&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
