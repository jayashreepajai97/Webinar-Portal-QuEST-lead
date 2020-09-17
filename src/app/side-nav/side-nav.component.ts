import { Component, OnInit, HostListener } from '@angular/core';
import { SideNavService } from './side-nav.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  highcharts = Highcharts;
  
  chartOptionsTrainee: any;
  chartOptionsWebinar: any;
  dataSource: any;
  innerWidth : any;
  displayedColumns: string[] = ['name', 'due_date', 'status', 'action', 'video'];
  p: number = 1;
  dataSourceCount: any;
  searchText:any;
  selectedYear: string;
  months: any = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  chartData: any;
  chartDataTrainee: any[];
  isTraineeExist: boolean;
  isWebinarExist: boolean;
  totalTraineeCount: number;
  totalWebinarCount: number;
  chartDataWebinar: any[];
  realWebinarChartData: any[];
  realWebinarCategory: any;
  realTraineeChartData: any[];
  realTraineeCategory: any[];
  relativeWidth: number;
    
  constructor(private sideNavService: SideNavService) { }

  ngOnInit(): void {
    this.selectedYear = "2020"
    this.getAll();
    this.callServiceForChart(this.selectedYear);
    this.innerWidth = window.innerWidth;
    if(this.innerWidth > 992) {
      this.relativeWidth = this.innerWidth - 450;
      this.relativeWidth = this.innerWidth - 450;
    } if(this.innerWidth <= 992 && this.innerWidth >= 768) {
      this.relativeWidth = this.innerWidth - 390;
      this.relativeWidth = this.innerWidth - 390;
    } if(innerWidth <768) {
      this.relativeWidth = this.innerWidth - 330;
      this.relativeWidth = this.innerWidth - 330;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    
    if(this.innerWidth >= 768) {
      this.relativeWidth = this.innerWidth - 450;
      this.relativeWidth = this.innerWidth - 450;
    } if(this.innerWidth <= 900 && this.innerWidth >= 768) {
      this.relativeWidth = this.innerWidth - 400;
      this.relativeWidth = this.innerWidth - 400;
    } if(innerWidth <768) {
      this.relativeWidth = this.innerWidth - 350;
      this.relativeWidth = this.innerWidth - 350;
    }
    
    this.callServiceForChart(this.selectedYear);
  }

  countRow(data) {
    if(data){
      this.dataSourceCount = data.length;
    }
  }

  showChartWebinar() {
    this.chartOptionsWebinar = {
      chart: {
        type: "column",
        width: this.relativeWidth
      },
      credits: {
        enabled:false
      },
      title: {
        text: "Webinar Chart"
      },
      yAxis: {
        type:'values',
        gridLineWidth: 2,
        gridLineColor: '#CFE5F1',
        min: 0,
        color: '#127FBA',
        title: {
            text: ''
        }
      },
      xAxis: {
        type:'categories',
        categories: this.realWebinarCategory,
        gridLineWidth: 0,
        color: '#127FBA'
      },
      plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
      },
      series: [{
        name: 'Webinar chart',
        data: this.realWebinarChartData
      }],
      responsive:{
        rules: [{
          condition: {
            
          }
        }]
      }
    }
  }

  showChartTrainee() {
    this.chartOptionsTrainee = {
      chart: {
        type: "column",
        width: this.relativeWidth,
      },
      credits: {
        enabled:false
      },
      title: {
        text: "Trainee Chart"
      },
      yAxis: {
        type:'values',
        gridLineWidth: 2,
        gridLineColor: '#CFE5F1',
        min: 0,
        visible:true,
        color: '#127FBA',
        title: {
            text: ''
        }
      },
      xAxis: {
        type:'categories',
        categories: this.realTraineeCategory,
        gridLineWidth: 0,
        color: '#127FBA'
      },
      plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
      },
      series: [{
        name: 'Trainee chart',
        data: this.realTraineeChartData
      }],
      responsive:{
        rules: [{
          condition: {
            
          }
        }]
      }
    }
  }

  async callServiceForChart(data) {
    await this.sideNavService.getChartData(data).then(res => {
      if(res !== undefined) {
        this.chartData = res;
        this.setDataForTraineeChart(this.chartData.users);
        this.setdataForWebinarChart(this.chartData.webinars)
      }
    },
      err => {
    })
  }

  setdataForWebinarChart(data) {
    this.totalWebinarCount = 0;
    this.chartDataWebinar = []
    let i = 0;
    for(let key in data) {
      if(data.hasOwnProperty(key)) {
        this.chartDataWebinar[i] = {};
        this.chartDataWebinar[i]['name'] = key;
        this.chartDataWebinar[i]['y'] = data[key]
        this.totalWebinarCount = this.totalWebinarCount + data[key]
        i++;
      }
    }
    if(this.totalWebinarCount == 0) {
      this.isWebinarExist = false
    }
    this.realWebinarChartData = []
    for(let i=0;i<this.months.length;i++) {
      this.chartDataWebinar.map((item) => {
        if(item.name == this.months[i]) {
          this.realWebinarChartData.push(item)
        }
      })
    }
    this.realWebinarCategory = [];
    for(let i=0;i<this.realWebinarChartData.length;i++) {
      this.realWebinarCategory.push(this.realWebinarChartData[i].name)
    }
    this.showChartWebinar();
  }

  setDataForTraineeChart(data) {
    this.totalTraineeCount = 0;
    this.chartDataTrainee = []
    let i = 0;
    for(let key in data) {
      if(data.hasOwnProperty(key)) {
        this.chartDataTrainee[i] = {};
        this.chartDataTrainee[i]['name'] = key;
        this.chartDataTrainee[i]['y'] = data[key]
        this.totalTraineeCount = this.totalTraineeCount + data[key]
        i++;
      }
    }
    if(this.totalTraineeCount == 0) {
      this.isTraineeExist = false
    }
    this.realTraineeChartData = []
    for(let i=0;i<this.months.length;i++) {
      this.chartDataTrainee.map((item) => {
        if(item.name == this.months[i]) {
          this.realTraineeChartData.push(item)
        }
      })
    }
    this.realTraineeCategory = [];
    for(let i=0;i<this.realTraineeChartData.length;i++) {
      this.realTraineeCategory.push(this.realTraineeChartData[i].name)
    }
    this.showChartTrainee();
  }

  setYear(data) {
    this.selectedYear = data;
    this.callServiceForChart(this.selectedYear)
  }

  setWebinarYear(data) {
    this.selectedYear = data;
    this.callServiceForChart(this.selectedYear)
  }

  getAll() {
    this.sideNavService.getAll().then(res => {
      this.dataSource = res;
      this.countRow(this.dataSource)
    },
      err => {
        this.dataSource = false;
      })
  }
}
