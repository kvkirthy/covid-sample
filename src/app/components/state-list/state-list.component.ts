import { Color } from 'ng2-charts';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint } from 'chart.js';
import { CovidAtState, CovidList } from 'src/app/covid-list.entity';
import { DataAccessService } from 'src/app/services/data-access.service';
import { VaccinationRecord } from 'src/app/covid-vaccination.entity';
// import { debug } from 'console';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {

  stateWiseData: CovidAtState[];
  sortedOriginal: CovidAtState[];
  isReady = false;
  selected: string= "";

  displayedColumns: string[] = ['state', 'active', 'confirmed', 'deaths'];
  
  bubbleChartType: ChartType = 'bubble';
  bubbleChartLegend = true;

  sliderMin = "1";
  sliderMax = "8"

  vacDosesGiven: number;
  vacDosesPerHundred: number;
  vacUpdatedDate: Date;

  private createBubbleChartDataSet = (data: CovidAtState[]) => {
    let newDS = [];
    let radiusFactor = 0;

    if(data[0].active > 10000) {
      radiusFactor = 1000;
    } else if(data[0].active > 1000) {
      radiusFactor = 50
    } else if(data[0].active > 300){
        radiusFactor = 25;
    } else if(data[0].active > 100){
      radiusFactor = 10;
    } else {
      radiusFactor = 1;
    }

    data.forEach(d => {
      newDS.push({
        x: d.deaths / 1000,
        y: d.confirmed / 1000000,
        r: d.active / radiusFactor,
        radiusFactor,
        title: d.state
      } as ChartPoint);
    });
    return newDS;
  }

  sliderChange($event){
    switch($event.value){
      case 1:
        this.stateWiseData = this.sortedOriginal;
        this.bubbleChartData[0].data = this.createBubbleChartDataSet(this.stateWiseData);
        break;
      case 2:
        this.stateWiseData = this.sortedOriginal.slice(6, this.sortedOriginal.length)
        this.bubbleChartData[0].data = this.createBubbleChartDataSet(this.stateWiseData) ;
        break;
      case 3:
        this.stateWiseData = this.sortedOriginal.slice(10, this.sortedOriginal.length)
        this.bubbleChartData[0].data = this.createBubbleChartDataSet(this.stateWiseData);
        break;
      case 4:
        this.stateWiseData = this.sortedOriginal.slice(14, this.sortedOriginal.length)
        this.bubbleChartData[0].data = this.createBubbleChartDataSet(this.stateWiseData);
        break;
      case 5:
        this.stateWiseData = this.sortedOriginal.slice(18, this.sortedOriginal.length)
        this.bubbleChartData[0].data = this.createBubbleChartDataSet(this.stateWiseData);
        break;
      case 6:
        this.stateWiseData = this.sortedOriginal.slice(22, this.sortedOriginal.length)
        this.bubbleChartData[0].data = this.createBubbleChartDataSet(this.stateWiseData);
        break;
      case 7:
        this.stateWiseData = this.sortedOriginal.slice(26, this.sortedOriginal.length)
        this.bubbleChartData[0].data = this.createBubbleChartDataSet(this.stateWiseData);
        break;
      case 8:
        this.stateWiseData = this.sortedOriginal.slice(30, this.sortedOriginal.length)
        this.bubbleChartData[0].data = this.createBubbleChartDataSet(this.stateWiseData);
        break;

    }
  }

  bubbleChartData: ChartDataSets[] = [
    {
      data: [
      ],
      label: 'Active Cases',
      // backgroundColor: 'green',
      // borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      // hoverBorderColor: 'red',
    },
  ];

  bubbleChartColors: Color[] = [
    {
      backgroundColor: [
        // 'red',
        // 'green',
        // 'blue',
        // 'purple',
        // 'yellow',
        // 'brown',
        // 'magenta',
        // 'cyan',
        // 'orange',
        // 'pink'
      ]
    }
  ];

  bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: { //you're missing this
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Confirmed COVID Cases in Million'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Deaths in Thousands'
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          let item = data.datasets[0].data[tooltipItem.index];
          let activeCasesFactor = item['radiusFactor'];
          let message = `${item['title']}. Confirmed cases: ${item['y']*1000000}. Active cases: ${Math.round(item['r']*activeCasesFactor)}. `
          return message;
        }
      }
    }
  };

  constructor(private dataSvc: DataAccessService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSvc.getCovidVaccinationData().subscribe( (s) => {
      if(s && s?.length > 0){
        this.vacDosesGiven = s[0].doesesGiven;
        this.vacDosesPerHundred = s[0].dosesPerHundred;
        this.vacUpdatedDate = new Date(s[0].dateModified);
      }
    })
    this.dataSvc.getStateWiseData().subscribe( s => {
      this.isReady = true;
      this.sortedOriginal = s.statewise.sort( (o1, o2) => o2.active - o1.active);
      this.sortedOriginal.splice(0,1); // First element is Total. Remove!
      this.bubbleChartData[0].data = this.createBubbleChartDataSet(this.sortedOriginal);
      this.stateWiseData = this.sortedOriginal;
    });
  }

  rowSelected(state: CovidAtState){
    console.log("selected state", state);
    this.dataSvc.selectedState= state;
    this.router.navigate(["/details"]);

  }

}
