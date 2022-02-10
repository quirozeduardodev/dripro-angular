import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngersollRandRotaryContactCooledRotaryComponent } from './ingersoll-rand-rotary-contact-cooled-rotary.component';

describe('IngersollRandRotaryContactCooledRotaryComponent', () => {
  let component: IngersollRandRotaryContactCooledRotaryComponent;
  let fixture: ComponentFixture<IngersollRandRotaryContactCooledRotaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngersollRandRotaryContactCooledRotaryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngersollRandRotaryContactCooledRotaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
