import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getWeatherCity(586).subscribe((data: any) => {
      this.weather = data.cidade;
    });
  }

}
