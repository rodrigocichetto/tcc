import { Component, OnInit, Input } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  @Input() city: number;
  weather: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getWeatherCity(this.city).subscribe((data: any) => {
      this.weather = data.cidade;
    });
  }

}
