import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'imZxDadq7nkpSVHsFGqz14gRAAcrAnGD';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase(); //borro loe espacios y lo paso todo a minuscula

    if (!this._historial.includes(query)) {
      //si el historial no tiene el personaje solo ahi lo incluyo

      this._historial.unshift(query); //primero inserto el personaje
      this._historial = this._historial.splice(0, 10); //luego lo corto para que no sean mas de 10

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('limit', '10')
      .set('query', query);

    this.http
      .get<SearchGifsResponse>(
        `http://api.giphy.com/v1/gifs/search?api_key=imZxDadq7nkpSVHsFGqz14gRAAcrAnGD&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        this.resultados = resp.data;

        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
