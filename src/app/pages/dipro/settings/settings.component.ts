import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  languages: {label: string; language: string}[] = [
    {
      label: 'pages.dipro.settings.language.spanish',
      language: 'es_MX'
    },
    {
      label: 'pages.dipro.settings.language.portuguese',
      language: 'pt_BR'
    },
    {
      label: 'pages.dipro.settings.language.english',
      language: 'en_US'
    },
    {
      label: 'pages.dipro.settings.language.chinese',
      language: 'zh_CN'
    }
  ];

  constructor(public configurationService: ConfigurationService) { }

  ngOnInit() {}

  changeLanguage(language: string): void {
    const split: string[] = language.split('_');
    this.configurationService.setLanguage(split[0], split[1]);
  }

}
