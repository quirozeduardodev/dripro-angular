/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {combineLatest, Observable} from 'rxjs';
import { Answer } from 'src/app/database/models/answer';
import { Application } from 'src/app/database/models/application';
import { Category } from 'src/app/database/models/category';
import { Contact } from 'src/app/database/models/contact';
import { Customer } from 'src/app/database/models/customer';
import { Delay } from 'src/app/database/models/delay';
import { Generator } from 'src/app/database/models/generator';
import { Location } from 'src/app/database/models/location';
import { Motor } from 'src/app/database/models/motor';
import { QTA } from 'src/app/database/models/qta';
import { Type } from 'src/app/database/models/type';
import { Unit } from 'src/app/database/models/unit';
import { User } from 'src/app/database/models/user';
import { UnitOfWorkDatabase } from 'src/app/database/unit-of-work.database';
import { AuthService } from 'src/app/services/auth.service';
import {BaseForm, OnAnswer} from '../base-form';
import {Technician} from '../../../../../database/models/technician';
import {distinct, map, mergeMap, startWith, take} from 'rxjs/operators';

@Component({
  selector: 'app-service-maintenance',
  templateUrl: './service-maintenance.component.html',
  styleUrls: ['./service-maintenance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceMaintenanceComponent extends BaseForm implements OnInit, OnAnswer {
  jsaReports$: Observable<Answer[]> | null = null;
  businessUnits$: Observable<Unit[]> | null = null;
  customers$: Observable<Customer[]> | null = null;
  locations$: Observable<Location[]> | null = null;
  contacts$: Observable<Contact[]> | null = null;
  technicians$: Observable<Technician[]> | null = null;
  jobTypes$: Observable<Type[]> | null = null;
  applications$: Observable<Application[]> | null = null;
  generators$: Observable<Generator[]> | null = null;
  motors$: Observable<Motor[]> | null = null;
  qtas$: Observable<QTA[]> | null = null;
  categories$: Observable<Category[]> | null = null;
  delays$: Observable<Delay[]> | null = null;
  measurementTypes: {id: number; name: string}[] = [
    {
      id: 1,
      name: 'forms.common.measurements.hrs'
    },
    {
      id: 2,
      name: 'forms.common.measurements.km'
    }
  ];
  mechanicalDataCommonOptions: {[key: string]: string} = {
    level: 'forms.service.preventiveMaintenance.mechanicalData.level',
    filtration: 'forms.service.preventiveMaintenance.mechanicalData.filtration',
    cleaning: 'forms.service.preventiveMaintenance.mechanicalData.cleaning',
    functionality: 'forms.service.preventiveMaintenance.mechanicalData.functionality',
    conditions: 'forms.service.preventiveMaintenance.mechanicalData.conditions',
    quezze: 'forms.service.preventiveMaintenance.mechanicalData.quezze',
    noise: 'forms.service.preventiveMaintenance.mechanicalData.noise',
    pulley: 'forms.service.preventiveMaintenance.mechanicalData.pulley',
    appareance: 'forms.service.preventiveMaintenance.mechanicalData.appareance',
    belt: 'forms.service.preventiveMaintenance.mechanicalData.belt',
  };
  mechanicalDataSections: {title: string; fControls: {fC: string; k: string}[]}[] = [
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.fuelTank',
      fControls: [
        {fC: 'tanq_comb_niv', k: 'level'},
        {fC: 'tanq_comb_fil', k: 'filtration'},
        {fC: 'tanq_comb_lim', k: 'cleaning'},
        {fC: 'tanq_comb_fun', k: 'functionality'},
        {fC: 'tanq_comb_cond', k: 'conditions'},
        {fC: 'tanq_comb_aprie', k: 'quezze'},
        {fC: 'tanq_comb_ruid', k: 'noise'},
        {fC: 'tanq_comb_polea', k: 'pulley'},
        {fC: 'tanq_comb_aspect', k: 'appareance'},
        {fC: 'tanq_comb_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.transferPump',
      fControls: [
        {fC: 'bomb_trans_niv', k: 'level'},
        {fC: 'bomb_trans_fil', k: 'filtration'},
        {fC: 'bomb_trans_lim', k: 'cleaning'},
        {fC: 'bomb_trans_fun', k: 'functionality'},
        {fC: 'bomb_trans_cond', k: 'conditions'},
        {fC: 'bomb_trans_aprie', k: 'quezze'},
        {fC: 'bomb_trans_ruid', k: 'noise'},
        {fC: 'bomb_trans_polea', k: 'pulley'},
        {fC: 'bomb_trans_aspect', k: 'appareance'},
        {fC: 'bomb_trans_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.injectorNozzle',
      fControls: [
        {fC: 'boq_inyec_niv', k: 'level'},
        {fC: 'boq_inyec_fil', k: 'filtration'},
        {fC: 'boq_inyec_lim', k: 'cleaning'},
        {fC: 'boq_inyec_fun', k: 'functionality'},
        {fC: 'boq_inyec_cond', k: 'conditions'},
        {fC: 'boq_inyec_aprie', k: 'quezze'},
        {fC: 'boq_inyec_ruid', k: 'noise'},
        {fC: 'boq_inyec_polea', k: 'pulley'},
        {fC: 'boq_inyec_aspect', k: 'appareance'},
        {fC: 'boq_inyec_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.governorRPM',
      fControls: [
        {fC: 'gob_rpm_niv', k: 'level'},
        {fC: 'gob_rpm_fil', k: 'filtration'},
        {fC: 'gob_rpm_lim', k: 'cleaning'},
        {fC: 'gob_rpm_fun', k: 'functionality'},
        {fC: 'gob_rpm_cond', k: 'conditions'},
        {fC: 'gob_rpm_aprie', k: 'quezze'},
        {fC: 'gob_rpm_ruid', k: 'noise'},
        {fC: 'gob_rpm_polea', k: 'pulley'},
        {fC: 'gob_rpm_aspect', k: 'appareance'},
        {fC: 'gob_rpm_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.injectorPump',
      fControls: [
        {fC: 'bom_inyec_niv', k: 'level'},
        {fC: 'bom_inyec_fil', k: 'filtration'},
        {fC: 'bom_inyec_lim', k: 'cleaning'},
        {fC: 'bom_inyec_fun', k: 'functionality'},
        {fC: 'bom_inyec_cond', k: 'conditions'},
        {fC: 'bom_inyec_aprie', k: 'quezze'},
        {fC: 'bom_inyec_ruid', k: 'noise'},
        {fC: 'bom_inyec_polea', k: 'pulley'},
        {fC: 'bom_inyec_aspect', k: 'appareance'},
        {fC: 'bom_inyec_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.lubricatingOil',
      fControls: [
        {fC: 'petr_lub_niv', k: 'level'},
        {fC: 'petr_lub_fil', k: 'filtration'},
        {fC: 'petr_lub_lim', k: 'cleaning'},
        {fC: 'petr_lub_fun', k: 'functionality'},
        {fC: 'petr_lub_cond', k: 'conditions'},
        {fC: 'petr_lub_aprie', k: 'quezze'},
        {fC: 'petr_lub_ruid', k: 'noise'},
        {fC: 'petr_lub_polea', k: 'pulley'},
        {fC: 'petr_lub_aspect', k: 'appareance'},
        {fC: 'petr_lub_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.turbocharger',
      fControls: [
        {fC: 'turbo_compresor_niv', k: 'level'},
        {fC: 'turbo_compresor_fil', k: 'filtration'},
        {fC: 'turbo_compresor_lim', k: 'cleaning'},
        {fC: 'turbo_compresor_fun', k: 'functionality'},
        {fC: 'turbo_compresor_cond', k: 'conditions'},
        {fC: 'turbo_compresor_aprie', k: 'quezze'},
        {fC: 'turbo_compresor_ruid', k: 'noise'},
        {fC: 'turbo_compresor_polea', k: 'pulley'},
        {fC: 'turbo_compresor_aspect', k: 'appareance'},
        {fC: 'turbo_compresor_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.exchanger',
      fControls: [
        {fC: 'inter_postenfriador_niv', k: 'level'},
        {fC: 'inter_postenfriador_fil', k: 'filtration'},
        {fC: 'inter_postenfriador_lim', k: 'cleaning'},
        {fC: 'inter_postenfriador_fun', k: 'functionality'},
        {fC: 'inter_postenfriador_cond', k: 'conditions'},
        {fC: 'inter_postenfriador_aprie', k: 'quezze'},
        {fC: 'inter_postenfriador_ruid', k: 'noise'},
        {fC: 'inter_postenfriador_polea', k: 'pulley'},
        {fC: 'inter_postenfriador_aspect', k: 'appareance'},
        {fC: 'inter_postenfriador_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.internalRadiator',
      fControls: [
        {fC: 'radiador_interno_niv', k: 'level'},
        {fC: 'radiador_interno_fil', k: 'filtration'},
        {fC: 'radiador_interno_lim', k: 'cleaning'},
        {fC: 'radiador_interno_fun', k: 'functionality'},
        {fC: 'radiador_interno_cond', k: 'conditions'},
        {fC: 'radiador_interno_aprie', k: 'quezze'},
        {fC: 'radiador_interno_ruid', k: 'noise'},
        {fC: 'radiador_interno_polea', k: 'pulley'},
        {fC: 'radiador_interno_aspect', k: 'appareance'},
        {fC: 'radiador_interno_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.refrigerantLiquid',
      fControls: [
        {fC: 'liquido_refrigerante_niv', k: 'level'},
        {fC: 'liquido_refrigerante_fil', k: 'filtration'},
        {fC: 'liquido_refrigerante_lim', k: 'cleaning'},
        {fC: 'liquido_refrigerante_fun', k: 'functionality'},
        {fC: 'liquido_refrigerante_cond', k: 'conditions'},
        {fC: 'liquido_refrigerante_aprie', k: 'quezze'},
        {fC: 'liquido_refrigerante_ruid', k: 'noise'},
        {fC: 'liquido_refrigerante_polea', k: 'pulley'},
        {fC: 'liquido_refrigerante_aspect', k: 'appareance'},
        {fC: 'liquido_refrigerante_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.hose',
      fControls: [
        {fC: 'manguera_niv', k: 'level'},
        {fC: 'manguera_fil', k: 'filtration'},
        {fC: 'manguera_lim', k: 'cleaning'},
        {fC: 'manguera_fun', k: 'functionality'},
        {fC: 'manguera_cond', k: 'conditions'},
        {fC: 'manguera_aprie', k: 'quezze'},
        {fC: 'manguera_ruid', k: 'noise'},
        {fC: 'manguera_polea', k: 'pulley'},
        {fC: 'manguera_aspect', k: 'appareance'},
        {fC: 'manguera_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.waterPump',
      fControls: [
        {fC: 'bomb_water_niv', k: 'level'},
        {fC: 'bomb_water_fil', k: 'filtration'},
        {fC: 'bomb_water_lim', k: 'cleaning'},
        {fC: 'bomb_water_fun', k: 'functionality'},
        {fC: 'bomb_water_cond', k: 'conditions'},
        {fC: 'bomb_water_aprie', k: 'quezze'},
        {fC: 'bomb_water_ruid', k: 'noise'},
        {fC: 'bomb_water_polea', k: 'pulley'},
        {fC: 'bomb_water_aspect', k: 'appareance'},
        {fC: 'bomb_water_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.fan',
      fControls: [
        {fC: 'ventilador_niv', k: 'level'},
        {fC: 'ventilador_fil', k: 'filtration'},
        {fC: 'ventilador_lim', k: 'cleaning'},
        {fC: 'ventilador_fun', k: 'functionality'},
        {fC: 'ventilador_cond', k: 'conditions'},
        {fC: 'ventilador_aprie', k: 'quezze'},
        {fC: 'ventilador_ruid', k: 'noise'},
        {fC: 'ventilador_polea', k: 'pulley'},
        {fC: 'ventilador_aspect', k: 'appareance'},
        {fC: 'ventilador_cintu', k: 'belt'}
      ]
    },
    {
      title: 'forms.service.preventiveMaintenance.mechanicalData.filters',
      fControls: [
        {fC: 'filters_niv', k: 'level'},
        {fC: 'filters_fil', k: 'filtration'},
        {fC: 'filters_lim', k: 'cleaning'},
        {fC: 'filters_fun', k: 'functionality'},
        {fC: 'filters_cond', k: 'conditions'},
        {fC: 'filters_aprie', k: 'quezze'},
        {fC: 'filters_ruid', k: 'noise'},
        {fC: 'filters_polea', k: 'pulley'},
        {fC: 'filters_aspect', k: 'appareance'},
        {fC: 'filters_cintu', k: 'belt'}
      ]
    }
  ];
  electricalDataSections: {label: string; rFC: string; tFC: string}[] = [
    {label: 'forms.service.preventiveMaintenance.preAquec', rFC: 'pre_aquec', tFC: 'pre_aquec_condition'},
    {label: 'forms.service.preventiveMaintenance.mPartida', rFC: 'm_partida', tFC: 'm_partida_condition'},
    {label: 'forms.service.preventiveMaintenance.solonoide', rFC: 'solonoide', tFC: 'solonoide_condition'},
    {label: 'forms.service.preventiveMaintenance.chPartida', rFC: 'ch_partida', tFC: 'ch_partida_condition'},
    {label: 'forms.service.preventiveMaintenance.termFixo', rFC: 'term_fixo', tFC: 'term_fixo_condition'},
    {label: 'forms.service.preventiveMaintenance.termReg', rFC: 'term_reg', tFC: 'term_reg_condition'},
    {label: 'forms.service.preventiveMaintenance.pressostato', rFC: 'pressostato', tFC: 'pressostato_condition'},
    {label: 'forms.service.preventiveMaintenance.lampda', rFC: 'lampda', tFC: 'lampda_condition'},
    {label: 'forms.service.preventiveMaintenance.alSonoro', rFC: 'al_sonoro', tFC: 'al_sonoro_condition'},
    {label: 'forms.service.preventiveMaintenance.retAlt', rFC: 'ret_alt', tFC: 'ret_alt_condition'},
    {label: 'forms.service.preventiveMaintenance.cabBat', rFC: 'cab_bat', tFC: 'cab_bat_condition'},
    {label: 'forms.service.preventiveMaintenance.levelSensor', rFC: 'level_sensor', tFC: 'level_sensor_condition'},
    {label: 'forms.service.preventiveMaintenance.amperim', rFC: 'amperim', tFC: 'amperim_condition'},
    {label: 'forms.service.preventiveMaintenance.voltim', rFC: 'voltim', tFC: 'voltim_condition'},
    {label: 'forms.service.preventiveMaintenance.frequen', rFC: 'frequen', tFC: 'frequen_condition'},
    {label: 'forms.service.preventiveMaintenance.horimet', rFC: 'horimet', tFC: 'horimet_condition'},
    {label: 'forms.service.preventiveMaintenance.rat', rFC: 'rat', tFC: 'rat_condition'},
    {label: 'forms.service.preventiveMaintenance.rev', rFC: 'rev', tFC: 'rev_condition'},
    {label: 'forms.service.preventiveMaintenance.usca', rFC: 'usca', tFC: 'usca_condition'},
    {label: 'forms.service.preventiveMaintenance.pccII', rFC: 'pcc_ii', tFC: 'pcc_ii_condition'},
    {label: 'forms.service.preventiveMaintenance.pccI', rFC: 'pcc_i', tFC: 'pcc_i_condition'},
    {label: 'forms.service.preventiveMaintenance.de12', rFC: 'de_12', tFC: 'de_12_condition'},
    {label: 'forms.service.preventiveMaintenance.qtaLevel', rFC: 'qta_level', tFC: 'qta_level_condition'},
    {label: 'forms.service.preventiveMaintenance.level1301', rFC: 'level_1301', tFC: 'level_1301_condition'},
  ];
  measurements: {label: string; vFC: string; cFC: string}[] = [
    {label: 'forms.service.preventiveMaintenance.faseR', vFC: 'fase_r_vacio', cFC: 'fase_r_carga'},
    {label: 'forms.service.preventiveMaintenance.faseS', vFC: 'fase_s_vacio', cFC: 'fase_s_carga'},
    {label: 'forms.service.preventiveMaintenance.faseT', vFC: 'fase_t_vacio', cFC: 'fase_t_carga'},
    {label: 'forms.service.preventiveMaintenance.frecuency', vFC: 'frequen_vacio', cFC: 'frequen_carga'},
    {label: 'forms.service.preventiveMaintenance.amperR', vFC: 'amper_r_vacio', cFC: 'amper_r_carga'},
    {label: 'forms.service.preventiveMaintenance.amperS', vFC: 'amper_s_vacio', cFC: 'amper_s_carga'},
    {label: 'forms.service.preventiveMaintenance.amperT', vFC: 'amper_t_vacio', cFC: 'amper_t_carga'},
    {label: 'forms.service.preventiveMaintenance.kw', vFC: 'km_vacio', cFC: 'km_carga'},
    {label: 'forms.service.preventiveMaintenance.tempAgua', vFC: 'temp_agua_vacio', cFC: 'temp_agua_carga'},
    {label: 'forms.service.preventiveMaintenance.tempOleo', vFC: 'temp_oleo_vacio', cFC: 'temp_oleo_carga'},
    {label: 'forms.service.preventiveMaintenance.perssao', vFC: 'pressao_vacio', cFC: 'pressao_carga'},
    {label: 'forms.service.preventiveMaintenance.tempo', vFC: 'tempo_vacio', cFC: 'tempo_carga'},
  ];
  bateries1: {label: string; fC: string}[] = [
    {label: 'forms.service.preventiveMaintenance.vs1', fC: 'vs_1'},
    {label: 'forms.service.preventiveMaintenance.vs2', fC: 'vs_2'},
    {label: 'forms.service.preventiveMaintenance.vs3', fC: 'vs_3'},
    {label: 'forms.service.preventiveMaintenance.vs4', fC: 'vs_4'},
    {label: 'forms.service.preventiveMaintenance.vs5', fC: 'vs_5'},
    {label: 'forms.service.preventiveMaintenance.vs6', fC: 'vs_6'},
  ];
  bateries2: {label: string; fC: string}[] = [
    {label: 'forms.service.preventiveMaintenance.vs7', fC: 'vs_7'},
    {label: 'forms.service.preventiveMaintenance.vs8', fC: 'vs_8'},
    {label: 'forms.service.preventiveMaintenance.vs9', fC: 'vs_9'},
    {label: 'forms.service.preventiveMaintenance.vs10', fC: 'vs_10'},
    {label: 'forms.service.preventiveMaintenance.vs11', fC: 'vs_11'},
    {label: 'forms.service.preventiveMaintenance.vs12', fC: 'vs_12'},
  ];
  formGroup = new FormGroup({
    job_order: new FormControl(null, [Validators.required]),
    no_jsa: new FormControl(null, [Validators.required]),
    unidad: new FormControl(null, [Validators.required]),
    customer: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    location_gps: new FormControl(null, [Validators.required]),
    contact: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    sucursal: new FormControl(null, [Validators.required]),
    accompanied: new FormControl(false),
    teammate_name: new FormControl([]),
    tageditor: new FormControl([], []),
    type_job: new FormControl(null, [Validators.required]),
    application: new FormControl(null, [Validators.required]),
    model: new FormControl(null, [Validators.required]),
    model_num: new FormControl(null, [Validators.required]),
    model_type: new FormControl(null, [Validators.required]),
    model_gene: new FormControl(null, [Validators.required]),
    num_serie_gen: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    model_motor: new FormControl(null, [Validators.required]),
    num_serie_motor: new FormControl(null, [Validators.required]),
    potencia: new FormControl(null, [Validators.required]),
    model_qta: new FormControl(null, [Validators.required]),
    num_serie_qta: new FormControl(null, [Validators.required]),
    tanq_comb_niv: new FormControl(null, [Validators.required]),
    tanq_comb_fil: new FormControl(null, [Validators.required]),
    tanq_comb_lim: new FormControl(null, [Validators.required]),
    tanq_comb_fun: new FormControl(null, [Validators.required]),
    tanq_comb_cond: new FormControl(null, [Validators.required]),
    tanq_comb_aprie: new FormControl(null, [Validators.required]),
    tanq_comb_ruid: new FormControl(null, [Validators.required]),
    tanq_comb_polea: new FormControl(null, [Validators.required]),
    tanq_comb_aspect: new FormControl(null, [Validators.required]),
    tanq_comb_cintu: new FormControl(null, [Validators.required]),
    bomb_trans_niv: new FormControl(null, [Validators.required]),
    bomb_trans_fil: new FormControl(null, [Validators.required]),
    bomb_trans_lim: new FormControl(null, [Validators.required]),
    bomb_trans_fun: new FormControl(null, [Validators.required]),
    bomb_trans_cond: new FormControl(null, [Validators.required]),
    bomb_trans_aprie: new FormControl(null, [Validators.required]),
    bomb_trans_ruid: new FormControl(null, [Validators.required]),
    bomb_trans_polea: new FormControl(null, [Validators.required]),
    bomb_trans_aspect: new FormControl(null, [Validators.required]),
    bomb_trans_cintu: new FormControl(null, [Validators.required]),
    boq_inyec_niv: new FormControl(null, [Validators.required]),
    boq_inyec_fil: new FormControl(null, [Validators.required]),
    boq_inyec_lim: new FormControl(null, [Validators.required]),
    boq_inyec_fun: new FormControl(null, [Validators.required]),
    boq_inyec_cond: new FormControl(null, [Validators.required]),
    boq_inyec_aprie: new FormControl(null, [Validators.required]),
    boq_inyec_ruid: new FormControl(null, [Validators.required]),
    boq_inyec_polea: new FormControl(null, [Validators.required]),
    boq_inyec_aspect: new FormControl(null, [Validators.required]),
    boq_inyec_cintu: new FormControl(null, [Validators.required]),
    gob_rpm_niv: new FormControl(null, [Validators.required]),
    gob_rpm_fil: new FormControl(null, [Validators.required]),
    gob_rpm_lim: new FormControl(null, [Validators.required]),
    gob_rpm_fun: new FormControl(null, [Validators.required]),
    gob_rpm_cond: new FormControl(null, [Validators.required]),
    gob_rpm_aprie: new FormControl(null, [Validators.required]),
    gob_rpm_ruid: new FormControl(null, [Validators.required]),
    gob_rpm_polea: new FormControl(null, [Validators.required]),
    gob_rpm_aspect: new FormControl(null, [Validators.required]),
    gob_rpm_cintu: new FormControl(null, [Validators.required]),
    bom_inyec_niv: new FormControl(null, [Validators.required]),
    bom_inyec_fil: new FormControl(null, [Validators.required]),
    bom_inyec_lim: new FormControl(null, [Validators.required]),
    bom_inyec_fun: new FormControl(null, [Validators.required]),
    bom_inyec_cond: new FormControl(null, [Validators.required]),
    bom_inyec_aprie: new FormControl(null, [Validators.required]),
    bom_inyec_ruid: new FormControl(null, [Validators.required]),
    bom_inyec_polea: new FormControl(null, [Validators.required]),
    bom_inyec_aspect: new FormControl(null, [Validators.required]),
    bom_inyec_cintu: new FormControl(null, [Validators.required]),
    petr_lub_niv: new FormControl(null, [Validators.required]),
    petr_lub_fil: new FormControl(null, [Validators.required]),
    petr_lub_lim: new FormControl(null, [Validators.required]),
    petr_lub_fun: new FormControl(null, [Validators.required]),
    petr_lub_cond: new FormControl(null, [Validators.required]),
    petr_lub_aprie: new FormControl(null, [Validators.required]),
    petr_lub_ruid: new FormControl(null, [Validators.required]),
    petr_lub_polea: new FormControl(null, [Validators.required]),
    petr_lub_aspect: new FormControl(null, [Validators.required]),
    petr_lub_cintu: new FormControl(null, [Validators.required]),
    turbo_compresor_niv: new FormControl(null, [Validators.required]),
    turbo_compresor_fil: new FormControl(null, [Validators.required]),
    turbo_compresor_lim: new FormControl(null, [Validators.required]),
    turbo_compresor_fun: new FormControl(null, [Validators.required]),
    turbo_compresor_cond: new FormControl(null, [Validators.required]),
    turbo_compresor_aprie: new FormControl(null, [Validators.required]),
    turbo_compresor_ruid: new FormControl(null, [Validators.required]),
    turbo_compresor_polea: new FormControl(null, [Validators.required]),
    turbo_compresor_aspect: new FormControl(null, [Validators.required]),
    turbo_compresor_cintu: new FormControl(null, [Validators.required]),
    inter_postenfriador_niv: new FormControl(null, [Validators.required]),
    inter_postenfriador_fil: new FormControl(null, [Validators.required]),
    inter_postenfriador_lim: new FormControl(null, [Validators.required]),
    inter_postenfriador_fun: new FormControl(null, [Validators.required]),
    inter_postenfriador_cond: new FormControl(null, [Validators.required]),
    inter_postenfriador_aprie: new FormControl(null, [Validators.required]),
    inter_postenfriador_ruid: new FormControl(null, [Validators.required]),
    inter_postenfriador_polea: new FormControl(null, [Validators.required]),
    inter_postenfriador_aspect: new FormControl(null, [Validators.required]),
    inter_postenfriador_cintu: new FormControl(null, [Validators.required]),
    radiador_interno_niv: new FormControl(null, [Validators.required]),
    radiador_interno_fil: new FormControl(null, [Validators.required]),
    radiador_interno_lim: new FormControl(null, [Validators.required]),
    radiador_interno_fun: new FormControl(null, [Validators.required]),
    radiador_interno_cond: new FormControl(null, [Validators.required]),
    radiador_interno_aprie: new FormControl(null, [Validators.required]),
    radiador_interno_ruid: new FormControl(null, [Validators.required]),
    radiador_interno_polea: new FormControl(null, [Validators.required]),
    radiador_interno_aspect: new FormControl(null, [Validators.required]),
    radiador_interno_cintu: new FormControl(null, [Validators.required]),
    liquido_refrigerante_niv: new FormControl(null, [Validators.required]),
    liquido_refrigerante_fil: new FormControl(null, [Validators.required]),
    liquido_refrigerante_lim: new FormControl(null, [Validators.required]),
    liquido_refrigerante_fun: new FormControl(null, [Validators.required]),
    liquido_refrigerante_cond: new FormControl(null, [Validators.required]),
    liquido_refrigerante_aprie: new FormControl(null, [Validators.required]),
    liquido_refrigerante_ruid: new FormControl(null, [Validators.required]),
    liquido_refrigerante_polea: new FormControl(null, [Validators.required]),
    liquido_refrigerante_aspect: new FormControl(null, [Validators.required]),
    liquido_refrigerante_cintu: new FormControl(null, [Validators.required]),
    manguera_niv: new FormControl(null, [Validators.required]),
    manguera_fil: new FormControl(null, [Validators.required]),
    manguera_lim: new FormControl(null, [Validators.required]),
    manguera_fun: new FormControl(null, [Validators.required]),
    manguera_cond: new FormControl(null, [Validators.required]),
    manguera_aprie: new FormControl(null, [Validators.required]),
    manguera_ruid: new FormControl(null, [Validators.required]),
    manguera_polea: new FormControl(null, [Validators.required]),
    manguera_aspect: new FormControl(null, [Validators.required]),
    manguera_cintu: new FormControl(null, [Validators.required]),
    bomb_water_niv: new FormControl(null, [Validators.required]),
    bomb_water_fil: new FormControl(null, [Validators.required]),
    bomb_water_lim: new FormControl(null, [Validators.required]),
    bomb_water_fun: new FormControl(null, [Validators.required]),
    bomb_water_cond: new FormControl(null, [Validators.required]),
    bomb_water_aprie: new FormControl(null, [Validators.required]),
    bomb_water_ruid: new FormControl(null, [Validators.required]),
    bomb_water_polea: new FormControl(null, [Validators.required]),
    bomb_water_aspect: new FormControl(null, [Validators.required]),
    bomb_water_cintu: new FormControl(null, [Validators.required]),
    ventilador_niv: new FormControl(null, [Validators.required]),
    ventilador_fil: new FormControl(null, [Validators.required]),
    ventilador_lim: new FormControl(null, [Validators.required]),
    ventilador_fun: new FormControl(null, [Validators.required]),
    ventilador_cond: new FormControl(null, [Validators.required]),
    ventilador_aprie: new FormControl(null, [Validators.required]),
    ventilador_ruid: new FormControl(null, [Validators.required]),
    ventilador_polea: new FormControl(null, [Validators.required]),
    ventilador_aspect: new FormControl(null, [Validators.required]),
    ventilador_cintu: new FormControl(null, [Validators.required]),
    filters_niv: new FormControl(null, [Validators.required]),
    filters_fil: new FormControl(null, [Validators.required]),
    filters_lim: new FormControl(null, [Validators.required]),
    filters_fun: new FormControl(null, [Validators.required]),
    filters_cond: new FormControl(null, [Validators.required]),
    filters_aprie: new FormControl(null, [Validators.required]),
    filters_ruid: new FormControl(null, [Validators.required]),
    filters_polea: new FormControl(null, [Validators.required]),
    filters_aspect: new FormControl(null, [Validators.required]),
    filters_cintu: new FormControl(null, [Validators.required]),
    pre_aquec: new FormControl(null, []),
    pre_aquec_condition: new FormControl(null, []),
    m_partida: new FormControl(null, []),
    m_partida_condition: new FormControl(null, []),
    solonoide: new FormControl(null, []),
    solonoide_condition: new FormControl(null, []),
    ch_partida: new FormControl(null, []),
    ch_partida_condition: new FormControl(null, []),
    term_fixo: new FormControl(null, []),
    term_fixo_condition: new FormControl(null, []),
    term_reg: new FormControl(null, []),
    term_reg_condition: new FormControl(null, []),
    pressostato: new FormControl(null, []),
    pressostato_condition: new FormControl(null, []),
    lampda: new FormControl(null, []),
    lampda_condition: new FormControl(null, []),
    al_sonoro: new FormControl(null, []),
    al_sonoro_condition: new FormControl(null, []),
    ret_alt: new FormControl(null, []),
    ret_alt_condition: new FormControl(null, []),
    cab_bat: new FormControl(null, []),
    cab_bat_condition: new FormControl(null, []),
    level_sensor: new FormControl(null, []),
    level_sensor_condition: new FormControl(null, []),
    amperim: new FormControl(null, []),
    amperim_condition: new FormControl(null, []),
    voltim: new FormControl(null, []),
    voltim_condition: new FormControl(null, []),
    frequen: new FormControl(null, []),
    frequen_condition: new FormControl(null, []),
    horimet: new FormControl(null, []),
    horimet_condition: new FormControl(null, []),
    rat: new FormControl(null, []),
    rat_condition: new FormControl(null, []),
    rev: new FormControl(null, []),
    rev_condition: new FormControl(null, []),
    usca: new FormControl(null, []),
    usca_condition: new FormControl(null, []),
    pcc_ii: new FormControl(null, []),
    pcc_ii_condition: new FormControl(null, []),
    pcc_i: new FormControl(null, []),
    pcc_i_condition: new FormControl(null, []),
    de_12: new FormControl(null, []),
    de_12_condition: new FormControl(null, []),
    qta_level: new FormControl(null, []),
    qta_level_condition: new FormControl(null, []),
    level_1301: new FormControl(null, []),
    level_1301_condition: new FormControl(null, []),
    fase_r_vacio: new FormControl(null, []),
    fase_r_carga: new FormControl(null, []),
    fase_s_vacio: new FormControl(null, []),
    fase_s_carga: new FormControl(null, []),
    fase_t_vacio: new FormControl(null, []),
    fase_t_carga: new FormControl(null, []),
    frequen_vacio: new FormControl(null, []),
    frequen_carga: new FormControl(null, []),
    amper_r_vacio: new FormControl(null, []),
    amper_r_carga: new FormControl(null, []),
    amper_s_vacio: new FormControl(null, []),
    amper_s_carga: new FormControl(null, []),
    amper_t_vacio: new FormControl(null, []),
    amper_t_carga: new FormControl(null, []),
    km_vacio: new FormControl(null, []),
    km_carga: new FormControl(null, []),
    temp_agua_vacio: new FormControl(null, []),
    temp_agua_carga: new FormControl(null, []),
    temp_oleo_vacio: new FormControl(null, []),
    temp_oleo_carga: new FormControl(null, []),
    pressao_vacio: new FormControl(null, []),
    pressao_carga: new FormControl(null, []),
    tempo_vacio: new FormControl(null, []),
    tempo_carga: new FormControl(null, []),
    vs_1: new FormControl(null, []),
    vs_2: new FormControl(null, []),
    vs_3: new FormControl(null, []),
    vs_4: new FormControl(null, []),
    vs_5: new FormControl(null, []),
    vs_6: new FormControl(null, []),
    vs_7: new FormControl(null, []),
    vs_8: new FormControl(null, []),
    vs_9: new FormControl(null, []),
    vs_10: new FormControl(null, []),
    vs_11: new FormControl(null, []),
    vs_12: new FormControl(null, []),
    density_actual: new FormControl(null, []),
    volt_actual: new FormControl(null, []),
    comments_actual: new FormControl(null, []),
    technician_name: new FormControl(null, [Validators.required]),
    initial_hour: new FormControl(null, [Validators.required]),
    finally_hour: new FormControl(null, [Validators.required]),
    category_technician: new FormControl(null, [Validators.required]),
    demoras_technician: new FormControl(null, [Validators.required]),
    photosz: new FormControl(null, [Validators.required]),
    'photo-description': new FormControl(null, [Validators.required]),
    responsable: new FormControl(null, [Validators.required]),
    department: new FormControl(null, [Validators.required]),
    email_client: new FormControl(null, [Validators.required, Validators.email]),
    signature_client: new FormControl(null, [Validators.required]),
    name_technician: new FormControl(null, [Validators.required]),
    signature_technician: new FormControl(null, [Validators.required]),
  });

  constructor(
    private unitOfWorkDatabase: UnitOfWorkDatabase,
    private authService: AuthService
  ){
    super();
  }

  ngOnInit() {
    this.jsaReports$ = this.unitOfWorkDatabase.answerRepository.all();
    this.businessUnits$ = this.unitOfWorkDatabase.unitRepository.all();
    this.customers$ = this.unitOfWorkDatabase.customerRepository.all();
    this.locations$ = this.unitOfWorkDatabase.locationRepository.all();
    this.contacts$ = this.unitOfWorkDatabase.contactRepository.all();
    this.technicians$ = this.unitOfWorkDatabase.technicianRepository.all()
      .pipe(map(all => all.sort((a, b) => a.name.localeCompare(b.name))));
    this.jobTypes$ = this.unitOfWorkDatabase.typeRepository.all();
    this.applications$ = this.unitOfWorkDatabase.applicationRepository.all();
    this.generators$ = this.unitOfWorkDatabase.generatorRepository.all();
    this.motors$ = this.unitOfWorkDatabase.motorRepository.all();
    this.qtas$ = this.unitOfWorkDatabase.QTARepository.all();
    this.categories$ = this.unitOfWorkDatabase.categoryRepository.all();
    this.delays$ = this.unitOfWorkDatabase.delayRepository.all();
  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {

      for (const name in this.formGroup.controls) {
        if (this.formGroup.controls[name].invalid) {
          console.log(name);
        }
      }

      this.scrollToFirstInvalidControl();
      return;
    }
    this.onSubmit.emit(this.formGroup.value);
  }

  onAnswersUpdated(answers: { [p: string]: any }): void {
    this.formGroup.controls.customer.valueChanges.subscribe(value => {
      this.locations$ = this.unitOfWorkDatabase.customerRepository.all()
        .pipe(mergeMap(customers => {
          let customerId: number | null = null;
          for (const customer of customers) {
            if(customer.name === value) {
              customerId = customer.id;
              break;
            }
          }
          return this.unitOfWorkDatabase.locationRepository.all()
            .pipe(map(all => {
              const filtered: Location[] = [];
              if(customerId) {
                for (const location of all) {
                  if(location.customerId === customerId) {
                    filtered.push(location);
                  }
                }
              }
              return filtered;
            }));
        }));
    });
    this.formGroup.controls.location.valueChanges.subscribe(value => {
      this.contacts$ = this.unitOfWorkDatabase.locationRepository.all()
        .pipe(mergeMap(locations => {
          let locationId: number | null = null;
          for (const location of locations) {
            if(location.name === value) {
              locationId = location.id;
              break;
            }
          }
          return this.unitOfWorkDatabase.contactRepository.all()
            .pipe(map(all => {
              const filtered: Contact[] = [];
              if(locationId) {
                for (const contact of all) {
                  if(contact.locationId === locationId) {
                    filtered.push(contact);
                  }
                }
              }
              return filtered;
            }));
        }));
    });
    this.formGroup.controls.contact.valueChanges.subscribe(value => {
      this.unitOfWorkDatabase.contactRepository.all()
        .subscribe(contacts => {
          for (const contact of contacts) {
            if(contact.name === value) {
              this.formGroup.controls.phone.setValue(contact.phone);
              break;
            }
          }
        });
    });

    if(!answers.sucursal) {
      this.authService.user.pipe(take(1)).subscribe((user) => {
        this.formGroup.controls.sucursal.setValue(user?.sitio ?? '');
      });
    }

    combineLatest([
      this.formGroup.controls.model_gene.valueChanges.pipe(startWith(answers.model_gene ?? null), distinct()),
      this.formGroup.controls.model_motor.valueChanges.pipe(startWith(answers.model_motor ?? null), distinct()),
      this.formGroup.controls.model_qta.valueChanges.pipe(startWith(answers.model_qta ?? null), distinct())])
      .subscribe(([modelGen, modelMotor, modelQTA]) => {

        this.formGroup.controls.model_gene.setValidators(null);
        this.formGroup.controls.num_serie_gen.setValidators(null);

        this.formGroup.controls.model_motor.setValidators(null);
        this.formGroup.controls.num_serie_motor.setValidators(null);

        this.formGroup.controls.model_qta.setValidators(null);
        this.formGroup.controls.num_serie_qta.setValidators(null);

        this.formGroup.controls.model_gene.updateValueAndValidity();
        this.formGroup.controls.num_serie_gen.updateValueAndValidity();
        this.formGroup.controls.model_motor.updateValueAndValidity();
        this.formGroup.controls.num_serie_motor.updateValueAndValidity();
        this.formGroup.controls.model_qta.updateValueAndValidity();
        this.formGroup.controls.num_serie_qta.updateValueAndValidity();

        if(!modelGen && !modelMotor) {
          this.formGroup.controls.model_qta.setValidators([Validators.required]);
          this.formGroup.controls.num_serie_qta.setValidators([Validators.required]);
        }

        if(!modelGen && !modelQTA) {
          this.formGroup.controls.model_motor.setValidators([Validators.required]);
          this.formGroup.controls.num_serie_motor.setValidators([Validators.required]);
        }

        if(!modelMotor && !modelQTA) {
          this.formGroup.controls.model_gene.setValidators([Validators.required]);
          this.formGroup.controls.num_serie_gen.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
        }
      });
  }

}
