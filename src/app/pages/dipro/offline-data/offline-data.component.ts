import { Component, OnInit } from '@angular/core';
import {
  OfflineDataService,
  OfflineSynchronizeHandler,
} from '../../../services/offline-data.service';

@Component({
  selector: 'app-offline-data',
  templateUrl: './offline-data.component.html',
  styleUrls: ['./offline-data.component.scss'],
})
export class OfflineDataComponent implements OnInit {
  dataToSync: { name: string; handler: OfflineSynchronizeHandler<any, any> }[] =
    [];

  constructor(public offlineDataService: OfflineDataService) {}

  ngOnInit() {
    this.dataToSync = [
      {
        name: 'pages.dipro.offlineData.answers',
        handler: this.offlineDataService.answerSync,
      },
      {
        name: 'pages.dipro.offlineData.applications',
        handler: this.offlineDataService.applicationSync,
      },
      {
        name: 'pages.dipro.offlineData.categories',
        handler: this.offlineDataService.categorySync,
      },
      {
        name: 'pages.dipro.offlineData.contacts',
        handler: this.offlineDataService.contactSync,
      },
      {
        name: 'pages.dipro.offlineData.countries',
        handler: this.offlineDataService.countrySync,
      },
      {
        name: 'pages.dipro.offlineData.customers',
        handler: this.offlineDataService.customerSync,
      },
      {
        name: 'pages.dipro.offlineData.delays',
        handler: this.offlineDataService.delaySync,
      },
      {
        name: 'pages.dipro.offlineData.generators',
        handler: this.offlineDataService.generatorSync,
      },
      {
        name: 'pages.dipro.offlineData.locations',
        handler: this.offlineDataService.locationSync,
      },
      {
        name: 'pages.dipro.offlineData.motors',
        handler: this.offlineDataService.motorSync,
      },
      {
        name: 'pages.dipro.offlineData.qtas',
        handler: this.offlineDataService.QTASync,
      },
      {
        name: 'pages.dipro.offlineData.types',
        handler: this.offlineDataService.typeSync,
      },
      {
        name: 'pages.dipro.offlineData.units',
        handler: this.offlineDataService.unitSync,
      },
      {
        name: 'pages.dipro.offlineData.users',
        handler: this.offlineDataService.userSync,
      },
      {
        name: 'pages.dipro.offlineData.technicians',
        handler: this.offlineDataService.technicianSync,
      },
    ];
  }

  update(): void {}
}
