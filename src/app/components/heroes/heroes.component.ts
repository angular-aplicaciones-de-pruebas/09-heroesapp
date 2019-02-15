import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  heroes:any[]=[];
  loading:boolean=true;

  constructor(private _heroeService:HeroesService){
    _heroeService.getHeroes()
      .subscribe( (data:any)=>{
        console.log(data);
        this.heroes = data;
        console.log(this.heroes);
        this.loading = false;
      })
   }

  ngOnInit() {
  }
  borrarHeroe(key$:string){
    this._heroeService.borrarHeroe(key$)
      .subscribe(data=>{
        if(data){
          console.error(data);
        }else{
          delete this.heroes[key$];
        }


        console.log(data)})

  }
}
