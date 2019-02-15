import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Heroe}from "../interfaces/heroe.interface";
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroesUrl:string ="https://heroesapp-6b871.firebaseio.com/heroes.json";
  heroeUrl:string = "https://heroesapp-6b871.firebaseio.com/"

  constructor(private http:HttpClient) { }
  nuevoHeroe(heroe:Heroe){
      let body = JSON.stringify(heroe);
      let headers = new HttpHeaders({
        'Content-Type':'aplicationJson'
      });
      return this.http.post(this.heroesUrl,body,{headers})
              .pipe(
                map((res:Response) => {
                return res;
              })
            );

  }
  actualizarHeroe(heroe:Heroe,key$:string){
      let body = JSON.stringify(heroe);
      let headers = new HttpHeaders({
        'Content-Type':'aplicationJson'
      });
      let url = `${this.heroeUrl}/heroes/${key$}.json`
      return this.http.put(url,body,{headers})
              .pipe(
                map((res:Response) => {
                return res;
              })
            );
  }
  getHeroe(key$:string){
      let url = `${this.heroeUrl}/heroes/${key$}.json`
      return this.http.get(url)
              .pipe( map((res:Response) => {return res;}));
  }
  getHeroes(){
      return this.http.get(this.heroesUrl)
              .pipe( map((res:Response) => {return res;}));
  }
  borrarHeroe(key$){
    let url = `${this.heroeUrl}/heroes/${key$}.json`

    return this.http.delete(url)
              .pipe( map((res:Response) => {return res;}));


  }
}
