import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, Events } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { IrrigationService } from '../../services/irrigation.service';
import { PAGES } from '../../app.constants';

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
    private translate: TranslateService,
    private events: Events,
  ) { }

  deleteIrrigation() {

    this.loadingController.create()
      .then(loading => {

        loading.present();

        this.irrigationService.delete(this.irrigationService.getSelected()._id).subscribe(() => {

          loading.dismiss();

          this.events.publish('remove:irrigation');

          this.translate.get(['SUCCESS', 'SUCCESS_DELETE', 'OK']).subscribe(translated => {

            this.alertController.create({
              header: translated.SUCCESS,
              message: translated.SUCCESS_DELETE,
              buttons: [{
                text: translated.OK,
                cssClass: 'color--dark',
                handler: () => {
                  this.nav.navigateBack(PAGES.TABS);
                }
              }]
            }).then(alert => alert.present());

          });

        }, error => {

          loading.dismiss();

          this.translate.get(['ERROR', 'ERR_DELETE', 'OK']).subscribe(translated => {

            this.alertController.create({
              header: translated.ERROR,
              message: translated.ERR_DELETE,
              buttons: [{
                text: translated.OK,
                cssClass: 'color--dark'
              }]
            }).then(alert => alert.present());

          });

        });

      });

  }

  ngOnInit() {
  }

}
