import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngersollRandRotaryOilFreeNirvanaComponent } from './ingersoll-rand-rotary-oil-free-nirvana.component';

describe('IngersollRandRotaryOilFreeNirvanaComponent', () => {
  let component: IngersollRandRotaryOilFreeNirvanaComponent;
  let fixture: ComponentFixture<IngersollRandRotaryOilFreeNirvanaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngersollRandRotaryOilFreeNirvanaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngersollRandRotaryOilFreeNirvanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
