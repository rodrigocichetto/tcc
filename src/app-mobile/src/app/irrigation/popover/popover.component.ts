import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';

import { IrrigationService } from '../../services/irrigation.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  constructor(
    private irrigationService: IrrigationService,
    private nav: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  deleteIrrigation() {
    this.irrigationService.delete(this.irrigationService.getSelected()._id);
  }

  ngOnInit() {
  }

}
