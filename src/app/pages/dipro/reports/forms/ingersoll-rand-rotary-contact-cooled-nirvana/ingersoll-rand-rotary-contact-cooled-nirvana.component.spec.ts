import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngersollRandRotaryContactCooledNirvanaComponent } from './ingersoll-rand-rotary-contact-cooled-nirvana.component';

describe('IngersollRandRotaryContactCooledNirvanaComponent', () => {
  let component: IngersollRandRotaryContactCooledNirvanaComponent;
  let fixture: ComponentFixture<IngersollRandRotaryContactCooledNirvanaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngersollRandRotaryContactCooledNirvanaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngersollRandRotaryContactCooledNirvanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
