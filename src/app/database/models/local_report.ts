import { Answers } from '../../pages/dipro/reports/forms/base-form';

export interface LocalReport {
  id: number;
  hash: string;
  type: 'jsa-onSite' | 'jsa-warehouse' | 'jsa-onField-generic' |
  'jsa-onField-powerGeneration' |
  'jsa-onField-marine' |
  'service-generic' |
  'service-preventiveMaintenance' |
  'ingersollRand-rotaryContactCooledRotary' |
  'ingersollRand-rotaryOilFreeSierra' |
  'ingersollRand-hlEhHb' |
  'ingersollRand-rotaryOilFreeNirvana' |
  'ingersollRand-refrigeratedDryerSystem' |
  'ingersollRand-rotaryContactCooledNirvana';
  answers: Answers | null;
  createdAt?: string;
}
