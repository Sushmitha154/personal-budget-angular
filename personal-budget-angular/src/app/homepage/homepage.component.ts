import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { DataService } from '../data.service';
import * as d3 from 'd3'; // Import D3.js
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  public data: any[] = []
  public labels: any[] = []
  public colors: any[] = []
  public dataSource = {
    datasets: [
      {
        data: this.data,
        backgroundColor: this.colors
      }
    ],
    labels: this.labels
  }

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.http.get('http://localhost:3000/budget')
        .subscribe((res: any) => {
          for (var i = 0; i < res.myBudget.length; i++) {
            this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
            this.dataSource.labels[i] = res.myBudget[i].title;
            this.dataSource.datasets[0].backgroundColor[i] = res.myBudget[i].color;
          }
          this.createChart();
        });
      this.dataService.getExampleData().subscribe((exampleData) => {
        this.createBarChart(exampleData);
      });
      this.dataService.fetchExampleDataIfNeeded();
    }
  }
  createChart() {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      const myPieChart = new Chart(ctx, {
        type: "pie",
        data: this.dataSource,
        options: {
          responsive: false,
          maintainAspectRatio: false,
      },
      });
    }
  }

  createBarChart(exampleData: any) {
    if (isPlatformBrowser(this.platformId)) {
      const budgetData = exampleData.myBudget;

      const margin = { top: 50, right: 30, bottom: 40, left: 40 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      const svg = d3.select('#barChart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.4)
        .domain(budgetData.map((d: any) => d.title));

      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 70]);

        const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', '1px solid black')
        .style('padding', '5px');

      svg.selectAll('rect')
        .data(budgetData)
        .enter().append('rect')
        .attr('x', (d: any) => x(d.title)!)
        .attr('y', (d: any) => y(d.budget))
        .attr('width', x.bandwidth())
        .attr('height', (d: any) => height - y(d.budget))
        .attr('fill', (d: any) => d.color)
        .on('mouseover', function (event, d) {
          tooltip.style('opacity', 1);
        })
        .on('mousemove', function (event, d: any) {
          tooltip.html(`<strong>${d.title}</strong><br>Budget: $${d.budget}`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 30) + 'px');
        })
        .on('mouseout', function () {
          tooltip.style('opacity', 0);
        });

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .call(d3.axisLeft(y));
    }
  }
}
