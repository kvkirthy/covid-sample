import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CovidAtState, CovidList } from 'src/app/covid-list.entity';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {

  stateWiseData: CovidAtState[];
  isReady = false;
  selected: string= "";

  constructor(private dataSvc: DataAccessService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSvc.getStateWiseData().subscribe( s => {
      this.isReady = true;
      let sorted = s.statewise.sort( (o1, o2) => o2.active - o1.active);
      this.stateWiseData = sorted;
    });
  }

  rowSelected(state: CovidAtState){
    console.log("selected state", state);
    this.dataSvc.selectedState= state;
    this.router.navigate(["/details"]);

  }

}
