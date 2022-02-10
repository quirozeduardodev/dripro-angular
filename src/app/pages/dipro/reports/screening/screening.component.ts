import { Component, OnInit } from '@angular/core';
import { QuestionT } from './components/question/question.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss'],
})
export class ScreeningComponent implements OnInit {
  question: QuestionT = {
    name: 'pages.dipro.reports.screening.question.name',
    options: [
      {
        name: 'pages.dipro.reports.screening.question.options.jsa.name',
        value: 'jsa',
        child: {
          name: 'pages.dipro.reports.screening.question.options.jsa.question.name',
          options: [
            {
              name: 'pages.dipro.reports.screening.question.options.jsa.question.options.onSite.name',
              value: 'onSite',
            },
            {
              name: 'pages.dipro.reports.screening.question.options.jsa.question.options.onField.name',
              value: 'onField',
              child: {
                name: 'pages.dipro.reports.screening.question.options.jsa.question.options.onField.question.name',
                options: [
                  {
                    name: 'pages.dipro.reports.screening.question.options.jsa.question.options.onField.question.options.generic.name',
                    value: 'generic',
                  },
                  {
                    name: `pages.dipro.reports.screening.question.options.jsa.question.options.onField.question.options.powerGeneration.name`,
                    value: 'powerGeneration',
                  },
                  {
                    name: 'pages.dipro.reports.screening.question.options.jsa.question.options.onField.question.options.marine.name',
                    value: 'marine',
                  },
                ],
              },
            },
            {
              name: 'pages.dipro.reports.screening.question.options.jsa.question.options.warehouse.name',
              value: 'warehouse',
            },
          ],
        },
      },
      {
        name: 'pages.dipro.reports.screening.question.options.service.name',
        value: 'service',
        child: {
          name: 'pages.dipro.reports.screening.question.options.service.question.name',
          options: [
            {
              name: 'pages.dipro.reports.screening.question.options.service.question.options.generic.name',
              value: 'generic',
            },
            {
              name: 'pages.dipro.reports.screening.question.options.service.question.options.preventiveMaintenance.name',
              value: 'preventiveMaintenance',
            },
          ],
        },
      },
      {
        name: 'pages.dipro.reports.screening.question.options.ingersoll.name',
        value: 'ingersollRand',
        child: {
          name: 'pages.dipro.reports.screening.question.options.ingersoll.question.name',
          options: [
            {
              name: 'pages.dipro.reports.screening.question.options.ingersoll.question.options.rotaryContactCooledRotary.name',
              value: 'rotaryContactCooledRotary',
            },
            {
              name: 'pages.dipro.reports.screening.question.options.ingersoll.question.options.rotaryOilFreeSierra.name',
              value: 'rotaryOilFreeSierra',
            },
            {
              name: 'pages.dipro.reports.screening.question.options.ingersoll.question.options.hl-eh-hb.name',
              value: 'hlEhHb',
            },
            {
              name: 'pages.dipro.reports.screening.question.options.ingersoll.question.options.rotaryOilFreeNirvana.name',
              value: 'rotaryOilFreeNirvana',
            },
            {
              name: 'pages.dipro.reports.screening.question.options.ingersoll.question.options.refrigeratedDryerSystem.name',
              value: 'refrigeratedDryerSystem',
            },
            {
              name: 'pages.dipro.reports.screening.question.options.ingersoll.question.options.rotaryContactCooledNirvana.name',
              value: 'rotaryContactCooledNirvana',
            },
          ],
        },
      },
    ],
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  onFinishQuestion(path: string): void {
    this.router.navigate([`/reports/create/${btoa(path)}`], {
      replaceUrl: true,
    });
  }
}
