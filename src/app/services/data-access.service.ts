import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CovidAtState, CovidList } from 'src/app/covid-list.entity';

@Injectable()
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
