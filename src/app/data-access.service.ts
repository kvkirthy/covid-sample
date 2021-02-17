import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CovidAtState, CovidList } from './covid-list.entity';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  private _selectedState: CovidAtState

  constructor(private client: HttpClient) { }

  getStateWiseData(): Observable<CovidList>{
    return this.client.get<CovidList>('https://api.covid19india.org/data.json');
  }

  set selectedState (value: CovidAtState){
    this._selectedState = value;
  }
  get selectedState(){
    return this._selectedState;
  }
}
