import {Category} from '../../../database/models/category';
import {Observable, of} from 'rxjs';

export class Hardcoded {
  public static categories(): Observable<Category[]> {
    return of([
      {
        name: 'forms.jsa.categories.option1',
        id:1
      },
      {
        name: 'forms.jsa.categories.option2',
        id:2
      },
      {
        name: 'forms.jsa.categories.option3',
        id:3
      },
      {
        name: 'forms.jsa.categories.option4',
        id:4
      },
      {
        name: 'forms.jsa.categories.option5',
        id:5
      },
      {
        name: 'forms.jsa.categories.option6',
        id:6
      },
      {
        name: 'forms.jsa.categories.option7',
        id:7
      },
      {
        name: 'forms.jsa.categories.option8',
        id:8
      },
      {
        name: 'forms.jsa.categories.option9',
        id:9
      },
      {
        name: 'forms.jsa.categories.option10',
        id:10
      },
      {
        name: 'forms.jsa.categories.option11',
        id:11
      },
      {
        name: 'forms.jsa.categories.option12',
        id:12
      },
      {
        name: 'forms.jsa.categories.option13',
        id:13
      },
      {
        name: 'forms.jsa.categories.option14',
        id:14
      }
    ]);
  }
}
