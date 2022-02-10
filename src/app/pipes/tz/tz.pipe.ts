import { Pipe, PipeTransform } from '@angular/core';
import {ConfigurationService} from '../../services/configuration.service';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'tz'
})
export class TzPipe implements PipeTransform {
  constructor(private configurationService: ConfigurationService) {
  }
  transform(value: string | moment.Moment | null, format: 'date' | 'datetime' | 'fullDatetime' | string = 'YYYY-MM-DD HH:mm:ss'): string {
    return this.configurationService.tzToTimeZoneFormat(value, format === 'date' ? 'LL' : format === 'datetime' ? 'LLL' : format === 'fullDatetime' ? 'LLLL' : format);
  }

}
