import { Color } from 'ng2-charts';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint } from 'chart.js';
import { CovidAtState, CovidList } from 'src/app/covid-list.entity';
import { DataAccessService } from 'src/app/services/data-access.service';
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

  private createBubbleChartDataSet = (data: CovidAtState[]) => {
    let newDS = [];
    data.forEach( d => {
      if ( ['total', 'kerala', 'maharashtra'].indexOf(d.state.toLowerCase()) === -1 ){
        newDS.push({
          x: d.deaths / 100000,
          y: d.confirmed / 1000000,
          r: d.active / 100,
          title: d.state
        } as ChartPoint);
      } else if (['kerala', 'maharashtra'].indexOf(d.state.toLowerCase()) > -1 ) {
        newDS.push({
          x: d.deaths / 100000,
          y: d.confirmed / 1000000,
          r: d.active / 500,
          title: d.state
        } as ChartPoint);
      }
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
      hoverBorderColor: 'red',
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
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          // console.log(tooltipItem, data);
          let item = data.datasets[0].data[tooltipItem.index];
          let activeCasesFactor = ['kerala', 'maharashtra'].indexOf(item['title'].toLowerCase()) < 0 ? 100 : 500;
          let message = `${item['title']}. Confirmed cases: ${item['y']*1000000}. Active cases: ${item['r']*activeCasesFactor}. `
          return message;
        }
      }
    }
  };

  // data = [];

  constructor(private dataSvc: DataAccessService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSvc.getStateWiseData().subscribe( s => {
      this.isReady = true;
      this.sortedOriginal = s.statewise.sort( (o1, o2) => o2.active - o1.active);
      // this.sortedOriginal.map( d => {
      // });
      this.bubbleChartData[0].data = this.createBubbleChartDataSet(this.sortedOriginal);
      // console.log(this.bubbleChartData);
      this.stateWiseData = this.sortedOriginal;
    });
  }

  rowSelected(state: CovidAtState){
    console.log("selected state", state);
    this.dataSvc.selectedState= state;
    this.router.navigate(["/details"]);

  }

}
