import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WeatherComponent } from './weather.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TranslateModule.forChild()
    ],
    declarations: [WeatherComponent],
    exports: [WeatherComponent]
})
export class WeatherComponentModule { }
