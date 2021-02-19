import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CovidAtState, CovidList } from 'src/app/covid-list.entity';

@Injectable()
export class DataAccessService {
  private _selectedState: CovidAtState;


  constructor(private client: HttpClient) { }

   getStateWiseData(): Observable<CovidList>{
    let covidSvcSubject: Subject<CovidList> = new Subject();

    let covidData = JSON.parse(sessionStorage.getItem('CovidData'));
    if(covidData){
      setTimeout( () => {
        covidSvcSubject.next(covidData);
      });
    } else {
       this.client
        .get<CovidList>('https://api.covid19india.org/data.json')
        .subscribe(data => {
          sessionStorage.setItem('CovidData', JSON.stringify(data));
          covidSvcSubject.next(data)
        });
    }
    return covidSvcSubject.asObservable();
  }

  set selectedState (value: CovidAtState){
    this._selectedState = value;
  }
  get selectedState(){
    return this._selectedState;
  }
}
