import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { tmpdir } from 'os';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http:HttpClient) { 
    this.getPkemon();
    this.solarpowerAbility();
    this.blazeAbility();
  }

  getPkemon(){
    let charmander = this._http.get('https://pokeapi.co/api/v2/pokemon/4');
    charmander.subscribe((data:any)=>console.log(`Got our Pokemon! ${data.name}'s abilities ${data.abilities[0].ability.name} are  and ${data.abilities[1].ability.name}.`));

  }

  solarpowerAbility(){
    let solarpower = this._http.get("https://pokeapi.co/api/v2/ability/94/");
    solarpower.subscribe((data:any) => {
      console.log(`${data.pokemon.length} Pokemon have the ${data.name} ability!`);
    })
  };
  
  blazeAbility(){
    let blaze = this._http.get("https://pokeapi.co/api/v2/ability/66/");
    blaze.subscribe((data:any) => {
      console.log(`${data.pokemon.length} Pokemon have the ${data.name} ability!`);
    })
  };
  
}