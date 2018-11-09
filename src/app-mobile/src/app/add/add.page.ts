import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController, Events } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { IrrigationService } from '../services/irrigation.service';
import { Irrigation } from '../interfaces/irrigation';
import { PAGES } from '../app.constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
  styleUrls: ['add.page.scss']
})
export class AddPage {

  irrigation: Irrigation = {
    status: false,
    name: '',
    address: '',
    cep: '',
    city: null
  };

  enableValidate: boolean = true;

  private loading;

  constructor(
    private alertController: AlertController,
    private irrigationService: IrrigationService,
    private translate: TranslateService,
    private nav: NavController,
    private loadingController: LoadingController,
    private events: Events
  ) { }

  register(form: NgForm) {
    this.enableValidate = true;
    
    if (form.valid) {

      this.enableValidate = false;

      this.loadingController.create()
        .then(loading => {
          loading.present();

          this.irrigationService.create(this.irrigation).subscribe(response => {

            this.events.publish('add:irrigation', this.irrigation);

            this.translate.get(['SUCCESS', 'IRRIGATION_REGISTERED_MSG', 'OK']).subscribe((translated: any) => {

              loading.dismiss();

              this.irrigation = {
                status: false,
                name: '',
                address: '',
                cep: '',
                city: null
              };

              this.alertController.create({
                header: translated.SUCCESS,
                message: translated.IRRIGATION_REGISTERED_MSG,
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

            this.translate.get(['ERROR', 'IRRIGATION_REGISTERED_ERR', 'OK']).subscribe((translated: any) => {

              this.alertController.create({
                header: translated.ERROR,
                message: translated.IRRIGATION_REGISTERED_ERR,
                buttons: [{
                  text: translated.OK,
                  cssClass: 'color--dark'
                }]
              }).then(alert => alert.present());

            });
          }, () => {
            loading.dismiss();
          });

        });

    }
  }

}
