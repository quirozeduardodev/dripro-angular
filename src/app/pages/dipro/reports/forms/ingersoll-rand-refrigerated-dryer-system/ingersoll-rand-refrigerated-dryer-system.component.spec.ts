import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngersollRandRefrigeratedDryerSystemComponent } from './ingersoll-rand-refrigerated-dryer-system.component';

describe('IngersollRandRefrigeratedDryerSystemComponent', () => {
  let component: IngersollRandRefrigeratedDryerSystemComponent;
  let fixture: ComponentFixture<IngersollRandRefrigeratedDryerSystemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngersollRandRefrigeratedDryerSystemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngersollRandRefrigeratedDryerSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
