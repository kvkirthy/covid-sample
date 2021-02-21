import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CovidAtState, CovidList } from 'src/app/covid-list.entity';
import { VaccinationRecord } from '../covid-vaccination.entity';

@Injectable()
export class DataAccessService {
  private _selectedState: CovidAtState;


  constructor(private client: HttpClient) { }

  getCovidVaccinationData():Observable<Array<VaccinationRecord>>{
    let covidSvcSubject: Subject<Array<VaccinationRecord>> = new Subject();
    const sessionStorageKey = 'vaccination-records';

    let vaccinationData = JSON.parse(sessionStorage.getItem(sessionStorageKey));
    if(vaccinationData){
      setTimeout( () => {
        covidSvcSubject.next(vaccinationData);
      });
    } else {
       this.client
        .get<Array<VaccinationRecord>>('https://vencky-showcase.azurewebsites.net/covid')
        .subscribe(data => {
          sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));
          covidSvcSubject.next(data)
        });
    }
    return covidSvcSubject.asObservable();
  }

   getStateWiseData(): Observable<CovidList>{
    let covidSvcSubject: Subject<CovidList> = new Subject();

    const sessionStorageKey = 'CovidData';

    let covidData = JSON.parse(sessionStorage.getItem(sessionStorageKey));
    if(covidData){
      setTimeout( () => {
        covidSvcSubject.next(covidData);
      });
    } else {
       this.client
        .get<CovidList>('https://api.covid19india.org/data.json')
        .subscribe(data => {
          sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));
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
