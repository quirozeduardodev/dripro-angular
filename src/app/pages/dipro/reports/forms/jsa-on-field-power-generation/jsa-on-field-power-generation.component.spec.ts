import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JsaOnFieldPowerGenerationComponent } from './jsa-on-field-power-generation.component';

describe('JsaOnFieldPowerGenerationComponent', () => {
  let component: JsaOnFieldPowerGenerationComponent;
  let fixture: ComponentFixture<JsaOnFieldPowerGenerationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JsaOnFieldPowerGenerationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JsaOnFieldPowerGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
