import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {Heroe} from '../../interfaces/heroe.interface'
import {HeroesService} from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {
  heroe:Heroe={
    nombre:"",
    casa:"Marvel",
    bio: ""
  }
  actualizando:boolean = false;
  id:string;

  constructor(private _heroeService:HeroesService,private _router:Router,
              private _activatedRoute:ActivatedRoute) {
    this._activatedRoute.params
      .subscribe( param =>{
        this.id=param['id'];
        if(this.id !== "nuevo"){
          this._heroeService.getHeroe(this.id)
            .subscribe( (heroe:any) => {
              this.heroe = heroe;
            })
        }
    });
  }

  ngOnInit() {
  }
  guardar(){
    console.log(this.id);
    if(this.id==='nuevo'){
        //insertando...
        this._heroeService.nuevoHeroe(this.heroe)
          .subscribe((data:any)=>{
          this._router.navigate(['/heroe',data.name]);
        })
        error => console.log(error)
    }else{
       //actualizando...
       this._heroeService.actualizarHeroe(this.heroe,this.id)
         .subscribe((data)=>{
           console.log(data);
       })
       error => console.log(error)
    }
  }
  agregarNuevo(forma:NgForm){
      this._router.navigate(['/heroe','nuevo']);
      forma.reset({
        casa:"Marvel"
      })
  }

}
