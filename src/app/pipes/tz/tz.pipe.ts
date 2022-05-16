import { Pipe, PipeTransform } from '@angular/core';
import {ConfigurationService} from '../../services/configuration.service';
import {DateTime} from 'luxon';

@Pipe({
  name: 'tz'
})
export class TzPipe implements PipeTransform {
  constructor(private configurationService: ConfigurationService) {
  }
  transform(value: string | DateTime | null, format: 'date' | 'datetime' | 'fullDate' | string = 'yyyy-LL-dd HH:mm:ss'): string {
    // eslint-disable-next-line max-len
    return this.configurationService.tzToTimeZoneFormat(value, format === 'date' ? 'DD' : format === 'datetime' ? 'ff' : format === 'fullDate' ? 'DDDD' : format);
  }

}
