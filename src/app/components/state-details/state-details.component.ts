import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { CovidAtState } from 'src/app/covid-list.entity';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.scss']
})
export class StateDetailsComponent implements OnInit {

  selectedState: CovidAtState;
  constructor(private dataSvc: DataAccessService,
    private router: Router) { }

  ngOnInit(): void {
    // if(!!!this.dataSvc.selectedState){
    //   this.back();
    // }

    // interval(1000).subscribe( (x) => console.log(x, "yellow"));
    this.selectedState = this.dataSvc.selectedState;
  }

  back(){
    this.router.navigate(['home']);

  }

}
