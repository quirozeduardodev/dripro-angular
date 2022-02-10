import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JsaOnFieldGenericComponent } from './jsa-on-field-generic.component';

describe('JsaOnFieldGenericComponent', () => {
  let component: JsaOnFieldGenericComponent;
  let fixture: ComponentFixture<JsaOnFieldGenericComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JsaOnFieldGenericComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JsaOnFieldGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
