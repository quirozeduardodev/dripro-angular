import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JsaOnFieldMarineComponent } from './jsa-on-field-marine.component';

describe('JsaOnFieldMarineComponent', () => {
  let component: JsaOnFieldMarineComponent;
  let fixture: ComponentFixture<JsaOnFieldMarineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JsaOnFieldMarineComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JsaOnFieldMarineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
