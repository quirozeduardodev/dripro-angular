import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngersollRandRotaryOilFreeSierraComponent } from './ingersoll-rand-rotary-oil-free-sierra.component';

describe('IngersollRandRotaryOilFreeSierraComponent', () => {
  let component: IngersollRandRotaryOilFreeSierraComponent;
  let fixture: ComponentFixture<IngersollRandRotaryOilFreeSierraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngersollRandRotaryOilFreeSierraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngersollRandRotaryOilFreeSierraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
