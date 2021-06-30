import {Component, Input, OnInit} from '@angular/core';
import {normalizeData} from "../../utils/utils";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() data: any = [];

  nomalizedData: any[] = [];

  view: [number, number] = [200, 80];
  legend: boolean = false;
  xAxis: boolean = false;
  yAxis: boolean = false;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = '';
  yAxisLabel: string = '';

  colorScheme = {
    domain: ['#e44d25']
    // domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  ngOnInit() {
    this.nomalizedData = normalizeData(this.data);
  }
}
