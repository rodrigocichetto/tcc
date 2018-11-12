import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, LoadingController, Events } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IonicSelectableComponent } from 'ionic-selectable';

import { IrrigationService } from '../services/irrigation.service';
import { Irrigation } from '../interfaces/irrigation';
import { PAGES } from '../app.constants';
import { NgForm } from '@angular/forms';
import { InpeService } from '../services/inpe.service';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
  styleUrls: ['add.page.scss']
})
export class AddPage {

  @ViewChild('citySelectable') citySelectable: IonicSelectableComponent;
  @ViewChild('addIrrigationForm') addIrrigationForm: NgForm;

  irrigation: Irrigation = {
    status: false,
    name: '',
    address: '',
    cep: '',
    city: {
      id: null,
      nome: null,
      uf: null
    }
  };

  searchedCities;

  submitted: boolean = false;
  enableValidate: boolean = true;

  private loading;

  constructor(
    private alertController: AlertController,
    private irrigationService: IrrigationService,
    private inpeService: InpeService,
    private translate: TranslateService,
    private nav: NavController,
    private loadingController: LoadingController,
    private events: Events
  ) { }

  cityChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    this.irrigation.city = event.value;
  }

  searchCity(event: {
    component: IonicSelectableComponent,
    text: string
  }) {

    const text = (event.text || '').trim().toLowerCase();

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 1) {
      return;
    }

    event.component.startSearch();

    this.inpeService.searchCity(text).subscribe((data: any) => {
      this.searchedCities = data.cidade;
      event.component.items = data.cidade;
    }, err => {
      event.component.endSearch();
    },
    () => {
      event.component.endSearch();
    });
  }

  register() {
    this.submitted = true;
    this.enableValidate = true;
    
    if (this.addIrrigationForm.valid) {

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
                city: {
                  id: null,
                  nome: null,
                  uf: null
                }
              };

              this.submitted = false;

              this.citySelectable.clear();

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
