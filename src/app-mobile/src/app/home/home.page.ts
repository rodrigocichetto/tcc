import { Component } from '@angular/core';

import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  weather: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit () {
    this.weatherService.getWeatherCity(586).subscribe((data: any) => {
      this.weather = data.cidade;
    });
  }

  // ionNavWillLoad () {
    
  // }

}
