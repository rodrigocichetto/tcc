import { Component, OnInit, Input } from '@angular/core';

import { WeatherService } from '../../services/weather.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  @Input() city: number;
  weather: any;

  constructor(
    private weatherService: WeatherService,
    public events: Events
  ) {
    events.subscribe('refresh:weather', this.getWeather.bind(this));
  }

  getWeather (data?) {
    this.weatherService.getWeatherCity((data) ? data.city : this.city).subscribe((data: any) => {
      this.weather = data.cidade;
    });
  }

  ngOnInit() {
    this.getWeather();
  }

}
