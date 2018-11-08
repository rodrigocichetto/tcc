import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { IrrigationPage } from './irrigation.page';
import { PopoverComponent } from './popover/popover.component';

const routes: Routes = [
  {
    path: '',
    component: IrrigationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  entryComponents:[PopoverComponent],
  declarations: [IrrigationPage, PopoverComponent],
  // exports: [PopoverComponent]
})
export class IrrigationPageModule {}
